export class ObjectPool {
  private pool: T[] = [];
  private factory: () => T;

  constructor(factory: () => T, initialSize: number = 50) {
    this.factory = factory;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory());
    }
  }

  public obtain(): T {
    return this.pool.pop() || this.factory();
  }

  public release(item: T): void {
    this.pool.push(item);
  }

  public resetAll(): void {
    this.pool = [];
  }
}