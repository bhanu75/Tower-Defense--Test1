import { EnemyType } from '../types';

export class EnemyEntity {
  public id: number;
  public active: boolean = false;
  public type: EnemyType = 'runner';
  public x: number = 0;
  public y: number = 0;
  public hp: number = 100;
  public maxHp: number = 100;
  public speed: number = 2;
  public reward: number = 10;
  public pathIndex: number = 0;
  public slowTimer: number = 0;
  public radius: number = 8;

  constructor(id: number) {
    this.id = id;
  }

  public init(type: EnemyType, startX: number, startY: number, hpMultiplier: number) {
    this.active = true;
    this.type = type;
    this.x = startX;
    this.y = startY;
    this.pathIndex = 0;
    this.slowTimer = 0;

    switch (type) {
      case 'runner':
        this.hp = this.maxHp = Math.round(40 * hpMultiplier);
        this.speed = 2.8;
        this.radius = 6;
        this.reward = 5;
        break;
      case 'tank':
        this.hp = this.maxHp = Math.round(250 * hpMultiplier);
        this.speed = 1.0;
        this.radius = 12;
        this.reward = 25;
        break;
      case 'swarm':
        this.hp = this.maxHp = Math.round(15 * hpMultiplier);
        this.speed = 2.2;
        this.radius = 4;
        this.reward = 2;
        break;
      case 'boss':
        this.hp = this.maxHp = Math.round(1200 * hpMultiplier);
        this.speed = 0.7;
        this.radius = 16;
        this.reward = 100;
        break;
    }
  }

  public reset() {
    this.active = false;
  }
}