import { complexListNodeType } from "./type/LinkedListModule";

export function copyComplexLinkedList(
  linkedList: complexListNodeType
): complexListNodeType | null {
  // 复制每一个节点紧跟其后: a->a'->b->b'->...n'
  cloneNodes(linkedList);
  // 复制sibling节点
  connectSiblingNodes(linkedList);
  // 拆出复制好的链表
  return reconnectNodes(linkedList);
}

/**
 * 复制链表中的每一个节点，复制出来的节点紧跟在原始节点之后
 * @param pHead
 */
function cloneNodes(pHead: complexListNodeType): void {
  let pNode: complexListNodeType | undefined = pHead;
  while (pNode != null) {
    // 复制当前节点，创建新节点:a'
    const pCloned: complexListNodeType = {
      value: pNode.value,
      next: pNode.next,
      sibling: null
    };
    // 原始节点的指针指向复制出来的新节点上: a->a'
    pNode.next = pCloned;
    // 继续遍历原始节点的下一个节点: a = b
    pNode = pCloned.next;
  }
}

// 复制链表中的sibling指针
function connectSiblingNodes(pHead: complexListNodeType) {
  let pNode: complexListNodeType | undefined = pHead;
  while (pNode != null) {
    // 获取节点N'
    const pCloned: complexListNodeType | undefined = pNode.next;
    if (pNode.sibling != null && pCloned != null) {
      // N'->S'
      pCloned.sibling = pNode.sibling.next;
    }
    if (pCloned != null) {
      pNode = pCloned.next;
    }
  }
}

// 拆分链表
function reconnectNodes(pHead: complexListNodeType) {
  let pNode: complexListNodeType | undefined = pHead;
  let pClonedHead: complexListNodeType | null | undefined = null;
  let pClonedNode: complexListNodeType | null | undefined = null;

  // 节点置换
  // N' = N.next
  // N = N'.next
  if (pNode != null && pNode.next) {
    pClonedHead = pClonedNode = pNode.next;
    pNode.next = pClonedNode.next;
    pNode = pNode.next;
  }
  while (pNode != null && pClonedNode) {
    pClonedNode.next = pNode.next;
    pClonedNode = pClonedNode.next;
    if (pClonedNode) {
      pNode.next = pClonedNode.next;
    }
    pNode = pNode.next;
  }

  return pClonedHead;
}
