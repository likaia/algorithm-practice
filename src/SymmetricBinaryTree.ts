import { BinaryTreeNode } from "./type/TreeModuleType";

export function SymmetricBinaryTree(node: BinaryTreeNode | null): boolean {
  return isSymmetrical(node, node);
}

function isSymmetrical(
  node: BinaryTreeNode | null | undefined,
  cloneNode: BinaryTreeNode | null | undefined
): boolean {
  // 到达叶子节点，两者都为nul代表节点相同
  if (node == null && cloneNode == null) {
    return true;
  }
  // 任意一方到达叶子节点，代表节点不同
  if (node == null || cloneNode == null) {
    return false;
  }
  // 节点值不同
  if (node.key != cloneNode.key) {
    return false;
  }

  // 分别比对树的左子节点和右子节点
  return (
    isSymmetrical(node.left, cloneNode.right) &&
    isSymmetrical(node.right, cloneNode.left)
  );
}
