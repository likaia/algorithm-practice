import { StackPushAndPopSequence } from "../StackPushAndPopSequence.ts";

const pushSuite = [1, 2, 3, 4, 5];
const popSuite1 = [4, 5, 3, 2, 1];
const popSuite2 = [4, 3, 5, 1, 2];
const result1 = StackPushAndPopSequence(pushSuite, popSuite1);
const result2 = StackPushAndPopSequence(pushSuite, popSuite2);
console.log(result1, result2);
