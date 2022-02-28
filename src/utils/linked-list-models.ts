/* 链表需要的模块类 */

// 助手类: 用于表示链表中的第一个以及其他元素
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
