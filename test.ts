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
                map[a] = map[a] || 0;
                map[b] = (map[b] || 0) + 1;
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
        let nstart = i, nend = (matchLen > 0 ? matchLen - 1 : 0) + nstart;
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
        resovleAndreject.then = function (cb = () => { }) {
            resovleAndreject(cb, () => { });
        }
        return resovleAndreject;
    }
}

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

function findDuplicate(arr) {
    let low = 1, high = arr.length - 1;
    while (low < high) {
        let mid = low + (high - low)/2;
        let cnt = arr.reduce((acc, item) => {
            if (item <= mid) acc++;
            return acc;
        }, 0);
        if (cnt <= mid) low = mid + 1;
        else high = mid;
    }
    console.log(low);
    return low;
}

findDuplicate([1, 5, 3, 5, 5, 6, 7, 5]);
function weightSum(arr, level) {
    return arr.reduce((acc, item) => {
        return acc + (Array.isArray(item) ? weightSum(item, level + 1) : item * level);
    }, 0);
}
r = weightSum([[1, 1], 2, [1, 1]], 1);
console.log('r=', r);
r = weightSum([1, [4, [6]]], 1);
console.log('r=', r);
function weightSum2(arr) {
    let flatten = [];
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            acc.push(...weightSum2(item));
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}
r = weightSum2([[1, 1], 2, [1, 1]]);
console.log(r);
r = weightSum2([1, [4, [6]]]);
console.log('r=', r);
function* weightSum3(arr) {
    let i = 0;
    while (i < arr.length) {
        if (Array.isArray(arr[i])) {
            yield* weightSum3(arr[i]);
        } else {
            yield arr[i];
        }
        i++;
    }
}
for (let i of weightSum3([[1, 1], 2, [1, 1]])) {
    console.log(i);
}
function norecursive(arr) {
    const q = [];
    let i = 0, first;
    while (i < arr.length || q.length > 0) {
        if (q.length > 0) {
            first = q.shift();
        } else {
            first = arr[i++];
        }
        if (Array.isArray(first)) {
            q.unshift(...first);
        } else {
            console.log(first);
        }
    }
}
norecursive([[1, 1], 2, [1, 1]]);

class Iter {
    arr;
    private row;
    private col;
    private ret;
    private isFetched;
    constructor(arr) {
        this.arr = arr;
        this.row = 0;
        this.col = 0;
        this.move2NextElement();
        this.isFetched = true;
    }
    private move2NextRow() {
        for (; this.row < this.arr.length; this.row++) {
            if (this.arr[this.row].length > 0) break;
        }
    }
    private move2NextElement() {
        while (this.row < this.arr.length && 
            !(this.ret = this.arr[this.row][this.col])) {
                if (this.col >= this.arr[this.row].length) {
                    this.row++;
                    this.move2NextRow();
                    this.col = 0;
                } else this.col++;
        }
    }
    hasNext() {
        if (!this.isFetched) {
            this.col++;
            this.move2NextElement();
            this.isFetched = true;
        }
        return this.ret !== undefined;
    }
    next() {
        if (!this.isFetched) {
            this.col++;
            this.move2NextElement();
        }
        this.isFetched = false;
        return this.ret;
    }
    remove() {
        this.arr[this.row].splice(this.col, 1);
        this.move2NextElement();
        this.isFetched = true;
    }
}
console.log('>>>>>>>>');
let iter = new Iter([[1, 2, 3], [], [4], [], [9], [], [11, 23]]);
console.log(iter.arr);

while (iter.hasNext()) {
    let num = iter.next();
    console.log(num + ' ');
    if (num === 1 || num === 3 || num === 2 || num === 11) iter.remove();
}
console.log(iter.arr);

