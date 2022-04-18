// 调整数组元素顺序
export class AdjustArrayOrder {
  // 指向数组元素的两个指针：一个指向数组头部、一个指向数组尾部
  private begin = 0;
  private end = 0;

  // 调整数组中奇数与偶数元素的位置：奇数位于偶数前面
  reorderOddEven(arr: Array<number>): void {
    this.end = arr.length - 1;
    while (this.begin < this.end) {
      // 向后移动begin(转成二进制跟1做与运算，运算结果为0就表示为偶数)，直至其指向偶数
      while (this.begin < this.end && (arr[this.begin] & 0x1) !== 0) {
        this.begin++;
      }

      // 向前移动end（转成二进制跟1做与运算，运算结果为1就表示为奇数），直至其指向奇数
      while (this.begin < this.end && (arr[this.end] & 0x1) === 0) {
        this.end--;
      }

      // begin指向了偶数，end指向了奇数
      if (this.begin < this.end) {
        // 交换两个元素的顺序
        [arr[this.begin], arr[this.end]] = [arr[this.end], arr[this.begin]];
      }
    }
    // 重置指针位置
    this.begin = 0;
    this.end = 0;
  }

  // 元素排序
  reorder(arr: Array<number>, checkFun: (checkVal: number) => boolean): void {
    this.end = arr.length - 1;
    while (this.begin < this.end) {
      // 向后移动begin
      while (this.begin < this.end && !checkFun(arr[this.begin])) {
        this.begin++;
      }

      // 向前移动end
      while (this.begin < this.end && checkFun(arr[this.end])) {
        this.end--;
      }

      // begin与end都指向了正确的位置
      if (this.begin < this.end) {
        // 交换两个元素的顺序
        [arr[this.begin], arr[this.end]] = [arr[this.end], arr[this.begin]];
      }
    }
    // 重置指针位置
    this.begin = 0;
    this.end = 0;
  }
}
