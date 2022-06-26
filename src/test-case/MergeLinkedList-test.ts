import { MergeLinkedList } from "../MergeLinkedList.ts";
import LinkedList from "../lib/LinkedList.ts";

const firstLinkedList = new LinkedList();
firstLinkedList.push(1);
firstLinkedList.push(3);
firstLinkedList.push(5);
firstLinkedList.push(7);
firstLinkedList.push(9);
const secondLinkedList = new LinkedList();
secondLinkedList.push(2);
secondLinkedList.push(4);
secondLinkedList.push(6);
secondLinkedList.push(8);

const resultListHead = MergeLinkedList(
  firstLinkedList.getHead(),
  secondLinkedList.getHead()
);

console.log(resultListHead);
