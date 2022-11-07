import { TreeOperate } from "../TreeOperate.ts";
import { Node } from "../lib/Node.ts";
import { codeType, treeNode } from "../type/TreeModuleType.ts";

const treeOperateTest = new TreeOperate();
// const node: Node<number> = {
//   key: 8,
//   left: {
//     key: 6,
//     left: {
//       key: 5
//     },
//     right: {
//       key: 7
//     }
//   },
//   right: {
//     key: 10,
//     left: {
//       key: 9
//     },
//     right: {
//       key: 11
//     }
//   }
// };
// treeOperateTest.topDownOutput(node, (key) => {
//   console.log(key);
// });
//
// const tree: treeNode<number> = {
//   key: 1,
//   children: [
//     { key: 2, children: [{ key: 7, children: [{ key: 8 }] }] },
//     { key: 3, children: [{ key: 9, children: [{ key: 12 }] }] },
//     { key: 4, children: [{ key: 10, children: [{ key: 11 }] }] },
//     { key: 5 },
//     { key: 6 }
//   ]
// };
// // 按层遍历树结构数据
// treeOperateTest.treeDataByLayer(tree, (key) => {
//   console.log(key);
// });

// const node: Node<number> = {
//   key: 1,
//   left: {
//     key: 2,
//     left: {
//       key: 4,
//       left: {
//         key: 8
//       },
//       right: {
//         key: 9
//       }
//     },
//     right: {
//       key: 5,
//       left: {
//         key: 10
//       },
//       right: {
//         key: 11
//       }
//     }
//   },
//   right: {
//     key: 3,
//     left: {
//       key: 6,
//       left: {
//         key: 12
//       },
//       right: {
//         key: 13
//       }
//     },
//     right: {
//       key: 7,
//       left: {
//         key: 14
//       },
//       right: {
//         key: 15
//       }
//     }
//   }
// };
// treeOperateTest.zigzagPrint(node, (key) => {
//   console.log(key);
// });
//
// const arr = [5, 7, 6, 9, 11, 10, 8];
// // const arr = [7, 4, 6, 5];
// console.log("比对结果", treeOperateTest.verifySequenceOfBST(arr, arr.length));

const tree: Node<number> = {
  key: 10,
  left: {
    key: 5,
    left: {
      key: 4
    },
    right: {
      key: 7
    }
  },
  right: {
    key: 20
  }
};
// const targetVal = 22;
// const resultPath = treeOperateTest.findPath(tree, targetVal);
// console.log(resultPath);

const dataObj: Array<codeType<string>> = [
  {
    code: "a0",
    children: [{ code: "a1", children: [{ code: "a2" }] }]
  },
  {
    code: "b0",
    children: [{ code: "b1", children: [{ code: "b2" }] }]
  }
];

const result = treeOperateTest.flattenTree(dataObj);
console.log(result);
