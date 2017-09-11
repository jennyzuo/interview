function basicCal(str) {
    const opst = [], numst = [];
    let n = 0;
    str = '(' + str + ')';
    for(let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (!isNaN(+c)) {
            n = 10*n + parseInt(c, 10);
        } else if (c === '+' || c === '-' || c === '(') {
            if (n > 0) {
                numst.push(n);
                n = 0;
            }
            opst.push(c);
        } else if (c === ')') {
            if (n > 0) {
                numst.push(n);
                n = 0;
            }
            while (opst[opst.length - 1] !== '(') {
                let op = opst.pop();
                let a = numst.pop(), b = numst.pop();
                let r = op === '+' ? a + b : b - a;
                numst.push(r);
            }
            opst.pop();
        }
    }
    console.log(`${str.substring(1, str.length - 1)}=${numst[0]}`);
}
basicCal('(1+(4+5+2)-3)+(6+8)');
//basicCal('1-(2+3)');
class TreeNode {
    left;
    right;
    label;
    constructor(label) {
        this.label = label;
    }
}
function visit(root) {
    if (!root) return;
    visit(root.left);
    console.log(root.label);
    visit(root.right);
}
class BSTIterator {
    st = [];
    private go(node) {
        while (node) {
            this.st.push(node);
            node = node.left;
        }
    }
    constructor(node) {
        this.go(node);
    }
    hasNext() {
        return this.st.length > 0;
    }
    next() {
        if (!this.hasNext()) return;
        let node = this.st.pop();
        let r = node.label;
        node.right && this.go(node.right);
        return r;
    }
}
var root = new TreeNode(6);
root.left = new TreeNode(4);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(5);
root.right = new TreeNode(7);
const itor = new BSTIterator(root);
while(itor.hasNext()) {
    console.log(itor.next());
}

function longestconsecutive(node) {
    let max = 0, s = [];
    function dfs(node, tmp, len) {
        if (!node) return;
        len = tmp.length && node.label === tmp[tmp.length - 1] + 1 ? len + 1 : 1;
        tmp.push(node.label);
        if (len > max) {
            max = len;
            s = tmp.slice(tmp.length - len);
        }
        dfs(node.left, tmp, len);
        dfs(node.right, tmp, len);
        tmp.pop();
    }
    dfs(node, [], 0);
    console.log(max, s);
}
var root = new TreeNode(1);
root.right = new TreeNode(3);
root.right.left = new TreeNode(2);
root.right.right = new TreeNode(4);
root.right.right.right = new TreeNode(5);
longestconsecutive(root);

console.log('>>>>>>>>');
class Codec {
    encode(arr) {
        return arr.reduce((acc, ele) => acc + `${ele.length}/${ele}`, '');
    }
    decode(str) {
        const ret = [];
        while (str.length) {
            let i = str.indexOf('/');
            let len = parseInt(str.substring(0, i), 10);
            ret.push(str.substr(i + 1, len));
            str = str.substring(i + len + 1);
        }
        return ret;
    }
}
let qq = new Codec();
let ss = qq.encode(['a', 'ab', 'abc']);
r = qq.decode(ss);
console.log('r=', r);

function addOperators(str, target) {
    function dfs(str, pre, total, out, res) {
        if (str.length === 0 && total === target) {
            res.push(out);
            return;
        }
        for (let i = 1; i <= str.length; i++) {
            let cur = str.substr(0, i);
            if (cur.length > 1 && cur[0] === '0') return;
            let next = str.substr(i);
            cur = parseInt(cur, 10);
            if (out.length > 0) {
                dfs(next, cur, total + cur, out + '+' + cur, res);
                dfs(next, -cur, total - cur, out + '-' + cur, res);
                dfs(next, pre * cur, (total - pre) + pre * cur, out + '*' + cur, res);
            } else {
                dfs(next, cur, cur, cur.toString(), res);
            }
        }
    }
    const res = [];
    dfs(str, 0, 0, '', res);
    console.log(res);
}
addOperators('232', 8);
addOperators('123', 15);

class It {
    arr;
    i = 0;
    j = 0;
    constructor(arr) {
        this.arr = arr;
    }
    hasNext() {
        return this.i < this.arr.length && this.j < this.arr[this.i].length;   
    }
    next() {
        let r = this.arr[this.i][this.j++];
        if (this.j >= this.arr[this.i].length) {
            this.i++;
            this.j = 0;
        }
        return r;
    }
}
let m = new It([[1,2], [3], [4,5,6]]);
while (m.hasNext()) {
    console.log(m.next());
}

