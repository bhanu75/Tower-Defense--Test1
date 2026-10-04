import React from 'react';
import { GameStats } from '../engine/types';

interface UIOverlayProps {
  stats: GameStats;
}

export default function UIOverlay({ stats }: UIOverlayProps) {
  return (
    <div className="ui-overlay">
      <div>Lives: {stats.lives}</div>
      <div>Gold: {stats.gold}</div>
      <div>Wave: {stats.wave}</div>
      <div>Status: {stats.isPaused ? 'Paused' : 'Playing'}</div>
      <div>Speed: {stats.gameSpeed ?? 1}x</div>
      <div>Spatial Grid: {stats.useSpatialGrid ? 'ON' : 'OFF'}</div>
    </div>
  );
}
