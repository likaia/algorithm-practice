import IntegerPower from "../IntegerPower";

const powerHandler = new IntegerPower();
const result1 = powerHandler.power(5, 6);
const result2 = powerHandler.power(3, -4);
const result3 = powerHandler.power(0, 0);
const result4 = powerHandler.power(0, 3);
const result5 = powerHandler.power(0, -3);
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
