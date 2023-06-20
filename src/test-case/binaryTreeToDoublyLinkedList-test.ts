import { treeToLinkedList } from "../BinaryTreeToDoublyLinkedList";
import { BinaryTreeNode } from "../type/TreeModuleType";

const tree: BinaryTreeNode = {
  key: 10,
  left: {
    key: 6,
    left: {
      key: 4
    },
    right: {
      key: 8
    }
  },
  right: {
    key: 14,
    left: {
      key: 12
    },
    right: {
      key: 16
    }
  }
};

const linkedListResult = treeToLinkedList(tree);
console.log(linkedListResult);
