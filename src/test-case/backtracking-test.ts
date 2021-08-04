import Backtracking from "../Backtracking.ts";

const pathArr = [
  ["a", "b", "t", "g"],
  ["c", "f", "c", "s"],
  ["j", "d", "e", "h"]
];
const target = "bfce";
const backtracking = new Backtracking<string>();
const findResult = backtracking.findMatrixPath(pathArr, target);
console.log(`${target}在矩阵中的路径索引为`, findResult);
const totalCount = backtracking.movingCount(pathArr, 4);
const path = backtracking.path;
console.log(
  "机器人总共可走的格子总数为: ",
  totalCount,
  ",运动轨迹为: ",
  path.substr(0, path.length - 3)
);
