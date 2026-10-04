export interface Point {
  x: number;
  y: number;
}

export type EnemyType = 'runner' | 'tank' | 'swarm' | 'boss';
export type TowerType = 'archer' | 'bomb' | 'frost';

export interface Enemy {
  id: number;
  active: boolean;
  type: EnemyType;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  speed: number;
  reward: number;
  pathIndex: number;
  slowTimer: number;
  radius: number;
}

export interface Tower {
  id: number;
  type: TowerType;
  x: number;
  y: number;
  range: number;
  damage: number;
  fireRate: number; // shots per sec
  lastFired: number;
  level: number;
  cost: number;
  targetId: number | null;
}

export interface Projectile {
  id: number;
  active: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  damage: number;
  splashRadius: number;
  slowEffect: boolean;
  targetEnemyId: number | null;
}

export interface GameStats {
  hp: number;
  gold: number;
  score: number;
  wave: number;
  fps: number;
  frameTime: number;
  activeEnemies: number;
  activeProjectiles: number;
  activeTowers: number;
}