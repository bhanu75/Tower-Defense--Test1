import React from 'react';
import { GameStats } from '../engine/types';

interface BenchmarkPanelProps {
  stats: GameStats;
}

export default function BenchmarkPanel({ stats }: BenchmarkPanelProps) {
  return (
    
      FPS: {stats.fps}
      Score: {stats.score}
    
  );
}