function menuCombinatin(prices, total) {
    const appetizers = [ 'Salad', 'Wings', 'Mozzarella', 'Plate', 'Fruit', 'Fries'];
    function combine(prices, total, startIdx, tmp, ret) {
      if (startIdx >= prices.length) return;
      if (total === 0) {
        tmp = tmp.map(item => {
          return [appetizers[item[0]], item[1]];
        });
        ret.push([...tmp]);
        return;
      }
      if (total >= prices[startIdx]) {
        for (let i = 1; prices[startIdx] * i <= total; i++) {
          //tmp.push(`${prices[startIdx]} * ${i}`);
          tmp.push([startIdx, i]);
          combine(prices, total - prices[startIdx] * i, startIdx + 1, tmp, ret);
          tmp.pop();
        }
        combine(prices, total, startIdx + 1, tmp, ret);
      } else {
        combine(prices, total, startIdx + 1, tmp, ret);
      }    
    }
    total = Math.round(100 * total);
    prices = prices.map(price => Math.round(price * 100));
    let ret = [], tmp = [];
    combine(prices, total, 0, tmp, ret);
    return ret.length > 0 ? ret.pop() : [];
  }  
  r = menuCombinatin([3.35, 3.55, 4.20, 5.80, 2.15, 2.75], 0);
  console.log(r);

function palindromePairs(arr) {
    function reverse(str) {
        return str.split('').reverse().join('');
    }
    function isPalindrome(str) {
        return reverse(str) === str;
    }
    const words = arr.reduce((acc, item, index) => {
        acc.set(item, index);
        return acc;
    }, new Map());
    return arr.reduce((acc, item, index) => {
        words.delete(item);
        for (let i = 0; i < item.length; i++) {
            let left = item.slice(0, i + 1);
            let right = item.slice(i + 1);
            let rLeft = reverse(left);
            let rRight = reverse(right);
            if (isPalindrome(left) && words.has(rRight)) {
                acc.push([index, words.get(rRight)]);
            }
            if (isPalindrome(right) && words.has(rLeft)) {
                acc.push([index, words.get(rLeft)]);
            }
        }
        words.set(item, index);
        return acc;
    }, []);
}
r = palindromePairs(['abcd', 'dcba', 'lls', 's', 'sssll']);
console.log(r);


function meeting(arr) {
    const flatten = arr.reduce((acc, item) => {
        acc.push(...item);
        return acc;
    }, [])
    .sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    console.log(flatten);
    let left = flatten[0][0], right = flatten[0][1];
    const ret = [];
    for (let i = 1; i < flatten.length; i++) {
        let [curLeft, curRight] = flatten[i];
        if (curLeft <= right) {
            right = Math.max(right, curRight);
        } else {
            ret.push([right, curLeft]);
            left = curLeft;
            right = curRight;
        }
    }
    return ret;
}
r = meeting([[[1, 3], [6, 7]], [[2, 4]], [[2, 3], [9, 12]]]); //[[4, 6], [7, 9]]
console.log(r);


console.log('<<<<<<<<<<<<<');
function nearlyArrayWithSameSum(arr) {
    const [total, floor, diffs, floors] = arr.reduce((acc, item, index) => {
        acc[0] += item;
        acc[1] += Math.floor(item);
        acc[2].push([Math.ceil(item) - item, index]);
        acc[3].push(Math.floor(item));
        return acc;
    }, [0, 0, [], []]);
    const diff = Math.round(total) - floor;
    diffs.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < diff; i++) {
        let index = diffs[i][1];
        floors[index]++;
    }
    console.log(floors);
}
nearlyArrayWithSameSum([1.2, 2.3, 3.4]);

function wizard(arr) {
    const n = arr.length, wizards = new Array(n), queue = [];
    for (let i = 0; i < n; i++) {
        wizards[i] = [i, i === 0 ? 0: Number.MAX_VALUE];        
    }
    queue.push(wizards[0]);
    while (queue.length > 0) {
        const [idx, dis] = queue.pop();
        arr[idx].forEach(i => {
            let newDis = dis + (idx - i) * (idx - i);
            if (wizards[i][1] > newDis) {
                wizards[i][1] = newDis;
                queue.push(wizards[i]);
            }
        });
    }
    return wizards[n-1][1];
}
r = wizard([[1, 7],
        [0, 2, 7],
        [1, 3, 5, 8],
        [2, 4, 5],
        [3, 5],
        [2, 3, 4, 6],
        [5, 7, 8],
        [0, 1, 6, 8],
        [2, 6, 7]]);
console.log('r=', r);

