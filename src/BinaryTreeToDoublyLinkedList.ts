import { BinaryTreeNode } from "./type/TreeModuleType.ts";

export function treeToLinkedList(
  root: BinaryTreeNode | null | undefined
): BinaryTreeNode | null {
  if (root == null) return null;
  if (root.left == null && root.right == null) return root;
  // 将左子树构造成双链表，返回链表的头节点
  const leftTree = treeToLinkedList(root.left);
  // 遍历左子树双链表，找到它右子树的最后一个节点
  let pNode = leftTree;
  while (pNode != null && pNode.right != null) {
    pNode = pNode.right;
  }
  // 最后一个节点存在，则将两个节点相互连接起来
  if (pNode) {
    // 将其右子树与根节点连接
    pNode.right = root;
    // 将根节点的左子树与其连接
    root.left = pNode;
  }
  // 将右子树构造成双链表，返回链表的头节点
  const rightTree = treeToLinkedList(root.right);
  // 右子树链表不为空，则将该链表追加到root节点之后
  if (rightTree != null) {
    rightTree.left = root;
    root.right = rightTree;
  }
  return leftTree != null ? leftTree : root;
}
