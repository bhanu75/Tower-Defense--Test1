export class WaveManager {
  private currentWave: number = 0;

  constructor() {}

  public startNextWave(): void {
    this.currentWave++;
  }

  public update(_deltaTime: number): void {}
}