function waterLand(arr, row, col) {
    if (!arr[row] || arr[row][col] !== 'W') return;
    const map = arr.reduce((acc, item) => {
        acc.push([...item.split('')]);
        return acc;
    }, []);
    map[row][col] = 'o';
    const q = [[row, col]], dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (q.length > 0) {
        let [row, col] = q.shift();
        dirs.forEach(([i, j]) => {
            let newRow = i + row;
            let newCol = j + col;
            if (newRow >= 0 && newRow < map.length 
                && newCol >= 0 && newCol < map[0].length 
                && map[newRow][newCol] === 'W') {
                    map[newRow][newCol] = 'o';
                    q.push([newRow, newCol]);
                }
        });
    }
    return map.reduce((acc, item) => {
        acc.push(item.join(''));
        return acc;
    }, []);
}
r = waterLand(['WWWLWWW', 'WWWLWWW', 'WLWLWWW'], 0, 1);
console.log('r=', r);

function minCostWithStop(arr, start, end, stop) {
    let minCost = Number.MAX_VALUE;
    function dfs(start, cost, stops, map, visited, tmp, ret) {
        if (stops > stop) return;
        if (start == end) {
            if (cost < minCost) {
                ret.length = 0;
                minCost = cost;
                ret.push(...tmp, end);
            }
            return;
        }
        visited.add(start);
        tmp.push(start);
        const tos = map[start];
        if (tos) {
            tos.forEach(([to, price]) => {
                if (!visited.has(to)) {
                    dfs(to, cost + price, stops + 1, map, visited, tmp, ret);
                }
            });
        }
        tmp.pop();
        visited.delete(start);
    }
    const map = arr.reduce((acc, [from, to, price]) => {
        acc[from] = acc[from] || [];
        acc[from].push([to, price]);
        return acc;
    }, {});
    const visited = new Set(), ret = [], tmp = [];
    dfs(start, 0, 0, map, visited, tmp, ret);
    console.log(minCost, '=>', ret);
}
minCostWithStop([[1, 2, 4], [2, 4, 2], [4, 3, 1], [4, 5, 8], [3, 5, 1]], 1, 5, 4);
console.log('<><><><><><>');
function minCostMaxStopK(arr, start, end, k) {
    const map = arr.reduce((acc, [s, e, cost]) => {
        acc[s] = acc[s] || [];
        acc[s].push([e, cost]);
        return acc;
    }, {});
    let q = {[start] : 0}, min = Number.MAX_VALUE;
    for (let i = 0; i < k; i++) {
        let nextLevel = {};
        for (let s in q) {
            const neighbor = map[s];
            if (!neighbor) continue;
            neighbor.forEach(([e, cost]) => {
                if (!nextLevel[e]) {
                    nextLevel[e] = cost + q[s];
                    if (e === end) min = Math.min(min, nextLevel[e]);
                }
            });
        }
        q = nextLevel;
    }
    console.log('..', min);
}
minCostMaxStopK([[1, 2, 4], [2, 4, 2], [4, 3, 1], [4, 5, 8], [3, 5, 1]], 1, 5, 4);

class FileSystem {
    score = {};
    path = {};
    cbs = {};
    constructor(){
        this.path['root'] = new Set();
    }
    public creat(pathstr, value) {
        const paths = pathstr.split('/'), triggerCbs = [];
        let parent = 'root', prefix = '';
        paths.filter(path => path.length > 0).forEach(path => {
            if (!this.path[parent]) this.path[parent] = new Set();
            if (!this.path[parent].has(path)) this.path[parent].add(path);
            parent = path;
            prefix += '/' + path;
            if (this.cbs[prefix]) triggerCbs.push(this.cbs[prefix]);
        });
        this.score[pathstr] = value;
        triggerCbs.forEach(cb => cb.apply(null));
    }
    public set_value(path, value) {
        let parent = 'root';
        const paths = path.split('/');
        for (let i = 1; i < paths.length; i++) {
            let path = paths[i];
            if (!this.path[parent].has(path)) return false;
            parent = path;
        }
        value && (this.score[path] = value);
        return true;
    }
    public get_value(path) {
        return this.set_value(path, null) ? this.score[path] : null;
    }
    public watch(path, cb) {
        this.cbs[path] = cb;
    }
}
r = new FileSystem();
r.watch('/NA/B', () => console.log('trigger /China'));
r.watch('/NC/A', () => console.log('trigger /NC/A'));
r.creat('/NA/A/MX', 3);
r.creat('/NA/A/US', 30);
r.creat('/NA/B/CN', 540);
r.creat('/NC/A/MX', 100);
r.set_value('/NC/A/MX', 300);
console.log(r.get_value('/NA/A/MX'));
console.log(r);


