import { AdjustArrayOrder } from "../AdjustArrayOrder";

const adjustArrayOrder = new AdjustArrayOrder();
// 奇数在前
// const arr = [2, 4, 5, 6, 7, 8, 9, 11];
// adjustArrayOrder.reorderOddEven(arr);
// console.log(arr);

// 负数在前
// const checkMinusNumber = function (val: number) {
//   return val > 0;
// };
// const arr = [2, 4, 5, 6, 7, -8, -10 - 12, -2];
// adjustArrayOrder.reorder(arr, checkMinusNumber);
// console.log(arr);

// 能被3整除的数在前
const checkDivisible = function (val: number) {
  return val % 3 !== 0;
};
const arr = [2, 4, 5, 6, 3, 6, 9, 12];
adjustArrayOrder.reorder(arr, checkDivisible);
console.log(arr);
