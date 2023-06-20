import { BinaryTreeNode } from "../type/TreeModuleType";
import { SerializedBinaryTree } from "../SerializedBinaryTree";

const rootNode: BinaryTreeNode = {
  key: 1,
  left: {
    key: 2,
    left: {
      key: 4
    }
  },
  right: {
    key: 3,
    left: {
      key: 5
    },
    right: {
      key: 6
    }
  }
};

const serializedBinaryTree = new SerializedBinaryTree();
const treeStr = serializedBinaryTree.serialize(rootNode);
console.log("序列化后的字符串", treeStr);
const result = serializedBinaryTree.deserialize(treeStr);
console.log("反序列化后的树", result);
