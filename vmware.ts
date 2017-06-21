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
/*1. 如果逗号后面出现了一个引号A，那么现在立即进入“引号模式”。A引号不打印。
2.进入该模式后，引号必须是成对出现的。此时的每一对引号打印出来是一个引号。除此以外均原样打印
3.在引号模式中如果竟然遇到了一个单独出现的引号B，那么就立即退出“引号模式”。B引号不打印。
4.退出引号模式后到下一次遇到逗号之前，不会再次进入引号模式。所有出现的引号和其他字符全部原样打印。*/
const cvsline = str => {
    let inComma = false, ret = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',') {
            ret += inComma ? str[i] : '|';
        } else if (str[i] === '"') {
            if (i === 0 || str[i - 1] === ',') {
                inComma = true;
            } else if (inComma) {
                if (i + 1 < str.length && str[i + 1] === '"') {
                    ret += '"';
                    i++;
                } else if (i === str.length - 1 || str[i + 1] !== '"') {
                    inComma = false;
                }
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
"""Alexandra Alex"""`;
r = cvsparser(cvs);
console.log(r);