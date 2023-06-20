import BinaryOperation from "../BinaryOperation";

const binaryOperation = new BinaryOperation();
const result = binaryOperation.getBinaryOneNum(80);
const result2 = binaryOperation.getBinaryOneNum(-80);
console.log(`80的二进制表示中有${result}个1`);
console.log(`-80的二进制表示中有${result2}个1`);
