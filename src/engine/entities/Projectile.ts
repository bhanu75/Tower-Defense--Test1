import { Enemy } from '../types';

export class ProjectileEntity {
  public id: number;
  public active: boolean = false;
  public x: number = 0;
  public y: number = 0;
  public targetX: number = 0;
  public targetY: number = 0;
  public speed: number = 12;
  public damage: number = 25;
  public splashRadius: number = 0;
  public slowEffect: boolean = false;
  public targetEnemy: Enemy | null = null;

  constructor(id: number) {
    this.id = id;
  }

  public init(
    x: number,
    y: number,
    targetX: number,
    targetY: number,
    damage: number,
    splashRadius: number,
    slowEffect: boolean,
    targetEnemy: Enemy | null = null
  ) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.splashRadius = splashRadius;
    this.slowEffect = slowEffect;
    this.speed = 12;
    this.targetEnemy = targetEnemy;
  }

  public reset() {
    this.active = false;
    this.targetEnemy = null;
  }
}