function order(arr) {
    const counter = {}, neighbors = {};
    arr.forEach(item => {
        let [inn, out] = item.split(':');
        let outs = out.split(',');
        let inns = inn.split(',');
        outs.forEach(out => {
            neighbors[out] = neighbors[out] || new Set();
            counter[out] = counter[out] || 0;
            inns.forEach(inn => {
                counter[inn] = counter[inn] || 0;
                counter[inn]++;
                neighbors[out].add(inn);
            });
        });
    });
    const q = [], ret = [];
    Object.keys(counter).forEach(key => {
        if (counter[key] === 0) {
            delete counter[key];
            q.push(key);
        }
    });
    while (q.length > 0) {
        let s = q.shift();
        ret.push(s);
        neighbors[s] && neighbors[s].forEach(neighbor => {
            counter[neighbor]--;
            if (counter[neighbor] === 0) {
                q.push(neighbor);
                delete counter[neighbor];
            }
        });
    }
    console.log(ret);
}
order(['1,2:0', '2:1', '4:1,2']);

function maxStep(n) {
    const map = {1 : 0};
    map[2] = 1;
    function getStep(n) {
        const ret = [];
        while (n !== 1) {
            if (map[n]) return [ret, map[n]];
            ret.push(n);
            if (n % 2 === 0) n = n/2;
            else n = 3 * n + 1;
        }
        return [ret, 1];
    }
    let maxStep = 2, maxNum = 2;
    for (let i = 3; i <= n; i++) {
         let [path, step] = getStep(i);
         let total = step + path.length;
         if (total > maxStep) {
             maxStep = total;
             maxNum = i;
         }
         for (let i = path.length - 1; i >= 0; i--) {
             map[path[i]] = step++;
         }         
    }
    console.log(maxStep, maxNum);
}
maxStep(10);

function robber(arr) {
    if (arr.length <= 1) return arr.length === 0 ? 0 : arr[0];
    const dp = [arr[0], Math.max(arr[0], arr[1])], pick = [true, arr[0] < arr[1]];
    for (let i = 2; i < arr.length; i++) {
        dp.push(Math.max(arr[i] + dp[i - 2], dp[i - 1]));
        pick.push(arr[i] + dp[i - 2] > dp[i - 1]);
    }
    let score = dp[dp.length - 1];
    let i = pick.length - 1;
    for (; i >= 0; i--) {
        if (dp[i] === score && pick[i]) break;
    }
    const ret = [];
    for (i; i >= 0; i -= 2) {
        if (pick[i]) ret.push(arr[i]);
    }
    console.log(ret);
    return dp.pop();
}
r = robber([3, 4, 4, 2]);
console.log(r);

function minparse(str) {
    let n = 0;
    const st = [], ret = [];
    for (let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (c === ' ') continue;
        if (c === '[') {
            const arr = [];
            let r = ret;
            for (let deep = st.length; deep > 0; deep--) r = r[r.length - 1];
            r.push(arr);
            st.push(arr);
        } else if (c === ']') {
            if (n > 0) {
                st[st.length - 1].push(n);
            }
            st.pop();
            n = 0;
        } else if (c === ',') {
            if (n > 0) {
                st[st.length - 1].push(n);
            }
            n = 0;
        } else {
            n = 10 * n + parseInt(c, 10);
        }
    }
    console.log(JSON.stringify(ret.pop()));
}
minparse('[123,456,[788,799,833],[[100,[100]]],10,[]]');

console.log('>>>>>>>>>>>>>>');

function rerange(arr, pageSize) {
    const entry = arr.map(line => line.split(','));
    const pages = [];
    const map = entry.reduce((acc, item) => {
        acc[item[0]] = acc[item[0]] || 0;
        acc[item[0]]++;
        return acc;
    }, {});
    while (entry.length > 0) {
        const page = [], seen = new Set();
        let i = 0,  left = pageSize;
        while (left > 0 && entry.length > 0) {
            let types = Object.keys(map).length;
            if (left >= types || (left < types && !seen.has(entry[i][0]))) {
                seen.add(entry[i][0]);
                page.push(entry[i]);
                map[entry[i][0]]--;
                map[entry[i][0]] === 0 && (delete map[entry[i][0]]);
                entry.splice(i, 1);
                left--;
            } else if (left < types) {
                i++;
            }
        }
        pages.push(page);
    }
    console.log(pages);
}

