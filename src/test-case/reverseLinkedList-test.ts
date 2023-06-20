import { ReverseLinkedList } from "../ReverseLinkedList";
import LinkedList from "../lib/LinkedList";

const linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(3);
linkedList.push(8);
linkedList.push(9);
linkedList.push(12);
linkedList.push(18);
const reverseLinkedList = new ReverseLinkedList(linkedList.getHead());
const result = reverseLinkedList.reverseList();
console.log("反转后的链表头节点为", result);
