import { Sort } from "./lib/Sort.ts";
import { HashMap } from "./lib/HashMap.ts";

/**
 * 寻找数组中的重复数字
 *
 * 规则：
 *  1. 给定一个长度为n的数组，数组中每个元素的取值范围为：0~n-1
 *  2. 数组中某些数字是重复的，但是不知道有哪些数字重复了，也不知道每个数字重复了几次
 *  3. 求数组中任意一个重复的数字
 */
export class ArrayRepeatedNumber {
  private sort: Sort<number>;
  private readonly isTrue: boolean;
  constructor(private array: number[]) {
    this.isTrue = true;
    // 判断参数是否满足规则
    if (array == null || array.length <= 0) {
      this.isTrue = false;
      console.log("数组不能为空");
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] < 0 || array[i] > array.length - 1) {
        this.isTrue = false;
        console.log("数组中元素的取值范围为0～n-1");
      }
    }
    this.sort = new Sort(array);
  }

  /**
   * 使用排序的方法解决
   *
   * 实现思路:
   *  1. 对数组进行排序
   *  2. 从头到尾遍历排序好的数组，只要有相邻的两个数字相等就返回
   *
   *  时间复杂度分析：调用快速排序其时间复杂度为O(nlog(n))，数组排序完成后只需遍历数组找到相邻的就退出，因此总的时间复杂度为O(nlog(n))
   *  空间复杂度分析：由于没有声明新的空间，因此空间复杂度为O(1)
   */
  getRepeatedToSort(): number | void {
    if (this.isTrue) {
      // 排序数组
      const sortArray = this.sort.quickSort();
      // 重复的数字
      let val = -1;
      for (let i = 0; i < sortArray.length; i++) {
        // 排序完成后，相邻的两个数字相等就代表数组中有重复数字，将其返回
        if (sortArray[i] == sortArray[i + 1]) {
          val = sortArray[i];
          break;
        }
      }
      return val;
    }
  }

  /**
   * 使用哈希表解决
   *
   * 实现思路:
   *  1. 声明一个空的哈希表
   *  2. 从头到尾遍历数组，如果当前遍历到的元素不存在与哈希表中，就把它加入哈希表，否则就返回这个元素
   *
   *  时间复杂度分析：遍历数组，判断哈希表中是否包含当前遍历到的元素时，都可以用O(1)的时间复杂度完成，所有元素遍历完就需要n个O(1)，因此总的时间复杂度为O(n)
   *  空间复杂度分析：由于需要一个额外的哈希表来存储数据，情况最坏时数组的所有元素都会放进哈希表中，因此总的空间复杂度为：O(n)
   */
  getRepeatedToHashMap(): number | void {
    if (this.isTrue) {
      const hashMap = new HashMap();
      let val = -1;
      for (let i = 0; i < this.array.length; i++) {
        // 如果哈希表中存在当前元素就将其返回
        if (hashMap.get(this.array[i]) != null) {
          val = this.array[i];
          break;
        }
        // 不存在，将其加入哈希表
        hashMap.put(this.array[i], 0);
      }
      return val;
    }
  }

  /**
   * 动态排序法（最优解法）
   *
   * 根据题意可知，数组中元素的取值范围在0~n-1，那么就可以得到如下结论：
   *  1. 如果数组中没有重复元素，那么第i号元素的值一定是当前下标(i)
   *  2. 如果数组中有重复元素，那么有些位置可能存在多个数字，有些位置可能没有数字
   *
   * 根据上述结论，我们可以得出下述实现思路:
   *  1. 从头到尾遍历数组，存储第i号位置的元素，用m表示
   *  2. 如果m的值等于当前下标(i)，则继续遍历。
   *     否则就判断m的值是否等于数组下标为m处的值。
   *       如果等于代表重复将其返回。
   *       如果不等于，就交换数组i号位置的元素和m号位置的元素，更新m的值。
   *       继续判断m的值是否等于数组下标为m处的元素
   *
   * 举例说明:
   * [8, 1, 2, 3, 4, 3, 3, 4, 5]
   * 当下标为0时，m = 8。
   *  8 != 0
   *   数组8号位置的元素为5，8 != 5。
   *   则交换位置，更新m的值。交换位置后的数组为：[5, 1, 2, 3, 4, 3, 3, 4, 8]
   *  5 != 0
   *   数组5号位置的元素为3，3 != 5。
   *   则交换位置，更新m的值。交换位置后的数组为：[3, 1, 2, 3, 4, 5, 3, 4, 8]
   *  3 == 3
   *   元素重复，返回m
   * 问题解决，重复数字为3。
   *
   * 时间复杂度分析：每个数字最多只要交换2次就能找到它的位置，因此总的时间复杂度为O(n)
   * 空间复杂度分析：所有操作都在原数组进行，没有用到额外的空间，所以空间复杂度为O(1)
   */
  getRepeated(): number | void {
    if (this.isTrue) {
      for (let i = 0; i < this.array.length; i++) {
        // 存储数组i号位置的元素
        let m = this.array[i];
        // 判断m的值是否与当前下标一样，一样则继续下一轮循环
        while (m !== i) {
          // 判断m的值是否等于数组m号位置的元素
          if (m === this.array[m]) {
            // 如果相等，代表重复，返回这个元素
            return m;
          }
          // 交换数组的i号位置的元素和m号位置的元素
          [this.array[i], this.array[m]] = [this.array[m], this.array[i]];
          // 交换完毕，更新m的值
          m = this.array[i];
        }
      }
      // 未找到
      return -1;
    }
  }

  /**
   * 消除数组中的重复元素
   *
   * 规则：
   *  1. 数组中元素类型为数字、字符串时，直接取出
   *  2. 数组中元素类型为数组时，递归遍历查找数据类型为数字、字符串的元素
   *  3. 丢弃其他类型的元素
   * @param array 需要进行筛选的数组
   * @param result 筛选出来的结果数组
   */
  delRepeatedElement<T>(
    array: T[] | T[][],
    result: Set<T> = new Set<T>()
  ): T[] {
    // 从头到尾遍历数组，根据规则筛选我们需要的数据
    for (let i = 0; i < array.length; i++) {
      // 数组中元素类型为数字或者字符串时就将其放进结果数组中
      if (typeof array[i] === "number" || typeof array[i] === "string") {
        result.add(<T>array[i]);
      }
      // 数组中元素类型为数组时，将其取出，然后递归
      if (array[i] instanceof Array) {
        // 以当前取出的数组元素为参数递归取出我们需要的数据
        this.delRepeatedElement(<T[]>array[i], result);
      }
    }
    // 将筛选出来的set集合解构为数组返回给调用者
    return <T[]>[...result];
  }

  /**
   * 不修改数组找到重复的数字
   *
   * 规则:
   *  1. 数组的长度为n+1
   *  2. 数组内元素范围：1~n
   *  3. 在不修改数组的前提下，找到数组内任意一个重复的数字
   */

  // 解法1：使用辅助数组解决
  // 实现思路：
  // 1. 创建一个数组长度为待处理数组长度+1的辅助数组
  // 2. 遍历数组，以原数组i号位置的元素为下标，判断其辅助数组中的值是否为空
  // 空间复杂度分析：需要多创建一个辅助数组，因此空间复杂度为O(n)
  findRepeatedWithArray(): number {
    // 创建一个数组长度为待处理数组长度+1的辅助数组
    const result = new Array<number>(this.array.length + 1);
    // 数组中的重复元素
    let repeated = -1;
    // 将待处理数组的每个元素按规则填充进辅助数组
    for (let i = 0; i < this.array.length; i++) {
      // 获取原数组i号位置的元素
      const m = this.array[i];
      // 如果辅助数组的m号位置的元素不为空就填充m进去
      if (result[m] == null) {
        result[m] = m;
      } else {
        // 重复元素被找到
        repeated = this.array[i];
        break;
      }
    }
    // 返回找到的重复数字
    return repeated;
  }

  // 解法2：用二分查找实现
  /**
   * 由于数组的长度是n+1,且其元素的取值范围又在1~n，那么数组中一定会有一个重复的元素
   * 根据上述结论，我们可得出如下结论：
   *  1. 把1~n的数字，从中间m处分开。
   *  2. 分开后，前面一半为1~m，后面一半为m+1~n
   *  3. 如果1～m的数字的数目超过m，那么这一半的区间里一定包含了重复的数字，否则另一个区间里一定包含了重复的数字
   *  4. 继续把重复的区间一分为二，直到找到一个重复的数字
   *
   *  举例说明：
   *  [1, 5, 2, 3, 4, 5, 7]
   *  声明3个辅助变量：length = 7, start = 0, end = length - 1 = 6
   *  第1轮次分割，如果end >= start就执行下述过程：
   *    1. middle = (start + end) / 2 // 6 / 2 = 3
   *    2. count = 3
   *    3. end !== start // 6 !==0
   *    4. count > (middle - start + 1) // 3 - 0 + 1 = 3 false
   *    5. start = middle + 1 // 4
   *  第2次分割，start = 4, end = 6
   *      1. middle = 5
   *      2. count = 3
   *      3. end !== start // 6 !== 4
   *      4. count > (middle - start + 1) / 2 // 5 - 4 + 1 = 2 true
   *      5. end = middle // 5
   *  第3次分割，start = 4, end = 5
   *      1. middle = 4
   *      2. count = 1
   *      3. end !== start // 5 !== 4
   *      4. count > (middle - start + 1) / 2 // 4 - 4 + 1 = 1 false
   *      5. start = middle + 1 // 5
   *  第4次分割，start = 5, end = 5
   *      1. middle = 5
   *      2. count = 2
   *      3. end == start, count = 2 // return start
   *
   *  时间复杂度分析：假设输入长度为n的数组，那么计算出现次数的函数需要被调用O(logn)次，每次需要O(n)的空间，因此总的时间复杂度为O(nlogn)
   *  空间复杂度分析：没有声明额外的辅助变量，因此空间复杂度为O(1)
   *
   *  这种解法由于二分查找的缘故，他只能找到数组中的某一个重复数字，不能找到所有的重复数字。
   *  相比解法1而言，它的空间复杂度降低了，但是时间复杂度却提高了。
   */
  findRepeated(): number {
    const length = this.array.length;
    let start = 0;
    let end = length - 1;
    while (end >= start) {
      // 计算中间值
      const middle = Math.floor((start + end) / 2);
      // 计算start~middle的出现次数
      const count = ArrayRepeatedNumber.countRange(
        this.array,
        length,
        start,
        middle
      );
      if (end === start) {
        // 基数的值大于1，代表找到了重复的值，将其返回
        if (count > 1) {
          // 重复值找到，将其返回
          return start;
        } else {
          // 跳出本次循环
          break;
        }
      }

      if (count > middle - start + 1) {
        // 重复的元素在中间值的左侧
        end = middle;
      } else {
        // 重复的元素在中间值的右侧
        start = middle + 1;
      }
    }
    return -1;
  }

  /**
   * 计算出现次数
   * @param numbers 要计算的数组
   * @param length 要计算数组的长度
   * @param start 开始位置
   * @param end 结束位置
   * @private
   */
  private static countRange(
    numbers: number[],
    length: number,
    start: number,
    end: number
  ) {
    if (numbers == null) {
      return 0;
    }

    let count = 0;
    for (let i = 0; i < length; i++) {
      // 数组的元素必须在start～end的区间内
      if (numbers[i] >= start && numbers[i] <= end) {
        count++;
      }
    }
    return count;
  }

  /**
   * 二维数组中的查找
   *
   * 规则：
   *  1. 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
   *  2. 输入一个整数，判断其是否在二维素组中
   *
   * 例子：
   *     [
   *       [1, 2, 8, 9],
   *       [2, 4, 9, 12],
   *       [4, 7, 10, 13]
   *       [6, 8, 11, 15]
   *     ]
   *    7在二维数组的中的索引：[2][1]
   *
   *  实现思路：
   *  1. 从数组的右上角开始选数字，比较选中的数字与要查找的数字的大小。
   *  2. 如果选中的数字等于要查找的数字，表示值已找到，返回true
   *  3. 如果选中的数字大于要查找的数字，表示要查找的数字在选中的数字的左方，将当前列从查找范围内移除
   *  4. 如果选中的数字小于要查找的数字，表示要查找的数字在选中的数字的下方，将当前行从查找范围内移除
   *
   *  举例说明：
   *  1. 上述例子中，查找范围的右上角数字为9
   *  2. 9 > 7，将其所在列从查找范围内移除，剩余的查找范围：
   *     [
   *       [1, 2, 8],
   *       [2, 4, 9],
   *       [4, 7, 10],
   *       [6, 8, 11]
   *     ]
   *     [
   *       [1, 2, 4, 6],
   *       [2, 4, 7, 8],
   *       [8, 9, 10, 11]
   *     ]
   *    剩余查找范围中，其右上角的数字为8
   *    8 > 7，将其所在列从查找范围内移除，剩余的查找范围：
   *     [
   *       [1, 2],
   *       [2, 4],
   *       [4, 7],
   *       [6, 8]
   *      ]
   *    剩余查找范围中，其右上角的数字为2
   *    2 < 7，将其所在行从查找范围内移除，剩余的查找范围：
   *     [
   *       [2, 4],
   *       [4, 7],
   *       [6, 8]
   *     ]
   *    剩余的查找范围中，其右上角的数字为4
   *    4 < 7，将其所在行从查找范围内移除，剩余的查找范围：
   *     [
   *       [4, 7],
   *       [6, 8]
   *     ]
   *    剩余的查找范围中，其右上角的数字为7
   *    7 = 7，返回true。
   *
   */
  findNumberWithTDM(array: number[][], findValue: number): number | boolean {
    // 判断参数是否满足规则
    if (!Array.isArray(array[0])) {
      return -1;
    }

    // 列二维数组，用于接收当前二维数组行与列互换后的结果
    const colValArray: number[][] = [];
    // 获取二维数组的列数据
    for (let i = 0; i < array[0].length; i++) {
      // 获取当前遍历到的列，将其放进新的二维数组中
      colValArray.push(this.getColVal(array, i));
    }

    // 判断传入的数组和列数据二维数组是否满足题目要求
    if (
      !ArrayRepeatedNumber.isFindTDMArray(array) ||
      !ArrayRepeatedNumber.isFindTDMArray(colValArray)
    ) {
      // 不满足
      return -1;
    }
    // 寻找右上角的值并判断。
    // row为行默认为二维数组的第0行，
    // col为列默认为二维数组第0行的最后一列
    let row = 0;
    let col = array[0].length - 1;

    // 辅助变量，告知调用者要找的值是否找到
    let found = false;

    // 如果当前查找范围有效就执行下述代码
    while (row < array.length && col >= 0) {
      // 如果右上角的值等于要找的值，代表元素被找到，将其返回，终止循环
      if (array[row][col] === findValue) {
        found = true;
        break;
      } else if (array[row][col] > findValue) {
        // 如果右上角的值大于要找的值，代表要找的值在当前值的左侧，将列自减1
        col--;
      } else {
        // 否则，代表要找的值在当前值的右侧，将行自增1
        row++;
      }
    }

    // 未找到
    return found;
  }

  /**
   * 判断参数是否满足二维数组查找的条件
   * @param array 需要进行判断的数组
   */
  private static isFindTDMArray(array: number[][]): boolean {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length - 1; j++) {
        if (array[i][j + 1] < array[i][j]) {
          // 传入的数组不满足条件：每一行必须按照从左到右递增的顺序排序
          return false;
        }
      }
    }
    // 满足
    return true;
  }

  /**
   * 获取二维数组的指定列数据
   * @param array 被获取的数组
   * @param index 要获取的列
   */
  getColVal(array: number[][], index: number): number[] {
    const colVal: number[] = [];
    for (let i = 0; i < array.length; i++) {
      colVal.push(array[i][index]);
    }
    return colVal;
  }

  /**
   * 字符串或数组相邻元素去重
   * @param str 需要执行操作的字符串或数组
   *
   * @return 执行去重后操作后数组
   */
  uniqueInOrder(str: string | number[]): string[] | number[] {
    // 结果数组，存放去重后的字符串
    const strResult: string[] = [];
    const numResult: number[] = [];

    // 比对相邻元素，如果不相等就将其放进结果数组中
    for (let i = 0; i < str.length; i++) {
      // 参数为number类型数组
      if (typeof str[i] === "number" && str[i] !== str[i + 1]) {
        numResult.push(<number>str[i]);
      }
      // 参数为字符串数组
      if (typeof str[i] === "string" && str[i] !== str[i + 1]) {
        strResult.push(<string>str[i]);
      }
    }

    // 根据参数类型返回对应的结果数组
    if (typeof str === "string") {
      return strResult;
    }
    return numResult;
  }
}
