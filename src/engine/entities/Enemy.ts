import { Vector2D, EnemyType } from '../types';

export class Enemy {
  public id: string = Math.random().toString();
  public position: Vector2D = { x: 0, y: 0 };
  public hp: number = 100;
  public maxHp: number = 100;
  public speed: number = 2;
  public type: EnemyType = 'fast';
  public active: boolean = true;

  constructor(position?: Vector2D, type: EnemyType = 'fast') {
    if (position) this.position = { ...position };
    this.type = type;
  }

  public update(): void {
    // Basic movement to right side
    this.position.x += this.speed;
    if (this.position.x > 800 || this.hp <= 0) {
      this.active = false;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    // Draw Enemy
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Health Bar
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(this.position.x - 12, this.position.y - 20, (this.hp / this.maxHp) * 24, 4);
  }
}
