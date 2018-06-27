const ladderLength = (start, end, dict) => {
    console.log(start, end, dict);
    dict = new Set(dict);
    const gap = {}, q = [];
    q.push(start);
    gap[start] = 1;
    while (q.length) {
        let cur = q.shift();
        for (let i = 0; i < cur.length; i++) {
            for (let j = 'a'.charCodeAt(0); j < 'z'.charCodeAt(0); j++) {
                let nWord = cur.slice(0, i) + String.fromCharCode(j) + cur.slice(i + 1);
                if (nWord === end) return gap[cur] + 1;
                if (dict.has(nWord) && !gap[nWord]) {
                    gap[nWord] = gap[cur] + 1;
                    q.push(nWord);
                }
            }
        }
    }
    return 0;
};
let r = ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']);
console.log(r);
const helper = num => {
    let ret = '';
    const overtwenty = ['twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const under11 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const over11 = ['elevent', 'twenlve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    if (num >= 100) {
        ret += under11[Math.floor(num / 100) - 1] + ' hundred';
        num = num % 100;
    }
    if (num >= 20) {
        ret += (ret.length > 0 ? ' ' : '') + overtwenty[Math.floor(num / 10) - 2];
        num = num % 10;
    }
    if (num >= 11) {
        ret += (ret.length > 0 ? ' ' : '') + over11[num - 11];
    } else if (num > 0) {
        ret += (ret.length > 0 ? ' ' : '') + under11[num - 1];
    }
    return ret;
};
const convertMoney = num => {
    if (num === 0) return 'zero';
    const units = ['', 'Thousand', 'Million', 'Billion'];
    let ret = '', i = 0;
    while (num) {
        if (num % 1000 > 0) {
            ret = `${helper(num % 1000)} ${units[i]} ${ret}`;
        }
        num = Math.floor(num / 1000);
        i++;
    }
    return ret;
};
console.log('----------');
r = convertMoney(1000010);
console.log(r);
r = convertMoney(1234567);
console.log(r);
//123 -> "One Hundred Twenty Three"
//12345 -> "Twelve Thousand Three Hundred Forty Five"
//1234567 -> "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
const maxIsland = arr => {
    function dfs(i, j, visited) {
        let size = 1;
        visited.add(i * arr.length + j);
        if (i - 1 >= 0 && arr[i - 1][j] === 1 && !visited.has((i - 1) * arr.length + j)) {
            size += dfs(i - 1, j, visited);
        }
        if (i + 1 < arr.length && arr[i + 1][j] === 1 && !visited.has((i + 1) * arr.length + j)) {
            size += dfs(i + 1, j, visited);
        }
        if (j - 1 >= 0 && arr[i][j - 1] === 1 && !visited.has(i * arr.length + j - 1)) {
            size += dfs(i, j - 1, visited);
        }
        if (j + 1 < arr[0].length && arr[i][j + 1] === 1 && !visited.has(i * arr.length + j + 1)) {
            size += dfs(i, j + 1, visited);
        }
        return size;
    }
    const visited = new Set();
    let res = 0, max = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 1 && !visited.has(i * arr.length + j)) {
                res++;
                let size = dfs(i, j, visited);
                if (size > max) {
                    max = size;
                }
            }
        }
    }
    return { res, max };
};

r = maxIsland([
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1]
]);
console.log(r);


