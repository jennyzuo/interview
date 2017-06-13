/*
Given a tree,(binary tree possibily) every tree edge has a cost， find the least
cost or find the leaf node that the cost of path that from root to leaf is the least.
*/
class Edge {
    node;
    cost;
    constructor(node, cost) {
        this.node = node;
        this.cost = cost;
    }
}
class GNode {
    edges = [];
    label;
    constructor(label) {
        this.label = label;
    }
}
let minCost = Number.MAX_VALUE;
let minPath = [];
const pathMap = new Map();
const minCostRoot2Leaf = (node, path, cost) => {
    if (cost > minCost) return;
    if (pathMap.get(node) > 0 && cost >= pathMap.get(node)) return;
    pathMap.set(node, cost);
    if (node.edges.length === 0) {
        minCost = cost;
        minPath = [...path, node];
        return;
    }
    node.edges.forEach(edge => {
        path.push(node);
        minCostRoot2Leaf(edge.node, path, cost + edge.cost);
        path.pop();
    });
};
/*
*       n1
*   e1 /  \ e3
*     n2   n3
* e2 /
*   n4
*
* */
let n1 = new GNode('n1');
let n2 = new GNode('n2');
let n3 = new GNode('n3');
let n4 = new GNode('n4');
let e1 = new Edge(n2, 1);
let e2 = new Edge(n4, 2);
let e3 = new Edge(n3, 5);
n1.edges.push(e1);
n1.edges.push(e3);
n2.edges.push(e2);
minCostRoot2Leaf(n1, [], 0);
console.log(minPath.reduce((acc, node) => {
    return acc + node.label + ',';
}, ''));
console.log('minCost:' + minCost);