//rerange([1,2,2,2,3,4,5,5,5,6], 3);
//rerange([[10, 6], [10, 5], [9, 4], [15, 3], [10, 2], [4, 1], [4, 0]], 3);
//rerange([[10, 6], [10, 5], [10, 4], [15, 3]], 3);
rerange(['1,28,300.1,SanFrancisco', '4,5,209.1,SanFrancisco', '20,7,208.1,SanFrancisco',
'23,8,207.1,SanFrancisco','16,10,206.1,Oakland', '1,16,205.1,SanFrancisco', '6,29,204.1,SanFrancisco',
'7,20,203.1,SanFrancisco', '8,21,202.1,SanFrancisco', '2,18,201.1,SanFrancisco',
'2,30,200.1,SanFrancisco', '15,27,109.1,Oakland', '10,13,108.1,Oakland',
'11,26,107.1,Oakland', '12,9,106.1,Oakland', '13,1,105.1,Oakland',
'22,17,104.1,Oakland', '1,2,103.1,Oakland', '28,24,102.1,Oakland', '18,14,11.1,SanJose',
'6,25,10.1,Oakland', '19,15,9.1,SanJose', '3,19,8.1,SanJose', '3,11,7.1,Oakland',
'27,12,6.1,Oakland', '1,3,5.1,Oakland', '25,4,4.1,SanJose', '5,6,3.1,SanJose',
'29,22,2.1,SanJose', '30,23,1.1,SanJose'], 12);


function range2cidrlist(startIp, range) {
    function ipToLong(strIp) {
        return strIp.split('.')
               .map(i => +i)
               .reduce((acc, item, idx) => acc + (item << (24 - idx * 8)), 0);
    }
    function longToIP(longIP) {
        return [0xFFFFFFFF, 0x00FFFFFF, 0x0000FFFF, 0x000000FF]
                .map((mask, idx) => (mask & longIP) >>> (24 - idx * 8)).join('.');
    } 
    let start = ipToLong(startIp), end = start + range - 1;
    const ret = [];
    while (start <= end) {
        let locOfFirstOne = start & (-start),
            maxMask = 32 - Math.floor(Math.log(locOfFirstOne) / Math.log(2)),
            maxDiff = 32 - Math.floor(Math.log(end - start + 1) / Math.log(2));
        maxMask = Math.max(maxDiff, maxMask);
        ret.push(`${longToIP(start)}/${maxMask}`);
        start += Math.pow(2, 32 - maxMask);
    }
    console.log(ret); //[255.0.0.7/32, 255.0.0.8/29, 255.0.0.16/32]    
}

range2cidrlist('255.0.0.7', 10);

function hilbertCurve(x, y, iter) {
    if (iter == 0) return 1;
    let len = 1 << (iter - 1);
    let num = 1 << (2 * (iter - 1));
    if (x >= len && y >= len) {
        // 3 Shape is identical with previous iteration
        return 2 * num + hilbertCurve(x - len, y - len, iter - 1);
    } else if (x < len && y >= len) {
        // 2 Shape is identical with previous iteration
        return num + hilbertCurve(x, y - len, iter - 1);
    } else if (x < len && y < len) {
        // 1 Clock-wise rotate 90
        return hilbertCurve(y, x, iter - 1);
    } else {
        // 4 Anti-Clockwise rotate 90
        return 3 * num + hilbertCurve(len - 1 - y, 2 * len - 1 - x, iter - 1);
    }
}
r = hilbertCurve(1,1,2);
console.log(r);

function guessMachine(n) {
    function guessResult(g) {
        let count = 0, i = n;
        while (i != 0) {
            if (i % 10 === g % 10) count++;
            i = Math.floor(i / 10);
            g = Math.floor(g / 10);
        }
        return count;
    }
    let totalCorrection = 0;
    const result = new Array(4);
    function guessDigit(corrects, base) {
        const test = [1000, 100, 10];
        for (let i = 0; corrects > 0 && i < 3; i++) {
            if (guessResult(test[i] * base) > 0) {
                totalCorrection++;
                corrects--;
                result[i] = base;
            }
        }
        if (corrects > 0) {
            result[3] = base;
            totalCorrection++;
        }
    }
    for (let base = 1; totalCorrection < 4 && base <= 5; base++) {
        let corrects = guessResult(base * 1111);
        if (corrects > 0) guessDigit(corrects, base);
    }
    if (totalCorrection < 4) {
        let corrects = 4 - totalCorrection;
        guessDigit(corrects, 6);
    }
    console.log(result);
    console.log(totalCorrection);
}
guessMachine(6336);

