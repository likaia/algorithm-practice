import { StackPushAndPopSequence } from "../StackPushAndPopSequence.ts";

const pushSuite = [1, 2, 3, 4, 5];
// const popSuite = [4, 5, 3, 2, 1];
const popSuite = [4, 3, 5, 1, 2];
const result = StackPushAndPopSequence(pushSuite, popSuite);
console.log(result);
