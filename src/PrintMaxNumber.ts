export default class PrintMaxNumber {
  // 通过遍历获取最大值
  public traverseForMax(n: number): void {
    let maxNumber = 1;
    let i = 0;
    while (i++ < n) {
      // 每次对结果*10，得出最小的n+1位的值
      maxNumber *= 10;
    }
    // 输出1到最大值-1位置的值，就是n位数的最大值
    for (let i = 1; i < maxNumber; i++) {
      console.log(i);
    }
  }

  // 通过字符串解法获取最大值
  public maxNumberToStr(n: number): void {
    if (n <= 0) return;
    const numberStr: string[] = [];
    for (let i = 0; i < 10; i++) {
      numberStr[0] = i + "0";
      this.printToMaxRecursively(numberStr, n, 0);
    }
  }

  // 递归获取最大值
  private printToMaxRecursively(
    numStr: string[],
    length: number,
    index: number
  ): void {
    if (index === length - 1) {
      // 打印
      this.printNumber(numStr);
      return;
    }
    for (let i = 0; i < 10; i++) {
      numStr[index + 1] = i + "0";
      this.printToMaxRecursively(numStr, length, index + 1);
    }
  }

  private printNumber(numStr: string[]): void {
    const nLength = numStr.length;
    let remove0Val = "";

    // 筛选除去多余0后的值
    // 假设此时的值是3位数，那么对应的数组就为["00","00","10"], 数组每一项值的第0位才是我们需要的值
    for (let i = 0; i < nLength; i++) {
      const strVal = numStr[i];
      // 取数组每一项的第0位
      remove0Val += strVal[0];
    }

    let finalVal = "";
    // 是否从0开始
    let isBeginning0 = true;
    // 筛选出第一个非0值的字符索引
    for (let i = 0; i < remove0Val.length; i++) {
      // 从0开始的状态为true且当前字符不为0
      if (isBeginning0 && remove0Val[i] !== "0") {
        // 表示我们已找到第一个非0数，修改状态
        isBeginning0 = false;
      }

      // 当前位的数非0，将其存起来
      if (!isBeginning0) {
        finalVal += remove0Val[i];
      }
    }
    if (finalVal !== "") {
      console.log(finalVal);
    }
  }
}
