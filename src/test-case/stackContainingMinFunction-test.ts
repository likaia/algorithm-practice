import { StackContainingMinFunction } from "../StackContainingMinFunction.ts";

const stackMinFn = new StackContainingMinFunction();
stackMinFn.push(3);
stackMinFn.push(5);
stackMinFn.push(7);
stackMinFn.push(12);
stackMinFn.push(1);
stackMinFn.push(9);
stackMinFn.push(0);
stackMinFn.pop();
stackMinFn.pop();
stackMinFn.pop();
console.log("当前栈内最小值为:", stackMinFn.min());
