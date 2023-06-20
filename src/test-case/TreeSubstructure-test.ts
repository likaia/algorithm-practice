import { BinaryTreeNode } from "../type/TreeModuleType";
import { TreeSubstructure } from "../TreeSubstructure";

const treeA: BinaryTreeNode = {
  key: 8,
  left: {
    key: 8,
    left: { key: 9 },
    right: { key: 2, left: { key: 4 }, right: { key: 7 } }
  },
  right: { key: 7 }
};

const treeB: BinaryTreeNode = {
  key: 8,
  left: {
    key: 9
  },
  right: {
    key: 2
  }
};

const result = TreeSubstructure(treeA, treeB);
console.log("treeA中包含treeB", result);
