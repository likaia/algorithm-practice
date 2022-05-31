import { GetLinkedListNode } from "../GetLinkedListNode.ts";
import LinkedList from "../lib/LinkedList.ts";

const linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(3);
linkedList.push(5);
linkedList.push(9);
linkedList.push(15);
linkedList.push(21);

const getLinkedListNode = new GetLinkedListNode(linkedList.getHead());
const resultNode = getLinkedListNode.getCountdownNode(3);
console.log(resultNode);
