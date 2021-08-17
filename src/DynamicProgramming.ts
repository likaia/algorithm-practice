export default class DynamicProgramming {
  /**
   * 剪绳子
   * 题目：有一根长度为n的绳子，把绳子剪成m段（m、n都是整数，n > 1并且m > 1），每段绳子的长度记为k[0]，K[1]，...，K[m]。
   *      请问k[0] * k[1] * ... *k[m]可能的最大乘积是多少？
   *      例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
   *
   */
  public cutTheRope(length: number): number {
    // 创建结果数组并全部初始化为0
    const products = new Array<number>(length + 1);
    for (let i = 0; i < products.length; i++) {
      products[i] = 0;
    }
    // 由于绳子只能整数切，所以绳子长度小于2时，无法进行裁剪
    if (length < 2) {
      products[0] = 0;
      products[1] = 0;
    }
    // 绳子长度为2时，只能从中间裁剪, 所有切法的最大乘积为1
    if (length === 2) {
      products[2] = 1;
    }
    // 绳子长度为3时，可以切成:
    // 1. 1 1 1
    // 2. 1 2
    // 1 * 2 > 1 * 1 * 1, 故长度为3时, 所有切法的最大乘积为2
    if (length === 3) {
      products[3] = 2;
    }

    for (let i = 4; i <= length; i++) {
      for (let j = 1; j < i; j++) {
        products[i] = Math.max(
          products[i],
          Math.max(j, products[j]) * Math.max(i - j, products[i - j])
        );
      }
    }
    return products[length];
  }
}
