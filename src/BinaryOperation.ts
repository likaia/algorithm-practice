/**
 * 位运算的五种方式：
 * 1. 与运算
 * 2. 或运算
 * 3. 异或
 * 4. 左移
 * 5. 右移
 */
export default class BinaryOperation {
  /**
   * 获取二进制中1的个数
   * @param decimalVal 十进制数
   */
  public getBinaryOneNum(decimalVal: number): number {
    let count = 0;
    // 十进制数不为0，代表其二进制表示中仍存在1
    while (decimalVal !== 0) {
      // 二进制中所存在的1的总数+1
      count++;
      // 对十进制数与其-1后的数进行位与运算
      // 得出结果后替换原十进制数，进行下一轮计算，直至十进制数为0
      decimalVal = decimalVal & (decimalVal - 1);
    }
    // 返回结果
    return count;
  }
}
