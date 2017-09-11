function iterateDOM(element, callback) {
    const nodes = [];

    nodes.push(element);

    do {
        element = nodes.shift();

        callback(element);

        nodes.unshift(element.children);
    } while (nodes.length > 0);
}

function matchElement(element, query) {
    return element.tagName === query.toUpperCase() ||
        element.classList.contains(query);
}

function querySelector(query) {
    return querySelectorAll(query)[0];
}

function querySelectorAll(query) {
    const elements = [];

    iterateDOM(this, function(element) {
        if (matchElement(element, query)) {
            elements.push(element);
        }
    });

    return elements;
}

function getElementbyClassName(clazz) {
    const ret = [], root = this || window.document, q = [root];
    while (q.length > 0) {
        let node = q.shift();
        if (node.class && node.class.split(' ').indexOf(clazz) >= 0) {
            ret.push(node);
        }
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => q.push(child));
        }
    }
}

class EventManager {
    private events = {};
    constructor() {}
    public listenFor(eventName, cb) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(cb);
        return () => this.events[eventName].filter(c !== cb);
    }
    public fire(eventName) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(cb => cb.apply(this));
        }
    }
}

function multiplyMatrix(a, b) {
    const m = a.length, n = b[0].length;
    const ret = new Array(m);
    const v = new Array(m);    
    for (let i = 0; i < m; i++) {
        ret[i] = new Array(n);
    }
    /*for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            if (a[i][j] === 0) continue;
            for (let k = 0; k < b[0].length; k++) {
                if (b[j][k] === 0) continue;
               ret[i][k] = (ret[i][k] || 0) + a[i][j] * b[j][k];
            }
        }
    }*/
    for (let i = 0; i < a.length; i++) {
        for (let k = 0; k < a[0].length; k++) {
            if (a[i][k] != 0) {
                v[i] = (v[i] || []);
                v[i].push([k, a[i][k]]);
            }
        }
    }
    for (let i = 0; i < v.length; ++i) {
        for (let k = 0; k < v[i].length; ++k) {
            let [col, val] = v[i][k]
            for (let j = 0; j < b[0].length; ++j) {
                ret[i][j] = (ret[i][j] || 0) + val * b[col][j];
            }
        }
    }
    console.log(ret);    
}
multiplyMatrix([[1, 0, 0], [-1, 0, 3]], [[ 7, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 1 ]]);

function lengthOfLIS(nums) {
    const dp = [];
    for (let i = 0; i < nums.length; ++i) {
        let left = 0, right = dp.length;
        while (left < right) {
            let mid = left + Math.floor((right - left) / 2);
            if (dp[mid] < nums[i]) left = mid + 1;
            else right = mid;
        }
        if (right >= dp.length) dp.push(nums[i]);
        else dp[right] = nums[i];
    }
    console.log(dp);
    return dp.length;
}
lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]); //[ 2, 3, 7, 18 ]

(function() {
    function read4K(buf) {
        buf = [1, 2, 3, 4];
        return 4;
    }
    function read(buf, toRead) {
        let readPos = 0, remain = toRead, readFrom = 0;
        const tmp = new Array(4);
        while (remain > 0) {
            if (readFrom === 0) readFrom = read4K(tmp);
            if (readFrom === 0) break;
            let writeTo = Math.min(remain, readFrom);
            buf.splice(readPos, 0, tmp.slice(0, writeTo));
            remain -= writeTo;
            readFrom -= writeTo;
            readPos += writeTo;
        }
        return readPos;
    }
})();
function paths(m, n) {
    let start = m - 1, end = 0, res = 0;
    const dirs = [[0, 1], [-1, 1], [1, 1]];    
    function dfs(row, col, high) {
        if (row === m - 1 && col === n - 1) {
            if (Math.max.apply(null, high) >= 2) {
                res++;
            }
            return;
        }
        high.push(m - row - 1);
        dirs.forEach(([x, y]) => {
            let newRow = x + row, newCol = y + col;
            if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
                dfs(newRow, newCol, high);
            }
        });
        high.pop();
    }
    dfs(start, end, []);
    console.log(res);
}
paths(3, 4);

