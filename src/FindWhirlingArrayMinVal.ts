// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
// 输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
// 例如，数组[3，4，5，1，2]为[1，2，3，4，5]的一个旋转，该数组的最小值为1。

export default class FindWhirlingArrayMinVal {
  private leftPointer;
  private rightPointer;
  private middleIndex;
  /**
   * 寻找旋转数组中的最小值
   * 通过观察后，我们可以发现：
   *   1. 旋转后的数组可以划分为两个已经排序的小数组
   *   2. 前面子数组的元素都大于等于后面子数组的元素
   *   3. 最小的数字是这两个子数组的分界线
   *
   * 实现思路：
   * 本题给出的数组在一定程度上是排好序的，因此可以使用二分查找法的思路来寻找这个最小的元素
   *   1. 准备两个指针分别指向旋转数组的开头和结尾
   *   2. 按照旋转规则，第一个元素应该是大于等于最后一个元素的（特殊情况除外）
   *   3. 找到两个指针的中间的元素：
   *    (1). 中间元素位于前面的递增子数组，它应该大于等于第一个指针指向的元素
   *         此时，该数组中最小的元素应该位于该中间元素的后面
   *         移动第一个指针至该中间元素，缩小寻找范围（第一个指针仍然处于前面的递增子数组）
   *    (2). 中间元素位于后面的递增子数组，它应该小于等于第二个指针指向的元素
   *         此时，该数组中最小的元素应该位于该中间元素的前面
   *         移动第二个指针至该中间元素，缩小寻找范围（第二个指针仍然处于后面的递增子数组）
   *    (3). 无论移动第一个指针还是第二个指针，查找范围都会缩小到原来的一半
   *         随后，我们再用更新之后的两个指针重复做一轮的查找
   *  4. 上述思路中：
   *       第一个指针总是指向前面递增数组的元素，第二个指针总是指向后面递增数组的元素
   *       最终第一个指针将指向前面子数组的最后一个元素，第二个指针会指向后面子数组的最后一个元素
   *       即：它们最终会指向两个相邻的元素，第二个指针指向的刚好是最小的元素，这就是循环的结束条件
   *
   * 举例说明：
   * 我们将开头的例子代入上述实现思路，来验证下([3, 4, 5, 1, 2])：
   *   1. 第一个指针指向第0个元素：3，第二个指针指向第4个元素：2
   *   2. 位于两个指针中间的元素是：5，它位于前面的递增子数组
   *     (1). 它大于第一个指针指向的元素
   *     (2). 最小的元素位于该中间元素的后面
   *     (3). 移动第一个指针至数组的第2号元素
   *
   *   移动后，两个指针的中间元素是：1，它位于后面的递增子数组
   *     (1). 它小于第二个指针指向的元素
   *     (2). 最小的元素位于该中间元素的前面
   *     (3). 移动第二个指针至数组的第3号元素
   *
   *   移动后，第一个指针与第二个指针指向的元素为相邻元素
   *      (1). 第二个指针指向的元素就是最小的元素
   *      (2). 终止循环
   *
   * 特殊情况：
   *   1. 当数组的第0号元素小于最后一个元素时，证明这个数组是排好序的
   *      它的最小数字就是数组的第0号元素
   *   2. 当第一个指针与第二个指针指向的元素相同且它们的中间元素也与其相同
   *      则无法使用二分查找，需要使用顺序查找
   *
   */
  constructor() {
    this.leftPointer = 0;
    this.rightPointer = 0;
    this.middleIndex = 0;
  }

  public getMinValue(incrementArray: Array<number>): number {
    this.rightPointer = incrementArray.length - 1;
    // 第一个元素小于最后一个元素，证明数组是排好序的
    if (incrementArray[this.leftPointer] < incrementArray[this.rightPointer]) {
      // 其最小值为第一个元素
      return incrementArray[this.leftPointer];
    }
    while (
      incrementArray[this.leftPointer] >= incrementArray[this.rightPointer]
    ) {
      // 循环终止条件: 右指针与左指针相邻，最小值为右指针所指向的值
      if (this.rightPointer - this.leftPointer === 1) {
        this.middleIndex = this.rightPointer;
        break;
      }
      // 求中间值
      this.middleIndex = Math.floor((this.leftPointer + this.rightPointer) / 2);
      // 左指针指向的值与右指针指向的值相同且中间元素也与之相同
      // 则无法使用二分查找，需要顺序查找
      if (
        incrementArray[this.leftPointer] ===
          incrementArray[this.rightPointer] &&
        incrementArray[this.middleIndex] === incrementArray[this.leftPointer]
      ) {
        // 按顺序查找
        let minValue = incrementArray[0];
        for (let i = 0; i < incrementArray.length; i++) {
          if (incrementArray[i] < minValue) {
            minValue = incrementArray[i];
          }
        }
        return minValue;
      }

      if (
        incrementArray[this.middleIndex] >= incrementArray[this.leftPointer]
      ) {
        // 中间值大于等于左指针指向的值
        // 移动左指针至中间值位置
        this.leftPointer = this.middleIndex;
      } else if (
        incrementArray[this.middleIndex] <= incrementArray[this.rightPointer]
      ) {
        // 中间值小于等于右指针指向的值
        // 移动右指针至中间值位置
        this.rightPointer = this.middleIndex;
      }
    }
    // 循环结束，返回最小值
    return incrementArray[this.middleIndex];
  }
}
