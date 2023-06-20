// 使用前序遍历将二叉树进行序列化
import { BinaryTreeNode, serializeNode } from "./type/TreeModuleType";

export class SerializedBinaryTree {
  // 反序列化已走步长
  private across = 0;

  /**
   * 序列化二叉树
   * @param root 树的根节点
   */
  public serialize(root: BinaryTreeNode | null): string {
    // 空节点用$表示
    if (root == null) return "$";
    const result: serializeNode = { nodeVal: "" };
    this.serializeFn(root, result);
    // 末尾会有多余的分隔符，将其去除
    return result.nodeVal.substring(0, result.nodeVal.length - 1);
  }

  /**
   * 反序列化二叉树
   * @param treeStr
   */
  public deserialize(treeStr: string): BinaryTreeNode | null {
    if (treeStr === "$") {
      return null;
    }
    return this.deserializeFn(treeStr);
  }

  /**
   * 处理树序列化的实现函数
   * @param root 树的根节点
   * @param strObj 序列化后的节点对象
   * @private
   */
  private serializeFn(
    root: BinaryTreeNode | null | undefined,
    strObj: serializeNode
  ) {
    if (root == null) {
      strObj.nodeVal += "$,";
      return;
    }
    strObj.nodeVal += root.key + ",";
    this.serializeFn(root.left, strObj);
    this.serializeFn(root.right, strObj);
  }

  /**
   * 处理树的反序列化实现函数
   * @param nodeStrVal 反序列化后的树节点字符串
   * @private
   */
  private deserializeFn(nodeStrVal: string) {
    // 读取字符串的每一个字符，将其转换为数组
    const strArr: Array<string> = [];
    let readIndex = 0;
    while (readIndex < nodeStrVal.length) {
      if (nodeStrVal.charAt(readIndex) !== ",") {
        strArr.push(nodeStrVal.charAt(readIndex));
      }
      readIndex++;
    }
    // 反序列化二叉树
    return this.buildTree(strArr, 0);
  }

  /**
   * 将字符串数组序列化为二叉树
   * @param str 字符串数组
   * @param index 起始索引
   * @private
   */
  private buildTree(str: Array<string>, index: number) {
    this.across++;
    // 处理空节点（递归的基线条件）
    if (str[index] === "$") return null;
    // 构造树节点
    const treeNode: BinaryTreeNode = { key: parseInt(str[index]) };
    // 当前节点的下一个节点一定为它的左子树
    treeNode.left = this.buildTree(str, index + 1);
    // 左子树遇到基线条件后，右子树的索引就为已走步长
    treeNode.right = this.buildTree(str, this.across);
    return treeNode;
  }
}
