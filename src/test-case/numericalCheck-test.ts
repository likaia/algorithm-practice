import { NumericalCheck } from "../NumericalCheck";

let str = "123.45e+6";
const numericalCheck = new NumericalCheck();
let checkResult = numericalCheck.isNumber(str);
printCheckResult();

str = "  .12e1   ";
checkResult = numericalCheck.isNumber(str);
printCheckResult();

str = "12e";
checkResult = numericalCheck.isNumber(str);
printCheckResult();

str = "1.2.3";
checkResult = numericalCheck.isNumber(str);
printCheckResult();

function printCheckResult() {
  console.log(`字符串${str}是否为数值校验结果为：${checkResult}`);
}
