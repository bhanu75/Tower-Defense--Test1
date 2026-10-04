import { Point, Tower, TowerType, GameStats, Enemy } from './types';
import { SpatialGrid } from './SpatialGrid';
import { ObjectPool } from './ObjectPool';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private onStatsUpdate: (stats: GameStats) => void;

  public path: Point[] = [
    { x: 50, y: 0 },
    { x: 50, y: 180 },
    { x: 350, y: 180 },
    { x: 350, y: 450 },
    { x: 750, y: 450 },
    { x: 750, y: 200 },
    { x: 1050, y: 200 },
    { x: 1050, y: 650 },
    { x: 1230, y: 650 },
  ];

  public pool: ObjectPool;
  public spatialGrid: SpatialGrid;
  public towers: Tower[] = [];

  public hp = 100;
  public gold = 350;
  public score = 0;
  public wave = 1;
  public maxWaves = 50;
  public isPaused = false;
  public gameSpeed = 1;
  public isBenchmarkMode = false;
  public useSpatialGrid = true;
  public isGameOver = false;
  public isVictory = false;

  private animationFrameId: number | null = null;
  private lastTime = performance.now();
  private frameCount = 0;
  private fpsTimer = 0;
  private currentFps = 60;
  private currentFrameTime = 16.6;

  private waveTimer = 0;
  private spawnCounter = 0;
  private waveInProgress = false;

  constructor(canvas: HTMLCanvasElement, onStatsUpdate: (stats: GameStats) => void) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.onStatsUpdate = onStatsUpdate;

    this.pool = new ObjectPool(6000, 2000);
    this.spatialGrid = new SpatialGrid(canvas.width, canvas.height, 64);
  }

  public start() {
    this.lastTime = performance.now();
    this.loop();
  }

  public stop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  public togglePause() {
    this.isPaused = !this.isPaused;
  }

  public setSpeed(speed: number) {
    this.gameSpeed = speed;
  }

  public toggleSpatialGrid() {
    this.useSpatialGrid = !this.useSpatialGrid;
  }

  public triggerBenchmarkMode() {
    this.isBenchmarkMode = true;
    this.pool.resetAll();
    this.towers = [];

    // Spawn 100 Towers
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        this.towers.push({
          id: r * 10 + c,
          type: (['archer', 'bomb', 'frost'][ (r + c) % 3 ]) as TowerType,
          x: 100 + c * 100,
          y: 80 + r * 55,
          range: 150,
          damage: 30,
          fireRate: 2,
          cooldown: 0,
          level: 1,
          cost: 100,
          targetEnemy: null,
        });
      }
    }

    // Spawn 5,000 Active Enemies
    for (let i = 0; i < 5000; i++) {
      const type = (['runner', 'tank', 'swarm', 'boss'][i % 4]) as any;
      const enemy = this.pool.spawnEnemy(type, this.path[0].x + (Math.random() * 60 - 30), this.path[0].y - (Math.random() * 500), 1.5);
      if (enemy) {
        enemy.pathIndex = 0;
      }
    }
  }

  public restart() {
    this.hp = 100;
    this.gold = 350;
    this.score = 0;
    this.wave = 1;
    this.isGameOver = false;
    this.isVictory = false;
    this.isBenchmarkMode = false;
    this.towers = [];
    this.pool.resetAll();
    this.waveInProgress = false;
  }

  public placeTower(x: number, y: number, type: TowerType): boolean {
    const cost = type === 'archer' ? 100 : type === 'bomb' ? 150 : 120;
    if (this.gold < cost) return false;

    this.towers.push({
      id: Date.now() + Math.random(),
      type,
      x,
      y,
      range: type === 'archer' ? 140 : type === 'bomb' ? 110 : 120,
      damage: type === 'archer' ? 20 : type === 'bomb' ? 45 : 10,
      fireRate: type === 'archer' ? 2.5 : type === 'bomb' ? 0.8 : 1.5,
      cooldown: 0,
      level: 1,
      cost,
      targetEnemy: null,
    });

    this.gold -= cost;
    return true;
  }

  private loop = () => {
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.currentFrameTime = now - this.lastTime;
    this.lastTime = now;

    // Performance tracking
    this.frameCount++;
    this.fpsTimer += dt;
    if (this.fpsTimer >= 0.5) {
      this.currentFps = Math.round(this.frameCount / this.fpsTimer);
      this.frameCount = 0;
      this.fpsTimer = 0;
    }

    if (!this.isPaused && !this.isGameOver && !this.isVictory) {
      const effectiveDt = dt * this.gameSpeed;
      this.update(effectiveDt);
    }

    this.render();

    this.onStatsUpdate({
      hp: this.hp,
      gold: this.gold,
      score: this.score,
      wave: this.wave,
      fps: this.currentFps,
      frameTime: Number(this.currentFrameTime.toFixed(1)),
      activeEnemies: this.pool.enemies.filter((e) => e.active).length,
      activeProjectiles: this.pool.projectiles.filter((p) => p.active).length,
      activeTowers: this.towers.length,
      isPaused: this.isPaused,
      gameSpeed: this.gameSpeed,
      isBenchmarkMode: this.isBenchmarkMode,
      useSpatialGrid: this.useSpatialGrid,
      isGameOver: this.isGameOver,
      isVictory: this.isVictory,
    });

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    if (!this.isBenchmarkMode) {
      this.handleWaveSpawning(dt);
    }

    // Clear and fill Spatial Grid
    this.spatialGrid.clear();
    for (let i = 0; i < this.pool.enemies.length; i++) {
      const e = this.pool.enemies[i];
      if (e.active) {
        this.updateEnemy(e, dt);
        if (e.active && this.useSpatialGrid) {
          this.spatialGrid.insert(e);
        }
      }
    }

    // Update Towers
    for (let i = 0; i < this.towers.length; i++) {
      this.updateTower(this.towers[i], dt);
    }

    // Update Projectiles
    for (let i = 0; i < this.pool.projectiles.length; i++) {
      const p = this.pool.projectiles[i];
      if (p.active) {
        this.updateProjectile(p, dt);
      }
    }
  }

  private handleWaveSpawning(dt: number) {
    this.waveTimer += dt;
    if (this.waveTimer >= 1.0) {
      this.waveTimer = 0;
      if (this.spawnCounter < 10 + this.wave * 3) {
        const types: any[] = ['runner', 'swarm', 'tank', 'boss'];
        const type = types[Math.floor(Math.random() * Math.min(4, Math.floor(this.wave / 3) + 1))];
        this.pool.spawnEnemy(type, this.path[0].x, this.path[0].y, 1 + this.wave * 0.15);
        this.spawnCounter++;
      } else {
        const activeCount = this.pool.enemies.filter((e) => e.active).length;
        if (activeCount === 0) {
          if (this.wave >= this.maxWaves) {
            this.isVictory = true;
          } else {
            this.wave++;
            this.gold += 100 + this.wave * 10;
            this.spawnCounter = 0;
          }
        }
      }
    }
  }

  private updateEnemy(enemy: Enemy, dt: number) {
    let speed = enemy.speed;
    if (enemy.slowTimer > 0) {
      enemy.slowTimer -= dt;
      speed *= 0.5;
    }

    const targetNode = this.path[enemy.pathIndex + 1];
    if (!targetNode) {
      enemy.active = false;
      this.hp -= 1;
      if (this.hp <= 0) this.isGameOver = true;
      return;
    }

    const dx = targetNode.x - enemy.x;
    const dy = targetNode.y - enemy.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 5) {
      enemy.pathIndex++;
    } else {
      enemy.x += (dx / dist) * speed * dt * 60;
      enemy.y += (dy / dist) * speed * dt * 60;
    }
  }

  private updateTower(tower: Tower, dt: number) {
    tower.cooldown -= dt;

    // Spatial Grid Target Search vs Baseline O(N) Search
    let targets: Enemy[] = [];
    if (this.useSpatialGrid) {
      targets = this.spatialGrid.getNearbyEnemies(tower.x, tower.y, tower.range);
    } else {
      targets = this.pool.enemies.filter((e) => e.active);
    }

    let nearest: Enemy | null = null;
    let minDist = tower.range;

    for (let i = 0; i < targets.length; i++) {
      const e = targets[i];
      if (!e.active) continue;
      const dist = Math.hypot(e.x - tower.x, e.y - tower.y);
      if (dist <= minDist) {
        minDist = dist;
        nearest = e;
      }
    }

    tower.targetEnemy = nearest;

    if (tower.cooldown <= 0 && nearest) {
      tower.cooldown = 1 / tower.fireRate;
      this.pool.spawnProjectile(
        tower.x,
        tower.y,
        nearest.x,
        nearest.y,
        tower.damage,
        tower.type === 'bomb' ? 60 : 0,
        tower.type === 'frost',
        nearest
      );
    }
  }

  private updateProjectile(p: any, dt: number) {
    if (p.targetEnemy && p.targetEnemy.active) {
      p.targetX = p.targetEnemy.x;
      p.targetY = p.targetEnemy.y;
    }

    const dx = p.targetX - p.x;
    const dy = p.targetY - p.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 10) {
      p.active = false;
      this.applyDamage(p);
    } else {
      p.x += (dx / dist) * p.speed * dt * 60;
      p.y += (dy / dist) * p.speed * dt * 60;
    }
  }

  private applyDamage(p: any) {
    if (p.splashRadius > 0) {
      const nearby = this.useSpatialGrid
        ? this.spatialGrid.getNearbyEnemies(p.x, p.y, p.splashRadius)
        : this.pool.enemies.filter((e) => e.active);

      for (let i = 0; i < nearby.length; i++) {
        const e = nearby[i];
        if (e.active && Math.hypot(e.x - p.x, e.y - p.y) <= p.splashRadius) {
          e.hp -= p.damage;
          if (e.hp <= 0) {
            e.active = false;
            this.gold += e.reward;
            this.score += e.reward * 10;
          }
        }
      }
    } else if (p.targetEnemy && p.targetEnemy.active) {
      p.targetEnemy.hp -= p.damage;
      if (p.slowEffect) p.targetEnemy.slowTimer = 2;

      if (p.targetEnemy.hp <= 0) {
        p.targetEnemy.active = false;
        this.gold += p.targetEnemy.reward;
        this.score += p.targetEnemy.reward * 10;
      }
    }
  }

  private render() {
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Path
    this.ctx.strokeStyle = '#334155';
    this.ctx.lineWidth = 32;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(this.path[0].x, this.path[0].y);
    for (let i = 1; i < this.path.length; i++) {
      this.ctx.lineTo(this.path[i].x, this.path[i].y);
    }
    this.ctx.stroke();

    // Render Enemies
    for (let i = 0; i < this.pool.enemies.length; i++) {
      const e = this.pool.enemies[i];
      if (!e.active) continue;

      this.ctx.fillStyle = e.type === 'runner' ? '#ef4444' : e.type === 'tank' ? '#a855f7' : e.type === 'swarm' ? '#eab308' : '#ec4899';
      this.ctx.beginPath();
      this.ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // HP Bar
      this.ctx.fillStyle = '#1e293b';
      this.ctx.fillRect(e.x - 10, e.y - e.radius - 6, 20, 3);
      this.ctx.fillStyle = '#22c55e';
      this.ctx.fillRect(e.x - 10, e.y - e.radius - 6, Math.max(0, (e.hp / e.maxHp) * 20), 3);
    }

    // Render Towers
    for (let i = 0; i < this.towers.length; i++) {
      const t = this.towers[i];
      this.ctx.fillStyle = t.type === 'archer' ? '#3b82f6' : t.type === 'bomb' ? '#f97316' : '#06b6d4';
      this.ctx.beginPath();
      this.ctx.arc(t.x, t.y, 16, 0, Math.PI * 2);
      this.ctx.fill();

      if (t.targetEnemy) {
        this.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(t.x, t.y);
        this.ctx.lineTo(t.targetEnemy.x, t.targetEnemy.y);
        this.ctx.stroke();
      }
    }

    // Render Projectiles
    this.ctx.fillStyle = '#facc15';
    for (let i = 0; i < this.pool.projectiles.length; i++) {
      const p = this.pool.projectiles[i];
      if (!p.active) continue;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}