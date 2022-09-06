import Stack from "./lib/Stack.ts";

export class StackContainingMinFunction extends Stack {
  private minStack: Stack;
  private dataStack: Stack;

  constructor() {
    super();
    this.minStack = new Stack();
    this.dataStack = new Stack();
  }

  public push(item: number): void {
    this.dataStack.push(item);
    if (this.minStack.size() > 0) {
      const minVal = this.minStack.peek();
      // 比较当前入栈元素与minStack中的最小元素，将小的一方入minStack
      item > minVal ? this.minStack.push(minVal) : this.minStack.push(item);
      return;
    }
    this.minStack.push(item);
  }

  public pop(): void {
    this.minStack.pop();
    this.dataStack.pop();
  }

  public min(): number | null {
    if (this.minStack.size() > 0) return this.minStack.peek();
    return null;
  }
}
