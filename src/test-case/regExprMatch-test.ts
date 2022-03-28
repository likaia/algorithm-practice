import { RegExprMatch } from "../RegExprMatch.ts";

const regExprMatch = new RegExprMatch();
let result = regExprMatch.match("dpaaab", "d.a*b");
console.log("匹配结果", result);
result = regExprMatch.match("dsaaap", "d.a*b");
console.log("匹配结果", result);
