import React, { useState, useRef } from 'react';
import GameCanvas from './components/GameCanvas';
import UIOverlay from './components/UIOverlay';
import Controls from './components/Controls';
import BenchmarkPanel from './components/BenchmarkPanel';
import { GameEngine } from './engine/GameEngine';
import { GameStats, TowerType } from './engine/types';

export default function App() {
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    lives: 100,
    gold: 500,
    wave: 1,
    fps: 60,
    isPaused: false,
    gameSpeed: 1,
    useSpatialGrid: true,
  });

  const [selectedTowerType, setSelectedTowerType] = useState<TowerType | null>(null);
  const engineRef = useRef<GameEngine | null>(null);

  return (
    <div className="app-container">
      <GameCanvas
        onStatsUpdate={setStats}
        selectedTowerType={selectedTowerType}
        engineRef={engineRef}
      />
      <UIOverlay stats={stats} />
      <Controls
        selectedTowerType={selectedTowerType}
        onSelectTower={setSelectedTowerType}
        engineRef={engineRef}
      />
      <BenchmarkPanel stats={stats} />
    </div>
  );
}
