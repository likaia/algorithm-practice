import { ListNode } from "./utils/linked-list-models";

export class GetLinkedListNode {
  // p1指针
  private pNext: ListNode;
  // p2指针
  private pHead: ListNode;
  private readonly listHead: ListNode;

  constructor(listHead: ListNode) {
    if (listHead == null) {
      throw new Error("链表头节点不能为空");
    }

    // 初始化两个指针指向
    this.pNext = listHead;
    this.pHead = listHead;
    this.listHead = listHead;
  }

  // 获取倒数第K个节点
  getCountdownNode(k: number): ListNode {
    if (k <= 0) {
      throw new Error("需要获取的倒数节点数必须大于0");
    }
    // 初始化两个指针指向
    this.pNext = this.listHead;
    this.pHead = this.listHead;

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
    // p2与p1指针的距离始终保持在k-1
    while (this.pNext.next) {
      this.pNext = this.pNext.next;
      if (this.pHead.next) {
        this.pHead = this.pHead.next;
      }
    }

    // p2节点正好指向倒数第K个节点
    return this.pHead;
  }

  // 寻找环的入口节点
  findRingEntranceNode(): ListNode | null {
    // 初始化两个指针指向
    this.pNext = this.listHead;
    this.pHead = this.listHead;
    let hasRing = false;
    while (this.pNext.next) {
      // p1指针每次走1步
      this.pNext = this.pNext.next;

      // p2指针每次走2步
      let step = 2;
      while (this.pHead.next) {
        if (step > 0) {
          this.pHead = this.pHead.next;
          step--;
        }
        if (step === 0) {
          break;
        }
      }
      // p1、p2相遇, 链表中就包含环
      if (this.pNext === this.pHead) {
        hasRing = true;
        break;
      }
    }

    // 链表中有环
    if (hasRing) {
      let ringCount = 0;
      // 获取环中节点数量
      while (this.pNext.next) {
        ringCount++;
        this.pNext = this.pNext.next;
        // p1、p2相遇，得到环中节点总数量
        if (this.pHead === this.pNext) {
          break;
        }
      }

      // 寻找环的入口节点
      while (this.pNext.next) {
        // 移动p1指针ringCount步
        this.pNext = this.pNext.next;
        ringCount--;
        if (ringCount === 0) {
          // 重置p2指针位置到链表头部
          this.pHead = this.listHead;
          break;
        }
      }
      // p1、p2指针以相同的速度向前移动
      while (this.pNext.next) {
        this.pNext = this.pNext.next;
        if (this.pHead.next) {
          this.pHead = this.pHead.next;
        }
        // p1、p2相遇的节点正好是环的入口节点
        if (this.pNext === this.pHead) {
          return this.pNext;
        }
      }
      return this.pNext;
    }
    // 链表中不存在环
    return null;
  }
}
