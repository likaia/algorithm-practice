import { ListNode } from "./utils/linked-list-models.ts";

/**
 * 合并两个排序的链表
 *  1. p1指针指向链表1，p2指针指向链表2
 *  2. 递归比对指针指向的两个值，构造新的链表
 * @param firstListHead 链表1
 * @param secondListHead 链表2
 * @constructor
 */
export function MergeLinkedList(
  firstListHead: ListNode | null,
  secondListHead: ListNode | null
): ListNode | null {
  // 基线条件
  if (firstListHead == null) {
    return secondListHead;
  }
  if (secondListHead == null) {
    return firstListHead;
  }
  let pMergedHead: ListNode | null = null;
  if (firstListHead.element < secondListHead.element) {
    pMergedHead = firstListHead;
    pMergedHead.next = MergeLinkedList(firstListHead.next, secondListHead);
  } else {
    pMergedHead = secondListHead;
    pMergedHead.next = MergeLinkedList(firstListHead, secondListHead.next);
  }
  return pMergedHead;
}
