/* 链表需要的模块类 */

// 助手类: 用于表示链表中的第一个以及其他元素
import { complexListNodeType } from "../type/LinkedListModule.ts";

export class Node<T> {
  element: any;
  next: any;
  // next为可选参数，如果不传则为undefined
  constructor(element: T, next?: any) {
    this.element = element;
    this.next = next;
  }
}

// 链表节点
export type ListNode = { element: number; next: ListNode | null };

// 助手类：用于表示双向链表中的结点元素
export class DoublyNode<T> extends Node<T> {
  prev: any;

  constructor(element: any, next?: any, prev?: any) {
    // 调用Node类的构造函数
    super(element, next);
    // 新增prev属性，指向链表元素的上一个元素
    this.prev = prev;
  }
}

export function printListNode(pHead: ListNode | null): void {
  if (pHead == null) return;
  console.log(pHead.element);
  let pNode = pHead.next;
  while (pNode != null) {
    console.log(pNode.element);
    pNode = pNode.next;
  }
}

// 向链表节点插入sibling指针，将其指向特定节点
export function insertSiblingNode(
  listNode: complexListNodeType,
  modifyValue: number,
  targetValue: number | null
): boolean {
  let current: complexListNodeType | undefined = listNode;
  let target: complexListNodeType | undefined = listNode;
  let modifyIndexFindStatus = false;
  let targetIndexFindStatus = false;

  // 寻找待修改节点
  while (current) {
    if (current.value === modifyValue) {
      modifyIndexFindStatus = true;
      break;
    }
    current = current.next;
  }
  // 寻找目标节点
  while (target) {
    if (target.value === targetValue) {
      targetIndexFindStatus = true;
      break;
    }
    target = target.next;
  }

  // 待修改节点或者目标节点未搜索到
  if (!modifyIndexFindStatus || !targetIndexFindStatus || !current || !target)
    return false;

  // 目标索引为null
  if (targetValue == null) {
    current.sibling = null;
    return true;
  }

  // 将sibling指向目标节点
  current.sibling = target;
  return true;
}