function boggleGame(board, dict) {
    class TrieNode {
        value;
        isWord;
        children;
        constructor(v) {
            this.value = v;
            this.isWord = false;
            this.children = {};
        }
    }

    class Trie {
        root;
        constructor() {
            this.root = new TrieNode('0');
        }
        insert(word) {
            let node = this.root;
            for (let i = 0; i < word.length; i++) {
                let c = word.charAt(i);
                if (!node[c]) node.children[c] = new TrieNode(c);
                node = node.children[c];
            }
            node.isWord = true;
        }
    }

    function getNextWords(words, board, visited, path, i, j, root) {
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length
            || visited[i][j] || !root.children[board[i][j]]) {
            return;
        }
        root = root.children[board[i][j]];
        if(root.isWord) {
            const newPath = [...path];
            newPath.push(i * board[0].length + j);
            words.push(newPath);
            return;
        }
        visited[i][j] = true;
        path.push(i * board[0].length + j);
        getNextWords(words, board, visited, path, i + 1, j, root);
        getNextWords(words, board, visited, path, i - 1, j, root);
        getNextWords(words, board, visited, path, i, j + 1, root);
        getNextWords(words, board, visited, path, i, j - 1, root);
        path.pop();
        visited[i][j] = false;  
    }

    function findWords(ret, board, visited, words, x, y, root) {
        let m = board.length, n = board[0].length;
        for (let i = x; i < m; i++) {
            for (let j = y; j < n; j++) {
                const nextWords = [], path = [];
                getNextWords(nextWords, board, visited, path, i, j, root);
                nextWords.forEach(path => {
                    let word = '';
                    path.forEach(index => {
                        let row = Math.floor(index/n), col = Math.floor(index%n);
                        visited[row][col] = true;
                        word += board[row][col];
                    });
                    words.push(word);
                    if (words.length > ret.length) {
                        ret.length = 0;
                        words.forEach(word => ret.push(word));
                    }
                    findWords(ret, board, visited, words, i, j, root);
                    path.forEach(index => {
                        let row = Math.floor(index/n), col = Math.floor(index%n);                        
                        visited[row][col] = false;
                    });
                    words.pop();                    
                });
            }
            y = 0;
        }
    }

    const trie = new Trie();
    dict.forEach(word => trie.insert(word));
    let m = board.length, n = board[0].length;
    const ret = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const visited = new Array(m);
            for (let i = 0; i < visited.length; i++) {
                visited[i] = new Array(n);
                visited[i].fill(false);
            }
            findWords(ret, board, visited, [], i, j, trie.root);
        }
    }
    console.log(ret);
}
boggleGame([['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']], ['abc', 'cfi', 'beh', 'defi', 'gh']);



function pour_water(terrains, location, water) {
    const waters = new Array(terrains.length);
    waters.fill(0);
    function compare(i, j) {
        return (terrains[i] + waters[i]) - (terrains[j] + waters[j]);
    }
    while (water > 0) {
        let location_to_pour = location;
        for (var left = location - 1; left >= 0 && compare(left, left + 1) <= 0; left--);
        if (compare(left + 1, location) < 0) {
            location_to_pour = left + 1;
        } else {
            for (var right = location + 1; right < terrains.length && compare(right, right - 1) <= 0; right++);
            if (compare(right - 1, location) < 0) {
                location_to_pour = right - 1;
            }
        }
        waters[location_to_pour]++;
        water--;
    }
    let max = 0;
    for (let i = 0; i < waters.length; i++) {
        max = Math.max(max, waters[i] + terrains[i]);
    }
    while (max >= 0) {
        const line = [];
        for (let i = 0; i < terrains.length; i++) {
            if (waters[i] + terrains[i] === max) {
                if (waters[i] > 0) {
                    line.push('W');
                    waters[i]--;
                } else if (terrains[i] > 0) {
                    line.push('#');
                    terrains[i]--;
                }
            } else line.push(' ');
        }
        console.log(line.join(''));
        max--;
    }
}
pour_water([5,4,2,1,2,3,2,1,0,1,2,4], 5, 8);

