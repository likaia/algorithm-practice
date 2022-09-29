import { TreeOperate } from "../TreeOperate.ts";
import { Node } from "../lib/Node.ts";
import { treeNode } from "../type/TreeModuleType.ts";

const treeOperateTest = new TreeOperate();
const node: Node<number> = {
  key: 8,
  left: {
    key: 6,
    left: {
      key: 5
    },
    right: {
      key: 7
    }
  },
  right: {
    key: 10,
    left: {
      key: 9
    },
    right: {
      key: 11
    }
  }
};
treeOperateTest.traverseByLayer(node, (key) => {
  // console.log(key);
});

const tree: treeNode<number> = {
  key: 1,
  children: [
    { key: 2, children: [{ key: 7, children: [{ key: 8 }] }] },
    { key: 3, children: [{ key: 9, children: [{ key: 12 }] }] },
    { key: 4, children: [{ key: 10, children: [{ key: 11 }] }] },
    { key: 5 },
    { key: 6 }
  ]
};

treeOperateTest.treeDataByLayer(tree, (key) => {
  console.log(key);
});
