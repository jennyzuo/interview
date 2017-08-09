//  input 5
//    X  
//   XXX
//  XXXXX
//   XXX
//    X
const printStar = (curr, star, total) => {
    if (curr > total) return;
    console.log(' '.repeat((total - star)/2) + '*'.repeat(star));
    star += curr <= Math.floor(total/2) ? 2 : -2;
    printStar(curr + 1, star, total);
};
printStar(1, 1, 19);

const wordbreak = (str, dict, suffixMap) => {
    const ans = [];
    if (dict.has(str)) ans.push(str);
    for (let i = 1; i < str.length; i++) {
        let prefix = str.slice(0, i);
        if (!dict.has(prefix)) continue;
        let suffix = str.slice(i);
        let rest = !!suffixMap[suffix] ? suffixMap[suffix] : wordbreak(suffix, dict, suffixMap);
        if (rest) {
            rest.forEach(r => ans.push(prefix + ' ' + r));
        }
    }
    suffixMap[str] = ans;
    return ans;
};
const dict = ['cat', 'cats', 'and', 'sand', 'dog'];
const dictset = dict.reduce((acc, word) => acc.add(word), new Set());
const suffixMap = {};
const ans = wordbreak('catsanddog', dictset, suffixMap);
console.log('--------');
console.log(ans)

export class Node {
    value;
    left;
    right;
    constructor(value) {
        this.value = value;
    }
}
export const visitBST = root => {
    if (!!!root) return;
    visitBST(root.left);
    console.log(root.value);
    visitBST(root.right);
};
const insertBST = (value, root, path) => {
    let pre = root;
    while (root) {
        pre = root;
        if (path) path.push(pre.value);
        if (value < root.value) root = root.left;
        else root = root.right;
    }
    if (pre.value > value) pre.left = new Node(value);
    else pre.right = new Node(value);
    if (path) path.push(value);
};
const buildBST = (array, value1, value2) => {
    const root = new Node(array[0]);
    const path = {};
    for (let i = 1; i < array.length; i++) {
        if (array[i] === value1 || array[i] === value2) {
            path[array[i] + ''] = [];
        }
        insertBST(array[i], root, path[array[i] + '']);
    }
    visitBST(root);
    console.log(path);
    const v1 = path[value1 + ''], v2 = path[value2 + ''];
    let i;
    for (i = 0; i < Math.min(v1.length, v2.length); i++) {
        if (v1[i] !== v2[i]) break;
    }
    return (v2.length - i + v1.length - i);
};
let gap = buildBST([5,6,3,1,2,4], 2, 4);
console.log(gap);
/*Given a list of unique integers, construct the binary tree by given order without rebalancing, 
then find out the distance between two nodes.
public static int bstDistance(int[] values, int n, int node1, int node2)
values= [5,6,3,1,2,4], n is the size of values, node1 is 2, node2 is 4, then function return 3
/*三国演义 水浒传.
水浒传 红楼梦
哈利波特 时间简史
输出：
三国演义，水浒传，红楼梦
largest connected components
*/
let helper = (component, map, visited) => {
    const ret = [];
    visited.add(component);
    ret.push(component);
    map[component] && map[component].forEach(connect => {
        if (!visited.has(connect)) {
            ret.push(...helper(connect, map, visited));
        }
    });
    return ret;
};
const largestConnected = input => {
    const map = {};
    input.split('\n').forEach(line => {
        let pair = line.split(' ');
        map[pair[0]] = map[pair[0]] || [];
        map[pair[0]].push(pair[1]);
    });
    const visited = new Set();
    const path = [];
    let max = 0, maxConnects;
    for (let key in map) {
        if (visited.has(key)) continue;
        let connects = helper(key, map, visited);
        if (connects.length > max) {
            max = connects.length;
            maxConnects = connects;
        }
    }
    console.log(maxConnects);
};
let input = `a b
b c
x y
a k
k m
y u
u w`;
largestConnected(input);