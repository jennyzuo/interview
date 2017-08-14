function isColMax(A, i, j) {
    let a = A[i][j];
    if (j > 0) {
        if (a <= A[i][j - 1]) return false;
    }
    if (j < A[0].length - 1) {
        if (a <= A[i][j + 1]) return false;
    }
    return true;
}
function isColMin(A, i, j) {
    let a = A[i][j];
    if (j > 0) {
        if (a >= A[i][j - 1]) return false;
    }
    if (j < A[0].length - 1) {
        if (a >= A[i][j + 1]) return false;
    }
    return true;
}
function isRowMax(A, i, j) {
    let a = A[i][j];
    if (i > 0) {
        if (a <= A[i - 1][j]) return false;
    }
    if (i < A.length - 1) {
        if (a <= A[i + 1][j]) return false;
    }
    return true;
}
function isRowMin(A, i, j) {
    let a = A[i][j];
    if (i > 0) {
        if (a >= A[i - 1][j]) return false;
    }
    if (i < A.length - 1) {
        if (a >= A[i + 1][j]) return false;
    }
    return true;
}
function solution(A) {
    let res = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (i == A.length - 1 || j == A[0].length - 1) continue;
            if (isRowMax(A, i, j) && isColMin(A, i, j)) {
                console.log(i, j, A[i][j]);
                res++;
            } else if (isRowMin(A, i, j) && isColMax(A, i, j)) {
                console.log(i, j, A[i][j]);
                res++;
            }
        }
    }
    return res;
}
let a = solution([[0, 1, 9, 3], [7, 5, 8, 3], [9, 2, 9, 4], [4, 6, 7, 1]]);
console.log(a);
console.log('----------------');
function solution33(n) {
    let binary = n.toString(2);
    let max = 0, start;
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '0') {
            if (i > 0 && binary[i - 1] === '1') {
                start = i;
            }
            if (i + 1 < binary.length && binary[i + 1] === '1') {
                if (start) {
                    max = Math.max(max, i - start + 1);
                }
            }
        }
    }
    return max;
}


a = solution33(6);
console.log(a);

function solution2(A, K) {
    K = K % A.length;
    let r = A.reverse();
    return [...r.slice(0, K).reverse(), ...r.slice(K).reverse()];
}

a = solution2([1, 1, 2, 3, 5], 42);
console.log(a);

function solution4(A) {
    let miss = 0;
    let j = 1;
    for (var i = 0; i < A.length; i++ , j++) {
        miss ^= A[i] ^ j;
    }
    miss ^= j;
    return miss;
}
a = solution4([1, 2, 3, 5]);
console.log(a);

function solution5(S) {
    if (S.length === 0) return 1;
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    const stk = [];
    for (let i = 0; i < S.length; i++) {
        let char = S[i];
        if (!(char in map)) {
            stk.push(char);
        } else if (stk.length && stk[stk.length - 1] !== map[char]) {
            return 0;
        } else {
            stk.pop();
        }
    }
    return stk.length === 0 ? 1 : 0;
}
a = solution5('([)()]');
console.log(a);

function solutiond(A) {
    let order = A.reduce((acc, item, index) => {
        acc.push([item, index]);
        return acc;
    }, []).sort((a, b) => a[0] - b[0]);
    let res = 0;
    for (let i = 0; i < A.length; i++) {
        if (order[i][1] !== i) {
            res++;
        }
    }
    return res;
}

a = solutiond([1, 2, 6, 5, 5, 8, 9]);
console.log(a);
a = solutiond([2, 1]);
console.log(a);

function findIdle(desire, busy) {
    busy = busy.sort((a, b) => a[0] - b[0]);
    let lastBusy = busy[0];
    const ret = [];
    for (let i = 1; i < busy.length; i++) {
        if (busy[i][0] <= lastBusy[1]) {
            lastBusy[1] = Math.max(lastBusy[1], busy[i][1]);
        } else {
            let first = Math.max(lastBusy[1], desire[0]);
            let last = Math.min(busy[i][0], desire[1]);
            if (first < last && first >= desire[0] && last <= desire[1]) {
                ret.push([first, last]);
            }
            lastBusy = busy[i];
        }
    }
    return ret;
}
a = findIdle([9, 14.5], [[9, 12.5], [8, 10], [14, 15]]); // [[12.5 - 14]]
console.log(a);
a = findIdle([10, 12], [[8, 9], [13, 14]]); //[[10 - 12]]
console.log(a);
a = findIdle([10, 13], [[4, 6], [9, 19]]);
console.log(a);

