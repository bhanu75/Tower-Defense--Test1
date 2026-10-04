import React from 'react';

interface BenchmarkPanelProps {
  fps: number;
  frameTime: number;
  activeEnemies: number;
  activeProjectiles: number;
  activeTowers: number;
  isBenchmarkMode: boolean;
}

export const BenchmarkPanel: React.FC<BenchmarkPanelProps> = ({
  fps,
  frameTime,
  activeEnemies,
  activeProjectiles,
  activeTowers,
  isBenchmarkMode,
}) => {
  return (
    <div className="flex items-center gap-4 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-white pointer-events-auto">
      {isBenchmarkMode && (
        <span className="px-2 py-0.5 bg-purple-900 text-purple-200 rounded font-bold animate-pulse">
          STRESS TEST
        </span>
      )}
      <div>
        FPS: <span className={fps >= 45 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>{fps}</span>
      </div>
      <div>
        Frame: <span className="text-slate-300">{frameTime}ms</span>
      </div>
      <div>
        Towers: <span className="text-blue-400 font-bold">{activeTowers}</span>
      </div>
      <div>
        Enemies: <span className="text-yellow-400 font-bold">{activeEnemies}</span>
      </div>
      <div>
        Projectiles: <span className="text-cyan-400 font-bold">{activeProjectiles}</span>
      </div>
    </div>
  );
};