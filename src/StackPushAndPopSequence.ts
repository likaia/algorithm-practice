import Stack from "./lib/Stack";

/**
 * 判断弹出序列是否为压入序列栈的弹出顺序
 * @param pushSequence 压入序列
 * @param popupSequence 弹出序列
 * @constructor
 */
export function StackPushAndPopSequence(
  pushSequence: Array<number>,
  popupSequence: Array<number>
): boolean {
  if (pushSequence.length === 0 || popupSequence.length === 0) return false;
  // 下一个入栈、出栈索引
  let nextPushIndex = 0;
  let nextPopIndex = 0;
  // 辅助栈
  const stackData = new Stack();
  // 下一个弹出序列存在则执行进一步的判断
  while (nextPopIndex < popupSequence.length) {
    // 下一个弹出序列的元素与栈顶元素不等则入栈
    while (
      nextPushIndex < pushSequence.length &&
      popupSequence[nextPopIndex] !== stackData.peek()
    ) {
      stackData.push(pushSequence[nextPushIndex]);
      nextPushIndex++;
    }

    // 栈顶元素与下一个弹出序列元素相等则出栈
    if (stackData.peek() === popupSequence[nextPopIndex]) {
      stackData.pop();
      nextPopIndex++;
    } else {
      // 元素不等则终止循环，此时压入序列已经全部压入辅助栈，该序列不可能是一个弹出序列
      break;
    }
    // 辅助栈清空，则代表弹出序列是正确的
    if (stackData.isEmpty()) {
      return true;
    }
  }
  return false;
}
