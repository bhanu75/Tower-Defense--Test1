import React from 'react';
import { GameStats, TowerType } from '../engine/types';
import { Shield, Coins, Trophy, Flame, Play, Pause, FastForward, RotateCcw, Cpu } from 'lucide-react';

interface UIOverlayProps {
  stats: GameStats;
  selectedTowerType: TowerType | null;
  onSelectTower: (type: TowerType) => void;
  onTogglePause: () => void;
  onSetSpeed: (speed: number) => void;
  onRestart: () => void;
  onTriggerBenchmark: () => void;
  onToggleSpatialGrid: () => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  stats,
  selectedTowerType,
  onSelectTower,
  onTogglePause,
  onSetSpeed,
  onRestart,
  onTriggerBenchmark,
  onToggleSpatialGrid,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center bg-slate-900/90 backdrop-blur border border-slate-800 p-3 rounded-xl pointer-events-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-red-400 font-bold">
            <Shield className="w-5 h-5" /> {stats.hp} HP
          </div>
          <div className="flex items-center gap-2 text-yellow-400 font-bold">
            <Coins className="w-5 h-5" /> ${stats.gold}
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Trophy className="w-5 h-5" /> {stats.score} PTS
          </div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Flame className="w-5 h-5" /> WAVE {stats.wave}/50
          </div>
        </div>

        {/* FPS & Performance Counter */}
        <div className="flex items-center gap-4 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
          <div>FPS: <span className={stats.fps >= 45 ? 'text-green-400' : 'text-red-400'}>{stats.fps}</span></div>
          <div>Frame: <span>{stats.frameTime}ms</span></div>
          <div>Enemies: <span className="text-yellow-400">{stats.activeEnemies}</span></div>
          <div>Projectiles: <span className="text-blue-400">{stats.activeProjectiles}</span></div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex justify-between items-end pointer-events-auto">
        {/* Tower Selector */}
        <div className="flex gap-3 bg-slate-900/90 backdrop-blur border border-slate-800 p-2 rounded-xl">
          {[
            { type: 'archer', name: 'Archer ($100)', color: 'bg-blue-600' },
            { type: 'bomb', name: 'Bomb ($150)', color: 'bg-orange-600' },
            { type: 'frost', name: 'Frost ($120)', color: 'bg-cyan-600' },
          ].map((t) => (
            <button
              key={t.type}
              onClick={() => onSelectTower(t.type as TowerType)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${t.color} ${
                selectedTowerType === t.type ? 'ring-2 ring-white scale-105' : 'opacity-80 hover:opacity-100'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Action Controls & Benchmark Trigger */}
        <div className="flex gap-2 bg-slate-900/90 backdrop-blur border border-slate-800 p-2 rounded-xl">
          <button onClick={onTogglePause} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg">
            {stats.isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
          <button onClick={() => onSetSpeed(stats.gameSpeed === 1 ? 2 : stats.gameSpeed === 2 ? 4 : 1)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1 font-bold text-xs">
            <FastForward className="w-4 h-4" /> {stats.gameSpeed}x
          </button>
          <button onClick={onRestart} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={onTriggerBenchmark}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Cpu className="w-4 h-4" /> 5k Stress Test
          </button>
          <button
            onClick={onToggleSpatialGrid}
            className={`px-3 py-2 rounded-lg text-xs font-bold ${
              stats.useSpatialGrid ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            Spatial Grid: {stats.useSpatialGrid ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};