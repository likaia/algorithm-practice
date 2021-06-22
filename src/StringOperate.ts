// 字符串相关操作

export class StringOperate {
  /**
   * 将字符串中的空格替换为特定值
   *
   * 解法1：用辅助数组解决
   *
   * 测试用例：
   *  用8000个字符测试本函数，执行15次，平均执行时间为1.5ms
   * @param str 需要处理的字符串
   * @param val 需要替换的值
   */
  replaceSpacesWithArray(str: string, val: string): number | string {
    console.time("array");
    if (str == null) {
      return -1;
    }

    // 辅助数组，用于存放替换空格后的字符串
    const strArray: string[] = [];
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) === 32) {
        // 字符中间有空格将其替换
        strArray.push(val);
      } else {
        // 字符中间没有空格，不做改变
        strArray.push(str[i]);
      }
    }

    const finalStr = strArray.join("");
    console.timeEnd("array");
    // 将替换完成后的数组转为字符串返回给调用者
    return finalStr;
  }

  /**
   * 将字符串中的空格替换为特定值
   *
   * 解法2：用字符串拼接解决
   *
   * 测试用例：
   *  用8000个字符测试本函数，执行15次，平均执行时间为1.47ms
   * @param str
   * @param val
   */
  replaceSpacesWithString(str: string, val: string): number | string {
    console.time("string");
    if (str == null) {
      return -1;
    }

    let finalStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) === 32) {
        finalStr += val;
      } else {
        finalStr += str[i];
      }
    }
    console.timeEnd("string");
    return finalStr;
  }
}
