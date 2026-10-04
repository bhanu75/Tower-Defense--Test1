import { Enemy } from './types';

export class SpatialGrid {
  private cellSize: number;
  private cols: number;
  private rows: number;
  private grid: Map<number, Enemy[]>;

  constructor(width: number, height: number, cellSize: number = 64) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.grid = new Map();
  }

  clear() {
    this.grid.clear();
  }

  private getCellKey(col: number, row: number): number {
    return row * this.cols + col;
  }

  insert(enemy: Enemy) {
    if (!enemy.active) return;
    const col = Math.floor(enemy.x / this.cellSize);
    const row = Math.floor(enemy.y / this.cellSize);
    const key = this.getCellKey(col, row);

    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(enemy);
  }

  getNearbyEnemies(x: number, y: number, radius: number): Enemy[] {
    const nearby: Enemy[] = [];
    const minCol = Math.max(0, Math.floor((x - radius) / this.cellSize));
    const maxCol = Math.min(this.cols - 1, Math.floor((x + radius) / this.cellSize));
    const minRow = Math.max(0, Math.floor((y - radius) / this.cellSize));
    const maxRow = Math.min(this.rows - 1, Math.floor((y + radius) / this.cellSize));

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const key = this.getCellKey(c, r);
        const cellEnemies = this.grid.get(key);
        if (cellEnemies) {
          for (let i = 0; i < cellEnemies.length; i++) {
            nearby.push(cellEnemies[i]);
          }
        }
      }
    }
    return nearby;
  }
}