import { Vector2D, TowerType } from '../types';
import { Enemy } from './Enemy';

export class Tower {
  public id: string = '';
  public position: Vector2D;
  public range: number = 100;
  public type: TowerType;
  public cooldown: number = 0;
  public targetEnemy: Enemy | null = null;

  constructor(position: Vector2D, type: TowerType = 'basic', cooldown: number = 0) {
    this.position = position;
    this.type = type;
    this.cooldown = cooldown;
  }

  public update(): void {}
  public draw(ctx: CanvasRenderingContext2D): void {}
}