import { Node, visitBST } from './wish';
const root = new Node('aaaaa');
root.left = new Node('bb');
const a = new Node('cccccccc');
a.left = new Node('d');
a.right = new Node('ee');
root.right = a;
visitBST(root);
function serialize(root) {
    let ret = '';
    if (!root) return '#';
    //if (!root) return '#!';
    //ret += root.value + '!';
    ret += root.value.length + '!' + root.value;
    ret += serialize(root.left);
    ret += serialize(root.right);
    return ret;
}
r = serialize(root);
console.log(r);
function deserialize(str) {
    function re(q) {
        let value = q.shift();
        if (value === '#') return;
        const node = new Node(value);
        node.left = re(q);
        node.right = re(q);
        return node;
    }
    function parse(str) {
        const ret = [];
        let sIdx;
        while (str.length) {
            if (str[0] === '#') {
                ret.push('#');
                str = str.slice(1);
            } else {
                sIdx = str.indexOf('!');
                let len = parseInt(str.substring(0, sIdx), 10);
                let value = str.substr(sIdx + 1, len);
                ret.push(value);
                str = str.substring(sIdx + 1 + len);
            }
        }
        return ret;
    }
    const q = parse(str);
    //const q = [...str.split('!')];    
    return re(q);
}
r = deserialize(r);
visitBST(r);
/*  1
   / \
  2   3
     / \
    4   5
*/
r = new Node(1);
r.left = new Node(2);
let ab = new Node(3);
ab.left = new Node(4);
ab.right = new Node(5);
r.right = ab;
console.log('----------');
function zizigzag(root) {
    const sk1 = [], sk2 = [], ret = [];
    sk1.push(root);
    while (sk1.length || sk2.length) {
        let tmp = [];
        while (sk1.length) {
            let cur = sk1.pop();
            tmp.push(cur.value);
            if (cur.left) sk2.push(cur.left);
            if (cur.right) sk2.push(cur.right);
        }
        if (tmp.length) ret.push(tmp);
        tmp = [];
        while (sk2.length) {
            let cur = sk2.pop();
            tmp.push(cur.value);
            if (cur.right) sk1.push(cur.right);
            if (cur.left) sk1.push(cur.left);
        }
        if (tmp.length) ret.push(tmp);
    }
    return ret;
}
r = zizigzag(r);
console.log(r);

function reverseString(s) {
    function rev(arr, i, j) {
        while (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    const str = s.split('');
    let start;
    rev(str, 0, str.length - 1);
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ' && (i === 0 || str[i - 1] === ' ')) {
            start = i;
        }
        if (str[i] === ' ' && i > 0 && str[i - 1] !== ' ') {
            rev(str, start, i - 1);
            start = -1;
        }
    }
    if (start > 0) rev(str, start, str.length - 1);
    return str.join('');
}
r = reverseString('the    sky   is            blue');
console.log(r);
r = reverseString('  the a ');
console.log(r);
//return "blue is sky the".

function slidmax(arr, k) {
    const q = [], ret = [];
    for (let i = 0; i < arr.length; i++) {
        while (q.length && (arr[q[0]] <= arr[i] || i - q[0] >= k)) {
            q.shift();
        }
        q.push(i);
        if (i < k - 1) continue;
        ret.push(arr[q[0]]);
    }
    return ret;
}
r = slidmax([1, 3, -1, -3, 5, 3, 6, 7], 3); //[3,3,5,5,6,7]
console.log(r);
r = slidmax([4, 2, 12, 11, -5], 2);
console.log(r);

function maxMinPath(arr) {
    const dp = new Array(arr.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(arr[0].length);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            let max = Number.MIN_VALUE;
            if (i - 1 >= 0) {
                max = Math.max(dp[i - 1][j], max);
            }
            if (j - 1 >= 0) {
                max = Math.max(dp[i][j - 1], max);
            }
            dp[i][j] = Math.min(arr[i][j], max === Number.MIN_VALUE ? Number.MAX_VALUE : max);
        }
    }
    return dp[arr.length - 1][arr[0].length - 1];
}
console.log('------------');
r = maxMinPath([[8, 4, 7], [6, 5, 9]]);
console.log(r);

function multiplySelf(arr) {
    console.log(arr);
    let t = 1, s = 1;
    const ret = new Array(arr.length);
    ret.fill(1);
    for (let i = 0, j = arr.length - 1; i < arr.length; i++ , j--) {
        ret[i] *= t;
        ret[j] *= s;
        t *= arr[i];
        s *= arr[j];
    }
    return ret;
}
r = multiplySelf([1, 2, 3, 4]); //[24,12,8,6]
console.log(r);

