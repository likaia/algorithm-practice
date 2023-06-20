// 栈与队列的相关操作
import Stack from "./lib/Stack";
import Queue from "./lib/Queue";

export default class StacksAndQueues {
  private firstStacks: Stack;
  private secondStacks: Stack;
  private firstQueues: Queue;
  private secondQueues: Queue;

  constructor() {
    this.firstStacks = new Stack();
    this.secondStacks = new Stack();
    this.firstQueues = new Queue();
    this.secondQueues = new Queue();
  }

  // 用两个栈实现队列
  // 入队
  enqueue(key: string | number): void {
    // 入栈1
    this.firstStacks.push(key);
  }
  // 出队
  dequeue() {
    if (this.secondStacks.isEmpty()) {
      while (!this.firstStacks.isEmpty()) {
        this.secondStacks.push(this.firstStacks.pop());
      }
    }

    if (!this.secondStacks.isEmpty()) {
      // 出栈2
      return this.secondStacks.pop();
    }
    return null;
  }

  // 用两个队列实现栈
  // 入栈
  stackPush(key: string | number) {
    // 入队1
    this.firstQueues.enqueue(key);
  }
  // 出栈
  stackPop() {
    if (this.firstQueues.isEmpty()) {
      return null;
    }
    // 队列2为空
    if (this.secondQueues.isEmpty()) {
      while (this.firstQueues.size() != 1) {
        // 将队列1除队尾外的元素放进队列2
        this.secondQueues.enqueue(this.firstQueues.dequeue());
      }
    }

    // 队列2不为空
    while (!this.secondQueues.isEmpty()) {
      // 将队列2的元素放进队列1
      this.firstQueues.enqueue(this.secondQueues.dequeue());
    }
    // 队列1出队
    return this.firstQueues.dequeue();
  }
}
