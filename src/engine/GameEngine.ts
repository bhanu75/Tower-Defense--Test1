import { SpatialGrid } from './SpatialGrid';
import { ObjectPool } from './ObjectPool';
import { WaveManager } from './WaveManager';
import { Tower } from './entities/Tower';
import { Enemy } from './entities/Enemy';
import { Projectile } from './entities/Projectile';
import { GameStats, TowerType } from './types';

export class GameEngine {
  private isRunning: boolean = false;
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private towerPool: ObjectPool<Tower>;
  private enemyPool: ObjectPool<Enemy>;
  private projectilePool: ObjectPool<Projectile>;
  public spatialGrid: SpatialGrid;
  public waveManager: WaveManager;

  public stats: GameStats = {
    score: 0,
    lives: 100,
    gold: 500,
    wave: 0,
    fps: 60,
    isPaused: false,
    gameSpeed: 1,
    useSpatialGrid: true,
  };

  constructor() {
    this.spatialGrid = new SpatialGrid();
    this.waveManager = new WaveManager();
    this.towerPool = new ObjectPool<Tower>(() => new Tower({ x: 0, y: 0 }));
    this.enemyPool = new ObjectPool<Enemy>(() => new Enemy());
    this.projectilePool = new ObjectPool<Projectile>(() => new Projectile());
  }

  public init(ctx: CanvasRenderingContext2D): void {
    this.canvasCtx = ctx;
  }

  public start(): void {
    this.isRunning = true;
    this.loop();
  }

  public stop(): void {
    this.isRunning = false;
  }

  public triggerNextWave(): void {
    this.waveManager.startNextWave();
    this.stats.wave = this.waveManager.currentWave;
  }

  private loop(): void {
    if (!this.isRunning) return;
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  private update(): void {
    this.waveManager.update();
  }

  private render(): void {
    if (!this.canvasCtx) return;

    // Clear Screen
    this.canvasCtx.fillStyle = '#1e1e2f';
    this.canvasCtx.fillRect(0, 0, 800, 600);

    // Draw Track Line
    this.canvasCtx.strokeStyle = '#334155';
    this.canvasCtx.lineWidth = 20;
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(0, 300);
    this.canvasCtx.lineTo(800, 300);
    this.canvasCtx.stroke();

    // Draw Enemies
    this.waveManager.activeEnemies.forEach((enemy) => {
      enemy.draw(this.canvasCtx!);
    });
  }
}
