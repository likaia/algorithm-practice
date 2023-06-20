import Stack from "./lib/Stack";

type nodeObj = { name: string; children?: Array<nodeObj> };

/**
 * 字符串转树结构
 * @param text
 * @constructor
 */
export function DataConversion(text: string): nodeObj {
  const splitArr = text.split("\n");

  const json = { name: "root" };
  const strStack = new Stack();
  const deepStack = new Stack();
  strStack.push(json);
  deepStack.push(-1);

  for (let i = 0; i < splitArr.length; i++) {
    let str = splitArr[i];
    if (!str) continue;
    // 获取空格总数
    const len = str.lastIndexOf(" ") + 1;
    str = str.replace(/\s/g, "");
    const curObj = { name: str };

    // 寻找当前入栈元素的父层级
    while (len <= deepStack.peek()) {
      deepStack.pop();
      strStack.pop();
    }
    const stackTop: nodeObj = strStack.peek();
    stackTop.children
      ? stackTop.children.push(curObj)
      : (stackTop.children = [curObj]);

    // 元素入栈，继续下一轮的比对
    strStack.push(curObj);
    deepStack.push(len);
  }

  return json;
}
