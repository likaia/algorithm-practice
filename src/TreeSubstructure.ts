import { BinaryTreeNode } from "./type/TreeModuleType";

/**
 * 判断B是否为A的子结构
 * @param treeA
 * @param treeB
 * @constructor
 */
export function TreeSubstructure(
  treeA: BinaryTreeNode | null | undefined,
  treeB: BinaryTreeNode | null | undefined
): boolean {
  let result = false;
  if (treeA != null && treeB != null) {
    // 两个节点相同
    if (treeA.key === treeB.key) {
      // 判断树A中是否包含树B
      result = treeAHaveTreeB(treeA, treeB);
    }

    // 继续寻找左子树与右子树
    if (!result) {
      result = TreeSubstructure(treeA?.left, treeB);
    }
    if (!result) {
      result = TreeSubstructure(treeA?.right, treeB);
    }
  }
  return result;
}

/**
 * 判断树A的子节点中是否有和树B一样的子结构
 * @param treeA
 * @param treeB
 */
function treeAHaveTreeB(
  treeA: BinaryTreeNode | null | undefined,
  treeB: BinaryTreeNode | null | undefined
): boolean {
  // 递归到了树B的叶节点，代表该节点存在于树A中
  if (treeB == null) {
    return true;
  }
  // 递归到树A的叶节点，代表该节点不存在于树A中
  if (treeA == null) {
    return false;
  }
  if (treeA.key !== treeB.key) {
    return false;
  }
  // 左子树与右子树都相同
  return (
    treeAHaveTreeB(treeA?.left, treeB?.left) &&
    treeAHaveTreeB(treeA?.right, treeB?.right)
  );
}
