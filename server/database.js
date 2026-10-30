import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'sylvaverse.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite database:', err.message);
  } else {
    console.log('🌲 Connected to SylvaVerse SQLite Database:', dbPath);
  }
});

// Initialize Tables and Seed Data
db.serialize(() => {
  // 1. Telemetry Table
  db.run(`
    CREATE TABLE IF NOT EXISTS telemetry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      canopy_density REAL,
      oxygen_flux REAL,
      soil_hydration REAL,
      core_temperature REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 2. Adopted Plots Table
  db.run(`
    CREATE TABLE IF NOT EXISTS plots (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      stage TEXT NOT NULL,
      stage_level INTEGER DEFAULT 1,
      growth REAL DEFAULT 10.0,
      hydration REAL DEFAULT 80.0,
      mycelial_sync REAL DEFAULT 85.0,
      icon TEXT DEFAULT '🌲',
      adopted_date TEXT,
      spores_generated INTEGER DEFAULT 0
    )
  `);

  // 3. Spore Points Balance Table
  db.run(`
    CREATE TABLE IF NOT EXISTS spore_balance (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      points INTEGER DEFAULT 240,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. Mycelial Logs Table
  db.run(`
    CREATE TABLE IF NOT EXISTS mycelial_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT NOT NULL,
      msg TEXT NOT NULL,
      status TEXT DEFAULT 'OK',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed Baseline Telemetry if empty
  db.get('SELECT COUNT(*) as count FROM telemetry', (err, row) => {
    if (row && row.count === 0) {
      db.run(`
        INSERT INTO telemetry (canopy_density, oxygen_flux, soil_hydration, core_temperature)
        VALUES (94.2, 128.4, 78.6, 21.8)
      `);
    }
  });

  // Seed Default Spore Points if empty
  db.run(`
    INSERT OR IGNORE INTO spore_balance (id, points) VALUES (1, 240)
  `);

  // Seed Default Plots if empty
  db.get('SELECT COUNT(*) as count FROM plots', (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO plots (id, name, species, stage, stage_level, growth, hydration, mycelial_sync, icon, adopted_date, spores_generated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        'plot-904',
        'Ancient Redwood Plot #SYL-904',
        'Sequoiadendron Giganteum',
        'Ancient Sentinel',
        4,
        78.4,
        84.0,
        92.5,
        '🌲',
        '2026-04-12',
        480
      );

      stmt.run(
        'plot-210',
        'Bioluminescent Baobab #SYL-210',
        'Adansonia Luminosa',
        'Young Canopy',
        2,
        42.0,
        68.5,
        88.0,
        '🌳',
        '2026-07-01',
        210
      );

      stmt.run(
        'plot-552',
        'Cyan Willow #SYL-552',
        'Salix Cyanea',
        'Sprouting Sapling',
        1,
        18.5,
        92.0,
        96.0,
        '🌿',
        '2026-08-15',
        90
      );

      stmt.finalize();
    }
  });

  // Seed Baseline Mycelial Logs if empty
  db.get('SELECT COUNT(*) as count FROM mycelial_logs', (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO mycelial_logs (source, msg, status) VALUES (?, ?, ?)
      `);

      stmt.run('Node #89', 'Nutrient Packet (Nitrogen: 42mg) routed to Emergent Layer', 'SUCCESS');
      stmt.run('Node #12', 'Bio-frequency 432Hz standing wave lock established', 'STABLE');
      stmt.run('Node #104', 'Rhizosphere Moisture Sync complete (+0.8%)', 'OPTIMAL');

      stmt.finalize();
    }
  });
});

export default db;
