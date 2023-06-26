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
   * 寻找所有组合，使用深度优先搜索算法来遍历字符串的所有子串，生成所有组合。
   * @param path 当前正在生成的组合
   * @param start 搜索的起始位置
   * @param str 字符串
   * @private
   */
  private combiningCharacters(path: string, start: number, str: string) {
    if (path.length > 0) {
      this.result.push(path);
    }

    for (let i = start; i < str.length; i++) {
      if (i > start && str[i] === str[i - 1]) {
        // 当前字符与上一个字符相同，进行剪枝操作（跳过）
        continue;
      }
      // 将之前的字符与当前字符进行组合，递归组合下一个字符（起始位置+1）
      this.combiningCharacters(path + str[i], i + 1, str);
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

  /**
   * 获取字符串中所有字符的组合
   * @param str
   */
  public combine(str: string): Array<string> {
    this.result = [];
    // 需要对字符进行排序，将重复
    this.combiningCharacters("", 0, str.split("").sort().join(""));
    return this.result;
  }

  /**
   * 能否构成正方体
   * @param nums
   */
  public isCubePossible(nums: Array<number>): boolean {
    if (nums.length !== 8) {
      return false;
    }
    // 获取8个点的所有排列
    const list = this.permute(nums.join(""));
    for (let i = 0; i < list.length; i++) {
      // 将当前组合中的点转为number类型放入item
      const item: Array<number> = [];
      for (let j = 0; j < list[i].length; j++) {
        item.push(+list[i][j]);
      }
      // 从当前组合中获取正方体的8个点
      const [a1, a2, a3, a4, a5, a6, a7, a8] = item;
      // 判断正方体三组相对面上的点相加是否相等
      if (
        a1 + a2 + a4 + a3 === a5 + a6 + a8 + a7 &&
        a1 + a5 + a6 + a2 === a3 + a4 + a8 + a7 &&
        a1 + a3 + a7 + a5 === a2 + a4 + a8 + a6
      ) {
        return true;
      }
    }
    return false;
  }

  public eightQueens(): Array<Array<Array<number>>> {
    const queens = [0, 1, 2, 3, 4, 5, 6, 7];
    const solutions: Array<Array<Array<number>>> = [];
    // 获取所有组合
    const list = this.permute(queens.join(""));
    for (let i = 0; i < list.length; i++) {
      // 求出的组合中元素值为string类型的，这里需要将其转为number类型
      const item: Array<number> = [];
      for (let j = 0; j < list[i].length; j++) {
        item.push(+list[i][j]);
      }
      // 不在对角线上
      if (this.isValidPlacement(item)) {
        const solution: Array<Array<number>> = [];
        // 遍历此组合，取出皇后的摆放位置
        for (let j = 0; j < item.length; j++) {
          const col = item[j];
          const row: Array<number> = Array(8).fill(0);
          row[col] = 1;
          solution.push(row);
        }
        solutions.push(solution);
      }
    }
    return solutions;
  }

  /**
   * 判断当前组合是否满足排列要求（不在对角线上）
   * @param queens
   * @private
   */
  private isValidPlacement(queens: Array<number>) {
    for (let i = 0; i < queens.length; i++) {
      for (let j = i + 1; j < queens.length; j++) {
        if (Math.abs(queens[i] - queens[j]) === Math.abs(i - j)) {
          // 在对角线上
          return false;
        }
      }
    }
    return true;
  }
}
