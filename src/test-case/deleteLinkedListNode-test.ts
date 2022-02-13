import { DeleteLinkedListNode } from "../DeleteLinkedListNode.ts";
import LinkedList from "../lib/LinkedList.ts";

const listNode = new LinkedList();
listNode.push(3);
listNode.push(5);
listNode.push(7);
listNode.push(9);
listNode.push(10);
listNode.push(13);
listNode.push(15);

const deleteLinkedListNode = new DeleteLinkedListNode();
// 获取链表头指针与节点10的指针
const result = deleteLinkedListNode.deleteNode(
  listNode.getHead(),
  listNode.getElementAt(4)
);
if (result == null) {
  // 删除链表的头节点
  listNode.removeAt(0);
}
console.log("删除节点10后，链表的剩余节点为：", listNode.toString());
