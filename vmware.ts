/*vmware
给5个argument: input_string, N, K, L, M,   分别代表字符串，N-字符串长度，K-最短子串长度，L-最长子串长度，M-最多不同字符的数量
要求是找出字符串中出现频率最高的子串的出现次数，只有  K <=  len(子串) <= L 并且子串中不同字符的数目不超过M的算。
还有一点注意你要自己写出parse STDIN的code来给你的函数提供argument
输入的范围是 2 <= N <= 100000
2 <= k <= L <= 26, L < N
2 <= M <= 26
e.g. 给 'abcde', 5, 2, 4, 26     返回结果 1， 因为没有长度超过1的重复子串
给 'ababababab', 10, 2, 4, 4， 返回结果 5, 因为ab出现5次并且长度在范围之内
给 'ababababab', 10, 4, 4, 4， 返回结果 4, 因为abab出现4次并且长度在范围之内
给 'abcdeabcde', 10, 2, 4, 3， 返回结果 2, 因为abc和bcd和cde都出现2次而且重复字符数不超过3.
*/

const maxSuffix = (str, min, max, diff) => {
    const suffixs = [];
    for (let i = 0; i < str.length; i++) {
        suffixs.push(str.slice(i));
    }
    const map = {};
    let m = [0, ''];
    for (let len = min; len <= max; len++) {
        for (let i = suffixs.length - min; i >= 0; i--) {
            let suffix = suffixs[i];
            if (suffix.length >= len) {
                let prefix = suffix.substring(0, len);
                if (new Set(prefix).size > diff) continue;
                map[prefix] = map[prefix] || 0;
                map[prefix] += 1;
                if (map[prefix] > m[0] || (map[prefix] === m[0] && prefix.length > m[1].length)) {
                    m[0] = map[prefix];
                    m[1] = prefix;
                }
            }
        }
    }
    console.log(m[0] + ':' + m[1]);
};
maxSuffix('ababababab', 2, 4, 4);
maxSuffix('ababababab', 4, 4, 4);
maxSuffix('abcdeabcde', 2, 4, 3);
maxSuffix('abcde', 2, 4, 26);

const minWinSubstring = (s, t) => {
    console.log(s, t);
    const map = {}, visit = {};
    for (let c of t) map[c] = (map[c] || 0) + 1;
    let left = 0, right = 0, count = 0, minLen = s.length, minIdx;
    while (true) {
        if (count == t.length) {
            if (right - left < minLen) {
                minLen = right - left;
                minIdx = left;
            }
            let c = s[left++];
            if (visit[c]) visit[c] -= 1;
            if (visit[c] < map[c]) count--;
        } else {
            if (right === s.length) break;
            let c = s[right++];
            if (map[c]) visit[c] = (visit[c] || 0) + 1;
            if (visit[c] <= map[c]) count++;
        }
    }
    console.log(minLen + ':' + s.substr(minIdx, minLen));
};
minWinSubstring('ADOBECODEBANC', 'ABC'); //BANC
minWinSubstring('ADOBECODAEBANC', 'ABCA'); //AEBANC

//Word ladder II
const wordladder = (start, end, dict) => {
    dict.push(end);
    const similary = {};
    dict.forEach(word => {
        for (let i = 0; i < word.length; i++) {
            let token = word.slice(0, i) + '_' + word.slice(i + 1);
            similary[token] = similary[token] || [];
            similary[token].push(word);
        }
    });
    const queue = [[start]], visited = new Set(), ret = [];
    visited.add(start);
    while (queue.length) {
        let words = queue.shift();
        if (ret.length && words.length > ret[0].length) continue;
        if (words[words.length - 1] === end) {
            if (ret.length && words.length < ret[0].length) {
                ret.length = 0;
            }
            ret.push(words);
        }
        for (let i = 0, word = words[words.length - 1]; i < word.length; i++) {
            let token = word.slice(0, i) + '_' + word.slice(i + 1);
            if (similary[token]) {
                similary[token].forEach(s => {
                    if (!visited.has(s) || s === end) {
                        visited.add(s);
                        const slice = words.slice();
                        slice.push(s);
                        queue.push(slice);
                    }
                });
            }
        }
    }
    return ret;
};
r = wordladder('hit', 'cog', ['hot','dot','dog','lot','log']);
//["hit","hot","dot","dog","cog"], ["hit","hot","lot","log","cog"]
console.log(r);
console.log('-----------');
//Merge Intervals
const mergeInterval = arr => {
    arr.sort((a, b) => a[0] - b[0]);
    const ret = [];
    ret.push(arr.shift());
    for (let i = 0; i < arr.length; i++) {
        let last = ret[ret.length - 1];
        if (arr[i][0] > last[1]) {
            ret.push(arr[i]);
        } else {
            last[1] = Math.max(last[1], arr[i][1]);
        }
    }
    return ret;
};
r = mergeInterval([[2,6],[8,10], [1,3], [15,18]]);
console.log(r);
//[1,6],[8,10],[15,18].

