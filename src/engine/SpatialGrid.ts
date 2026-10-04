export class SpatialGrid {
  public cellSize: number;

  constructor(cellSize: number = 64) {
    this.cellSize = cellSize;
  }

  public clear(): void {}
  public insert(_entity: unknown): void {}
  public getNearby(_entity: unknown): unknown[] {
    return [];
  }
}
