import React, { useState, useRef } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { UIOverlay } from './components/UIOverlay';
import { GameEngine } from './engine/GameEngine';
import { GameStats, TowerType } from './engine/types';

export const App: React.FC = () => {
  const engineRef = useRef<GameEngine | null>(null);
  const [selectedTowerType, setSelectedTowerType] = useState<TowerType | null>('archer');
  const [stats, setStats] = useState<GameStats>({
    hp: 100,
    gold: 350,
    score: 0,
    wave: 1,
    fps: 60,
    frameTime: 16.6,
    activeEnemies: 0,
    activeProjectiles: 0,
    activeTowers: 0,
    isPaused: false,
    gameSpeed: 1,
    isBenchmarkMode: false,
    useSpatialGrid: true,
    isGameOver: false,
    isVictory: false,
  });

  return (
    <div className="w-screen h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="relative w-[1280px] h-[720px]">
        <GameCanvas onStatsUpdate={setStats} selectedTowerType={selectedTowerType} engineRef={engineRef} />
        <UIOverlay
          stats={stats}
          selectedTowerType={selectedTowerType}
          onSelectTower={setSelectedTowerType}
          onTogglePause={() => engineRef.current?.togglePause()}
          onSetSpeed={(s) => engineRef.current?.setSpeed(s)}
          onRestart={() => engineRef.current?.restart()}
          onTriggerBenchmark={() => engineRef.current?.triggerBenchmarkMode()}
          onToggleSpatialGrid={() => engineRef.current?.toggleSpatialGrid()}
        />
      </div>
    </div>
  );
};

export default App;