const isomorphic = (s, t) => {
    if (s.length !== s.length) return false;
    const smap = {}, tmap = {};
    for (let i = 0; i < s.length; i++) {
        if (!!!smap[s[i]] && !!!tmap[t[i]]) {
            smap[s[i]] = t[i];
            tmap[t[i]] = s[i];
        } else if (!!smap[s[i]] && !!tmap[t[i]]) {
            if (smap[s[i]] !== t[i] || tmap[t[i]] !== s[i]) return false;
        } else return false;
    }
    return true;
};
r = isomorphic('egg', 'add');
console.log(r);
r = isomorphic('foo', 'bar');
console.log(r);
r = isomorphic('paper', 'title');
console.log(r);

const itinerary = arr => {
    const tickets = {}, ret = [];
    arr.forEach(tick => {
        let [from, to] = tick;
        tickets[from] = tickets[from] || [];
        tickets[from].push(to);
        tickets[from].sort();
    });
    let start = 'JFK';
    ret.push(start);
    while (Object.keys(tickets).length) {
        let to = tickets[start].shift();
        if (tickets[start].length === 0) delete tickets[start];
        ret.push(to);
        start = to;
    }
    return ret;
};
r = itinerary([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]);
console.log(r); //["JFK", "MUC", "LHR", "SFO", "SJC"].
r = itinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]);
console.log(r); //["JFK","ATL","JFK","SFO","ATL","SFO"].
console.log('===============');
const courseschedule = arr => {
    const input = {}, outs = {}, queue = [], ret = [];
    arr.forEach(course => {
        let [cur, pre] = course;
        input[pre] = input[pre] || 0;
        input[cur] = (input[cur] || 0) + 1;
        outs[pre] = outs[pre] || [];
        outs[pre].push(cur);
    });
    for (let key in input) {
        if (input[key] === 0) {
            queue.push(key);
            delete input[key];
        }
    }
    while (queue.length) {
        let cur = queue.shift();
        ret.push(cur);
        outs[cur] && outs[cur].forEach(dep => {
            input[dep] -= 1;
            if (input[dep] === 0) {
                queue.push(dep);
                delete input[dep];
            }
        });
    }
    return ret;
};
r = courseschedule([[1,0]]) //2
console.log(r);
r = courseschedule([[1,0],[2,0],[3,1],[3,2]]);
console.log(r); // [0,1,2,3]
console.log('++++++++++++++');
//given busy slots, find all available time slot for everyone
const idle = arr => {
    const slots = new Map();
    arr.forEach(p => {
        p.forEach(slot => {
            let [start, end] = slot;
            if (!slots.has(start)) {
                slots.set(start, [start, 0]);
            }
            slots.get(start)[1]++;
            if (!slots.has(end)) {
                slots.set(end, [end, 0]);
            }
            slots.get(end)[1]--;
        });
    });
    let sum = 0, ret = [];
    Array.from(slots.values())
         .sort((a, b) => a[0] - b[0])
         .forEach(slot => {
             sum += slot[1];
             if (sum === 0) {
                 ret.push([slot[0], null]);
             } else if (ret.length && ret[ret.length - 1][1] === null) {
                 ret[ret.length - 1][1] = slot[0];
             }
         });
    return ret.filter(slot => slot[1] !== null);
};
r = idle([
  [[1, 3], [6, 7]],
  [[2, 4]],
  [[2, 3], [9, 12]]
]);
console.log(r); //[[4, 6], [7, 9]]
console.log('<><><><><><><><><>');
//cvs parser
/*
1. 如果逗号后面出现了一个引号A，那么现在立即进入“引号模式”。A引号不打印.
2.进入该模式后，引号必须是成对出现的。此时的每一对引号打印出来是一个引号。除此以外均原样打印
3.在引号模式中如果竟然遇到了一个单独出现的引号B，那么就立即退出“引号模式”。B引号不打印。
4.退出引号模式后到下一次遇到逗号之前，不会再次进入引号模式。所有出现的引号和其他字符全部原样打印。
*/

