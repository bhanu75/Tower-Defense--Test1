import { Enemy } from './entities/Enemy';

export class WaveManager {
  public currentWave: number = 0;
  private spawnInterval: number = 1000;
  private lastSpawnTime: number = 0;
  private enemiesToSpawn: number = 0;
  public activeEnemies: Enemy[] = [];

  public startNextWave(): void {
    this.currentWave++;
    this.enemiesToSpawn = this.currentWave * 5;
    this.lastSpawnTime = Date.now();
  }

  public update(): void {
    const now = Date.now();
    if (this.enemiesToSpawn > 0 && now - this.lastSpawnTime > this.spawnInterval) {
      const enemy = new Enemy({ x: 0, y: 300 }, 'fast');
      enemy.active = true;
      this.activeEnemies.push(enemy);
      this.enemiesToSpawn--;
      this.lastSpawnTime = now;
    }

    // Move active enemies
    this.activeEnemies.forEach((enemy) => {
      if (enemy.active) {
        enemy.update();
      }
    });

    // Clean up dead or reached enemies
    this.activeEnemies = this.activeEnemies.filter((e) => e.active);
  }
}
