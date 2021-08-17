import { sumOfDigits } from "./utils/Util.ts";

export default class Backtracking<T> {
  // 目标路径在矩阵中的索引
  private readonly pathIndex: Array<string>;
  // 机器人的行走路线
  public path: string;

  constructor() {
    this.pathIndex = [];
    this.path = "";
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
   * 题目：
   * 地上有一个m行n列的方格。
   * 一个机器人从坐标（0，0）的格子开始移动，
   * 它每次可以向左、右、上、下移动一格，但不能进入行坐标和列坐标的数位之和大于k的格子。
   * 例如，当k为18时，机器人能够进入方格 （35，37），因为3+5+3+7=18。
   * 但它不能进入方格（35，38），因为3+5+3+8=19. 请问该机器人能够到达多少个格子？
   * @param matrix 矩阵
   * @param threshold 临界点(最大活动范围)
   */
  public movingCount(matrix: Array<Array<T>>, threshold = 0): number {
    if (threshold < 0 || matrix.length <= 0) {
      return 0;
    }
    // 获取方格的总行数与总列数
    const rows = matrix.length;
    const cols = matrix[0].length;
    // 创建标记数组，用于标识格子是否被访问
    const isVisited: Array<Array<boolean>> = new Array(rows);
    for (let i = 0; i < isVisited.length; i++) {
      isVisited[i] = new Array(cols);
    }
    // 从0,0位置开始移动，计算总的移动格子数量
    return this.startMoving(rows, cols, 0, 0, threshold, isVisited, matrix);
  }

  /**
   * 开始移动机器人
   * @param rows 矩阵总行数
   * @param cols 矩阵总列数
   * @param row 待进入格子的行坐标
   * @param col 待进入格子的列坐标
   * @param threshold 最大活动范围
   * @param isVisited 访问标识矩阵
   * @param matrix 路径矩阵
   * @private
   */
  private startMoving(
    rows: number,
    cols: number,
    row: number,
    col: number,
    threshold: number,
    isVisited: Array<Array<boolean>>,
    matrix: Array<Array<T>>
  ): number {
    // 边界条件判断
    if (
      row >= rows ||
      row < 0 ||
      col >= cols ||
      col < 0 ||
      isVisited[row][col] ||
      !this.checkPath(row, col, threshold)
    ) {
      return 0;
    }
    // 记录当前访问的格子内容
    this.path += `${matrix[row][col]} -> `;
    // 标识当前格子已被访问
    isVisited[row][col] = true;
    // 格子访问数量+1
    return (
      1 +
      this.startMoving(rows, cols, row + 1, col, threshold, isVisited, matrix) +
      this.startMoving(rows, cols, row, col + 1, threshold, isVisited, matrix) +
      this.startMoving(rows, cols, row - 1, col, threshold, isVisited, matrix) +
      this.startMoving(rows, cols, row, col - 1, threshold, isVisited, matrix)
    );
  }

  /**
   * 判断机器人能否进入目标格子
   * @param row 行坐标
   * @param col 列坐标
   * @param target 临界点
   * @private
   */
  private checkPath(row: number, col: number, target: number): boolean {
    // 两坐标的数位之和必须小于等于临界点
    return sumOfDigits(row) + sumOfDigits(col) <= target;
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