const cvsline = str => {
    let inComma = false, ret = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',') {
            ret += inComma ? str[i] : '|';
        } else if (str[i] === '"') {
            if (inComma) {
                if (str[i + 1] === '"') {
                    ret += '"';
                    i++;
                } else {
                    inComma = false;
                }
            } else if (str[i - 1] === ',') {
                inComma = true;
            }
        } else {
            ret += str[i];
        }
    }
    return ret;
};
const cvsparser  = str => {
    const ret = [];
    str.split('\n').forEach(line => {
        ret.push(cvsline(line));
    });
    return ret;
};
let cvs = `John,Smith,john.smith@gmail.com,Los Angeles,1
Jane,Roberts,janer@msn.com,"San Francisco, CA",0
"Alexandra ""Alex""",Menendez,alex.menendez@gmail.com,Miami,1
"""Alexandra Alex"""
Jane,Roberts,janer@msn.com,"San Francisco, CA",0
""""
"abc", a, b
a, b, c, d
a,"c,""1""",2,2,a"b
"abc ""d""", a, b`;

r = cvsparser(cvs);
console.log(r);

/*2) Consider the Excel spreadsheet. How does it know how to label the columns?
Given the column number (starting from zero) produce the label for the column.
For example "A", "B", "C" ... "YY", "ZZ"*/
for (let i = 0, j = 65; i < 26; i++, j++) {
    console.log(`${i} => ${String.fromCharCode(j)}`);
}
console.log(Math.floor(702/26), 702%26);
/*const convert2Title = n => {
    if (n < 0) return;
    let ret = String.fromCharCode(65 + n % 26);
    if (n < 26) return ret;
    n = Math.floor(n/26);
    while (n > 0) {
        ret = String.fromCharCode(65 + (n-1)%26) + ret;
        n = Math.floor((n - 1)/26);
    }
    return ret;
};*/
const convert2Title = n => {
    let ret = [String.fromCharCode(65 + n % 26)];
    n = Math.floor(n/26);
    while (n > 0) {
        ret.push(String.fromCharCode(65 + (n - 1)%26));
        n = Math.floor((n - 1)/26);
    }
    return ret.reverse().join('');
};

function minIndexSum(arr1, arr2) {
    const map = arr1.reduce((acc, elem, index) => {
        acc.set(elem, index);
        return acc;
    }, new Map());
    let min = Number.MAX_VALUE, item;
    arr2.forEach((ele, idx) => {
        let it = map.has(ele);
        if (it && (it + idx < min)) {
            min = it + idx;
            item = ele;
        }
    });
    return item !== undefined ? item : 'empty';
}
r = minIndexSum(['ab', 'barr', 'bar', 'foo' ,'bar'], ['bar', 'foo']);
console.log('r=', r);
function compress(str) {
    let pre = str.charAt(0), count = 1, ret = '';
    for (let i = 1; i <= str.length; i++) {
        if (str.charAt(i) === pre) count++;
        else {
            ret += pre + (count > 1 ? count : '');
            pre = str.charAt(i);
            count = 1;
        }
    }
    console.log(ret);
}
compress('aabcckmm');
function red(str) {
    return str.split('').reduce((acc, elem) => {
        if (elem !== acc[acc.length - 1]) {
            acc.push(elem);
        }
        return acc;
    }, []).join('');
}
r = red('aaaabbbsbbbdddddeeee');
console.log('r=', r);
function red2(str) {
    return str.split('').reduce((acc, elem) => {
        if (elem !== 'e' || elem !== acc[acc.length - 1]) {
            acc.push(elem);
        }
        return acc;
    }, []).join('');
}
r = red2('abbeeebbbbeeddedee');
console.log('r=', r);
function topColor(arr) {
    let map = {}, ret = [];
    arr.forEach(group => {
        group.forEach(color => {
            map[color] = map[color] || 0;
            map[color]++;
            if (ret.length === 0 || map[color] > map[ret[0]]) {
                ret = [color];
            } else if (map[color] === map[ret[0]]) {
                ret.push(color);
            }
        });
    });
    console.log(ret);
}
topColor([['red', 'black', 'green'], ['white', 'red', 'black'], ['black', 'red']]);

