import { ICompareFunction, defaultCompare, Compare } from "../utils/Util";

export class Sort<T> {
  /**
   * 排序算法
   * @param array 需要进行排序的数组
   * @param compareFn 比对函数
   */
  constructor(
    private array: T[] = [],
    private compareFn: ICompareFunction<T> = defaultCompare
  ) {}

  // 冒泡排序
  bubbleSort(): void {
    // 获取数组长度
    const { length } = this.array;
    for (let i = 0; i < length; i++) {
      // 从数组的0号元素遍历到数组的倒数第2号元素，然后减去外层已经遍历的轮数
      for (let j = 0; j < length - 1 - i; j++) {
        // 如果j > j + 1位置的元素就交换他们两个元素的位置
        if (
          this.compareFn(this.array[j], this.array[j + 1]) ===
          Compare.BIGGER_THAN
        ) {
          this.swap(this.array, j, j + 1);
        }
      }
    }
  }

  // 选择排序
  selectionSort(): void {
    const { length } = this.array;
    // 声明一个变量用于存储最小元素的位置
    let indexMin = 0;
    for (let i = 0; i < length; i++) {
      // 初始值为外层循环当前遍历到的位置i
      indexMin = i;
      for (let j = i; j < length; j++) {
        // 如果当前遍历到元素小于indexMin位置的元素，就将当前遍历到的位置j赋值给indexMin
        if (
          this.compareFn(this.array[indexMin], this.array[j]) ===
          Compare.BIGGER_THAN
        ) {
          indexMin = j;
        }
      }
      if (i !== indexMin) {
        this.swap(this.array, i, indexMin);
      }
    }
  }

  // 插入排序
  insertionSort(array: T[] = this.array): void {
    const { length } = array;
    let temp;
    // 假设0号元素已经排好序，从1号元素开始遍历数组
    for (let i = 1; i < length; i++) {
      // 声明辅助变量存储当前i的位置以及其对应的值
      let j = i;
      temp = array[i];
      // j大于0且j-1位置的元素大于i号位置的元素就把j-1处的值移动到j处，最后j--
      while (
        j > 0 &&
        this.compareFn(array[j - 1], temp) === Compare.BIGGER_THAN
      ) {
        array[j] = array[j - 1];
        j--;
      }
      // 将temp放到正确的位置
      array[j] = temp;
    }
  }

  // 归并排序
  mergeSort(array: T[] = this.array): T[] {
    if (array.length > 1) {
      const { length } = array;
      // 获取中间值
      const middle = Math.floor(length / 2);
      // 递归填充左右数组
      const left = this.mergeSort(array.slice(0, middle));
      const right = this.mergeSort(array.slice(middle, length));
      // 合并左右数组
      array = this.merge(left, right);
    }
    return array;
  }

  private merge(left: T[], right: T[]) {
    let i = 0;
    let j = 0;
    const result: T[] = [];
    while (i < left.length && j < right.length) {
      // 如果left[i] < right[j]将left[i]加进result中，随后i自增，否则把right[j]加进result中，随后j自增
      result.push(
        this.compareFn(left[i], right[j]) === Compare.LESS_THAN
          ? left[i++]
          : right[j++]
      );
    }
    // 将left或right数组的剩余项添加进result中
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
  }

  // 快速排序
  quickSort(): T[] {
    return this.quick(this.array, 0, this.array.length - 1);
  }

  /**
   *
   * @param array 待排序数组
   * @param left 左边界
   * @param right 右边界
   * @private
   */
  private quick(array: T[], left: number, right: number) {
    // 该变量用于将子数组分离为较小值数组和较大值数组
    let index;
    if (array.length > 1) {
      // 对给定子数组执行划分操作，得到正确的index
      index = this.partition(array, left, right);
      // 如果子数组存在较小值的元素，则对该数组重复这个过程
      if (left < index - 1) {
        this.quick(array, left, index - 1);
      }
      // 如果子数组存在较大值的元素，也对该数组重复这个过程
      if (index < right) {
        this.quick(array, index, right);
      }
    }
    return array;
  }

