import { GetLinkedListNode } from "../GetLinkedListNode.ts";
import LinkedList from "../lib/LinkedList.ts";
import { ListNode } from "../utils/linked-list-models.ts";

let linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(3);
linkedList.push(5);
linkedList.push(9);
linkedList.push(15);
linkedList.push(21);

let getLinkedListNode = new GetLinkedListNode(linkedList.getHead());
let resultNode: ListNode | null = getLinkedListNode.getCountdownNode(3);
console.log("倒数第3个节点值为: ", resultNode);

linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(3);
linkedList.push(8);
linkedList.push(9);
linkedList.push(12);
linkedList.push(18);
// 修改最后一个节点的指针指向至链表的第3个节点，构造一个有环链表
linkedList.getElementAt(linkedList.size() - 1).next =
  linkedList.getElementAt(2);
getLinkedListNode = new GetLinkedListNode(linkedList.getHead());
resultNode = getLinkedListNode.findRingEntranceNode();
console.log("环的入口节点", resultNode);