function calc(arr) {
    let str = arr[0].toString(), sum = arr[0];
    function next(idx, str, sum, pre) {
        if (idx === arr.length) {
            console.log(str + '=' + sum);
        } else {
            next(idx + 1, str + '+' + arr[idx], sum + arr[idx], arr[idx]);
            next(idx + 1, str + '-' + arr[idx], sum - arr[idx], -arr[idx]);
            if (pre !== 0) {
                next(idx + 1, str + '*' + arr[idx], sum - pre + pre * arr[idx], 0);
                arr[idx] !== 0 && next(idx + 1, str + '/' + arr[idx], sum - pre + pre / arr[idx], 0);
            } else {
                next(idx + 1, str + '*' + arr[idx], sum * arr[idx], 0);
                arr[idx] !== 0 && next(idx + 1, str + '/' + arr[idx], sum / arr[idx], 0);
            }
        }
    }
    next(1, str, sum, sum);
}
calc([1, 2, 3, 4]);
function missRange(low, hight, arr) {
    let last = low;
    const ret = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== last) {
            ret.push([last, arr[i] - 1]);
            last = arr[i] + 1;
        } else last++;
    }
    if (last <= hight) ret.push([last, hight]);
    return ret;
}
a = missRange(0, 99, [0, 1, 3, 50, 75]); //[“2”, “4->49”, “51->74”, “76->99”]
console.log(a);
a = missRange(0, 99, [3, 50, 96, 99]);
console.log(a);

function alienDict(arr) {
    const nexts = {}, map = {};
    function diff(first, second) {
        for (let i = 0; i < Math.min(first.length, second.length); i++) {
            let a = first.charAt(i), b = second.charAt(i);
            if (a !== b) {
                if (map[a] === undefined) map[a] = 0;
                map[b] = map[b] || 0;
                map[b] += 1;
                nexts[a] = nexts[a] || [];
                nexts[a].push(b);
                return;
            }
        }
    }
    for (let i = 1; i < arr.length; i++) {
        diff(arr[i - 1], arr[i]);
    }
    const q = [], ret = [];
    Object.keys(map).forEach(key => {
        if (map[key] === 0) q.push(key);
    });
    while (q.length > 0) {
        let char = q.shift();
        ret.push(char);
        if (nexts[char] === undefined) continue;
        for (let next of nexts[char]) {
            map[next]--;
            if (map[next] === 0) {
                delete map[next];
                q.push(next);
            }
        }
    }
    console.log(ret.join(''));
}
alienDict(['wrt', 'wrf', 'er', 'ett', 'rftt']); //wertf

function coolTime(k, arr) {
    const map = new Map();
    map.set(arr[0], 0);
    let next = 1;
    for (let i = 1; i < arr.length; i++) {
        if (!map.has(arr[i])) {
            map.set(arr[i], next);
        } else {
            next = Math.max(map.get(arr[i]) + k + 1, next);
            map.set(arr[i], next);
        }
        next++;
    }
    return next;
}
console.log(coolTime(2, [1, 2, 1]));
console.log(coolTime(2, [1, 1]));
console.log(coolTime(2, [1, 2, 3, 1]));
console.log(coolTime(3, [1, 2, 3, 4]));
console.log(coolTime(3, [1, 2, 1, 3])); //6
console.log(coolTime(3, [1, 1, 1, 1])); //13
console.log(coolTime(4, ['A', 'B', 'C', 'A', 'C', 'B', 'D', 'A'])); //11

function align(arr) {
    let zeroIdx = arr.indexOf(0);
    if (zeroIdx < 0) return arr;
    for (let i = zeroIdx + 1; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[zeroIdx++] = arr[i];
        }
    }
    for (let i = zeroIdx; i < arr.length; i++) arr[i] = 0;
    return arr;
}
console.log(align([1, 0, 2]));
console.log(align([0, 0, 1, 0, 2, 0, 0]));
console.log(align([1, 2, 3, 0]));
console.log(align([0, 1, 2, 3]));
console.log(align([1, 2, 3]));

function comb(n) {
    function all(i, length, start, sum, total, ret) {
        if (i === 0) {
            ret.push(sum);
            return;
        }
        if (start > length - 1) return;
        let newSum = Math.pow(2, length - 1 - start) + sum;
        if (newSum <= total) {
            all(i - 1, length, start + 1, newSum, total, ret);
        }
        all(i, length, start + 1, sum, total, ret);
    }
    function digit2(n) {
        return n.toString().length < 2 ? ('0' + n) : n;
    }
    for (let i = n; i >= 0; i--) {
        const hours = [];
        all(i, 4, 0, 0, 12, hours);
        const mins = [];
        all(n - i, 6, 0, 0, 59, mins);
        for (let h of hours) {
            for (let m of mins) {
                console.log(`${digit2(h)}:${digit2(m)}`);
            }
        }
    }
}
comb(2);