function fractionToDecimal(a, b) {
    let ret = Math.floor(a / b).toString();
    a = a % b;
    if (a === 0) return ret;
    ret += '.';
    const map = {};
    while (a !== 0) {
        if (map[a]) {
            let i = map[a];
            ret = `${ret.substring(0, i)}(${ret.charAt(i)}${ret.substring(i + 1)})`;
            break;
        }
        ret += Math.floor(a * 10/b);
        map[a] = ret.length - 1;
        a = (a*10)%b;
    }
    return ret;    
}
r = fractionToDecimal(1, 17);
console.log(r);
function gamelife(board) {
    console.log(board);
    let m = board.length, n = board[0].length;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            const cnt = dirs.reduce((acc, [x, y]) => {
                let a = i + x, b = j + y;
                if (a >= 0 && a < m && b >= 0 && b < n && (board[a][b] === 1 || board[a][b] === 2)) {
                    acc++;
                }
                return acc;
            }, 0);
            if (board[i][j] && (cnt < 2 || cnt > 3)) board[i][j] = 2;
            else if (!board[i][j] && cnt == 3) board[i][j] = 3;
        }
    }
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            board[i][j] %= 2;
        }
    }
}
const qb = [[1, 0, 1, 1], [0, 1, 1, 0], [1, 0, 1, 0], [0, 0, 0, 1]];
gamelife(qb);
console.log(qb);

function validTree(arr) {
    const map = arr.reduce((acc, [start, end]) => {
        acc[start] = acc[start] || [];
        acc[start].push(end);
        return acc;
    }, {});
    function dfs(cur, visited) {
        if (visited.has(cur)) return false;
        visited.add(cur);
        const nexts = map[cur];
        if (nexts) {
            for (let i = 0; i < nexts.length; i++) {
                if (!dfs(nexts[i], visited)) return false;
            }
        }
        return true;
    }
    return dfs(0, new Set());
}
r = validTree([[0, 1], [0, 2], [0, 3], [1, 4]]);
console.log('r=', r);
r = validTree([[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]);
console.log('r=', r);

function mergeInter(arr, [a, b]) {
    const ret = [];
    let start, i;
    if (a < arr[0][0]) {
        start = [a, b];
        i = 0;
    } else {
        start = arr[0];
        i = 1;
    }
    let [lastLeft, lastRight] = start;
    for (; i < arr.length; i++) {
        if (a <= lastRight) {
            lastRight = Math.max(lastRight, b);
        }
        let [currLeft, curRight] = arr[i];
        if (currLeft > lastRight) {
            ret.push([lastLeft, lastRight]);
            [lastLeft, lastRight] = [currLeft, curRight];
        } else {
            lastRight = Math.max(lastRight, curRight);
        }
        if (b < lastLeft) {
            ret.push(...arr.slice(i));
            return ret;
        }
    }
    ret.push([lastLeft, lastRight]);
    return ret;
}
r = mergeInter([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,9]);
console.log(r);
r = mergeInter([[6,7],[8,10],[12,16]], [4,9]);
console.log(r);
r = mergeInter([[1,3],[6,9]], [2,5]);
console.log(r);

function bstkmin(root, k) {
    let r;
    function dfs(node) {
        if (!node || !!r) return;
        dfs(node.left);
        if (--k === 0) {
            r = node.label;
        } else dfs(node.right);
    }
    dfs(root);
    return r;
}
r = bstkmin(root, 2);
console.log(r);
class LRUCache {
    cap;
    m;
    l
    constructor(capacity) {
        this.cap = capacity;
        this.m = {};
        this.l = [];
    }
    get(key) {
        if (!this.m[key]) return -1;
        let i = this.l.indexOf(this.m[key]);
        this.l.splice(i, 1);
        this.l.push(this.m[key]);
        return this.m[key][1];
    }
    set(key, value) {
        if (this.m[key]) {
            let i = this.l.indexOf(this.m[key]);
            this.l.splice(i, 1);
        } else {
            this.m[key] = [key, value];
        }
        this.l.push(this.m[key]);
        if (this.l.length > this.cap) {
            let [key, _] = this.l.shift();
            delete this.m[key];
        }
    }
}
const bw = new LRUCache(3);
bw.set('1', 'a');
bw.set('2', 'b');
bw.set('3', 'c');
//bw.set('4', 'd');
r = bw.get('2');
console.log(r);
r = bw.get('1');
console.log(r);
bw.set('4', 'd');
r = bw.get('3');
console.log(r);

function strobogrammatic(n) {
    function dfs(m, n) {
        if (m == 0) return [''];
        if (m == 1) return ['0', '1', '8'];
        const subs = dfs(m - 2, n), res = [];
        for (let sub of subs) {
            if (m != n) res.push(`0${sub}0`);
            res.push(`1${sub}1`);
            res.push(`6${sub}9`);
            res.push(`8${sub}8`);
            res.push(`9${sub}6`);
        }
        return res;
    }
    const r = dfs(n, n);
    console.log(r);
}
strobogrammatic(3);
function summaryRanges(arr) {
    let pre = arr[0];
    const ret = [];
    for (let i = 1; i <= arr.length; i++) {
        let curr = arr[i];
        if (curr !== arr[i - 1] + 1) {
            ret.push(curr - 1 - pre > 0 ? `${pre}-${arr[i - 1]}` : `${pre}`);
            pre = arr[i];
        }
    }
    console.log(ret);
}
summaryRanges([0,1,2,4,5,7]);
(function(str) {
    console.log('str=', str);
    let pre = '', comma = false, ret = [];
    for (let i = 0; i < str.length; i++) {
        let curr = str.charAt(i);
        if (curr === ' ') {
            if (comma) pre += curr;
            else {
                if (pre.length > 0) {
                    ret.push(pre);
                    pre = '';
                }
            }
        } else if (curr === `'`) {
            comma = !comma;
        } else pre += curr;
    }
    if (pre.length > 0) ret.push(pre);
    console.log(ret);
})(`I have a 'faux coat'`);

(function(arr) {
    function sum(a, b) {
        let s  = 0;
        while (arr[a] && arr[a][b]) {
            s += arr[a++][b++];
        }
        return s;
    }
    let a = arr.length - 1, b = 0;
    while (arr[a][b]) {
        let s = sum(a, b);
        console.log(s);
        if (a === 0) b++;
        else a--;
    }
})([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); //7, 12, 15, 8, 3

function squreOrder(arr) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = low + Math.floor((high - low)/2);
        if (arr[mid] > 0) high = mid - 1;        
        else low = mid + 1;
    }
    let i = Math.abs(arr[high] || Number.MAX_VALUE) < Math.abs(arr[low] || Number.MAX_VALUE) ? high : low;
    const ret = [];
    ret.push(arr[i] * arr[i]);
    let left = i - 1, right = i + 1;
    while (left >= 0 && right < arr.length) {
        let l = arr[left] * arr[left];
        let r = arr[right] * arr[right];
        if (l < r) {
            ret.push(l);
            left--;
        } else {
            ret.push(r);
            right++;
        }
    }
    for (; left >= 0; left--) ret.push(arr[left] * arr[left]);
    for (; right < arr.length; right++) ret.push(arr[right] * arr[right]);
    console.log(ret);
}
squreOrder([-8, -6, -4, -2, 1, 4, 7, 9, 12]);
squreOrder([1, 4, 7, 9, 12]);
squreOrder([-8, -6, -4, -1]);

