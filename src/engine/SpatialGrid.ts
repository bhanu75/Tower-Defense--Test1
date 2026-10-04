export class SpatialGrid {
  private cellSize: number;

  constructor(cellSize: number = 64) {
    this.cellSize = cellSize;
  }

  public clear(): void {}
  public insert(entity: any): void {}
  public getNearby(entity: any): any[] {
    return [];
  }
}