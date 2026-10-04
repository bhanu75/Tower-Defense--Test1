import { TowerType, Enemy } from '../types';

export class TowerEntity {
  public id: number;
  public type: TowerType;
  public x: number;
  public y: number;
  public range: number;
  public damage: number;
  public fireRate: number;
  public cooldown: number;
  public level: number;
  public cost: number;
  public targetEnemy: Enemy | null;

  constructor(id: number, type: TowerType, x: number, y: number) {
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.cooldown = 0;
    this.level = 1;
    this.targetEnemy = null;

    switch (type) {
      case 'archer':
        this.range = 140;
        this.damage = 20;
        this.fireRate = 2.5;
        this.cost = 100;
        break;
      case 'bomb':
        this.range = 110;
        this.damage = 45;
        this.fireRate = 0.8;
        this.cost = 150;
        break;
      case 'frost':
        this.range = 120;
        this.damage = 10;
        this.fireRate = 1.5;
        this.cost = 120;
        break;
    }
  }

  public update(dt: number): boolean {
    if (this.cooldown > 0) {
      this.cooldown -= dt;
    }
    return this.cooldown <= 0 && this.targetEnemy !== null;
  }

  public resetCooldown() {
    this.cooldown = 1 / this.fireRate;
  }
}