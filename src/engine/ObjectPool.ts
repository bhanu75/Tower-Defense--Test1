import { Enemy, Projectile } from './types';

export class ObjectPool {
  enemies: Enemy[];
  projectiles: Projectile[];

  constructor(maxEnemies = 6000, maxProjectiles = 2000) {
    this.enemies = Array.from({ length: maxEnemies }, (_, i) => ({
      id: i,
      active: false,
      type: 'runner',
      x: 0,
      y: 0,
      hp: 100,
      maxHp: 100,
      speed: 2,
      reward: 10,
      pathIndex: 0,
      slowTimer: 0,
      radius: 8,
    }));

    this.projectiles = Array.from({ length: maxProjectiles }, (_, i) => ({
      id: i,
      active: false,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      speed: 8,
      damage: 25,
      splashRadius: 0,
      slowEffect: false,
      targetEnemyId: null,
    }));
  }

  spawnEnemy(type: Enemy['type'], startX: number, startY: number, hpMultiplier: number): Enemy | null {
    const enemy = this.enemies.find((e) => !e.active);
    if (!enemy) return null;

    enemy.active = true;
    enemy.type = type;
    enemy.x = startX;
    enemy.y = startY;
    enemy.pathIndex = 0;
    enemy.slowTimer = 0;

    switch (type) {
      case 'runner':
        enemy.hp = enemy.maxHp = 50 * hpMultiplier;
        enemy.speed = 3.2;
        enemy.radius = 6;
        enemy.reward = 5;
        break;
      case 'tank':
        enemy.hp = enemy.maxHp = 300 * hpMultiplier;
        enemy.speed = 1.0;
        enemy.radius = 12;
        enemy.reward = 25;
        break;
      case 'swarm':
        enemy.hp = enemy.maxHp = 20 * hpMultiplier;
        enemy.speed = 2.5;
        enemy.radius = 4;
        enemy.reward = 2;
        break;
      case 'boss':
        enemy.hp = enemy.maxHp = 1500 * hpMultiplier;
        enemy.speed = 0.8;
        enemy.radius = 16;
        enemy.reward = 100;
        break;
    }
    return enemy;
  }

  spawnProjectile(x: number, y: number, targetX: number, targetY: number, damage: number, splash: number, slow: boolean) {
    const p = this.projectiles.find((pr) => !pr.active);
    if (!p) return;

    p.active = true;
    p.x = x;
    p.y = y;
    p.targetX = targetX;
    p.targetY = targetY;
    p.damage = damage;
    p.splashRadius = splash;
    p.slowEffect = slow;
    p.speed = 10;
  }
}