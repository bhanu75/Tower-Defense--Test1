import React from 'react';
import { GameStats } from '../engine/types';

interface BenchmarkPanelProps {
  stats: GameStats;
}

export default function BenchmarkPanel({ stats }: BenchmarkPanelProps) {
  return (
    <div className="benchmark-panel">
      <p>FPS: {stats.fps}</p>
      <p>Score: {stats.score}</p>
    </div>
  );
}
