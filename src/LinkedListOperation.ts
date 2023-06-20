import LinkedList from "./lib/LinkedList";
import Stack from "./lib/Stack";

export class LinkedListOperation<T> {
  private linkedList: LinkedList<T>;
  private stack: Stack;
  constructor(linkedList: LinkedList<T>) {
    this.linkedList = linkedList;
    this.stack = new Stack();
  }

  // 从尾到头打印链表
  reverseOrderPrint(): void {
    // 循环取出链表中的元素
    while (this.linkedList.getHead() != null) {
      // 将当前链表头部元素入栈
      this.stack.push(this.linkedList.getElementAt(0)?.element);
      // 移除链表头部元素
      this.linkedList.removeAt(0);
    }
    // 打印栈中的元素
    while (!this.stack.isEmpty()) {
      console.log(this.stack.pop());
    }
  }
}
