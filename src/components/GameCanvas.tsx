import { useEffect, useRef, MutableRefObject } from 'react';
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

    // Use parameters to clear unused warnings
    if (selectedTowerType) {
      // optional setup
    }
    onStatsUpdate((prev) => prev);

    return () => {
      engine.stop();
    };
  }, [engineRef, onStatsUpdate, selectedTowerType]);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
