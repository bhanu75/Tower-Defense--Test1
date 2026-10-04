import { Vector2D } from '../types';

export class Projectile {
  public position: Vector2D;
  public targetPosition: Vector2D;
  public speed: number = 5;
  public damage: number = 10;
  public active: boolean = false;

  constructor(
    position: Vector2D = { x: 0, y: 0 },
    targetPosition: Vector2D = { x: 0, y: 0 },
    speed: number = 5,
    damage: number = 10,
    type: string = 'basic',
    splashRadius: number = 0,
    targetEnemyId: string = ''
  ) {
    this.position = position;
    this.targetPosition = targetPosition;
    this.speed = speed;
    this.damage = damage;
  }

  public reset(): void {
    this.active = false;
  }

  public update(): void {}
  public draw(ctx: CanvasRenderingContext2D): void {}
}