function minSet(arr) {
    function dfs(visited, edges, result, num, start, visited2) {
        if (visited2.has(num)) return;
        visited2.add(num);
        visited.add(num);
        for(let i = 0; i < edges.length; i++) {
            if(edges[i][0] == num) {
                let next = edges[i][1];
                if (result.has(next) && next !== start) {
                    result.delete(next);
                }
                dfs(visited, edges, result, next, start, visited2);
            }
        }
    }
    const result = new Set(), visited = new Set(), list = new Set();
    for (let i = 0; i < arr.length; i++) {
        list.add(arr[i][0]);
        list.add(arr[i][1]);
    }
    for (let num of list) {
        if(!visited.has(num)) {
            result.add(num);
            dfs(visited, arr, result, num, num, new Set());
        }
    }
    console.log('minset:', result);
}
//minSet([[2,9], [3, 3], [3,5], [3,7], [4,8], [5,8], [6,6], [7,4], [8,7], [9,3], [9,6]]);
minSet([[0,1],[1,0],[3,2],[3,1],[2,1]]);
//minSet([[1, 2], [2, 3], [4, 3]]);
console.log('===============');
function minSet2(arr) {
    const all = new Set();
    const setMap = new Map();
    function dfs(node, start, visited, subVisited, map) {
        let nodes = map.get(node);
        if (nodes) {
            for (let i = 0; i < nodes.length; i++) {
                all.add(nodes[i]);
                if (subVisited.has(nodes[i])) continue;
                subVisited.add(nodes[i]);        
                if (visited.has(nodes[i]) && nodes[i] !== start) {
                    visited.delete(nodes[i]);
                    setMap.delete(nodes[i]);
                }
                dfs(nodes[i], start, visited, subVisited, map);
            }
        }        
    }
    const map = arr.reduce((acc, [s, t]) => {
        if (!acc.has(s)) acc.set(s, []);
        acc.get(s).push(t);
        return acc;
    }, new Map());
    const visited = new Set();
    for (let key of map.keys()) {
        if (!all.has(key)) {
            visited.add(key);
            all.add(key);
            const subVisited = new Set([key]);
            dfs(key, key, visited, subVisited, map);
            setMap.set(key, subVisited);
            console.log(setMap);
        }
    }
    console.log(visited);
}
minSet2([[1, 2], [2, 3], [4, 3]]);

function PathMatrix(dic, arr) {
    console.log(dic, arr);
    class Node {
        private isWord;
        private children;
        constructor() {
            this.isWord = false;
            this.children = {};
        }
    }
    class Trie {
        root;
        constructor() {
            this.root = new Node();
        }
        public add(word) {
            let node = this.root;
            for (let i = 0; i < word.length; i++) {
                let c = word.charAt(i);
                if (!node.children[c]) node.children[c] = new Node();
                node = node.children[c];
            }
            node.isWord = true;
        }
    }
    let max = 0;
    function pathfind(visited, node, arr, i, j, count) {
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        if (node.isWord) {
            max = Math.max(max, count + 1);
            node.isWord = false;
            pathfind(visited, trie.root, arr, i, j, count + 1);
            node.isWord = true;
        }
        if (node.children[arr[i][j]]) {
            visited[i][j] = true;
            dirs.forEach(([x, y]) => {
                let newRow = i + x;
                let newCol = j + y;
                if (newRow >= 0 && newRow < arr.length 
                    && newCol >= 0 && newCol < arr[0].length && !visited[newRow][newCol]) {
                        pathfind(visited, node.children[arr[i][j]], arr, newRow, newCol, count);
                }
            });
            visited[i][j] = false;
        }
    }
    const trie = new Trie();
    dic.forEach(word => trie.add(word));
    let m = arr.length, n = arr[0].length;
    const visited = new Array(m);
    for (let i = 0; i < m; i++) {
        visited[i] = new Array(n);
        visited[i].fill(false);
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            pathfind(visited, trie.root, arr, i, j, 0);
        }
    }
    console.log('max=', max);
}
PathMatrix(['abs', 'abc', 'dd', 'bb'], [['a','b','c'], ['d','d','d'], ['b','b','d']]);