function paths2(m, n) {
    let row = m - 1, col = 0, res = 0;
    const map = {[row * n + col]: 1}, heigh = {[row * n + col]: {0: 1}}, dirs = [[0, -1, 0], [-1, -1, 0], [1, -1, 1]];
    row--;
    col++;
    while (row >= 0 || col < n) {
        for (let i = row; i < m; i++) {
            //if (i < 0 || i >= m || col < 0 || col >= n) continue;
            let total = 0, maxHeigh = 0;
            dirs.forEach(([x, y, inc]) => {
                let newRow = x + i, newCol = y + col;
                total += (map[newRow * n + newCol] || 0);
                if (map[newRow * n + newCol]) {
                    const heighMap = heigh[newRow * n + newCol];
                    if (heighMap) {
                        const h = heigh[i * n + col] = heigh[i * n + col] || {};
                        Object.keys(heighMap).forEach(heigh => {
                            h[+heigh + inc] = (h[+heigh + inc] || 0) + heighMap[heigh];
                        });
                    }
                }
            });
            map[i * n + col] = total;
        }
        row--;
        col++;
    }
    console.log(map[(m - 1) * n + (n - 1)]);
    const h = heigh[(m - 1) * n + (n - 1)];
    let r = Object.keys(h).filter(heigh => heigh >= 1).reduce((acc, i) => acc + h[i], 0);
    console.log(r);
}
paths2(3, 4);

function isShift(a, b) {
    if (a.length !== b.length) return false;
    let gap;
    for (let i = 0; i < a.length; i++) {
        let m = a.charCodeAt(i); //fromCharCode
        let n = b.charCodeAt(i);
        let k = (m - n + 26) % 26;
        if (!gap) gap = k;
        else if (gap !== k) return false;
    }
    return true;
}
r = isShift('abc', 'cde');
console.log(r);

function groupShift(arr) {
    console.log(arr);
    const map = {};
    function token(str) {
        let ret = '';
        for (let i = 1; i < str.length; i++) {
            ret += (str.charCodeAt(i) - str.charCodeAt(0) + 26) % 26;
        }
        return ret;
    }
    arr.forEach(word => {
        let key = token(word);
        map[key] = map[key] || [];
        map[key].push(word);
    })
    const groups = Object.keys(map).map(key => map[key]);
    console.log(groups);
}
groupShift(['abc', 'bcd', 'acef', 'xyz', 'az', 'ba', 'a', 'z']);

function copyRandomList() {
    function visit(n) {
        if (!n) return;
        console.log(n.v);
        visit(n.next);
    }
    class Node {
        v;
        next;
        random;
        constructor(v) {
            this.v = v;
        }
    }
    let root = new Node(1);
    let a = new Node(2);
    let b = new Node(3);
    root.next = a;
    a.next = b;
    root.random = b;
    a.random = a;
    b.random = root;
    //visit(root);
    const map = new Map();
    let n = root, pre;
    while (n) {
        const cp = new Node(n.v + '0');
        if (!pre) pre = cp;
        else pre.next = cp;
        pre = cp;
        map.set(n, cp);
        n = n.next;
    }
    //visit(map.get(root));
    n = root;
    while (n) {
        let cp = map.get(n);
        cp.random = map.get(n.random);
        n = n.next;
    }
    let w = map.get(root);
    let q = map.get(a);
    let p = map.get(b);
    console.log(w.random.v);
    console.log(q.random.v);
    console.log(p.random.v);
}
copyRandomList();
function continous(arr) {
    let max_ending_here = arr[0]; 
    let max_so_far = arr[0];
    for (let i = 1; i < arr.length; i++) {
        max_ending_here = Math.max(arr[i], max_ending_here + arr[i]);
        max_so_far = Math.max(max_so_far, max_ending_here)
    }        
    return max_so_far
}
//r = continous([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
r = continous([8, -1, -1, 4, -2, -3, 5, 6, -3]);
console.log(r); //4, −1, 2, 1,

function continous2(arr, k) {
    const sum = new Array(arr.length + 1);
    sum[0] = 0;
    let max = 0, range = [0, 0];
    for (let i = 1; i <= arr.length; i++) {
        sum[i] = arr[i - 1] + sum[i - 1];
    }
    const deque = [];
    for (let q = 0; q < sum.length; q++) {
        if (deque.length > 0 && q - deque[0] > k) {
            deque.shift();
        }
        while (deque.length > 0 && sum[deque[deque.length - 1]] > sum[q]) {
            deque.pop();
        }
        deque.push(q);
        if (sum[q] - sum[deque[0]] > max) {
            max = sum[q] - sum[deque[0]];
            range[0] = deque[0];
            range[1] = q - 1;
        }
    }
    console.log(range);
    return max;
}
r = continous2([8, -1, -1, 4, -2, -3, 5, 6, -3], 7);
console.log(r);

