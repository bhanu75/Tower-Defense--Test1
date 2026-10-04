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
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw background grid/color
        ctx.fillStyle = '#1e1e2f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    const engine = new GameEngine();
    if (engineRef) {
      engineRef.current = engine;
    }
    engine.start();

    if (selectedTowerType) {
      // optional action
    }
    onStatsUpdate((prev) => prev);

    return () => {
      engine.stop();
    };
  }, [engineRef, onStatsUpdate, selectedTowerType]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '2px solid #333', borderRadius: '8px', background: '#1e1e2f' }}
    />
  );
}