function sortBussiness(arr) {
    arr.sort((a, b) => {
        if (a.rating !== b.rating) return b.rating - a.rating;
        else arr.indexOf(a) - arr.indexOf(b);
    });
    console.log(arr);

}
sortBussiness([{'id': 101, rating: 5}, {'id': 102, rating: 2}, {'id': 103, rating: 3}, 
    {'id': 104, rating: 5}, {'id': 105, rating: 5}]);

function groupAnagrams(arr) {
    const r = arr.reduce((acc, ele) => {
        const key = ele.split('').sort().join('');
        acc[key] = acc[key] || [];
        acc[key].push(ele);
        return acc;
    }, {});
    console.log(r);
}
groupAnagrams(['abc', 'cab', 'xyz', 'pg', 'ppg', 'gp']);

function allUpper(str) {
    function combine(index, arr, tmp, ret) {
        if (index === arr.length) {
            ret.push(tmp.join(''));
            return;
        }
        if (!/[a-zA-Z]/.test(arr[index])) {
            tmp[index] = arr[index];
            combine(index + 1, arr, tmp, ret);            
        } else {
            [''.toLowerCase, ''.toUpperCase].forEach(method => {
                tmp[index] = method.apply(arr[index]);
                combine(index + 1, arr, tmp, ret);         
            });
        }
    }
    const s = str.split(''), tmp = new Array(str.length), ret = [];
    combine(0, s, tmp, ret);
    console.log(ret);
}
allUpper('a2b3m');

function atMostK(str, k) {
    let from = 0, max = -1, start = from;
    const uniq = {};
    for (let i = 0; i < str.length; i++) {
        let r = str.charAt(i);
        if (uniq[r]) {
            uniq[r]++;
        } else {
            while (Object.keys(uniq).length === k) {
                let first = str.charAt(from++); 
                uniq[first]--;
                uniq[first] === 0 && delete uniq[first];
            }
            uniq[r] = 1;
        }
        if (i - from + 1 > max) {
            max = i - from + 1;
            start = from;
        }
    }
    console.log(str.substring(start, start + max));
}
atMostK('eceba', 2);

function randomMine(n, m) {
    const pos = [];
    for (let i = 0; i < n*n; i++) pos.push(i);
    let t = n*n - 1;
    const set = new Set();
    for (let i = 0; i < m; i++) {
        let p = Math.floor(Math.random()* t);
        set.add(pos[p]);
        [pos[p], pos[t]] = [pos[t], pos[p]];
        t--;
    }
    pos.length = 0;
    for (let i = 0; i < n*n; i++) pos.push(set.has(i) ? '*' : '');
    console.log(pos);
}
randomMine(3, 4);

function randomWeight(arr) {
    function search(arr, value) {
        let left = 0, right = arr.length - 1;
        while (left < right) {
            let mid = left + Math.floor(right - left)/2;
            if (arr[mid][0] >= value && arr[mid][1] <= value) return mid;
            else if (arr[mid][0] < value) right = mid - 1;
            else left = mid + 1;
        }
    }
}
class TreeNode {
    left;
    right;
    value;
    constructor(value) {
        this.value = value;
    }
}
function buildTree(arr) {
    console.log(arr);
    const map = new Map(), candidates = new Set(), children = new Set();
    for (let i = 0; i < arr.length; i++) {
        let [parent, child] = arr[i];
        if (!map.has(parent)) map.set(parent, new TreeNode(parent));
        if (!map.has(child)) map.set(child, new TreeNode(child));
        if (map.get(parent).left) map.get(parent).right = map.get(child);
        else map.get(parent).left = map.get(child);
        if (!children.has(parent)) {
            candidates.add(parent);
        }
        if (candidates.has(child)) {
            candidates.delete(child);
        }
        children.add(child);
    }
    const root = candidates.values().next().value;
    console.log(JSON.stringify(map.get(root)));
}
buildTree([[1, 2], [1, 3], [3, 4], [4, 5]]);

