export type BinaryTreeNode = {
  key: number;
  left?: BinaryTreeNode | null;
  right?: BinaryTreeNode | null;
};

export type treeNode<T> = {
  key: T;
  children?: Array<treeNode<T>>;
};
