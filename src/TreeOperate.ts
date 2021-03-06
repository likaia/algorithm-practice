import { Node } from "./lib/Node.ts";
import BinarySearchTree from "./lib/BinarySearchTree.ts";

export class TreeOperate<T> {
  /**
   * 重建二叉树
   * 规则：
   *  1. 输入某二叉树前序遍历和中序遍历的结果，输入的值中不包含重复的数字
   *  2. 根据输入的值重建该二叉树
   *
   * 例如：
   *       8
   *      / \
   *     6   13
   *    / \  / \
   *   3  7 9  15
   *
   * 前序遍历: 8 -> 6 -> 3 -> 7 -> 13 -> 9 -> 15
   * 中序遍历: 3 -> 6 -> 7 -> 8 -> 9 -> 13 -> 15
   *
   * 根据前序遍历的特点我们可知道下述信息：
   *  1. 树根结点的值是8
   *  2. 8位于中序遍历组合的第3号位置
   *  3. 中序遍历组合中，8的左边是它的左子节点，剩余的就是8的右子节点。
   *  4. 前序遍历组合中，8的右边3个元素是它的左子节点，剩余的元素是它的右子节点。
   *
   * @param prologueArr 前序遍历的结果
   * @param middleOrderArr 中序遍历的结果
   */
  buildBinaryTree(prologueArr: T[], middleOrderArr: T[]): Node<T> | null {
    // 递归基线条件
    if (prologueArr.length === 0 || middleOrderArr.length === 0) {
      return null;
    }
    // 根结点元素
    const root = prologueArr[0];
    // 根据根结点元素构建树节点
    const tree = new Node(root);
    // 获取根结点在中序遍历中的位置
    let index = 0;
    for (let i = 0; i < middleOrderArr.length; i++) {
      if (middleOrderArr[i] === root) {
        break;
      }
      index++;
    }

    // 递归填充它的左子树
    // 在前序遍历中，根节点后面的index个元素就是它的左子树，剩余的就是它的右子树
    // 在中序遍历中，根结点左边的节点就是左子树，剩余的就是它的右子树
    // 因此，当前节点的前序遍历结果为前序遍历的1号位置到index位置(包含index)的元素
    // 因此，当前节点的中序遍历结果为中序遍历的0号位置index位置
    tree.left = <Node<T>>(
      this.buildBinaryTree(
        prologueArr.slice(1, index + 1),
        middleOrderArr.slice(0, index)
      )
    );
    // 递归填充它的右子树，左子树已经填充完成剩余的就是右子树，index+1到它的末尾
    tree.right = <Node<T>>(
      this.buildBinaryTree(
        prologueArr.slice(index + 1),
        middleOrderArr.slice(index + 1)
      )
    );
    // 返回tree，出栈，直至栈内元素被清空，二叉树重建完毕，问题解决。
    return tree;
  }

  /**
   * 寻找二叉树的下一个节点
   * 规则:
   *  1. 输入一个包含父节点引用的二叉树和其中的一个节点
   *  2. 找出这个节点中序遍历序列的下一个节点
   *
   * 例如：
   *       8
   *      / \
   *     6   13
   *    / \  / \
   *   3  7 9  15
   *
   * 6的下一个节点是7，8的下一个节点是9
   *
   * 通过分析，我们可以得到下述信息：
   *  1. 如果一个节点有右子树，那么它的下一个节点就是其右子树中的最左子节点
   *  2. 如果一个节点没有右子树：
   *  (1). 当前节点属于父节点的左子节点，那么它的下一个节点就是其父节点本身
   *  (2). 当前节点属于父节点的右子节点，沿着父节点的指针一直向上遍历，直至找到一个是它父节点的左子节点的节点
   *
   */
  findBinaryTreeNextNode(
    tree: BinarySearchTree<number>,
    node: number
  ): null | Node<number> {
    // 搜索节点
    const result: Node<number> | boolean = tree.search(node);
    if (result == null) throw "节点不存在";
    let currentNode = result as Node<number>;
    // 右子树存在
    if (currentNode.right) {
      currentNode = currentNode.right;
      // 取右子树的最左子节点
      while (currentNode.left) {
        currentNode = currentNode.left;
      }
      return currentNode;
    }

    // 右子树不存在
    while (currentNode.parent) {
      // 当前节点等于它父节点的左子节点则条件成立
      if (currentNode === currentNode.parent.left) {
        return currentNode.parent;
      }
      // 条件不成立，继续获取它的父节点
      currentNode = currentNode.parent;
    }
    return null;
  }
}
