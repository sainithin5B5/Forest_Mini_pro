import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import db from './database.js';

function getApiKey() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        if (key.trim() === 'GEMINI_API_KEY') {
          return vals.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
  return process.env.GEMINI_API_KEY || '';
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// 1. HEALTH CHECK
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  const apiKey = getApiKey();
  res.json({
    status: 'healthy',
    system: 'SylvaVerse Cyber-Organic API',
    database: 'SQLite Connected',
    geminiApiKeyPresent: Boolean(apiKey && apiKey.trim()),
    version: '2.4',
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// 2. AI ASSISTANT CHAT ENDPOINT
// -------------------------------------------------------------
app.post('/api/ai/chat', async (req, res) => {
  const rawMessage = req.body.message || '';
  const message = rawMessage.toLowerCase();
  const apiKey = getApiKey();

  db.get('SELECT * FROM telemetry ORDER BY id DESC LIMIT 1', async (err, telRow) => {
    db.get('SELECT points FROM spore_balance WHERE id = 1', async (err2, sporeRow) => {
      db.get('SELECT COUNT(*) as plotCount FROM plots', async (err3, plotRow) => {
        const points = sporeRow ? sporeRow.points : 240;
        const totalPlots = plotRow ? plotRow.plotCount : 3;

        // Default local fallback response
        let reply = "I am SylvaAI, your cyber-organic forest assistant! I am monitoring our live telemetry grid. Ask me about forest health, solar energy, water harvesting, wildlife tracking, or your digital tree nursery!";

        if (message.includes('health') || message.includes('status') || message.includes('condition')) {
          reply = `🌿 Forest Health Index is currently at 87% (▲ +3.2% increase)! Air quality is Excellent at AQI 42, and our canopy trees have captured 2.3 metric tons of CO₂ carbon this month across ${totalPlots} adopted plots.`;
        } else if (message.includes('solar') || message.includes('power') || message.includes('energy') || message.includes('electric')) {
          reply = `☀️ Solar Power output is producing 1.24 kW at 87% battery efficiency today! Total renewable generation reached 12.8 kWh with 8.4 kWh consumed by our 6 active treehouse units.`;
        } else if (message.includes('water') || message.includes('rain') || message.includes('hydration') || message.includes('soil')) {
          reply = `💧 Rainwater Harvesting has collected 340 Liters out of 500L reservoir capacity (68%). Soil moisture level is currently optimal at 45%, providing excellent hydration for root systems.`;
        } else if (message.includes('fox') || message.includes('deer') || message.includes('animal') || message.includes('wildlife') || message.includes('bird')) {
          reply = `🦊 Wildlife tracking is active! Red Fox (RF-023) is currently healthy in Sector-3, Deer Herd (D-004, 4 deer) is grazing in Sector-2, and 12 avian bird species were detected in the canopy.`;
        } else if (message.includes('spore') || message.includes('nursery') || message.includes('tree') || message.includes('adopt') || message.includes('nourish')) {
          reply = `🪴 You currently have ${points} Spore Points in your SQLite database! You can nourish your adopted trees (+8% growth) to earn +25 SP, or spend 100 SP to adopt a new digital tree plot.`;
        } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
          reply = `👋 Hello Eco Resident! Welcome to SylvaVerse Command Center. I can help you inspect live IoT sensors, manage energy flows, or track forest wildlife. What would you like to check?`;
        }

        // If Gemini API Key is configured in .env, invoke Gemini AI API
        if (apiKey && apiKey.trim()) {
          const models = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
          let apiSuccess = false;

          for (const model of models) {
            if (apiSuccess) break;
            try {
              const geminiResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    contents: [
                      {
                        parts: [
                          {
                            text: `You are SylvaAI, a cyber-organic forest AI assistant monitoring an eco-sanctuary biosphere.
Current Biosphere Telemetry:
- Canopy Density: ${telRow?.canopy_density || 94.2}%
- Oxygen Flux: ${telRow?.oxygen_flux || 128.4} µmol/m²s
- Soil Hydration: ${telRow?.soil_hydration || 78.6}%
- Core Temperature: ${telRow?.core_temperature || 21.8}°C
- Active Spore Points: ${points}
- Total Adopted Plots: ${totalPlots}

Answer the resident's query concisely, uniquely, and contextually in a helpful cyber-organic forest theme:
Resident query: "${rawMessage}"`
                          }
                        ]
                      }
                    ]
                  })
                }
              );

              if (geminiResponse.ok) {
                const data = await geminiResponse.json();
                const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (aiText) {
                  reply = aiText.trim();
                  apiSuccess = true;
                  console.log(`✅ Gemini API (${model}) generated real-time AI response.`);
                }
              } else {
                const errText = await geminiResponse.text();
                console.error(`⚠️ Gemini API (${model}) HTTP ${geminiResponse.status}:`, errText);
              }
            } catch (geminiError) {
              console.error(`❌ Gemini API call failed (${model}):`, geminiError.message);
            }
          }
        }

        res.json({
          reply,
          timestamp: new Date().toLocaleTimeString(),
          sporePoints: points,
          apiKeyPresent: Boolean(apiKey && apiKey.trim()),
        });
      });
    });
  });
});



