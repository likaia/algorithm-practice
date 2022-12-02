import { complexListNodeType } from "../type/LinkedListModule.ts";
import { insertSiblingNode } from "../utils/linked-list-models.ts";
import { copyComplexLinkedList } from "../CopyComplexLinkedList.ts";

const complexLinkedList: complexListNodeType = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5
        }
      }
    }
  }
};
// 设置sibling指针
insertSiblingNode(complexLinkedList, 1, 3);
insertSiblingNode(complexLinkedList, 2, 5);
insertSiblingNode(complexLinkedList, 4, 2);
const result = copyComplexLinkedList(complexLinkedList);
console.log("复制出来的链表", result);