function ordersort(arr) {
    arr.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        else return b[0] - a[0];
    });
    arr.forEach(([h, t], i) => {
        if (t !== i) {
            arr.splice(i, 1);
            arr.splice(t, 0, [h, t]);
        }
    });
    console.log(arr);
    /*
    const ret = [];
    arr.forEach(ele => {
        ret.splice(ele[1], 0, ele);
    });
    */
    //console.log(ret);
}
ordersort([[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]);//[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

function rerangeCool(str, k) {
    console.log(str, k);
    if (k == 0) return str;
    let res = '', len = str.length;
    const m = str.split('').reduce((acc, ele) => {
        acc[ele] = (acc[ele] || 0) + 1;
        return acc;
    }, {});
    const q = [];
    Object.keys(m).forEach(key => q.push([m[key], key]));
    while (q.length > 0) {
        const v = [];
        let cnt = Math.min(k, len);
        for (let i = 0; i < cnt; ++i) {
            if (q.length === 0) return '';
            q.sort((a, b) => b[0] - a[0]);
            let t = q.shift();
            res += t[1];
            if (--t[0] > 0) v.push(t);
            --len;
        }
        for (let a of v) q.push(a);
    }
    console.log(res);
    return res;
}
rerangeCool('aabbcc', 3);

function wordbreak(str, dict) {
    dict = new Set(dict);
    const possible = new Array(str.length + 1);    
    function dfs(startIdx, tmp, ret) {
        if (startIdx === str.length) {
            ret.push(tmp.join(' '));
            return;
        }
        for (let i = startIdx; i < str.length; i++) {
            let word = str.substring(startIdx, i + 1);
            if (dict.has(word) && possible[i + 1]) {
                tmp.push(word);
                let oldSize = ret.length;
                dfs(i + 1, tmp, ret);
                if (ret.length === oldSize) possible[i + 1] = false;
                tmp.pop();
            }
        }
    }
    possible.fill(true);
    const ret = [], tmp = [];
    dfs(0, tmp, ret);
    console.log(ret);
}
wordbreak('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog']);
console.log('>>>>>>>>');
function firstMissingPositive(arr) {
    for(let i = 0; i < arr.length; ++i) {
        while(arr[i] > 0 && arr[i] <= arr.length && arr[arr[i] - 1] != arr[i]) {
            let tmp = arr[arr[i] - 1];
            arr[arr[i] - 1] = arr[i];
            arr[i] = tmp;
        }
    }
    
    for(let i = 0; i < arr.length; ++ i)
        if(arr[i] !== i + 1)
            return i + 1;

    return arr.length + 1;
}
//firstMissingPositive([1,2,0]); //[3,4,-1,1]
r = firstMissingPositive([3,4,-1,1]);
console.log(r);