// -------------------------------------------------------------
// 3. AGGREGATE BIOSPHERE STATS
// -------------------------------------------------------------
app.get('/api/stats', (req, res) => {
  db.get('SELECT COUNT(*) as plotCount, SUM(spores_generated) as totalSporesGenerated FROM plots', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT points FROM spore_balance WHERE id = 1', (err2, sporeRow) => {
      res.json({
        totalPlots: row.plotCount || 0,
        totalSporesGenerated: row.totalSporesGenerated || 0,
        activeSporePoints: sporeRow ? sporeRow.points : 240,
        activeNodes: 1420,
        strataHeightMeters: 75,
        stabilityPercent: 99.4,
        netCarbonOffsetMT: 342,
      });
    });
  });
});

// -------------------------------------------------------------
// 4. TELEMETRY ENDPOINTS
// -------------------------------------------------------------
app.get('/api/telemetry', (req, res) => {
  db.get('SELECT * FROM telemetry ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all('SELECT * FROM telemetry ORDER BY id DESC LIMIT 10', (err2, historyRows) => {
      res.json({
        current: row || { canopy_density: 94.2, oxygen_flux: 128.4, soil_hydration: 78.6, core_temperature: 21.8 },
        history: historyRows ? historyRows.reverse() : [],
      });
    });
  });
});

app.post('/api/telemetry/resync', (req, res) => {
  db.get('SELECT * FROM telemetry ORDER BY id DESC LIMIT 1', (err, row) => {
    const prev = row || { canopy_density: 94.2, oxygen_flux: 128.4, soil_hydration: 78.6, core_temperature: 21.8 };
    const nextCanopy = +(prev.canopy_density + (Math.random() * 0.8 - 0.4)).toFixed(1);
    const nextOxygen = +(prev.oxygen_flux + (Math.random() * 1.2 - 0.6)).toFixed(1);
    const nextHydration = +(prev.soil_hydration + (Math.random() * 0.6 - 0.3)).toFixed(1);
    const nextTemp = +(prev.core_temperature + (Math.random() * 0.3 - 0.15)).toFixed(1);

    const stmt = db.prepare(`
      INSERT INTO telemetry (canopy_density, oxygen_flux, soil_hydration, core_temperature)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(nextCanopy, nextOxygen, nextHydration, nextTemp, function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({
        id: this.lastID,
        canopy_density: nextCanopy,
        oxygen_flux: nextOxygen,
        soil_hydration: nextHydration,
        core_temperature: nextTemp,
        resynced: true,
      });
    });
    stmt.finalize();
  });
});

// -------------------------------------------------------------
// 5. SPORE POINTS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/spores', (req, res) => {
  db.get('SELECT points FROM spore_balance WHERE id = 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ points: row ? row.points : 240 });
  });
});

function updateSpores(delta, callback) {
  db.get('SELECT points FROM spore_balance WHERE id = 1', (err, row) => {
    if (err) return callback(err);
    const currentPoints = row ? row.points : 240;
    const newPoints = Math.max(0, currentPoints + delta);

    db.run(
      'UPDATE spore_balance SET points = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
      [newPoints],
      (err2) => {
        if (err2) return callback(err2);
        callback(null, newPoints);
      }
    );
  });
}

// -------------------------------------------------------------
// 6. ADOPTED TREE PLOTS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/plots', (req, res) => {
  db.all('SELECT * FROM plots ORDER BY rowid ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formattedPlots = rows.map((plot) => ({
      id: plot.id,
      name: plot.name,
      species: plot.species,
      stage: plot.stage,
      stageLevel: plot.stage_level,
      growth: plot.growth,
      hydration: plot.hydration,
      mycelialSync: plot.mycelial_sync,
      icon: plot.icon,
      adoptedDate: plot.adopted_date,
      sporesGenerated: plot.spores_generated,
    }));
    res.json(formattedPlots);
  });
});

app.post('/api/plots/adopt', (req, res) => {
  updateSpores(-100, (err, newSporeBalance) => {
    if (err) return res.status(500).json({ error: err.message });

    const newId = `plot-${Math.floor(100 + Math.random() * 899)}`;
    const name = req.body.name || `Bioluminescent Cedar #${newId.toUpperCase()}`;
    const species = req.body.species || 'Cedrus Biolumina';
    const icon = req.body.icon || '🪴';
    const adoptedDate = new Date().toISOString().split('T')[0];

    const stmt = db.prepare(`
      INSERT INTO plots (id, name, species, stage, stage_level, growth, hydration, mycelial_sync, icon, adopted_date, spores_generated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(newId, name, species, 'Sprouting Sapling', 1, 10.0, 90.0, 85.0, icon, adoptedDate, 0, function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });

      db.run('INSERT INTO mycelial_logs (source, msg, status) VALUES (?, ?, ?)', [
        `Node #${Math.floor(10 + Math.random() * 90)}`,
        `New Digital Plot (${name}) adopted & synced to biosphere grid`,
        'ADOPTED',
      ]);

      res.json({
        id: newId,
        name,
        species,
        stage: 'Sprouting Sapling',
        stageLevel: 1,
        growth: 10.0,
        hydration: 90.0,
        mycelialSync: 85.0,
        icon,
        adoptedDate,
        sporesGenerated: 0,
        newSporeBalance,
      });
    });
    stmt.finalize();
  });
});

