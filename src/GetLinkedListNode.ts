import { ListNode } from "./utils/linked-list-models.ts";

export class GetLinkedListNode {
  // p1指针
  private pNext: ListNode;
  // p2指针(与p1指针的距离始终保持在k-1)
  private pHead: ListNode;

  constructor(listHead: ListNode) {
    if (listHead == null) {
      throw new Error("链表头节点不能为空");
    }

    // 初始化两个指针指向
    this.pNext = listHead;
    this.pHead = listHead;
  }

  // 获取倒数第K个节点
  getCountdownNode(k: number): ListNode {
    if (k <= 0) {
      throw new Error("需要获取的倒数节点数必须大于0");
    }

    // p1指针先走，将其指向链表的k-1位置
    for (let i = 0; i < k - 1; i++) {
      // k可能出现大于链表总节点的情况，需要进行规避
      if (this.pNext.next != null) {
        this.pNext = this.pNext.next;
      } else {
        throw new Error("需要找的节点不存在");
      }
    }

    // 两个指针同时向前走，直至p1指针指向尾节点
    while (this.pNext.next) {
      this.pNext = this.pNext.next;
      if (this.pHead.next) {
        this.pHead = this.pHead.next;
      }
    }

    // p2节点正好指向倒数第K个节点
    return this.pHead;
  }
}
