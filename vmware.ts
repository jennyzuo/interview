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
    function convertHundred(num) {
        const v1 = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const v2 = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        let res = '';
        if (num >= 100) {
            let ord = Math.floor(num/100);
            res = `${v1[ord - 1]} Hundreds`;
            num = num % 100;            
        }
        if (num >= 20) {
            let ord = Math.floor(num/10);
            res = res.length > 0 ? `${res} ${v2[ord - 2]}` : `${v2[ord - 2]}`;
            num = num % 10;
        }
        if (num > 0) {
            res = res.length > 0 ? `${res} ${v1[num - 1]}` : `${v1[num - 1]}`;
        }
        return res;
    }
    let res = '';
    const v = ['', 'Thousand', 'Million', 'Billion'];
    for (let i = 0; i < v.length && num > 0; i++) {
        let part = num % 1000;
        if (part > 0) {
            res = `${convertHundred(part)} ${v[i]} ${res}`;
        }
        num = Math.floor(num / 1000);
    }
    return res.length === 0 ? "Zero" : res;
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

//题目是给定一个2d matrix of letters和一个dictionary，找出一条path包含最多的存在于字典的word个数 讨论了半天算法，真到写code的时候时间就来不及了，test case没来得及写，也没来得及优化。
//用了dfs backtracking 暴力解法。应该就是挂在这一轮。

//Design Airbnb翻译系统，就是AIRBNB在不同国家的网站用的是不同的语言，然后AIRBNB要把英语网站怎么翻译过去，要你DESIGN这个系统
//设计是地里的经典老题做翻译系统，要求之前地里同学也提过，
//就是有三个人，前端工程师，翻译官和用户的体验都要做好，他用了很久来解释这个题。这题我也是做了很久的准备，
//包括他们的blog和自己公司的经验。但这个题目和面试官完全无法交流的感觉。可能是因为我没有前端经验，
//他上来就问在这个html里怎么加一个service call然后说不用管syntax，我想那这不就一行code call后端API不就行了么，
//然后给了点参数，他说要包含可翻译的和不可翻译的部分，那我就加上去了，然后就在API应该怎么写这讨论了五分钟，
//不是说系统怎么design，就是这一行code要怎么写。有一种和小学生讨论的错觉，他问了很多 “这还用说” 这种类型的问题。
//做过design的人都知道，API设计是一个整体，前中后都要考虑，光说前端应该要什么怎么能design好呢？面试官草草说赶快到下一个环节。
//下一个环节他说你设计一下schema好了。说有一个网站是显示需要翻译的东西的，问你怎么设计table。
//那我就说他需要什么我就给什么就好了，直接一个表里需要的column都加上，加了index和composit primary key。
//他也没问别的。最后就说怎么能让user看翻译的东西更快，假设network很慢怎么办。这个时候已经没什么时间了，
//我也没考虑太多，给webserver后面加了个cache，然后让internal network可以去更新这个cache然后external user只看cache不看别的。
//现在想想都不知道应该怎么办，当时说network再慢也要make call吧，我们可以在浏览器cache一下翻译的东西能避免新的call，
//其他的怎么样都要call 一次吧。他还是没说什么，然后就结束了。
//，面经也提到过,因为他们家支持26+语言，每次在页面上更改信息或者添加新的页面，都需要生成不同语言的网页。
//需要设计一个micro service，需求是要和front end decouple，就是front end engineer在更改完页面之后，不需要自己操作，
//这个service就能自行的完成翻译。我就是这一点没有答好，我想的是，code change之后总得需要commit什么的吧，在那个时候，
//send request 到这个service。面试官表示不能认可。我就不知道如何decouple from front end。而且最后feedback是high level都是可以的，但是具体细节不知道怎么实现的。。
//你们一个内部的service，问我具体怎么实现的。。
//其他部分的设计可以参考这个link http://nerds.airbnb.com/launching-airbnb-jp/
//翻译系统。面试官问的比较细，web server怎么分工，数据库schema怎么设计，memcache放哪儿，
//是怎么工作的，要不要设置TTL，网站响应时间大概是什么量级，等等。卤煮没啥经验，这一轮面得也一般。

// 中心思想就是我爱旅游， 我喜欢不同的文化， 世界上的恐惧都是不了解造成的。（我确实爱旅游， 我确实喜欢不同文化） 
//然后airbnb 的core value也要看看， 把自己的经历往那上扯就好
//(有很多人不知道这两个环节如何让面试官感觉你高度认同他们家的公司文化，
//有空可以多看看engineer blog http://nerds.airbnb.com/， 
//里面有自己人的采访，多看看。而且也可以从blog里延伸出来一些你可以问他们的问题，这样就不会蜜汁尴尬了）
//问题有你过去一年有没有很热情的帮助过别人，如果你下一年不愁钱了打算干啥之类，
//有没有人对你某个观念转变产生过很大影响。卤煮最后一个问题说了个在吃的观念上的转变，然后面试官好像还挺high，
//问我在中餐之外最喜欢吃啥，我说了个New Orleans sea food，被她听成了soul food，
//还很热情给我推荐三藩里面有家叫Hard Knox的soul food。看来天下吃货是一家，任何时候说吃的都是个好话题。。
//核心价值观面试两轮，问你天天玩什么，问我有过什么adventure，我说你看我这么胖，我从恶魔岛游回来了你怕不怕。
//core value面完全就是问些莫名其妙的东西，比如你想去哪旅游。当然有一点要注意，Airbnb的优点不是在于便宜！
//而是在于能够更好的了解local culture，不管你认不认同都要这么说……
//describe you team 
//how to work with disagreements
//whats your role in a team
//why you love traveling
//where do you see our company in 10 years.
//why airbnb? 哪些feature需要改进？做过什么risky的事？十年后airbnb是什么样？崇拜谁？ etc
//behavior1：好像是和客服相关的部门？问了觉得airbnb最大的挑战是什么，还有我的旅行经历。
//behavior2：长得像杀手leon的engineer。问了挺多问题，都是不同角度，很仔细的问了我对airbnb文化的理解，
//我对自己的理解还有我的character是怎么和airbnb文化conform的
//问了the most hospitable pserson you met, the biggest trade off in your project.
//你想给空气床加什么功能？如果能给空气床减功能，你减什么？你为啥要来空气床，给俩原因？等等。
//9) if you have a book that writes about your whole life, will you read it? why?
//10) if you have a time machine, and you can either go back or go forth, will you choose to go back or to go forth?
//5) where have you been to?
//6) what will you do if you win a lottery such as Powerball?
//7) what is the biggest fear in your life?
//8) how do describe Airbnb to a people back to 2003?
//why airbnb? among all the features of airbnb, what do you want to improve? 
//之前的airbnb经历
//对于在airbnb工作有什么顾虑吗
//讲一个帮助其他人的事情
//讲一个当时觉得risky的事情，从中学到了什么
//When working in teams, describe a time you made the biggest sacrifice. Describe the best team you've worked with. 
//Describe a company that you think is doing really well and explain why. 
//Describe one of the creative things you have done recently.
//为何Airbnb，描述下你自己的品质和你最admire的一个人
//如果有一张机票可以飞去世界的任何地方，你会去哪？
//你有什么帮助别人的经历？
//你有什么最自豪的经历？
//如果你现在创业，会做什么
//你如何看待airbnb在中国的发展？