function sort3(arr) {
    //return [...arr.filter(a => a === 1), ...arr.filter(a => a === 2), ...arr.filter(a => a === 3)];
    let i = 0, j = arr.length - 1, k = 0;
    while (k < j) {
        if (arr[k] === 1) {
            [arr[i], arr[k]] = [arr[k], arr[i]];
            i++;
            k++;
        } else if (arr[k] === 3) {
            [arr[k], arr[j]] = [arr[j], arr[k]];
            j--;
        } else k++;
    }
    return arr;
}
r = sort3([2, 3, 2, 2, 1, 1, 3, 2]);
console.log(r);
function sum(n) {
    const ret = function (x) {
        return sum(n + x);
    };
    ret.valueOf = ret.toString = function () {
        return n;
    };
    return ret;
}
r = sum(3)(4)(5);
console.log(r);
function RussianDoll(arr) {
    arr.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        else return a[0] - b[0];
    });
    const dp = new Array(arr.length);
    dp[0] = [1, 0];
    let max = 1;
    for (let i = 1; i < arr.length; i++) {
        dp[i] = [1, i];
        for (let j = 0; j < i; j++) {
            if (arr[j][0] < arr[i][0] && arr[j][1] < arr[i][1]) {
                if (dp[j][0] + 1 > dp[i][0]) {
                    dp[i] = [dp[j][0] + 1, j];
                }
                max = Math.max(dp[i][0], max);
            }
        }
    }
    console.log(max);
    console.log(dp);
}
RussianDoll([[5, 4], [6, 4], [6, 7], [2, 3]]); //([2,3] => [5,4] => [6,7]).
function add(a, b) {
    return a + b;
}
r = add(Number.MAX_VALUE, - 199);
console.log(r, isNaN(r), Number.isFinite(r));

function findAnagrams(s, p) {
    const map = {}, ret = [];
    p.split('').forEach(c => {
        map[c] = map[c] || 0;
        map[c] += 1;
    });
    let matches = 0;
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] !== undefined) {
            map[s[i]] -= 1;
            if (map[s[i]] >= 0) matches++;
        }
        if (i - p.length >= 0) {
            let f = s[i - p.length];
            if (map[f] !== undefined) {
                map[f] += 1;
                if (map[f] > 0) matches--;
            }
        }
        if (matches === p.length) ret.push(i - p.length + 1);
    }
    return ret;
}
r = findAnagrams('cbaebabacd', 'abc'); //[0, 6]
console.log(r);
r = findAnagrams('cbaaebabacd', 'aba'); //[0, 6]
console.log(r);
console.log('--------');
class ListNode {
    value;
    next;
    constructor(value) {
        this.value = value;
    }
    public static visit(node) {
        const r = [];
        while (node) {
            r.push(node.value);
            node = node.next;
        }
        console.log(r.join('=>'));
    }
}
let first = new ListNode(1);
let b = new ListNode(2);
let c = new ListNode(3);
let d = new ListNode(4);
let e = new ListNode(5);
first.next = b;
b.next = c;
c.next = d;
d.next = e;
function mergeLink(node) {
    function revList(head) {
        let a = head;
        let b = head.next;
        a.next = null;
        while (b) {
            let tmp = b.next;
            b.next = a;
            a = b;
            b = tmp;
        }
        return a;
    }
    function merge2List(h1, h2) {
        let head = new ListNode(0);
        let last = head;
        while (h1 && h2) {
            let n1 = h1.next;
            let n2 = h2.next;
            last.next = h1;
            h1.next = h2;
            last = h2;
            h1 = n1;
            h2 = n2;
        }
        if (h1) last.next = h1;
        if (h2) last.next = h2;
        return head.next;
    }
    let slow = node, fast = node;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let second = revList(slow.next);
    slow.next = null;
    return merge2List(node, second);
}
console.log('//////////');
ListNode.visit(first);
r = mergeLink(first);
ListNode.visit(r);
//1->last 1-> 2-> last 2->... i.e，1->2->3->4->5，==> 1->5->2->4->3
function splitEq(arr) {
    console.log(arr);
    let sum = arr.reduce((a, b) => a + b, 0) / 2;
    sum = Math.floor(sum) + 1;
    const dp = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        dp[i] = new Array(sum);
    }
    for (let i = 0; i < dp[0].length; i++) {
        if (i === arr[0]) dp[0][i] = 0;
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < sum; j++) {
            if (dp[i - 1][j] !== undefined) dp[i][j] = dp[i - 1][j];
            else if (j == arr[i] || (j > arr[i] && dp[i - 1][j - arr[i]] !== undefined)) dp[i][j] = i;
        }
    }
    for (var i = sum; i >= 0; i--) {
        if (dp[arr.length - 1][i] !== undefined) break;
    }
    let num = i, start = arr.length - 1;
    const one = new Set(), second = new Set();
    while (num > 0) {
        let index = dp[start][num];
        one.add(arr[index]);
        num -= arr[index];
        start -= 1;
    }
    for (let i = 0; i < arr.length; i++) {
        if (!one.has(arr[i])) {
            second.add(arr[i]);
        }
    }
    return [Array.from(one), Array.from(second)];
}
r = splitEq([2, 4, 6, 8, 10, 11]);
console.log(r);
function wordsearch(arr, str) {
    console.log(arr, str);
    function dfs(i, j, visited, index) {
        if (index === str.length - 1) return true;
        const m = arr.length, n = arr[0].length, dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        visited.add(i * n + j);
        for (let k = 0; k < dirs.length; k++) {
            let [x, y] = dirs[k], [row, col] = [x + i, y + j];
            if (row >= 0 && row < m && col >= 0 && col < n && 
                !visited.has(row * n + col) && arr[row][col] === str[index + 1]) {
                if (dfs(row, col, visited, index + 1)) return true;
            }
        };
        visited.delete(i * n + j);
        return false;
    }
    const visited = new Set();
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === str[0]) {
                if (dfs(i, j, visited, 0)) return true;
            }
        }
    }
    return false;
}
let matrix = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];
r = wordsearch(matrix, 'ABCCED');
console.log(r);
r = wordsearch(matrix, 'SEE');
console.log(r);
r = wordsearch(matrix, 'ABCB');
console.log(r);

