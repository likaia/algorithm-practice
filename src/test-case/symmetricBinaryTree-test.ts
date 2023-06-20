import { SymmetricBinaryTree } from "../SymmetricBinaryTree";
import { BinaryTreeNode } from "../type/TreeModuleType";

const tree: BinaryTreeNode = {
  key: 8,
  left: {
    key: 6,
    left: { key: 5 },
    right: { key: 7 }
  },
  right: { key: 6, left: { key: 7 }, right: { key: 5 } }
};
const isSymmetric = SymmetricBinaryTree(tree);
console.log(tree, "是否为对称二叉树: ", isSymmetric);