function boxstack(arr) {
    arr.sort((a, b) => b[2] - a[2]);
    const dp = new Array(arr.length);
    dp[0] = arr[0][2];
    let globMax = 0, index;
    for (let i = 1; i < arr.length; i++) {
        let max = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j][0] >= arr[i][0] && arr[j][1] >= arr[i][1]) {
                max = Math.max(dp[j]);
            }
        }
        dp[i] = max + arr[i][2];
        if (globMax < dp[i]) {
            globMax = dp[i];
            index = i;
        }
    }
    console.log(globMax);
    const ret = [];
    let remain = globMax;    
    while (remain > 0 && index >= 0) {
        if (dp[index] === remain) {
            ret.splice(0, 0, arr[index]);
            remain -= arr[index][2];
        }
        index--;
    }
    console.log(ret);
}
boxstack([[1, 7, 4], [2, 6, 9], [4, 9, 6], [10, 12, 8], [6, 2, 5], [3, 8, 5], [5, 7, 7], [2, 10, 16], [12, 15, 9]]);
//[(12, 15, 9), (10, 12, 8), (4, 9, 6), (3, 8, 5), (1, 7, 4)]

function randomWeightQ(arr, value) {
    let low = 0, high = arr.length - 1;
    while (low < high) {
        let mid = low + Math.floor((high - low)/2);
        if (arr[mid] > value) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    console.log(arr[low], arr[high]);
}
randomWeightQ([3, 6, 10, 14, 19, 22], 2);
(function () {
    class Minesweeper {
        arr;
        mines;
        dirs = [
			[-1, -1 ], [-1, 0 ], [-1, 1 ],
			[0, -1], [0, 1],
			[1, -1], [1, 0 ], [1, 1]
        ];
        private countMines() {
            for (let i = 0; i < this.arr.length; i++) {
                for (let j = 0; j < this.arr[0].length; j++) {
                    if (this.arr[i][j] === 'B') {
                        this.dirs.forEach(([x, y]) => {
                            let newX = x + i, newY = y + j;
                            if (newX >= 0 && newX < this.arr.length && 
                                newY >= 0 && newY < this.arr[0].length && this.arr[newX][newY] === 'X') {
                                this.mines[newX][newY]++;
                            }
                        });
                    }
                }
            }
        }
        constructor(arr) {
            this.arr = arr;
            this.mines = new Array(this.arr.length);
            for (let i = 0; i < arr.length; i++) {
                this.mines[i] = new Array(arr[0].length);
                this.mines[i].fill(0);
            }
            this.countMines();            
        }
        clickTile(row, col) {
            if (this.arr[row][col] === 'B') return [];
            const visited = new Set(), m = this.arr.length, n = this.arr[0].length;
            visited.add(row * n + col);
            const q = [[row, col]];
            while (q.length > 0) {
                let [x, y] = q.shift();
                this.dirs.forEach(([i, j]) => {
                    let newX = i + x, newY = j + y;
                    if (newX >= 0 && newX < m && newY >= 0 && newY < n && 
                        this.arr[newX][newY] === 'X' &&!visited.has(newX * n + newY)) {
                        visited.add(newX * n + newY);
                        q.push([newX, newY]);
                    }
                });
            }
            const r = Array.from(visited)
                           .map(p => [Math.floor(p/n), p%n])
                           .filter(([row, col]) => this.mines[row][col] > 0)
                           .map(([row, col]) => [row, col, this.mines[row][col]]);
            console.log(r);
        }
    }
    const board = new Minesweeper([
        ['B', 'X', 'B', 'X'],                    
        ['B', 'B', 'X', 'X'],
        ['X', 'B', 'X', 'X'],
        ['B', 'X', 'X', 'X']
    ]);
    board.clickTile(3, 3);
})();
function samegroup(arr) {
    const map = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) map[i] = new Array(arr.length);
    const relation = {};
    arr.forEach((set, index) => {
        set.forEach(word => {
            if (relation[word] !== undefined) {
                let i = relation[word];
                map[i][index] = 1;
                map[index][i] = 1;
            } else relation[word] = index;
        });
    });
    function dfs(index, map, set, allSet) {
        const connect = map[index];
        for (let i = 0;  i < connect.length; i++) {
            if (connect[i] !== undefined && !set.has(i) && !allSet.has(i)) {
                set.add(i);
                allSet.add(i);
                dfs(i, map, set, allSet);
            }
        }
    }
    const set = new Set(), ret = [];
    for (let i = 0; i < arr.length; i++) {
        if (map[i] !== undefined && !set.has(i)) {
            set.add(i);
            const subSet = new Set();
            subSet.add(i);
            dfs(i, map, subSet, set);
            ret.push(Array.from(subSet));
        }
    }
    console.log(ret);
}
samegroup([['abc', 'def'],['ghi'],['abc','ghi','jkl'], ['qa'], ['qa', 'wa']]); //[[0,1,2],[4, 3]]

