import { ValuePair } from "../utils/dictionary-list-models.ts";

export default interface Map<K, V> {
  hasKey(key: K): boolean;
  set?(key: K, value: V): boolean;
  put?(key: K, value: V): boolean;
  hashCode?(key: K): number;
  remove(key: K): boolean;
  get(key: K): V | undefined;
  keyValues(): ValuePair<K, V>[];
  keys(): K[];
  values(): V[];
  forEach(callbackFn: (key: K, value: V) => any): void;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  toString(): string;
}