app.post('/api/plots/:id/nourish', (req, res) => {
  const plotId = req.params.id;

  db.get('SELECT * FROM plots WHERE id = ?', [plotId], (err, plot) => {
    if (err || !plot) return res.status(404).json({ error: 'Plot not found' });

    const newGrowth = Math.min(100, +(plot.growth + 8.0).toFixed(1));
    const newHydration = Math.min(100, +(plot.hydration + 4.0).toFixed(1));
    const newSporesGenerated = plot.spores_generated + 25;

    let stage = plot.stage;
    let stageLevel = plot.stage_level;
    if (newGrowth >= 100) {
      stage = 'Ancient Sentinel';
      stageLevel = 4;
    } else if (newGrowth >= 70) {
      stage = 'Mature Canopy';
      stageLevel = 3;
    } else if (newGrowth >= 35) {
      stage = 'Young Canopy';
      stageLevel = 2;
    }

    db.run(
      'UPDATE plots SET growth = ?, hydration = ?, stage = ?, stage_level = ?, spores_generated = ? WHERE id = ?',
      [newGrowth, newHydration, stage, stageLevel, newSporesGenerated, plotId],
      (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        updateSpores(25, (err3, newSporeBalance) => {
          res.json({
            plotId,
            growth: newGrowth,
            hydration: newHydration,
            stage,
            stageLevel,
            sporesGenerated: newSporesGenerated,
            sporesAwarded: 25,
            newSporeBalance,
          });
        });
      }
    );
  });
});

app.post('/api/plots/:id/mist', (req, res) => {
  const plotId = req.params.id;

  db.get('SELECT * FROM plots WHERE id = ?', [plotId], (err, plot) => {
    if (err || !plot) return res.status(404).json({ error: 'Plot not found' });

    const newHydration = Math.min(100, +(plot.hydration + 12.0).toFixed(1));

    db.run('UPDATE plots SET hydration = ? WHERE id = ?', [newHydration, plotId], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      updateSpores(10, (err3, newSporeBalance) => {
        res.json({
          plotId,
          hydration: newHydration,
          sporesAwarded: 10,
          newSporeBalance,
        });
      });
    });
  });
});

app.post('/api/plots/:id/pulse', (req, res) => {
  const plotId = req.params.id;

  db.get('SELECT * FROM plots WHERE id = ?', [plotId], (err, plot) => {
    if (err || !plot) return res.status(404).json({ error: 'Plot not found' });

    const newSync = Math.min(100, +(plot.mycelial_sync + 5.0).toFixed(1));

    db.run('UPDATE plots SET mycelial_sync = ? WHERE id = ?', [newSync, plotId], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      updateSpores(15, (err3, newSporeBalance) => {
        res.json({
          plotId,
          mycelialSync: newSync,
          sporesAwarded: 15,
          newSporeBalance,
        });
      });
    });
  });
});

// -------------------------------------------------------------
// 7. MYCELIAL LOGS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/mycelial/logs', (req, res) => {
  db.all('SELECT * FROM mycelial_logs ORDER BY id DESC LIMIT 15', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map((r) => ({
      id: r.id,
      time: new Date(r.created_at).toLocaleTimeString(),
      source: r.source,
      msg: r.msg,
      status: r.status,
    }));
    res.json(formatted);
  });
});

// -------------------------------------------------------------
// START EXPRESS SERVER
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 SylvaVerse Express API Backend running on http://localhost:${PORT}`);
});
