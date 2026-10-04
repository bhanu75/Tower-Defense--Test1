import React, { useEffect, useRef, MutableRefObject } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { TowerType, GameStats } from '../engine/types';

export interface GameCanvasProps {
  onStatsUpdate: React.Dispatch<React.SetStateAction<GameStats>>;
  selectedTowerType: TowerType | null;
  engineRef?: MutableRefObject<GameEngine | null>;
}

export default function GameCanvas({
  onStatsUpdate,
  selectedTowerType,
  engineRef,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  return <canvas ref={canvasRef} width={800} height={600} />;
}
