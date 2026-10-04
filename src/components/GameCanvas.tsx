import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../engine/GameEngine';

interface GameCanvasProps {
  onStatsUpdate: (stats: any) => void;
  selectedTowerType: string | null;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onStatsUpdate, selectedTowerType }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const engine = new GameEngine(canvas, onStatsUpdate);
    engineRef.current = engine;

    engine.start();

    return () => {
      engine.stop();
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !engineRef.current || !selectedTowerType) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    engineRef.current.placeTower(x, y, selectedTowerType as any);
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-slate-900">
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        onClick={handleCanvasClick}
        className="border-2 border-slate-700 rounded-lg shadow-2xl cursor-pointer"
      />
    </div>
  );
};