import { SpatialGrid } from './SpatialGrid';
import { ObjectPool } from './ObjectPool';
import { WaveManager } from './WaveManager';
import { Tower } from './entities/Tower';
import { Enemy } from './entities/Enemy';
import { Projectile } from './entities/Projectile';
import { GameStats, TowerType } from './types';

export class GameEngine {
  private isRunning: boolean = false;
  private towerPool: ObjectPool;
  private enemyPool: ObjectPool;
  private projectilePool: ObjectPool;
  private spatialGrid: SpatialGrid;
  private waveManager: WaveManager;

  public stats: GameStats = {
    score: 0,
    lives: 100,
    gold: 500,
    wave: 1,
    fps: 60,
    isPaused: false,
    gameSpeed: 1,
    useSpatialGrid: true,
  };

  constructor() {
    this.spatialGrid = new SpatialGrid();
    this.waveManager = new WaveManager();
    this.towerPool = new ObjectPool(() => new Tower({ x: 0, y: 0 }));
    this.enemyPool = new ObjectPool(() => new Enemy());
    this.projectilePool = new ObjectPool(() => new Projectile());
  }

  public start(): void {
    this.isRunning = true;
    this.loop();
  }

  public stop(): void {
    this.isRunning = false;
  }

  public resetAll(): void {
    this.towerPool.resetAll();
    this.enemyPool.resetAll();
    this.projectilePool.resetAll();
  }

  public addTower(position: { x: number; y: number }, type: TowerType): void {
    const tower = new Tower(position, type, 0);
    tower.cooldown = 0;
    tower.targetEnemy = null;
  }

  public createProjectile(
    pos: { x: number; y: number },
    targetPos: { x: number; y: number },
    speed: number,
    damage: number,
    type: string,
    splashRadius: number,
    targetId: string
  ): void {
    const proj = this.projectilePool.obtain();
    proj.position = pos;
    proj.targetPosition = targetPos;
    proj.speed = speed;
    proj.damage = damage;
  }

  public updateTower(tower: Tower): void {
    if (tower.cooldown > 0) {
      tower.cooldown--;
    }
    if (tower.targetEnemy) {
      tower.targetEnemy.hp -= 10;
    }
  }

  private loop(): void {
    if (!this.isRunning) return;
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  private update(): void {}
  private render(): void {}
}