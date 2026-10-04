export interface Vector2D {
  x: number;
  y: number;
}

export type TowerType = 'basic' | 'sniper' | 'splash';
export type EnemyType = 'fast' | 'tank' | 'boss';

export interface GameStats {
  score: number;
  lives: number;
  gold: number;
  wave: number;
  fps: number;
  isPaused?: boolean;
  gameSpeed?: number;
  useSpatialGrid?: boolean;
}

export interface Entity {
  id: string;
  position: Vector2D;
  active: boolean;
}