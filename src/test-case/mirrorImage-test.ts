import { MirrorImageOfTree } from "../MirrorImageOfTree.ts";
import { BinaryTreeNode } from "../type/TreeModuleType.ts";

const tree: BinaryTreeNode = {
  key: 8,
  left: {
    key: 5,
    left: { key: 3 },
    right: { key: 7 }
  },
  right: { key: 18, left: { key: 13 }, right: { key: 22 } }
};

MirrorImageOfTree(null);
console.log("镜像后的树", tree);
