import { Vector2D, EnemyType } from '../types';

export class Enemy {
  public id: string = '';
  public position: Vector2D = { x: 0, y: 0 };
  public hp: number = 100;
  public maxHp: number = 100;
  public speed: number = 2;
  public type: EnemyType = 'fast';
  public active: boolean = false;

  constructor(position?: Vector2D, type: EnemyType = 'fast') {
    if (position) this.position = { ...position };
    this.type = type;
  }

  public reset(): void {
    this.active = false;
    this.hp = 100;
    this.position = { x: 0, y: 0 };
  }

  public update(): void {}
  public draw(ctx: CanvasRenderingContext2D): void {}
}