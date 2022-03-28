export class RegExprMatch {
  /**
   * 匹配.与*的正则表达式
   *  1. .代表可以匹配任意字符
   *  2. *代表它前面的字符可以出现任意次数
   * @param str
   * @param pattern
   */
  public match(str: string, pattern: string): boolean {
    if (pattern.length === 0) {
      return str.length === 0;
    }
    // 相同位置的字符相等或者当前位置的字符为.代表匹配成功
    const matchResult =
      str.length > 0 &&
      (str.charAt(0) === pattern.charAt(0) || pattern.charAt(0) === ".");
    // 有*
    if (pattern.length > 1 && pattern.charAt(1) === "*") {
      // *前面的字符可以出现任意次数，故：从*后面开始寻找递归寻找
      return (
        this.match(str, pattern.substring(2)) ||
        (matchResult && this.match(str.substring(1), pattern))
      );
    } else {
      // 无*
      return matchResult && this.match(str.substring(1), pattern.substring(1));
    }
  }
}
