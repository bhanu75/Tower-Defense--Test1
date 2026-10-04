import React, { useEffect, useRef, MutableRefObject } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { TowerType, GameStats } from '../engine/types';

export interface GameCanvasProps {
  onStatsUpdate: React.Dispatch>;
  selectedTowerType: TowerType | null;
  engineRef?: MutableRefObject;
}

export default function GameCanvas({
  onStatsUpdate,
  selectedTowerType,
  engineRef,
}: GameCanvasProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const engine = new GameEngine();
    if (engineRef) {
      engineRef.current = engine;
    }
    engine.start();

    return () => {
      engine.stop();
    };
  }, [engineRef]);

  return ;
}