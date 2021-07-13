export default class Backtracking {
  // 目标路径在矩阵中的索引
  private readonly pathIndex: Array<string>;

  constructor() {
    this.pathIndex = [];
  }
  /**
   * 寻找矩阵中的路径
   *  判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。
   *    1. 路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。
   *    2. 如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。
   * 实现思路：
   *   1. 寻找一个切入点，从第一个字符开始寻找其在矩阵中的位置
   *   2. 进入矩阵后，每一步都会有4个移动方向：下、上、右、左
   *   3. 每移动一个方向，都会判断移动后位置的值是否与当前要查找的字符是否相等
   *      如果相等，则标识当前位置的元素为已访问状态，沿着四个移动方向继续寻找下一个字符
   *      如果不相等，则回到上一步的位置点，尝试其他的三个方向是否有匹配的元素
   *   4. 重复步骤3，直至所有匹配字符的四个方向都被移动
   *      字符串中的全部字符都被找到后，则取出每一步的正确索引位置将其保存起来
   *      四个方向都被移动后，仍未找到与字符所匹配的元素，则证明该字符串不存在于矩阵中
   * 例如:
   *   a b t g
   *   c f c s
   *   j d e h
   * 在上述矩阵中寻找一条包含字符串"b f c e"的路径
   *  我们从矩阵的`[0][0]`位置作为入口开始寻找，要查找的第1个字符为`b`：
   *    1. 0,0 位置的元素是`a`，与目标值不匹配，继续寻找0,1位置
   *    2. 0,1 位置的元素是是`b`，与目标值匹配，继续查找第2个字符`f`
   *       更新寻找方向，向下查找
   *    3. 1,1 位置的元素是`f`，与目标值匹配，继续查找第3个字符`c`
   *       更新寻找方向，向下查找
   *    4. 2,1 位置的元素是`d`，与目标值不匹配，回到上一步1,1位置
   *       更新寻找方向，向上查找，
   *       0,0位置的值已经寻找过了，回到上一步1,1位置
   *       更新寻找方向，向右查找
   *    5. 1,2 位置的元素是`c`，与目标值匹配，继续查找第4个字符`e`
   *       更新寻找方向，向下查找
   *    6. 2,2 位置的元素是`e`，与目标值匹配，所有字符寻找完毕，该路径存在与矩阵中
   *  保存每一步已找到元素在矩阵中的索引
   *  最终路径为：[0][1]、[1][1]、[1][2]、[2][2]
   * @param matrix 路径矩阵
   * @param target 目标路径
   */
  public findMatrixPath(
    matrix: Array<Array<string>>,
    target: string
  ): Array<string> {
    if (target === "") {
      this.pathIndex.push("参数错误: 目标路径为空");
      return this.pathIndex;
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (this.findPath(matrix, target, i, j, 0)) {
          return this.pathIndex;
        }
      }
    }
    // 未找到
    this.pathIndex.push("目标路径不存在于矩阵中");
    return this.pathIndex;
  }

  /**
   * 寻找路径
   * @param matrix 路径矩阵
   * @param target 目标字符串
   * @param row 要查找的行
   * @param col 要查找的列
   * @param index 要查找的的字符索引
   * @private
   */
  private findPath(
    matrix: Array<Array<string>>,
    target: string,
    row: number,
    col: number,
    index: number
  ): boolean {
    // 边界条件判断
    //  1. 行、列值越界直接返回false
    //  2. matrix[row][col]位置的元素与当前要查找的字符不等，证明这个路径走不通
    if (
      row >= matrix.length ||
      row < 0 ||
      col >= matrix[0].length ||
      col < 0 ||
      matrix[row][col] != target[index]
    ) {
      return false;
    }
    // 所有字符都已查找完成
    if (index === target.length - 1) {
      // 保存最后一个字符在矩阵中的坐标
      this.pathIndex.unshift(`[${row}][${col}]`);
      return true;
    }
    // 保存当前坐标值
    const tmp = matrix[row][col];
    // 修改当前坐标的值，标识当前坐标点已经被寻找
    matrix[row][col] = ".";
    // 开始递归: 沿着当前坐标的上下左右4个方向查找
    const res: boolean =
      this.findPath(matrix, target, row + 1, col, index + 1) ||
      this.findPath(matrix, target, row - 1, col, index + 1) ||
      this.findPath(matrix, target, row, col + 1, index + 1) ||
      this.findPath(matrix, target, row, col - 1, index + 1);
    // 本轮递归完成，找到了当前要查找字符在矩阵中的位置
    if (res) {
      // 保存当前要查找字符的坐标点
      this.pathIndex.unshift(`[${row}][${col}]`);
    }
    // 递归完成，复原当前坐标
    matrix[row][col] = tmp;
    return res;
  }
}
