type rootObj = { name: string; id: string; pId: string };

/**
 * 字符串数组转树结构
 * 例：
 *  [
 *   "Language",
 *   "  JavaScript",
 *   "    TypeScript",
 *   "    NodeJS",
 *   "  HTML",
 *   "Server",
 *   "  DataBase",
 *   "    MongoDB",
 *   "System",
 *   "  Linux",
 *   "  Window"
 * ];
 * 转换后的树结构:
 * {
 *     "name":"root",
 *     "children":[
 *         {
 *             "name":"Language",
 *             "children":[
 *                 {
 *                     "name":"JavaScript",
 *                     "children":[
 *                         {
 *                             "name":"TypeScript"
 *                         },
 *                         {
 *                             "name":"NodeJS"
 *                         }
 *                     ]
 *                 },
 *                 {
 *                     "name":"HTML"
 *                 }
 *             ]
 *         },
 *         {
 *             "name":"Server",
 *             "children":[
 *                 {
 *                     "name":"DataBase",
 *                     "children":[
 *                         {
 *                             "name":"MongoDB"
 *                         }
 *                     ]
 *                 }
 *             ]
 *         },
 *         {
 *             "name":"System",
 *             "children":[
 *                 {
 *                     "name":"Linux"
 *                 },
 *                 {
 *                     "name":"Window"
 *                 }
 *             ]
 *         }
 *     ]
 * }
 * @param textArray
 * @constructor
 */
export function DataConversion(textArray: Array<string>): void {
  const rootArray: Array<rootObj> = [];
  // 获取文本中的空格数，将其存储为一个对象
  for (let i = 0; i < textArray.length; i++) {
    const item = textArray[i];
    let numberOfLocks = 0;
    let characterIndex = 0;
    // 获取字符串开头的空格个数
    while (characterIndex < item.length) {
      if (item[characterIndex].charCodeAt(0) === 32) {
        numberOfLocks++;
        characterIndex++;
        continue;
      }
      // 非空格元素,终止循环
      break;
    }
    let id = "0";
    let pId = "root";
    // 构造层级关系
    const idArr = [];
    while (numberOfLocks > 0) {
      idArr.push(numberOfLocks);
      numberOfLocks -= 2;
    }
    for (let j = idArr.length - 1; j >= 0; j--) {
      id = id + "-" + idArr[j];
    }
    // 构造父级id
    let tempIds = id.split("-");
    if (tempIds.length > 1) {
      tempIds = tempIds.slice(0, tempIds.length - 1);
      for (let j = 0; j < tempIds.length; j++) {
        pId = pId + "-" + tempIds[j];
      }
    }
    rootArray.push({ name: item, id, pId });
  }
  console.log(rootArray);
}