class MinQueue {
    private st = [];
    private q = [];
    private store(x) {
        while(this.st.length > 0 && this.st[this.st.length - 1] > x) {
            this.st.pop();
        }
        this.st.push(x);
    }
    enqueue(x) {
        this.q.push(x);
        this.store(x);
    }
    dequeue() {
        let r = this.q.shift();
        if (this.st[0] === r) {
            this.st.shift();
        }
        return r;
    }
    findMin() {
        return this.st[0];
    } 
}
let q = new MinQueue();
q.enqueue(2);
q.enqueue(5);
console.log('min=', q.findMin());
console.log(q.dequeue());
console.log('min=', q.findMin())
console.log(q.dequeue());

function multiply(str1, str2) {
    const ret = new Array(str1.length + str2.length - 1);
    ret.fill(0);
    for (let i = str1.length - 1; i >= 0; i--) {
        for (let j = str2.length - 1; j >= 0; j--) {
            ret[i + j] += parseInt(str1.charAt(i), 10) * parseInt(str2.charAt(j), 10);
            if (ret[i + j] >= 10) {
                ret[i + j - 1] += Math.floor(ret[i + j]/10);
                ret[i + j] %= 10;
            }
        }
    }
    console.log(ret.join(''));
}
multiply('12345', '17');
console.log(12345 * 17);

function merger(arr1, arr2) {
    const map = new Map();
    [...arr1, ...arr2].forEach(ele => {
        if (map.has(ele.id)) map.get(ele.id).value += ele.value;
        else map.set(ele.id, ele);
    });
    const r = [...map.values()].sort((a, b) => a.value - b.value);
    console.log(r);
}
merger([{id:'0000', value:900}, {id:'0001', value:850}, {id:'0001', value:800}],
[{id:'0000', value:830}, {id:'0001', value:820}, {id:'0001', value:790}]);

compress('aabcckmm');
function cou(str) {
    let ret = '', pre = str.charAt(0), counter = 1;
    for (let i = 1; i < str.length; i++) {
        let c = str.charAt(i);
        if (c === pre) counter++;
        else {
            ret += counter + pre;
            counter = 1;
            pre = c;
        }
    }
    ret += counter + pre;
    console.log(ret);
}
r = cou('aaaabbbsbbbdddddeeee');

function count1(n) {
    r = Number(n).toString(2).split('').reduce((acc, ele) => acc += ele === '0' ? 0 : 1, 0);
    console.log(r);
    let t = 0;
    while (n > 0) {
        t += (n & 1) > 0 ? 1 : 0;
        n = n >>> 1;
    }
    console.log(t);
}
count1(42);
r = Number(42).toString(2);
console.log(r);

console.log('????????');
function checkId(str, real) {
    function isSame(a) {
        return a === real;
    }
    function dfs(index, str, tmp) {
        if (index === str.length) return isSame(tmp.join(''));
        if (isNaN(+str.charAt(index))) {
            const change = [str[index].toUpperCase(), str[index].toLowerCase()];
            for (let i = 0; i < change.length; i++) {
                tmp.push(change[i]);
                if (dfs(index + 1, str, tmp)) return true;
                tmp.pop();
            }
        } else {
            tmp.push(str.charAt(index));
            if (dfs(index + 1, str, tmp)) return true;
            tmp.pop();
        }
        return false;
    }
    const tmp = [];
    const ret = dfs(0, str, tmp);
    console.log('found:', ret, tmp);
}
checkId('1A2BC', '1a2Bc');

function screenFit(rows, col, sentence) {
    const all = sentence.join(' ');
    let res = 0, idx = 0, n = sentence.length, len = all.length;
    for (let i = 0; i < rows; ++i) {
        let colsRemaining = col;
        while (colsRemaining > 0) {
            if (sentence[idx].length <= colsRemaining) {
                colsRemaining -= sentence[idx].length;
                if (colsRemaining > 0) colsRemaining -= 1;
                if (++idx >= n) {
                    res += (1 + Math.floor(colsRemaining / len));
                    colsRemaining %= len;
                    idx = 0;
                }
            } else {
                break;
            }
        }
    }
    console.log('r=', res);
    return res;
}
screenFit(4, 5, ['I', 'had', 'apple', 'pie']);
screenFit(3, 6, ['a', 'bcd', 'e']);

