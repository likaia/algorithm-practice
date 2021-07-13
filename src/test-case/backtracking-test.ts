import Backtracking from "../Backtracking.ts";

const pathArr = [
  ["a", "b", "t", "g"],
  ["c", "f", "c", "s"],
  ["j", "d", "e", "h"]
];
const target = "bfce";
const backtracking = new Backtracking();
const findResult = backtracking.findMatrixPath(pathArr, target);
console.log(`${target}在矩阵中的路径索引为`, findResult);
