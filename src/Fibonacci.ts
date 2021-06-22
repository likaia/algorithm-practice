// 斐波那契数列的多种解法
export default class Fibonacci {
  private readonly index: number;
  constructor(index: number) {
    this.index = index;
  }
  /**
   * 自下往上实现
   * 实现思路：
   *   1. 根据f(0)和f(1)算出f(2)
   *   2. 再根据f(1)和F(2)算出f(3)
   *   3. 以此类推算出第n项
   * 时间复杂度分析：它从第0项遍历到最后一项，因此时间复杂度为O(n)
   */
  public bottomUp(): number {
    const result: Array<number> = [0, 1];
    if (this.index < 2) {
      return result[this.index];
    }

    // f(n - 1)
    let fibNMinusOne = 1;
    // f(n - 2)
    let fibNMinusTwo = 0;
    let fibN = 0;
    for (let i = 2; i <= this.index; ++i) {
      // f(n) = f(n - 1) + f(n - 2)
      fibN = fibNMinusOne + fibNMinusTwo;

      // f(n - 2) = f(n - 1)
      fibNMinusTwo = fibNMinusOne;
      // f(n - 1) = f(n)
      fibNMinusOne = fibN;
    }
    return fibN;
  }

  /**
   * 递归实现
   */
  public recursion(fibN = this.index): number {
    if (fibN === 0) {
      return 0;
    } else if (fibN === 1) {
      return 1;
    }

    return this.recursion(fibN - 1) + this.recursion(fibN - 2);
  }
}
