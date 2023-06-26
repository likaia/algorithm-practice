import { ArrayOfStrings } from "../ArrayOfStrings";

const arrayOfStrings = new ArrayOfStrings();
const result = arrayOfStrings.permute("abc");
console.log("字符串的所有排列", result);
console.log("字符串的所有组合", arrayOfStrings.combine("abc"));
console.log(
  "能否构成正方体",
  arrayOfStrings.isCubePossible([1, 2, 3, 4, 5, 6, 7, 8])
);
console.log("八皇后问题有", arrayOfStrings.eightQueens().length, "种摆法");