class customerIter {
    private arr;
    private indexs;
    private curr = 0;
    constructor(arr) {
        this.arr = arr;
        this.indexs = arr.reduce((acc, item, idx) => {
            if (arr[idx].length > 0) {
                acc.push([idx, 0]);
            }
            return acc;
        }, []);
    }
    public hasNext() {
        return this.indexs.length > 0;
    }
    public next() {
        let pos = this.indexs[this.curr];
        let r = this.arr[pos[0]][pos[1]];
        pos[1]++;
        if (pos[1] >= this.arr[pos[0]].length) {
            this.indexs.splice(this.curr, 1);
        } else {
            this.curr++;
        }
        if (this.curr >= this.indexs.length) {
            this.curr = 0;
        }
        return r;
    }
}
a = new customerIter([[1, 2, 3], [4, 5], [6, 7, 8, 9]]);
while (a.hasNext()) {
    console.log(a.next());
}

function arrangeMovie(movies, timeslots) {
    console.log(movies);
    console.log(timeslots);
    function all(idx, visited, ret) {
        if (idx === movies.length) {
            return true;
        }
        let movie = movies[idx];
        let allocate = timeslots[movie];
        for (let i = 0; i < allocate.length; i++) {
            if (!visited.has(allocate[i])) {
                ret.push(allocate[i]);
                visited.add(allocate[i]);
                if (all(idx + 1, visited, ret)) {
                    return true;
                } else {
                    ret.pop();
                    visited.delete(allocate[i]);
                }
            }
        }
        return false;
    }
    const visited = new Set();
    const ret = [];
    return all(0, visited, ret) === true ? ret : [];
}
a = arrangeMovie(['A', 'B', 'C', 'D'], {
    'A': [14, 15, 16, 17],
    'B': [14, 15, 16], 'C': [14, 15], 'D': [14, 15, 17]
});
console.log(a);

console.log('------------');
function solution(N) {
    if (!!!N || N <= 0) return;
    const divisors = [
        [105, 'FizzBuzzWoof'],
        [35, 'BuzzWoof'],
        [21, 'FizzWoof'],
        [15, 'FizzBuzz'],
        [7, 'Woof'],
        [5, 'Buzz'],
        [3, 'Fizz']
    ]
    function transfer(n) {
        for (let i = 0; i < divisors.length; i++) {
            if (n % divisors[i][0] === 0) return divisors[i][1];
        }
    }
    for (let i = 0; i <= N; i++) {
        console.log(transfer(i) || i);
    }
}
solution(24);

function threshold(arr, k) {
    console.log(arr, k);
    function all(idx, sum, ret) {
        if (idx >= arr.length && sum <= k) {
            ret.add(sum);
            return;
        }
        all(idx + 1, 10 * sum + arr[idx], ret);
        all(idx + 1, sum, ret);
    }
    const ret = new Set();
    all(0, 0, ret);
    console.log(ret);
}
threshold([0, 1, 2], 15);

console.log('===========');
function addMarker(str, dict) {
    function match(startIdx) {
        for (let word of dict) {
            if (str.startsWith(word, startIdx)) return word.length;
        }
    }
    let start = 0, end = (match(0) - 1 || 0) + 0, ret = '', isMatch = false;
    for (let i = 1; i < str.length; i++) {
        let matchLen = match(i) || 0;
        let nstart = i, nend = (matchLen > 0 ? matchLen - 1: 0) + nstart;
        if (nstart <= end || (isMatch && nstart - 1 === end && matchLen > 0)) {
            end = Math.max(end, nend);
            isMatch = true;
        } else {
            ret += isMatch ? `<b>${str.slice(start, end + 1)}</b>` : `${str.slice(start, end + 1)}`;
            start = nstart;
            end = nend;
            isMatch = false;
        }
    }
    ret += isMatch ? `<b>${str.slice(start, end + 1)}</b>` : `${str.slice(start, end + 1)}`;
    return ret;
}
const dict = new Set();
dict.add('abc');
dict.add('123');
console.log(addMarker('abcxyz123', dict));
dict.clear();
dict.add('aaa');
dict.add('aab');
dict.add('bc');
//dict.add('c');
console.log(addMarker('aaabbcc', dict));


class MyPromise {
    constructor(resovleAndreject) {
        resovleAndreject.then = function(cb = ()=> {}) {
            resovleAndreject(cb, () => {});
        }
        return resovleAndreject;
    }
}

/*
const pp = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('xyzk'), 100);
}).then(v => console.log('pppp:', v));
*/

function mul(str) {
    const st = [];
    let n = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (c === ' ') continue;
        else if (c === '(') st.push([]);
        else if (parseInt(c, 10) && parseInt(c, 10) <= 9) {
            n = 10 * n + parseInt(c, 10);
        } else if (c === ',') {
            st[st.length - 1].push(n);
            n = 0;
        } else if (c === ')') {
            st[st.length - 1].push(n);
            n = 0;
            if (st.length > 1 && st[st.length - 1].length !== st[st.length - 2].length) {
                throw new Error('invalidate');
            }
        } else throw new Error('invalidate');
    }
    let t = st.reduce((acc, item) => acc * item[2], 1);
    console.log('t=', t);
}
mul('(1, 2, 3)(4, 5, 6)(7, 8, 9)');

console.log('++++++++++++++');