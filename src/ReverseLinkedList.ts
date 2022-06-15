import { ListNode } from "./utils/linked-list-models.ts";

export class ReverseLinkedList {
  // p1指针
  private pPrev: ListNode | null;
  // p2指针
  private pNode: ListNode | null;

  constructor(listHead: ListNode) {
    if (listHead == null) {
      throw new Error("链表头节点不能为空");
    }
    this.pNode = listHead;
    this.pPrev = null;
  }

  reverseList(): ListNode | null {
    // 反转后的链表头指针
    let pReversedHead: ListNode | null = null;
    while (this.pNode != null) {
      // p3指针
      const pNext = this.pNode.next;
      if (pNext == null) {
        pReversedHead = this.pNode;
      }
      this.pNode.next = this.pPrev;
      this.pPrev = this.pNode;
      this.pNode = pNext;
    }
    return pReversedHead;
  }
}
