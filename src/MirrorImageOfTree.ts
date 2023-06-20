import { BinaryTreeNode } from "./type/TreeModuleType";

export function MirrorImageOfTree(node: BinaryTreeNode | null): void {
  if (node == null) return;
  if (node.left == null && node.right == null) return;
  // 交换左右子节点
  const temp = node.left;
  node.left = node.right;
  node.right = temp;
  if (node.left) {
    MirrorImageOfTree(node.left);
  }
  if (node.right) {
    MirrorImageOfTree(node.right);
  }
}
