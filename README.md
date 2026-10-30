# SylvaVerse - Forest Mini Pro

A futuristic, canopy-level bio-digital ecological simulation and habitat management web application.

## 🌲 Features

- **Holographic Forest Map**: Real-time interactive visualization of canopy sectors, mycelial networks, and ecological zones.
- **Stratification Explorer**: Multi-layer vertical navigation spanning Emergent, Canopy, Understory, and Forest Floor tiers.
- **Bento Telemetry**: Live sensor telemetry covering canopy density, oxygen flux, soil hydration, core temperature, and biomass indices.
- **Virtual Nursery**: Flora cultivation system for adopting plots, monitoring growth metrics, and harvesting bio-digital spores.
- **AI Ecological Assistant**: Interactive ambient assistant for habitat diagnostics, climate optimization, and system guidance.
- **Audio Synthesizer**: Immersive ambient audio generation powered by the Web Audio API.
- **Express & SQLite Backend**: Persistent state storage for telemetry logs, adopted flora, and energy quotas.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sainithin5B5/Forest_Mini_pro.git
   cd Forest_Mini_pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Copy `.env.example` to `.env` and fill in any required variables:
   ```bash
   cp .env.example .env
   ```

4. Start development mode (concurrent frontend + backend server):
   ```bash
   npm run dev
   ```

5. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Canvas Confetti
- **Backend**: Node.js, Express, SQLite3, CORS
- **Tooling**: Oxlint

## 📄 License

MIT