  // 划分函数
  private partition(array: T[], left: number, right: number): number {
    // 从数组中选择一个值做主元，此处选择数组的中间值
    const pivot = array[Math.floor((right + left) / 2)];
    // 创建数组引用，分别指向左边数组的第一个值和右边数组的第一个值
    let i = left;
    let j = right;

    // left指针和right指针没有相互交错，就执行划分操作
    while (i <= j) {
      // 移动left指针直至找到一个比主元大的元素
      while (this.compareFn(array[i], pivot) === Compare.LESS_THAN) {
        i++;
      }

      // 移动right指针直至找到一个比主元小的元素
      while (this.compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
        j--;
      }

      // 当左指针指向的元素比主元大且右指针指向的元素比主元小，并且左指针索引没有右指针索引大时就交换i和j号元素的位置，随后移动两个指针
      if (i <= j) {
        this.swap(array, i, j);
        i++;
        j--;
      }
    }
    // 划分结束，返回左指针索引
    return i;
  }

  /**
   * 计数排序
   * 1. 找到要排序数组的最大值
   * 2. 以上一步找到的最大值+1为长度创建一个计数数组
   * 3. 遍历要排序的数组，以当前遍历到的元素为索引，寻找计数数组中对应的位置将其初始化为0，如果此处位置有相同元素的话就自增
   * 4. 遍历计数数组，判断当前遍历到的元素值是否大于0，如果大于0就取当前遍历到的索引，替换array中的元素
   * @param array 需要进行排序的数组
   */
  countingSort(array: number[]): number[] {
    // 待排序数组为空或只有一个元素则不用排序
    if (array.length < 2) {
      return array;
    }
    // 找到待排序数组中的最大值
    const maxValue = this.findMaxValue(array);

    // 创建计数数组，数组长度为待排序数组的最大值+1
    const counts = new Array(maxValue + 1);
    // 遍历待排序数组，为计数数组赋值
    array.forEach((element) => {
      // 以当前遍历到的元素值为索引将对应位置元素值初始化为0
      if (!counts[element]) {
        counts[element] = 0;
      }
      // 当前位置的值进行自增，顺便应对数组中有重复值的情况，有重复值时当前位置的值必定大于1
      counts[element]++;
    });

    // 声明一个变量用于数组最终排序
    let sortedIndex = 0;
    // 遍历计数数组，根据计数数组的元素位置对待排序数组进行排序
    counts.forEach((count, i) => {
      // 如果当前遍历到的元素值大于0，则执行替换操作进行排序
      while (count > 0) {
        // 将当前元素索引赋值给array的sortedIndex号元素，随后sortedIndex自增
        array[sortedIndex++] = i;
        // 当前元素值自减，如果其值大于1，证明此处有重复元素，那么我们就继续执行while循环
        count--;
      }
    });
    // 最后，排序完成，返回排序好的数组
    return array;
  }

  // 桶排序
  bucketSort(array: number[], bucketSize = 5): T[] | number[] {
    if (array.length < 2) {
      return array;
    }
    // 创建桶，对桶进行排序
    return this.sortBuckets(<[][]>this.createBuckets(array, bucketSize));
  }

