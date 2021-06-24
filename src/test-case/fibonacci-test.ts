import Fibonacci from "../Fibonacci.ts";

const fibonacciTest = new Fibonacci(100);
console.log("斐波那契数列的第1000号位置的值为：", fibonacciTest.bottomUp());