function rev(str) {
    if (!!!str || typeof str !== 'string') return str;
    return str.split('').reverse().join('');
}
r = rev('abc');
console.log('r=', r);

console.log('<---------->');
const random = {
    [Symbol.iterator]: () => ({
        next: () => ({ value: Math.random() })
    })
}

function take(sequence, amount) {
    return {
        [Symbol.iterator]() {
            const iterator = sequence[Symbol.iterator]();
            return {
                next() {
                    if (amount-- < 1) {
                        return { done: true }
                    }
                    return iterator.next();
                }
            }
        }
    }
}

console.log([...take(random, 2)]);

const colors = {
    green: '#0e0',
    orange: '#f50',
    pink: '#e07',
    [Symbol.iterator]() {
        const keys = Object.keys(colors);
        return {
            next() {
                const done = keys.length === 0;
                const key = keys.shift();
                return {
                    done,
                    value: [key, colors[key]]
                }
            }
        }
    }
}
console.log([...colors]);
function playlist(songs, repeat) {
    return {
        [Symbol.iterator]() {
            let index = 0;
            return {
                next() {
                    if (index >= songs.length) {
                        repeat--;
                        index = 0;
                    }
                    if (repeat < 1) {
                        return { done: true }
                    }
                    const song = songs[index];
                    index++;
                    return { done: false, value: song }
                }
            }
        }
    }
}
function playSong(song, more) {
    console.log('play....', song);
    more();
}
function player(sequence) {
    const g = sequence[Symbol.iterator]();
    more();
    function more() {
        const item = g.next();
        if (item.done) return;
        playSong(item.value, more);
    }
}
const songs = [
    'Bad moon rising - Creedence',
    `Don't stop me now -Queen`,
    'The Scientist - Coldplay',
    'Somewhere only we know - Keane'
]
const sequence = playlist(songs, Infinity);
//player(sequence);

const fibonacci = {
    *[Symbol.iterator]() {
        let previous = 0;
        let current = 1;
        let i = 0;
        while (true) {
            yield current;
            const next = current + previous;
            previous = current;
            current = next;
            i++;
            if (i === 10) break;
        }
    }
}
let w = 0;
for (let i of fibonacci) {
    console.log(i);
}
const interval = duration => ({
    [Symbol.asyncIterator]: () => ({
        i: 0,
        next() {
            return new Promise(resolve =>
                setTimeout(() => resolve({
                    value: this.i++,
                    done: false
                }), duration)
            )
        }
    })
})
