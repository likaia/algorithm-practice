// 链表需要的辅助类

// 生成一个对象
export class ValuePair<K, V> {
  constructor(public key: K, public value: V) {}

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
