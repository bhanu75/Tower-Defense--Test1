export class WaveManager {
  private currentWave: number = 0;

  constructor() {}

  public startNextWave(): void {
    this.currentWave++;
  }

  public update(deltaTime: number): void {}
}