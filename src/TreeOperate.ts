import { Node } from "./lib/Node.ts";
import BinarySearchTree from "./lib/BinarySearchTree.ts";
import Queue from "./lib/Queue.ts";
import { treeNode } from "./type/TreeModuleType.ts";
import Stack from "./lib/Stack.ts";

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

  /**
   * 按层遍历二叉树
   *  1. 创建一个队列用于存储树节点
   *  2. 将跟节点入栈, 遍历队列
   *    (1). 获取队首元素，执行回调函数
   *    (2). 队首元素的左子树或右子树不为null则将其入队
   */
  traverseByLayer(tree: Node<T>, callback: (key: T) => void): void {
    const nodeQueue = new Queue();
    nodeQueue.enqueue(tree);
    while (!nodeQueue.isEmpty()) {
      const teamLeader = nodeQueue.dequeue();
      callback(teamLeader.key);
      if (teamLeader.left) {
        nodeQueue.enqueue(teamLeader.left);
      }
      if (teamLeader.right) {
        nodeQueue.enqueue(teamLeader.right);
      }
    }
  }

  /**
   * 按层遍历树结构数据
   * @param tree
   * @param callback
   */
  treeDataByLayer(tree: treeNode<T>, callback: (key: T) => void): void {
    const nodeQueue = new Queue();
    nodeQueue.enqueue(tree);
    while (!nodeQueue.isEmpty()) {
      const teamLeader = nodeQueue.dequeue();
      callback(teamLeader.key);
      if (teamLeader.children) {
        for (let i = 0; i < teamLeader.children.length; i++) {
          nodeQueue.enqueue(teamLeader.children[i]);
        }
      }
    }
  }

  /**
   * 分行从上到下输出节点
   * @param tree
   * @param callback
   */
  topDownOutput(tree: Node<T>, callback: (key: string) => void): void {
    if (tree == null) return;
    const nodeQueue = new Queue();
    nodeQueue.enqueue(tree);
    let lineNode = "";
    let toBeOutputted = 1;
    let nextLevel = 0;
    while (!nodeQueue.isEmpty()) {
      const teamLeader = nodeQueue.dequeue();
      lineNode += " " + teamLeader.key;
      if (teamLeader.left) {
        nodeQueue.enqueue(teamLeader.left);
        nextLevel++;
      }
      if (teamLeader.right) {
        nodeQueue.enqueue(teamLeader.right);
        nextLevel++;
      }
      toBeOutputted--;
      if (toBeOutputted === 0) {
        callback(lineNode);
        lineNode = "";
        toBeOutputted = nextLevel;
        nextLevel = 0;
      }
    }
  }

  /**
   * 之字形打印二叉树
   * @param tree
   * @param callback
   * 需要两个栈，在打印某一层的节点时把下一层的子节点保存到对应的栈里。
   * 1. 当前打印的是奇数层，下一层则先保存左子节点再保存右子节点
   * 2. 当前打印的是偶数层，下一层则先保存右子节点再保存左子节点
   */
  zigzagPrint(tree: Node<T>, callback: (key: string) => void): void {
    const leftToRightStack = new Stack();
    const rightToLeftStack = new Stack();
    let curLevel = 1;
    leftToRightStack.push(tree);
    let lineNode = "";
    while (!leftToRightStack.isEmpty() || !rightToLeftStack.isEmpty()) {
      let stackTop = leftToRightStack.pop();
      // 奇数层: 从左到右输出
      if (curLevel % 2 === 1) {
        lineNode += " " + stackTop.key;
        if (leftToRightStack.isEmpty()) {
          callback(lineNode);
          lineNode = "";
          curLevel++;
        }
        // 下一层先保存左子节点，再保存右子节点
        this.saveNextLevelNode(rightToLeftStack, stackTop, "leftToRight");
        continue;
      }
      // 偶数层: 从右到左输出
      stackTop = rightToLeftStack.pop();
      lineNode += " " + stackTop.key;
      if (rightToLeftStack.isEmpty()) {
        callback(lineNode);
        lineNode = "";
        curLevel++;
      }
      // 下一层先保存右子节点，再保存左子节点
      this.saveNextLevelNode(leftToRightStack, stackTop, "rightToLeft");
    }
  }

  /**
   * 校验二叉树的后续遍历序列
   * @param sequence
   * @param length
   */
  verifySequenceOfBST(sequence: Array<number>, length: number): boolean {
    if (sequence == null || length <= 0) return false;
    const root = sequence[length - 1];
    // 左子树节点的值小于根节点的值
    let leftIndex = 0;
    for (; leftIndex < length - 1; leftIndex++) {
      if (sequence[leftIndex] > root) {
        break;
      }
    }
    // 右子树节点的值大于根节点的值
    let rightIndex = leftIndex;
    for (; rightIndex < length - 1; rightIndex++) {
      if (sequence[rightIndex] < root) {
        return false;
      }
    }

    // 判断左子树是否为二叉树
    let leftVerify = true;
    if (leftIndex > 0) {
      leftVerify = this.verifySequenceOfBST(sequence, leftIndex);
    }
    let rightVerify = true;
    if (leftIndex < length - 1) {
      rightVerify = this.verifySequenceOfBST(
        sequence.slice(leftIndex + 1),
        length - leftIndex - 1
      );
    }
    return leftVerify && rightVerify;
  }

  /**
   * 寻找二叉树中和为某一值的路径
   * @param root 根节点
   * @param expectedSum 路径的预期节点总和
   */
  findPath(root: Node<number>, expectedSum: number): Array<string> {
    if (root == null) return [];

    // 用一个栈来存储访问过的路径
    const pathStack = new Stack();
    // 存储符合条件的路径
    const pathList: Array<string> = [];
    // 当前已访问路径总和
    const currentSum = 0;
    // 从root节点开始搜索节点
    this.searchNode(root, expectedSum, pathStack, currentSum, pathList);
    return pathList;
  }

  /**
   * 通过前序遍历搜索节点
   * @param root 根节点
   * @param expectedSum 预期总和
   * @param pathStack 已访问的路径栈
   * @param currentSum 已访问路径总和
   * @param pathList 符合条件的路径
   * @private
   */
  private searchNode(
    root: Node<number>,
    expectedSum: number,
    pathStack: Stack,
    currentSum: number,
    pathList: Array<string>
  ) {
    // 累加当前已访问节点的和，将当前节点入栈
    currentSum += root.key;
    pathStack.push(root.key);

    // 如果是叶节点，并且路径上节点值的和等于输入的值，则存储当前路径栈中的节点
    const isLeaf = root.left == null && root.right == null;
    if (currentSum == expectedSum && isLeaf) {
      pathList.push(pathStack.toString());
    }
    // 非叶子节点，则遍历它的子节点
    if (root.left != null) {
      this.searchNode(root.left, expectedSum, pathStack, currentSum, pathList);
    }
    if (root.right != null) {
      this.searchNode(root.right, expectedSum, pathStack, currentSum, pathList);
    }

    // 当前节点不符合条件，将其出栈
    pathStack.pop();
  }

  /**
   * 按顺序向栈里储存树的下一层的节点
   * @param stack
   * @param treeNode
   * @param order
   * @private
   */
  private saveNextLevelNode(
    stack: Stack,
    treeNode: Node<T>,
    order: "leftToRight" | "rightToLeft"
  ): void {
    if (order === "leftToRight") {
      if (treeNode.left) {
        stack.push(treeNode.left);
      }
      if (treeNode.right) {
        stack.push(treeNode.right);
      }
      return;
    }
    // 从右往左保存
    if (treeNode.right) {
      stack.push(treeNode.right);
    }
    if (treeNode.left) {
      stack.push(treeNode.left);
    }
  }
}
