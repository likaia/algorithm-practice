export default class DynamicProgramming {
  /**
   * 剪绳子
   * 题目：有一根长度为n的绳子，把绳子剪成m段（m、n都是整数，n > 1并且m > 1），每段绳子的长度记为k[0]，K[1]，...，K[m]。
   *      请问k[0] * k[1] * ... *k[m]可能的最大乘积是多少？
   *      例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
   *
   */
  public cutTheRope(length: number): number {
    // 由于绳子只能整数切，所以绳子长度小于2时，无法进行裁剪
    if (length < 2) {
      return 0;
    }
    // 绳子长度为2时，只能从中间裁剪, 所有切法的最大乘积为1
    if (length === 2) {
      return 1;
    }
    // 绳子长度为3时，可以切成:
    // 1. 1 1 1
    // 2. 1 2
    // 1 * 2 > 1 * 1 * 1, 故长度为3时, 所有切法的最大乘积为2
    if (length === 3) {
      return 2;
    }

    // 创建结果数组，存储每段长度绳子切分时的最大乘积
    const products = new Array<number>(length + 1);
    // 长度小于4时，绳子的最大乘积我们已经推算出来了，因此直接保存即可
    products[0] = 0;
    products[1] = 1;
    // 绳子长度为2或3时，不进行拆分，最大乘积为绳子的长度
    products[2] = 2;
    products[3] = 3;

    // 绳子长度大于4时需要对绳子进行切分，求出切分后的每段绳子的最大乘积
    for (let i = 4; i <= length; i++) {
      // 赋初始值
      products[i] = 0;
      // 当前长度绳子的最大乘积
      let max = 0;
      // 至少切一刀，从绳子的1位置开始切，切到i/2位置。
      // 求出长度为i时，切一刀后两段绳子的最大乘积
      for (let j = 1; j <= i / 2; j++) {
        // 根据递推公式求当前裁剪位置的两段绳子的乘积
        const product = products[j] * products[i - j];
        // 比对历史切法中两段绳子的最大乘积和当前切法两段绳子的乘积
        if (max < product) {
          // 替换最大值
          max = product;
        }
        // 修改当前绳子长度切法的最大乘积
        products[i] = max;
      }
    }
    // 每种长度绳子的最大乘积都已经求出，length位置的值就是整个问题的解
    return products[length];
  }
}
