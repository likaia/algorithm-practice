export class NumericalCheck {
  // 指针索引
  private index = 0;

  // 扫描无符号整数
  private scanUnsignedInteger(str: string): boolean {
    const before = this.index;
    while (str.charAt(this.index) >= "0" && str.charAt(this.index) <= "9") {
      this.index++;
    }
    return this.index > before;
  }

  // 扫描有符号整数
  private scanInteger(str: string): boolean {
    // 判断其是否包含正负号
    if (str.charAt(this.index) == "+" || str.charAt(this.index) == "-") {
      this.index++;
    }

    // 扫描无符号整数
    return this.scanUnsignedInteger(str);
  }

  /**
   * 判断字符串是否为数值类型
   * @param numStr
   */
  public isNumber(numStr: string): boolean {
    if (numStr == null || numStr.length == 0) {
      return false;
    }
    // 添加结束标志
    numStr = numStr + "|";
    // 跳过首部的空格
    while (numStr.charAt(this.index) == " ") {
      this.index++;
    }

    // 扫描整数部分
    let numeric = this.scanInteger(numStr);

    // 有小数点，处理小数部分
    if (numStr.charAt(this.index) == ".") {
      this.index++;
      // 小数两边只要有一边有数字即可，所以用||
      numeric = this.scanUnsignedInteger(numStr) || numeric;
    }

    // 有e||E，处理指数部分
    if (numStr.charAt(this.index) == "E" || numStr.charAt(this.index) == "e") {
      this.index++;
      // e || E两边都要有数字，所以用&&
      numeric = numeric && this.scanInteger(numStr);
    }

    // 跳过尾部空格
    while (numStr.charAt(this.index) == " ") {
      this.index++;
    }
    const checkResult = numeric && numStr.charAt(this.index) == "|";
    // 重置指针索引
    this.index = 0;
    return checkResult;
  }
}
