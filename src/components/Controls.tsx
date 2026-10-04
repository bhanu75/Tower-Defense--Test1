import React from 'react';
import { Play, Pause, FastForward, RotateCcw, Cpu } from 'lucide-react';

interface ControlsProps {
  isPaused: boolean;
  gameSpeed: number;
  useSpatialGrid: boolean;
  onTogglePause: () => void;
  onSetSpeed: (speed: number) => void;
  onRestart: () => void;
  onTriggerBenchmark: () => void;
  onToggleSpatialGrid: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPaused,
  gameSpeed,
  useSpatialGrid,
  onTogglePause,
  onSetSpeed,
  onRestart,
  onTriggerBenchmark,
  onToggleSpatialGrid,
}) => {
  return (
    <div className="flex gap-2 bg-slate-900/90 backdrop-blur border border-slate-800 p-2 rounded-xl pointer-events-auto">
      <button
        onClick={onTogglePause}
        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
        title="Pause/Play"
      >
        {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
      </button>

      <button
        onClick={() => onSetSpeed(gameSpeed === 1 ? 2 : gameSpeed === 2 ? 4 : 1)}
        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1 font-bold text-xs text-white"
        title="Game Speed"
      >
        <FastForward className="w-4 h-4" /> {gameSpeed}x
      </button>

      <button
        onClick={onRestart}
        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
        title="Restart Game"
      >
        <RotateCcw className="w-5 h-5" />
      </button>

      <button
        onClick={onTriggerBenchmark}
        className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold flex items-center gap-1 text-white"
      >
        <Cpu className="w-4 h-4" /> 5k Stress Test
      </button>

      <button
        onClick={onToggleSpatialGrid}
        className={`px-3 py-2 rounded-lg text-xs font-bold text-white transition ${
          useSpatialGrid ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
        }`}
      >
        Spatial Grid: {useSpatialGrid ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};