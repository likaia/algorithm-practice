export type BinaryTreeNode = {
  key: number;
  left?: BinaryTreeNode | null;
  right?: BinaryTreeNode | null;
};

export type treeNode<T> = {
  key: T;
  children?: Array<treeNode<T>>;
};

export type codeType<T> = {
  code: T;
  children?: Array<codeType<T>>;
};

export type serializeNode = {
  nodeVal: string;
};
