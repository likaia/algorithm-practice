export default class IntegerPower {
  /**
   * 数值的整数次方
   * @param base 底数
   * @param exponent 指数
   */
  public power(base: number, exponent: number): number | string {
    // 求出指数对绝对值
    const absExponent = Math.abs(exponent);
    // 程序会出错
    if (base === 0 && exponent < 0) {
      return "参数错误: 0的负次方不能进行计算";
    }

    // 当底数和指数都为0时，在数学上是没意义的
    if (base === 0 && exponent === 0) {
      return 0;
    }

    let result = this.powerWithExponent(base, absExponent);

    // 指数小于0, 对计算出的结果求倒数
    if (exponent < 0) {
      result = 1 / result;
    }
    return result;
  }

  /**
   * 求底数的指数次方
   * @param base 底数
   * @param exponent 指数
   */
  private powerWithExponent(base: number, exponent: number): number {
    // 递归终止条件
    if (exponent === 0) {
      // 非0数的0次方值为1
      return 1;
    }
    if (exponent === 1) {
      // 任意数的0次方为其本身
      return base;
    }

    // 递归对指数/2，计算结果
    // 用右移运算符代替除以2运算
    let result =
      this.powerWithExponent(base, exponent >> 1) *
      this.powerWithExponent(base, exponent >> 1);

    // 指数为奇数时，result就为result乘以底数
    if (exponent % 2 === 1) {
      result *= base;
    }
    return result;
  }
}
