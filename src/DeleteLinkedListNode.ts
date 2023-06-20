import { ListNode } from "./utils/linked-list-models";

export class DeleteLinkedListNode {
  deleteNode(listHead: ListNode, toBeDeleted: ListNode): ListNode | null {
    // 链表中只有一个节点时，返回null
    if (listHead.next == null) {
      return null;
    }
    // 待删除节点处于末尾时，则按顺序遍历节点实现删除
    if (toBeDeleted.next == null) {
      let curNode = listHead.next;
      // 寻找待删除节点的上一个节点
      while (
        curNode.next != null &&
        curNode.next.element !== toBeDeleted.element
      ) {
        curNode = curNode.next;
      }
      // 上一个节点已找到，将其指针指向null即可
      curNode.next = null;
      return listHead;
    }

    // 待删除节点之后还有节点，则采取覆盖法以达到删除的目的
    // 待删除节点的值改为其下一个节点的值
    toBeDeleted.element = toBeDeleted.next.element;
    // 待删除节点的指针指向待删除节点的下下个节点
    toBeDeleted.next = toBeDeleted.next.next;
    return listHead;
  }

  /**
   * 删除链表中的重复节点(递归解法)
   * @param pHead 链表头节点
   */
  deleteDuplicatesNodeForRecursion(pHead: ListNode | null): ListNode | null {
    // 节点不存在或只有1个节点时直接返回
    if (pHead == null || pHead.next == null) return pHead;
    // 当前节点是重复节点
    if (pHead.element === pHead.next.element) {
      let pNode: ListNode | null = pHead.next;
      // 通过遍历，找到第一个与当前节点不同的节点
      while (pNode != null && pNode.element === pHead.element) {
        // 寻找第一个与当前节点不同的节点
        pNode = pNode.next;
      }
      // 本轮递归结束，从第一个与当前节点不同的节点开始递归
      return this.deleteDuplicatesNodeForRecursion(pNode);
    } else {
      // 连接不重复的节点
      pHead.next = this.deleteDuplicatesNodeForRecursion(pHead.next);
      // 本轮轮递归结束，返回最终的链表头节点
      return pHead;
    }
  }

  /**
   * 删除链表中的重复节点
   * @param pHead 链表头节点
   */
  deleteDuplicatesNode(pHead: ListNode | null): ListNode | null {
    if (pHead == null || pHead.next == null) return pHead;
    // 创建一个头节点,处理第一个与第二个节点相同的情况
    const head: ListNode = { element: 0, next: pHead };
    // 创建两个指针: pre指向当前不重复的节点，last为搜索指针一直向后探索寻找与当前节点不重复的节点
    let pre = head;
    let last = head.next;
    while (last != null) {
      if (last.next != null && last.element === last.next.element) {
        // 向后寻找不重复的节点
        while (last.next != null && last.element === last.next.element) {
          last = last.next;
        }
        // 将pre的指针指向不重复的节点上
        pre.next = last.next;
        // 继续向后探索
        last = last.next;
      } else {
        // 将指针指向其节点的下一个节点, 继续向后探索
        pre = <ListNode>pre.next;
        last = last.next;
      }
    }
    return head.next;
  }
}