function screenFit2(rows, col, sentences) {
    const next = new Array(sentences.length), times = new Array(sentences.length);
    for (let i = 0; i < sentences.length; i++) {
        let remain = 0, time = 0, cur = i;
        while (remain + sentences[cur].length <= col) {
            remain += sentences[cur++].length;
            if (remain < col) remain++;
            if (cur == sentences.length) {
                time++;
                cur = 0;
            }
        }
        next[i] = cur;
        times[i] = time;
    }
    let res = 0, cur = 0;
    for (let i = 0; i < rows; i++) {
        res += times[cur];
        cur = next[cur];
    }
    console.log('res=', res);
    return res;
}
screenFit2(4, 5, ['I', 'had', 'apple', 'pie']);
screenFit2(3, 6, ['a', 'bcd', 'e']);
function longestNotRep(str) {
    const map = new Set();
    let start = 0, maxLen = 0, maxStart = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (!map.has(c)) {
            if (i - start + 1 > maxLen) {
                maxLen = i - start + 1;
                maxStart = start;
            }
            map.add(c);
        } else {
            while (str.charAt(start) !== c) {
                map.delete(str.charAt(start));
                start++;
            }
            start++;
        }
    }
    console.log(maxStart, maxLen, str.substr(maxStart, maxLen)); //'bacdefg'
}
longestNotRep('abcaacdeabacdefgab'); //start=9, len=7
function longestNotRep2(str) {
    const map = {}, maxs = [];
    let maxLen = 0, start = 0, maxStart;
    for (let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (map[c] > start) {
            start = map[c];
        } else {
            if (i - start + 1 > maxLen) {
                maxLen = i - start + 1;
                maxStart = start;
                maxs.length = 0;
                maxs.push(start);
            } else if (i - start + 1 === maxLen) {
                maxs.push(start);
            }
        }
        map[c] = i + 1;
    }
    maxs.forEach(i => console.log(str.substr(i, maxLen)));
}
longestNotRep2('abcaacdeabacdefgabbxylqwppl');


function longContinuous(arr) {
    let res = 0;
    const seen = new Set(arr);
    for (let val of arr) {
        if (!seen.has(val)) continue;
        seen.delete(val);
        let pre = val - 1, next = val + 1;
        while (seen.has(pre)) seen.delete(pre--);
        while (seen.has(next)) seen.delete(next++);
        res = Math.max(res, next - pre - 1);
    }
    console.log(res);
    return res;
}
longContinuous([100, 4, 200, 1, 3, 2]);

function arrangeMovie(map) {
    const movies = Object.keys(map);
    function dfs(idx, tmp) {
        if (idx === movies.length) return true;
        const timeSlots = map[movies[idx]];
        for (let i = 0; i < timeSlots.length; i++) {
            if (tmp.indexOf(timeSlots[i]) >= 0) continue;
            tmp.push(timeSlots[i]);
            if (dfs(idx + 1, tmp)) return true;
            tmp.pop();
        }
        return false;
    }
    const tmp = [];
    const r = dfs(0, tmp);
    for (let i = 0; i < tmp.length; i++) {
        console.log(movies[i], tmp[i]);
    }
}
arrangeMovie({
    'Shining' : [14, 15, 16],
    'Baby driver' : [14, 15],
    'Pulp fiction' : [14, 15]
});//shining16, kill bill 15, pulp fiction 14

function findWeight(percent, arr) {
    for (let i = 1; i < arr.length; i++) {
        arr[i][1] += arr[i - 1][1];
    }
    let low = 0, high = arr.length - 1;
    while (low < high) {
        let mid = low + Math.floor((high - low)/2);
        if (arr[mid][1] >= percent && (mid == 0 || percent >= arr[mid - 1][1] + 1)) {
            return mid;
        } else if (arr[mid][1] < percent) {
            low = mid + 1;
        } else high = mid - 1;
    } 
    return low;
}
r = findWeight(82, [['alpha', 50], ['beta', 30], ['gamma', 20]]);
console.log(r);

