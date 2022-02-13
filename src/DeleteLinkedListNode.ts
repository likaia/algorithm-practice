type ListNode = { element: number; next: ListNode | null };

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
}
