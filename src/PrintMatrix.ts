/**
 * 顺时针打印矩阵
 * @param matrix
 * @param cols
 * @param rows
 * @constructor
 */
export function PrintMatrix<T>(
  matrix: Array<Array<T>>,
  cols: number,
  rows: number
): void {
  if (matrix == null || cols == null || rows == null) return;
  // 圈数
  let start = 0;
  while (cols > start * 2 && rows > start * 2) {
    // 打印每一圈的数据
    PrintMatrixInCircle(matrix, cols, rows, start);
    start++;
  }
}

/**
 * 打印矩阵的一圈
 * 分为4步:
 *  1. 从左到右
 *    (1).这一步一定存在
 *  2. 从上到下
 *    (1).矩阵圈的行数必须超过1行, 即: 终止行号 > 起始行号
 *  3. 从右到左
 *    (1).矩阵圈至少有两行两列, 即: 终止行号 > 起始行号 && 终止列号 > 起始列号
 *  4. 从下到上
 *    (1).矩阵圈至少有三行两列, 即: 终止列号 > 起始列号 && 终止行号 - 1 > 起始行号
 * @param matrix
 * @param cols
 * @param rows
 * @param start
 * @constructor
 */
function PrintMatrixInCircle<T>(
  matrix: Array<Array<T>>,
  cols: number,
  rows: number,
  start: number
): void {
  // 计算当前圈结束点坐标(索引从0开始，所以需要-1)
  // 终止列号
  const endX = cols - 1 - start;
  // 终止行号
  const endY = rows - 1 - start;
  // 从左到右打印一行
  for (let i = start; i <= endX; i++) {
    console.log(matrix[start][i]);
  }

  // 从上到下打印一列
  if (start < endY) {
    // 此时：
    //  最后一列已经在从左到右的打印中读取了
    for (let i = start + 1; i <= endY; i++) {
      console.log(matrix[i][endX]);
    }
  }

  // 从右到左打印一行
  if (start < endX && start < endY) {
    // 此时：
    //  最后一列已经在从上到下的打印中读取了
    for (let i = endX - 1; i >= start; i--) {
      console.log(matrix[endY][i]);
    }
  }

  // 从下到上打印一列
  if (start < endX && start < endY - 1) {
    // 此时:
    //  最后一列已经在从上到下的打印中读取了
    //  第一列的打印已经在从左到右的打印中读取了
    for (let i = endY - 1; i >= start + 1; i--) {
      console.log(matrix[i][start]);
    }
  }
}