  /**
   * 创建桶
   * @param array 待排序数组
   * @param bucketSize 桶大小，即每个桶里的元素数量
   *
   * @return 二维数组类型的桶
   */
  private createBuckets = (array: number[], bucketSize: number): number[][] => {
    // 计算数组最大值与最小值
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] < minValue) {
        minValue = array[i];
      } else if (array[i] > maxValue) {
        maxValue = array[i];
      }
    }

    // 计算需要的桶数量，公式为: 数组最大值与最小值的差值与桶大小进行除法运算
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    // 用于存放桶的二维数组
    const buckets: number[][] = [];

    // 计算出桶数量后，初始化每个桶
    for (let i = 0; i < bucketCount; i++) {
      buckets[i] = [];
    }

    // 遍历数组，将每个元素分布到桶中
    for (let i = 0; i < array.length; i++) {
      // 计算需要将元素放到哪个桶中，公式为: 当前遍历到的元素值与数组的最小值的差值与桶大小进行除法运算
      const bucketIndex: number = Math.floor(
        (array[i] - minValue) / bucketSize
      );
      // 将元素放进合适的桶中
      buckets[bucketIndex].push(array[i]);
    }
    // 将桶返回
    return buckets;
  };

  // 对每个桶进行排序
  private sortBuckets(buckets: T[][]): T[] {
    const sortedArray: T[] = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] != null) {
        // 调用插入排序
        this.insertionSort(buckets[i]);
        // 将排序好的桶取出来，放进sortedArray中
        sortedArray.push(...buckets[i]);
      }
    }
    return sortedArray;
  }

  /**
   * 基数排序
   * @param array 待排序数组
   * @param radixBase 10进制排序，基数为10
   */
  radixSort(array: number[], radixBase = 10): number[] {
    if (array.length < 2) {
      return array;
    }
    // 获取数组的最小值和最大值
    const minValue = this.findMinValue(array);
    const maxValue = this.findMaxValue(array);
    // 当前有效数字,默认会从最后一位有效数字开始排序
    let significantDigit = 1;

    /**
     * 计算有效位
     * 最大值和最小值的差与有效数字进行除法运算，其值大于等于1就代表还有待排序的有效位
     */
    while ((maxValue - minValue) / significantDigit >= 1) {
      // 以当前有效位为参数对数组进行排序
      array = this.countingSortForRadix(
        array,
        radixBase,
        significantDigit,
        minValue
      );
      // 当前有效数字乘以基数，继续执行while循环进行基数排序
      significantDigit *= radixBase;
    }
    return array;
  }

  /**
   * 基于有效位进行排序
   * @param array 待排序数组
   * @param radixBase 基数
   * @param significantDigit 有效位
   * @param minValue 待排序数组的最小值
   */
  private countingSortForRadix = (
    array: number[],
    radixBase: number,
    significantDigit: number,
    minValue: number
  ) => {
    // 声明桶索引以及桶
    let bucketsIndex;
    const buckets = [];
    // 辅助数组，用于计数完成的值移动会原数组
    const aux = [];
    // 通过基数来初始化桶
    for (let i = 0; i < radixBase; i++) {
      buckets[i] = 0;
    }

    // 遍历待排序数组，基于有效位计算桶索引执行计数排序
    for (let i = 0; i < array.length; i++) {
      // 计算桶索引
      bucketsIndex = Math.floor(
        ((array[i] - minValue) / significantDigit) % radixBase
      );
      // 执行计数操作
      buckets[bucketsIndex]++;
    }

    // 计算累积结果得到正确的计数值
    for (let i = 1; i < radixBase; i++) {
      buckets[i] = buckets[i] + buckets[i - 1];
    }

    // 计数完成，将值移回原始数组中,用aux辅助数组来存储
    for (let i = array.length - 1; i >= 0; i--) {
      // 计算当前元素的桶索引
      bucketsIndex = Math.floor(
        ((array[i] - minValue) / significantDigit) % radixBase
      );
      // 对当前桶索引内的元素执行自减操作,得到其在数组中的正确的位置
      const index = --buckets[bucketsIndex];
      // 计算出索引后，在aux中的对应位置存储当前遍历到的元素
      aux[index] = array[i];
    }
    return aux;
  };

  // 寻找数组中的最大值
  private findMaxValue = (array: number[]): number => {
    let max: number = array[0];
    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }

    return max;
  };

  // 寻找数组中的最小值
  private findMinValue = (array: number[]) => {
    let min: number = array[0];
    for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i];
      }
    }

    return min;
  };

  /**
   * 交换数组元素位置
   * @param array 需要进行操作的数组
   * @param a 交换的位置
   * @param b 被交换的位置
   */
  private swap = (array: T[], a: number, b: number): void => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };
}