console.log('>>>>>>>>');
function numberToWords(num) {
    function convertThousand(num) {
        const v1 = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const v2 = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        let ret = [];
        if (num >= 100) {
            let ord = Math.floor(num/100);
            ret.push(`${v1[ord - 1]} Hundreds`);
            num = num % 100;            
        }
        if (num >= 20) {
            let ord = Math.floor(num/10);
            ret.push(`${v2[ord - 2]}`);
            num = num % 10;
        }
        if (num > 0) {
            ret.push(`${v1[num - 1]}`);
        }
        return ret.join(' ');
    }
    let res = [];
    const v = ['', 'Thousand', 'Million', 'Billion'];
    for (let i = 0; i < v.length && num > 0; i++) {
        let part = num % 1000;
        if (part > 0) {
            res.unshift(`${convertThousand(part)} ${v[i]}`);
        }
        num = Math.floor(num / 1000);
    }
    return res.length === 0 ? "Zero" : res.join(' ');
}
r = numberToWords(123456677);
console.log(r);

function wildcard(str, pattern) {
    let scur = 0, pcur = 0, sstar, pstar;
    while (scur < str.length) {
        if (str.charAt(scur) == pattern.charAt(pcur) || pattern.charAt(pcur) === '?') {
            ++scur;
            ++pcur;
        } else if (pattern.charAt(pcur) === '*') {
            pstar = pcur++;
            sstar = scur;
        } else if (pstar) {
            pcur = pstar + 1;
            scur = ++sstar;
        } else return false;
    }
    while (pattern.charAt(pcur) === '*') ++pcur;
    return pcur === pattern.length;
}
r = wildcard('axybc', 'a*bc');
console.log('r=', r);

function combineTarget(arr, k) {
    const exp = arr.slice(0);
    function dfs(n) {
        if (n === 1) return Math.abs(arr[0] - k) < 0.0001;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let a = arr[i], b = arr[j], expa = exp[i], expb = exp[j];
                arr[j] = arr[n - 1];
                exp[j] = exp[n - 1];
                exp[i] = `(${expa} + ${expb})`;
                arr[i] = a + b;
                if (dfs(n - 1)) return true;
                exp[i] = `(${expa} - ${expb})`;
                arr[i] = a - b;
                if (dfs(n - 1)) return true;
                exp[i] = `(${expb} - ${expa})`;
                arr[i] = b - a;
                if (dfs(n - 1)) return true;
                exp[i] = `(${expa} * ${expb})`;
                arr[i] = a * b;
                if (dfs(n - 1)) return true;
                if (b != 0) {
                    exp[i] = `(${expa} / ${expb})`;
                    arr[i] = a / b;
                    if (dfs(n - 1)) return true;
                }
                if (a != 0) {
                    exp[i] = `(${expb} / ${expa})`;
                    arr[i] = b / a;
                    if (dfs(n - 1)) return true;
                }
                arr[i] = a;
                arr[j] = b;
                exp[i] = expa;
                exp[j] = expb;
            }
        }
    }
    const r = dfs(arr.length);
    console.log(r, exp[0]);
}
combineTarget([1, 50, 3, 6, 7], 60);

function combineMax(arr) {
    const exp = arr.slice(0);
    let max = Number.MIN_VALUE, str;
    function dfs(n) {
        if (n === 1) {
            if (arr[0] > max) {
                max = arr[0];
                str = exp[0];
            }
            return;
        }
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let a = arr[i], b = arr[j], expa = exp[i], expb = exp[j];
                arr[j] = arr[n - 1];
                exp[j] = exp[n - 1];
                exp[i] = `(${expa} + ${expb})`;
                arr[i] = a + b;
                dfs(n - 1);
                exp[i] = `(${expa} - ${expb})`;
                arr[i] = a - b;
                dfs(n - 1);
                exp[i] = `(${expb} - ${expa})`;
                arr[i] = b - a;
                dfs(n - 1);
                exp[i] = `(${expa} * ${expb})`;
                arr[i] = a * b;
                dfs(n - 1);
                if (b != 0) {
                    exp[i] = `(${expa} / ${expb})`;
                    arr[i] = a / b;
                    dfs(n - 1);
                }
                if (a != 0) {
                    exp[i] = `(${expb} / ${expa})`;
                    arr[i] = b / a;
                    dfs(n - 1);
                }
                arr[i] = a;
                arr[j] = b;
                exp[i] = expa;
                exp[j] = expb;
            }
        }
    }
    dfs(arr.length);
    console.log(str + '=' + max);
}
combineMax([1, 50, 3, 6, 7]);//给一列数字，任意两数用+ - * /，每数用一次求可以得到的最大值