function stringMatrix(str, last) {
    const map = {
        'A' : {'A' : 'B', 'B' : 'AC', 'C' : 'A'},
        'B' : {'A' : 'C', 'B' : 'A', 'C': 'C'},
        'C' : {'A' : 'B', 'B' : 'C', 'C' : 'A'}
    };
    function dfs(tmp, str) {
        if (str.length === 0) return [tmp];
        const ret = [];
        let changes = map[str.charAt(0)][str.charAt(1)], remain = str.length === 2 ? '' : str.substring(1);
        changes.split('').forEach(c => ret.push(...dfs(tmp + c, remain)));
        return ret;
    }
    const cache = {};
    function check(str) {
        if (cache[str]) return cache[str];
        if (str.length === 1) {
            cache[str] = str === last;
        } else {
            const ret = dfs('', str);
            for (let i = 0; i < ret.length; i++) {
                if (check(ret[i])) {
                    cache[str] = true;
                    break;
                }
            }
        }
        return cache[str] = cache[str] || false;
    }
    return check(str);
}
r = stringMatrix('ABCC', 'C');
console.log('r=', r);
console.log('<<<<<<<<<<<<<');
function puzzle8(board) {
    function status(board) {
        return board.reduce((acc, row) => {
            acc.push(row.join(''));
            return acc;
        }, []).join('');
    }
    function dis(x, y) {
        return Math.pow((x - 2), 2) + Math.pow((y - 2), 2);
    }
    function move(curStatus, x, y, row, col) {
        const board = curStatus.split('');
        let pos = x * 3 + y, newPos = row * 3 + col;
        [board[pos], board[newPos]] = [board[newPos], board[pos]];
        return board.join(''); 
    }
    let m = board.length, n = board[0].length, x, y;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 0) [x, y] = [i, j];
        }
    }
    let initStatus = status(board);
    if (initStatus === '123456780') return true;
    const heap = [[dis(x, y), x, y, initStatus]], visited = new Set(), 
          dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
          visited.add(initStatus);
    while (heap.length > 0) {
        let [_, x, y, curStatus] = heap.shift();
        for (let k = 0; k < dirs.length; k++) {
            let [i, j] = dirs[k], row = i + x, col = j + y;
            if (row < 0 || row >= m || col < 0 || col >= n) continue;
            const newBoard = move(curStatus, x, y, row, col);
            if (!visited.has(newBoard)) {
                if (newBoard === '123456780') return true;
                visited.add(newBoard);
                heap.push([dis(row, col), row, col, newBoard]);
            }
        }
        let maxIdx = heap.reduce((acc, ele, index) => acc[1] > ele[0] ? acc : [index, ele[0]])[0];
        [heap[0], heap[maxIdx]] = [heap[maxIdx], heap[0]];
    }
    return false;
}
r = puzzle8([[0, 1, 3], [4, 2, 5], [7, 8, 6]]);
console.log('r=', r);

function playOneRound(n, visited, number) {
    function dfs(index, visited, remain, ret) {
        if (remain === 0) {
            ret.forEach(i => visited[i] = true);
            return true;
        }
        if (index >= n || (index + 1 > remain) || visited[index]) return false;
        visited[index] = true;
        ret.push(index);
        if (dfs(index + 1, visited, remain - (index + 1), ret)) {
            return true;
        } else {
            ret.pop();
            visited[index] = false;
            if (dfs(index + 1, visited, remain, ret)) {
                return true;
            }
            return false;
        }
    }
    const ret = [];
    console.log('number=', number);
    for (let i = 0; i < n; i++) {
        if (dfs(i, visited, number, ret)) return true;
    }
    return false;
}
function simulate() {
    return Math.floor(Math.random() * (6 - 1)) + 1;
}
function play(n) {
    const visited = new Array(n);
    visited.fill(false);
    
    let number = simulate() + simulate();  
    let state;
    while ((state = playOneRound(n, visited, number)) && visited.filter(i => i === true).length > 0) {
        number = simulate() + simulate();
        console.log(visited, state);
    }
    console.log(visited);
    return visited.filter(i => i === true).length > 0 ? 'Lost' : 'Win';
}
let ret = play(9);
console.log(ret);