console.log('>>>>>>><<<<<<<<');
function unionFind(m, n, arr) {
    console.log(m, n, arr);
    const roots = new Array(m * n), dirs = [[0, -1], [-1, 0], [0, 1], [1, 0]];
    roots.fill(-1);
    let cnt = 0;
    arr.forEach(([x, y]) => {
        let id = n*x + y;
        roots[id] = id;
        ++cnt;
        dirs.forEach(([row, col]) => {
            let newX = row + x, newY = col + y;
            let curId = n*newX + newY;
            if (newX >= 0 && newX < m && newY >= 0 && newY < n && roots[curId] !== -1) {
                let newId = findRoots(roots, curId);
                if (curId === 2 || curId === 0) console.log('<><>', id === newId, newId);
                if (id !== newId) {
                    roots[id] = newId;
                    --cnt;
                }
            }
        });
        console.log('==========');
        console.log(roots);
        console.log(cnt);
        console.log('==========');
    });
    console.log('>>?', findRoots(roots, 2));    
    function findRoots(roots, id) {
        while (id != roots[id]) {
            roots[id] = roots[roots[id]];
            id = roots[id];
        }
        return id;
    }
}
unionFind(3, 3, [[0,0], [0,2], [0, 1]]);

/*
(function() {
    function readFromFile(buf, start, count) {
        buf = [1, 2, 3, 4, 5, 6, 7, 8];
        return 8;
    }
    class Slide {
        buf;
        q;
        end;
        k;
        len;
        constructor(buf, k) {
            this.buf = buf;
            this.q = [];
            this.end = 0;
            this.k = k;
            this.len = 2*k;
            for (let i = 0; i < k; i++) {
                while (q.length && this.buf[q[0]] < this.buf[i]) {
                    q.shift();
                }
                this.q.push(i);
            }
            this.end = k;
        }
        private inc(pos) {
            return (pos + this.len) % (this.len);
        }
        private slideNext() {
            this.inc(this.end);
            let endValue = this.buf[this.end];
            while (q.length && (this.buf[q[0]] <= endValue || (this.end - q[0] + this.len) % this.len >= this.k)) {
                q.shift();
            }
            this.q.push(this.end);
            return this.buf[this.q[0]];
        }
        public getEndP() {
            return this.end;
        }
    }
    const q = [], ret = [];
    const k = 3, buf = new Array(2*k), tmp = new Array(k);
    let total = readFromFile(buf, 0, 2*k);
    const slide = new Slide(buf, k);
})();
*/
//https://www.careercup.com/question?id=5753762363736064 waitting
//http://www.cnblogs.com/grandyang/p/5190419.html waitting
//http://www.cnblogs.com/grandyang/p/5568818.html
//http://www.cnblogs.com/grandyang/p/7098764.html
//http://www.1point3acres.com/bbs/thread-279022-1-1.html
//http://www.1point3acres.com/bbs/thread-279684-1-1.html 
//https://stackoverflow.com/questions/32517315/maximal-subarray-with-length-constraint

//http://www.1point3acres.com/bbs/thread-288996-1-1.html
//http://www.1point3acres.com/bbs/thread-281171-1-1.html
//http://www.1point3acres.com/bbs/thread-286770-1-1.html
//http://www.1point3acres.com/bbs/thread-290500-1-1.html dasdfasdf
//http://www.1point3acres.com/bbs/thread-277662-1-1.html
//http://www.1point3acres.com/bbs/thread-276455-1-1.html
//http://www.1point3acres.com/bbs/thread-274927-1-1.html


