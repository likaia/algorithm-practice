import { ValuePair } from "../utils/dictionary-list-models.ts";
import { defaultToString } from "../utils/Util.ts";
import Map from "./Map.ts";

export class HashMap<K, V> implements Map<K, V> {
  protected table: { [key: number]: ValuePair<K, V> };
  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = {};
  }

  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  // 生成哈希码
  hashCode(key: K): number {
    return this.djb2HashCode(key);
  }

  // loselose实现哈希函数
  loseloseHashCode(key: K): number {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      // 获取每个字符的ASCII码将其拼接至hash中
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  // djb2实现哈希函数
  djb2HashCode(key: K): number {
    if (typeof key === "number") {
      return key;
    }

    // 将参数转为字符串
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  clear(): void {
    this.table = {};
  }

  forEach(callbackFn: (key: K, value: V) => any): void {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  get(key: K): V | undefined {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  hasKey(key: K): boolean {
    return this.table[this.hashCode(key)] != null;
  }

  isEmpty(): boolean {
    return this.values().length === 0;
  }

  keyValues(): ValuePair<K, V>[] {
    const valuePairs = [];
    // 获取对象中的所有key并将其转为int类型数组
    const keys = Object.keys(this.table).map((item) => parseInt(item));
    for (let i = 0; i < keys.length; i++) {
      valuePairs.push(this.table[keys[i]]);
    }
    return valuePairs;
  }

  keys(): K[] {
    const keys = [];
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      keys.push(valuePairs[i].key);
    }
    return keys;
  }

  remove(key: K): boolean {
    if (this.hasKey(key)) {
      delete this.table[this.hashCode(key)];
      return true;
    }
    return false;
  }

  size(): number {
    return this.keyValues().length;
  }

  values(): V[] {
    const values = [];
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      values.push(valuePairs[i].value);
    }
    return values;
  }

  toString(): string {
    if (this.isEmpty()) {
      return ``;
    }

    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
