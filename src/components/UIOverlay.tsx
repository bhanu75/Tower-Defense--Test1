import React from 'react';
import { GameStats } from '../engine/types';

interface UIOverlayProps {
  stats: GameStats;
}

export default function UIOverlay({ stats }: UIOverlayProps) {
  return (
    
      Lives: {stats.lives}
      Gold: {stats.gold}
      Wave: {stats.wave}
      Status: {stats.isPaused ? 'Paused' : 'Playing'}
      Speed: {stats.gameSpeed ?? 1}x
      Spatial Grid: {stats.useSpatialGrid ? 'ON' : 'OFF'}
    
  );
}