(function() {
    class Node {
        val;
        children;
        constructor(val) {
            this.val = val;
            this.children = [];
        }
    }
    const root = new Node(0);
    const a = new Node(1);
    root.children.push(a);
    const b = new Node(2);
    root.children.push(b);
    const c = new Node(3);
    root.children.push(c);
    a.children.push(new Node(4));
    function visit(node, path) {
        if (node.children.length === 0) {
            path.unshift(node.val);
            console.log(path);
            path.shift();
            return;
        }
        path.unshift(node.val);
        node.children.forEach(n => {
            visit(n, path);
        });
        path.shift();
    }
    visit(root, []);
})()
function calcauate(str) {
    const operator = {'+' : (a, b) => a + b, '-' : (a, b) => a - b, '*' : (a, b)=>a*b, '/':(a, b)=>a/b};
    const st = [];
    let op = '+', n = 0;
    for (let i = 0; i <= str.length; i++) {
        let c = str.charAt(i);
        if (/\d/.test(c)) {
            n = 10 * n + parseInt(c, 10);
        } else {
            if (op === '+') st.push(n);
            if (op === '-') st.push(-n);
            if (op === '/' || op === '*') {
                let a = st.pop();
                st.push(operator[op](a, n));
            }
            n = 0;
            op = c;
        }
    }
    let r = 0;
    while (st.length) {
        r += st.pop();
    }
    return r;
}
r = calcauate('3+2*2');
console.log('r=', r);
console.log('============');
function calcauate2(str) {
    const operator = {'+' : (a, b) => a + b, '-' : (a, b) => a - b, '*' : (a, b)=>a*b, '/':(a, b)=>a/b};
    const st = [], num = []; let n = 0;
    for (let i = 0; i <= str.length; i++) {
        let c = str.charAt(i);
        if (/\d/.test(c)) {
            n = 10 * n + parseInt(c, 10);
        } else {
            if (n > 0) num.push(n);
            n = 0;
            if (c === ')') {
                while (st.length && st[st.length - 1] !== '(') {
                    num.push(operator[st.pop()](num.pop(), num.pop()));    
                }
                st.pop();
                continue;
            }
            if (['+', '-'].indexOf(c) >= 0 && ['*','/'].indexOf(st[st.length - 1]) >= 0) {
                num.push(operator[st.pop()](num.pop(), num.pop()));    
            }
            c && st.push(c);
        };
    }
    let res = 0;
    while (st.length) {
        num.push(operator[st.pop()](num.pop(), num.pop()));    
    }
    console.log(st, num);        
}
calcauate2('3+1+2*3');
//calcauate2('3+(1+(2+2)*3)');
(function() {
    function findKthLargest(nums, k) {
        let left = 0, right = nums.length - 1;
        while (true) {
            let pos = partition(nums, left, right);
            if (pos === k - 1) return nums[pos];
            else if (pos > k - 1) right = pos - 1;
            else left = pos + 1;
        }
    }
    function partition(nums, left, right) {
        let pivot = nums[left], l = left + 1, r = right;
        while (l <= r) {
            if (nums[l] < pivot && nums[r] > pivot) {
                [nums[l], nums[r]] = [nums[r], nums[r]];
                l++;
                r--;
            }
            if (nums[l] >= pivot) ++l;
            if (nums[r] <= pivot) --r;
        }
        [nums[left], nums[r]] = [nums[r], nums[left]];
        return r;
    }
    r = findKthLargest([3,2,1,5,6,4], 2);
    console.log('r==', r);
})();
(function() {
    function buyStock(arr) {
        let min = arr[0], max = 0;
        arr.forEach(price => {
            min = Math.min(min, price);
            max = Math.max(max, price - min);
        });
        console.log('max=', max);
    }
    buyStock([5, 8, 1, 3]);
    function buyStock2(arr, money) {
        let min = arr[0], shares = money/min, max = 0;
        arr.forEach(price => {
            min = Math.min(min, price);
            if (price > min) {
                max = Math.max(max, (price - min) * shares);
            } else {
                shares = money/min;
            }
        });
        console.log('max shares=', max);
    }
    buyStock2([5, 8, 1, 3], 100);    
})();
(function() {
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
})();
