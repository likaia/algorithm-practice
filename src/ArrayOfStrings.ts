export class ArrayOfStrings {
  private result: Array<string> = [];

  /**
   * 使用回溯实现对字符的排列
   * @param current 当前字符
   * @param remaining 剩余的字符
   * @private
   */
  private backtrack(current: string, remaining: string) {
    // 基线条件：剩余字符为空时则代表已经完成本轮排列
    if (remaining.length === 0) {
      this.result.push(current);
      return;
    }
    // 用Set结合来标记当前字符是否已经组合过
    const usedChars = new Set<string>();
    for (let i = 0; i < remaining.length; i++) {
      // 字符已经出现过则跳过本轮循环
      if (usedChars.has(remaining[i])) {
        continue;
      }
      usedChars.add(remaining[i]);
      const nextCurrent = current + remaining[i];
      // 除当前字符外的字符拼到一起
      const nextRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
      this.backtrack(nextCurrent, nextRemaining);
    }
  }

  /**
   * 获取字符串中所有字符的排列
   * @param str
   */
  public permute(str: string): Array<string> {
    this.result = [];
    this.backtrack("", str);
    return this.result;
  }
}
