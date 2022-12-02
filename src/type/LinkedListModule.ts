export type complexListNodeType = {
  value: number;
  next?: complexListNodeType;
  sibling?: complexListNodeType | null;
};
