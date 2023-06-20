import FindWhirlingArrayMinVal from "../FindWhirlingArrayMinVal";
const findWhirlingArrayMinVal = new FindWhirlingArrayMinVal();
let whirlArray = [3, 4, 5, 1, 2];
console.log(
  `旋转数组[${whirlArray}]的最小值为`,
  findWhirlingArrayMinVal.getMinValue(whirlArray)
);
whirlArray = [1, 0, 1, 1, 1];
console.log(
  `旋转数组[${whirlArray}]的最小值为`,
  findWhirlingArrayMinVal.getMinValue(whirlArray)
);
whirlArray = [1, 1, 1, 0, 1];
console.log(
  `旋转数组[${whirlArray}]的最小值为`,
  findWhirlingArrayMinVal.getMinValue(whirlArray)
);
