(function() {
    function moveZeroes(arr) {
        let left = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] && i !== left) {
                [arr[left], arr[i]] = [arr[i], arr[left]];
                left++;
            }
        }
        console.log(arr);
    }
    moveZeroes([0, 1, 0, 3, 12]);
})();
(function() {
    function maxSubArrayLen(arr, k) {
        const map = {};
        let sum = 0, res = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
            if (sum === k) res = i + 1;
            else if (map[sum - k] !== undefined) res = Math.max(res, i - map[sum - k]);
            if (map[sum] === undefined) map[sum] = i;
        }
        console.log(res);
    }
    maxSubArrayLen([1, -1, 5, -2, 3], 3);
    maxSubArrayLen([-2, -1, 2, 1], 1);
})();
(function() {
    function multiply(a, b) {
        const ret = new Array(a.length);
        for (let i = 0; i < ret.length; i++) {
            ret[i] = new Array(b[0].length);
        }
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < a[0].length; k++) {
                    sum += a[i][k] * b[k][j];
                }
                ret[i][j] = sum;
            }
        }
        console.log(ret);
    }
    multiply([[1, 0, 0], [-1, 0, 3]], [[7, 0, 0], [0, 0, 0], [0, 0, 1]]);
    function fill(arr, row) {
        const map = {};
        for(let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j]) {
                    if (!map[i] && row) map[i] = [];
                    if (!map[j] && !row) map[j] = [];
                    row && map[i].push([j, arr[i][j]]);
                    !row && map[j].push([i, arr[i][j]]);
                }
            }
        }
        return map;
    }
    function mul(a, b) {
        let sum = 0, i = 0, j = 0;
        while (i < a.length && j < b.length) {
            if (a[i][0] === b[j][0]) {
                sum += a[i++][1] * b[j++][1];
            } else if (a[i][0] < b[j][0]) i++;
            else j++;
        }
        return sum;
    }
    function multiply2(a, b) {
        const ret = new Array(a.length);
        for (let i = 0; i < ret.length; i++) {
            ret[i] = new Array(b[0].length);
            ret[i].fill(0);
        }
        a = fill(a, true);
        b = fill(b, false);
        for (let row in a) {
            for (let col in b) {
                ret[row][col] = mul(a[row], b[col]);
            }
        }
        console.log(ret);
    }
    multiply2([[1, 0, 0], [-1, 0, 3]], [[7, 0, 0], [0, 0, 0], [0, 0, 1]]);
})();
(function() {
    class Node {
        v;
        left;
        right;
        constructor(v) {this.v = v;}
    }
    const root = new Node(3);
    root.left = new Node(9);
    const sub = new Node(20);
    sub.left = new Node(15);
    sub.right = new Node(7);
    root.right = sub;
    const map = {};
    function visit(node) {
        const q = [[0, node]];
        while (q.length > 0) {
            let [level, cur] = q.shift();
            (map[level] = map[level] || []).push(cur.v);
            if (cur.left) q.push([level - 1, cur.left]);
            if (cur.right) q.push([level + 1, cur.right]);
        }
        console.log(map);
    }
    visit(root);
    const ret = Object.keys(map).sort((a, b) => a - b).reduce((acc, key) => {
        acc.push(map[key]);
        return acc;
    }, []);
    console.log(ret);
})();

(function() {
    function addBinary(a, b) {
        let i = a.length - 1, j = b.length - 1, carry = 0, ret = [];
        while (i >= 0 || j >= 0) {
            let m = a[i--] || '0', n = b[j--] || '0', sum = parseInt(m, 10) + parseInt(n, 10)
             + carry;
            ret.unshift(sum%2);
            carry = ~~(sum / 2);
        }
        if (carry) ret.unshift(carry);
        console.log(ret.join(''));
    }
    addBinary('11', '1');
    addBinary('1111', '11');    
})();
(function() {
    function productExceptSelf(arr) {
        const ret = new Array(arr.length);
        ret.fill(1);
        let left = 1, right = 1;
        for (let i = 0; i < arr.length; i++) {
            ret[i] *= left;
            left *= arr[i];
            ret[arr.length - 1 - i] *= right;
            right *= arr[arr.length - 1 - i];
        }
        console.log(ret);
    }
    productExceptSelf([1, 2, 3, 4]);
})();
(function() {
    function numDecodings(str) {
        const dp = new Array(str.length);
        dp.fill(1);
        if (str[0] === '0') dp[0] = 0;
        for (let i = 1; i < str.length; i++) {
            dp[i] = str[i] === '0' ? 0 : dp[i - 1];
            if (str[i - 1] === '1' || (str[i - 1] === '2' && str[i].charCodeAt(0) <= '6'.charCodeAt(0))) {
                dp[i] += dp[i - 1];
            }
        }
        console.log(dp[str.length - 1]);
    }
    numDecodings('12');
})();
(function() {
    function threeSum(arr) {
        const ret = [];
        arr.sort((a, b) => a - b);
        for (let i = 0; i < arr.length - 1; i++) {
            let target = 0 - arr[i], left = i + 1, right = arr.length - 1;
            while (left < right) {
                if (arr[left] + arr[right] === target) {
                    ret.push([arr[i], arr[left++], arr[right++]]);
                } else if (arr[left] + arr[right] < target) {
                    left++;
                } else right--;
            }
        }
        console.log(ret);
    }
    threeSum([-1, 0, 1, 2, -1, -4]);
})();
(function() {
    function replace(str, map) {
        function dfs(index, str, tmp, ret, map) {
            if (index === str.length) {
                ret.push(tmp.join(''));
                return;
            }
            (map[str[index]] || [str[index]]).forEach(change => {
                tmp.push(change);
                dfs(index + 1, str, tmp, ret, map);
                tmp.pop();
            });
        }
        const tmp = [], ret = [];
        dfs(0, str, tmp, ret, map);
        console.log(ret);
    }
    replace('abc', {'a' : ['b', 'c', 'd']})
})();
(function() {
    function jump(arr) {
        let cur = 0, pre = 0, res = 0;
        for (let i = 0; i < arr.length; i++) {
            if (i > pre) {
                pre = cur;
                res++;
                if (cur >= arr.length - 1) break;              
            }
            cur = Math.max(cur, i + arr[i]);
        }
        console.log(res);
    }
    jump([2,3,1,1,4]);
})();
(function() {
    function validPalindrome(s) {
        let l = 0, r = s.length - 1;
        while(l < r) {
            if(s[l] !== s[r]) {
                return isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
            }
            ++l;
            --r;
        }
        return true;
    }
    function isPalindrome(s, l, r){
        while(l < r){
            if(s[l] === s[r]){
                ++l;
                --r;
            }
            else
                return false;
        }
        return true;
    }
    r = validPalindrome('aba');
    console.log('r=', r);
    r = validPalindrome('abca');
    console.log('r=', r);
})();
(function() {
    function insert(intervals, newInterval) {
        let i = 0, [start, end] = newInterval; 
        while (i < intervals.length) {
            if (end < intervals[i][0]) {
                intervals.splice(i, 0, [start, end]);
                break;
            } else if (intervals[i][1] < start) {
                i++;
            } else {
                start = Math.min(start, intervals[i][0]);
                end = Math.max(end, intervals[i][1]);
                intervals.splice(i, 1);
            }
        }
        console.log(intervals);
    }
    insert([[1,3], [6,9]], [2,5]);
    insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4, 9]);
})();
(function() {
    function rerange(arr, k) {
        const map = {};
        let next = 0;
        for (let i = 0; i < arr.length; i++) {
            let c = arr[i];
            if (map[c] && map[c] >= next) {
                next = map[c];
            }
            map[c] = next + k + 1;
            next++;
        }
        console.log(next);
    }
    rerange(['A', 'A', 'A', 'A', 'B', 'B' ,'B'], 2);
})();
(function() {
    class Node {
        v;
        left;
        right;
        constructor(v) {this.v = v;}
    }
    const root = new Node(10);
    root.left = new Node(5);
    const sub = new Node(20);
    sub.left = new Node(15);
    sub.right = new Node(27);
    root.right = sub;
    function visit(root) {
        if (!root) return;
        visit(root.left);
        console.log(root.v);
        visit(root.right);
    }
    visit(root);
    console.log('=====');
    function inorderSuccessor(root, p, mode) {
        let res = null;
        while (root) {
            if (root.v === p.v) {
                res = root;
                root = mode === 'next' ? root.right : root.left;
            } else if (root.v > p.v) {
                if (mode === 'next') res = root;
                root = root.left;
            } else {
                if (mode === 'pre') res = root;
                root = root.right;
            }
        }
        return res;
    }
    r = inorderSuccessor(root, sub, 'pre');
    console.log('r=', r.v);
    function inorderSuccessor2(root, p, mode) {
        if (!root) return null;
        if (root.v === p.v) {
            return mode === 'pre' ? inorderSuccessor2(root.left, p, mode) : inorderSuccessor2(root.right, p, mode);
        }
        if (root.v < p.v) {
            let right = inorderSuccessor2(root.right, p, mode);
            if (mode === 'pre') return right ? right : root;
            else return right;      
        } else {
            let left = inorderSuccessor2(root.left, p, mode);
            if (mode === 'next') return left ? left : root;
            else return left;
        }
    }
    r = inorderSuccessor2(root, sub, 'pre');
    console.log('r=', r.v);
})();
(function() {
    class Node {
        v;
        next;
        down;
        constructor(v) {
            this.v = v;
            this.next = null;
            this.down = null;
        }
    }
    function visit(head) {
        const ret = [];
        while (head) {
            ret.push(head.v);
            head = head.next;
        }
        console.log(ret.join('-'));
    }
    function location(head, v) {
        while (head) {
            if (head.v === v) return head;
            head = head.next;
        }
    }
    function buildList(str) {
        const head = new Node('dummy');
        str.split('-').reduce((pre, n) => {
            pre.next = new Node(n);
            return pre.next;
        }, head);
        return head.next;
    }
    let h = buildList('A-B-C-D-E-F');
    let a = buildList('G-H-I-J');
    let b = buildList('K-L');
    location(h, 'D').down = a;
    location(a, 'I').down = b;
    function iter(h) {
        let head = h, tail = h;
        while (h) {
            if (h.down) {
                let [first, end] = iter(h.down);
                tail.next = first;
                end.next = h;
            }
            tail = h;
            h = h.next;
        }
        return [head, tail];
    }
    let [head, tail] = iter(h);
    visit(head);
})();
(function() {
    function countMinReversals(expr) {
        let res = '';
        const s = [];
        expr.split('').forEach(c => {
            if (c === '(') {
                res += c;
                s.push(c);
            } else if (c === ')' && s[s.length - 1] === '(') {
                res += c;
                s.pop();
            }
        });
        s.length = 0;
        let ret = '';
        for (let i = res.length - 1; i >= 0; i--) {
            let c = res[i];
            if (c === ')') {
                ret = c + ret;
                s.push(c);
            } else if (c === '(' && s[s.length - 1] === ')') {
                ret = c + ret;
                s.pop();
            }
        }
        console.log('ret=', ret);
    }
    countMinReversals('((()())()');
    countMinReversals('(()(');
})();
(function() {
    function read4(buf) {
        return 4;
    }
    function read(buf) {
        let tmpBuf = new Array(4), readPos = 0, writePos = read4(tmpBuf), totalRead = 0;
        let i = 0;
        while (writePos) {
            buf[i] = tmpBuf[readPos];
            totalRead++;
            if (buf[i] === '\n') {
                return totalRead;
            }
            if (readPos === writePos) {
                readPos = 0;
                writePos = read4(tmpBuf);
            } else {
                readPos++;              
            }
            i++;
        }
        return totalRead;
    }
})();
(function() {
    function minMeetingRooms(arr) {
        const map = {};
        for (let [s, t] of arr) {
            map[s] = (map[s] || 0) + 1;
            map[t] = (map[t] || 0) - 1;
        }
        let max = 0, rooms = 0;
        Object.keys(map).forEach(key => {
            rooms += map[key];
            max = Math.max(max, rooms);
        });
        console.log(max);
    }
    minMeetingRooms([[0, 30],[5, 10],[15, 20]]);
})();
(function() {
    function knows(i, j) {
        return false;
    }
    function findCelebrity(n) {
        for (let i = 0, j = 0; i < n; ++i) {
            for (j = 0; j < n; ++j) {
                if (i != j && (knows(i, j) || !knows(j, i))) break;
            }
            if (j == n) return i;
        }
        return -1;
    }
})();
(function() {
    function dfs(num, target, diff, curNum, out, res) {
        if (num.length === 0 && curNum === target) {
            console.log('curNum=', curNum);
            res.push(out);
            return;
        }
        for (let i = 1; i <= num.length; i++) {
            let cur = num.substr(0, i);
            if (cur.length > 1 && cur[0] === '0') return;
            let next = num.substr(i);
            if (out.length > 0) {
                dfs(next, target, +cur, curNum + (+cur), out + '+' + cur, res);
                dfs(next, target, +cur, curNum - (+cur), out + '-' + cur, res);
                dfs(next, target, diff * (+cur), (curNum - diff) + diff * (+cur), out + '*' + cur, res);
            } else {
                dfs(next, target, +cur, +cur, cur, res);
            }
        }
    }
    const res = [];
    dfs('123', 6, 0, 0, '', res);
    console.log(res);
})();
(function() {
    function countSubstrings(str) {
        let res = 0;
        const dp = new Array(str.length);
        for (let i = 0; i < str.length; i++) {
            dp[i] = new Array(str.length);
            dp[i].fill(false);
        }
        for (let i = str.length - 1; i >= 0; i--) {
            for (let j = i; j < str.length; j++) {
                dp[i] = (str[i] === str[j]) && (j - i <= 2 || dp[i + 1][j - 1]);
                if (dp[i]) res++;
            }
        }
        console.log('total=', res);
    }
    countSubstrings('aaa');
})();
(function() {
    function minPalPartion(str) {
        let n = str.length;
        const C = new Array(n);
        const P = new Array(n);
        for (let i = 0; i < n; i++) {
            C[i] = new Array(n);
            C[i].fill(0);
            P[i] = new Array(n);
            P[i].fill(false);
        }
        let i, j, k, L;
        for (i = 0; i < n; i++) {
            P[i][i] = true;
            C[i][i] = 0;
        }
        for (L = 2; L <= n; L++) {
            for (i = 0; i < n - L + 1; i++) {
                j = i + L - 1;
                P[i][j] = L === 2 ? str[i] === str[j] : str[i] === str[j] && P[i+1][j-1];
                if (P[i][j])
                    C[i][j] = 0;
                else {
                    C[i][j] = Number.MAX_VALUE;
                    for (k = i; k <= j - 1; k++)
                        C[i][j] = Math.min(C[i][j], C[i][k] + C[k+1][j] + 1);
                }
            }
        }
        console.log(C[0][n-1]);
        return C[0][n-1];
    }
    minPalPartion('ababbbabbababa');
})();
(function() {
    function minWindow(s, t) {
        const map = t.split('').reduce((m, c) => {
            m[c] = (m[c] || 0) + 1;
            return m;
        }, {});
        let start = 0, count = 0, min = s.length, minstart;
        for (let i = 0; i < s.length; i++) {
            let c = s[i];
            if (map[c] !== undefined) {
                map[c]--;
                if (map[c] >= 0) count++;
                while (count === t.length) {
                    if (i - start + 1 < min) {
                        min = i - start + 1;
                        minstart = start; 
                    }
                    if (map[s[start]] !== undefined) {
                        map[s[start]]++;
                        if (map[s[start]] > 0) count--;
                    }
                    start++;
                }
            }
        }
        console.log(min, s.substr(minstart, min));
    }
    minWindow('ADOBECODEBANC', 'ABC');//BANC
})();
(function() {
    class BSTIterator {
        s;
        node;
        forward;
        constructor(root, forward) {
            this.node = root;
            this.forward = forward;
            this.s = [];
        }
        hasNext() {
            return !!this.node || this.s.length > 0;
        }
        next() {
            while (this.node || this.s.length > 0) {
                if (this.node) {
                    this.s.push(this.node);
                    this.node = this.forward ? this.node.left : this.node.right;
                }
                else {
                    this.node = this.s.pop();
                    let nextVal = this.node.val;
                    this.node = this.forward ? this.node.right : this.node.left;
                    return nextVal;
                }
            }
            return -1;
        }        
    };
    function findTarget(root, k) {
        if (!root) return false;
        const l  = new BSTIterator(root, true);
        const r = new BSTIterator(root, false);
        for (let i = l.next(), j = r.next(); i < j;) {
            let sum = i + j;
            if (sum == k) {
                return true;
            }
            else if (sum < k) {
                i = l.next();
            }
            else {
                j = r.next();
            }
        }
        return false;
    }
})();
(function() {
    /*- 空格： 我们需要排除的情况是，当前位置是空格而后面一位不为空格，但是之前有数字，小数点，自然底数或者符号出现时返回false。
    - 符号：符号前面如果有字符的话必须是空格或者是自然底数，标记sign为true。    
    - 数字：标记num和numAfterE为true。    
    - 小数点：如果之前出现过小数点或者自然底数，返回false，否则标记dot为true。
    - 自然底数：如果之前出现过自然底数或者之前从未出现过数字，返回false，否则标记exp为true，numAfterE为false。
    - 其他字符：返回false。
    */
    function isNumber(s) {
        let num = false, numAfterE = true, dot = false, exp = false, sign = false, n = s.size();
        for (let i = 0; i < n; ++i) {
            if (s[i] === ' ') {
                if (i < n - 1 && s[i + 1] !== ' ' && (num || dot || exp || sign)) return false;
            } else if (s[i] === '+' || s[i] === '-') {
                if (i > 0 && s[i - 1] !== 'e' && s[i - 1] !== ' ') return false;
                sign = true;
            } else if (s[i] >= '0' && s[i] <= '9') {
                num = true;
                numAfterE = true;
            } else if (s[i] === '.') {
                if (dot || exp) return false;
                dot = true;
            } else if (s[i] === 'e') {
                if (exp || !num) return false;
                exp = true;
                numAfterE = false;
            } else return false;
        }
        return num && numAfterE;
    }
})();
(function() {
    function knows(i, j) {
        return true;
    }
    let candidate = 0, n = 10;
    for (let i = 1; i < n; i++) {
        if (knows(candidate, i))
            candidate = i;
    }
    for (let i = 0; i < n; i++) {
        if (i !== candidate && (knows(candidate, i) || !knows(i, candidate))) return -1;
    }
    return candidate;
})();
(function() {
    //http://www.cnblogs.com/grandyang/p/6876457.html
})();
(function() {
    function minSubArrayLen(arr, k) {
        let min = arr.length, left = 0, right = 0, sum = arr[left];
        while (right < arr.length) {
            if (sum < k) {
                sum += arr[++right];
            } else if (sum >= k) {
                min = Math.min(min, right - left + 1);
                sum -= arr[left++];
            }
        }
        console.log('min=', min);
    }
    minSubArrayLen([2, 3, 1, 2, 4, 3], 7); //[4,3]
})();
(function() {
    function checkSubarraySum(nums, k) {
        let n = nums.length, sum = 0;
        const m = {0 : -1};
        for (let i = 0; i < n; ++i) {
            sum += nums[i];
            let t = (k == 0) ? sum : (sum % k);
            if (m[t]) {
                if (i - m[t] > 1) return true;
            } else m[t] = i;
        }
        return false;
    }
    checkSubarraySum([23, 2, 4, 6, 7], 6);
})();
(function() {
    function removeDuplicates(arr, k) {
        let count = 0, pre = arr[0], last = 0;
        for (let i = 1; i < arr.length; i++) {
            count = arr[i] === pre ? count + 1 : 0;
            if (count < k && last !== i) arr[++last] = arr[i];
            pre = arr[i];
        }
        console.log(arr.slice(0, last + 1));
    }
    removeDuplicates([1,1,1,2,2,3], 2);
})();
(function() {
    function leastBricks(wall) {
        let mx = 0;
        const m = {};
        for (let a of wall) {
            let sum = 0;
            for (let i = 0; i < a.length - 1; i++) {
                sum += a[i];
                m[sum] = (m[sum] || 0) + 1;
                mx = Math.max(mx, m[sum]);
            }
        }
        return wall.length - mx;
    }
    console.log(leastBricks([[1,2,2,1], [3,1,2], [1,3,2], [2,4], [3,1,2], [1,3,1,1]]));
})();
(function() {
    function findMaxLength(nums) {
        let res = 0, n = nums.length, sum = 0;
        const m = {0 : -1};
        for (let i = 0; i < n; ++i) {
            sum += (nums[i] == 1) ? 1 : -1;
            if (m[sum]) {
                res = Math.max(res, i - m[sum]);
            } else {
                m[sum] = i;
            }
        }
        return res;
    }
    console.log(findMaxLength([0,1,0]));
})();
(function() {
    function intersection(a, b, dup) {
        const ret = [];
        a.sort((a, b) => a - b);
        b.sort((a, b) => a - b);
        let i = 0, j = 0;
        while (i < a.length && j < b.length) {
            if (a[i] === b[j]) {
                if (dup || ret[ret.length - 1] !== a[i]) ret.push(a[i]);
                i++;
                j++;
            } else if (a[i] < b[i]) {
                i++;
            } else j++;
        }
        console.log(ret);
    }
    intersection([1, 2, 2, 1], [2, 2], false);
})();
(function() {
    function lengthOfLongestSubstringKDistinct(str, k) {
        const map = {};
        let max = 0, last = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            map[c] = (map[c] || 0) + 1;
            while (Object.keys(map).length > k) {
                let r = str[last++];
                map[r]--;
                if (map[r] === 0) delete map[r];          
            }
            max = Math.max(max, i - last + 1);
        }
        console.log('max=', max);
    }
    lengthOfLongestSubstringKDistinct('eceba', 2);
})();
(function() {
    function subarraySum(nums, k) {
        let ret = 0, sum = 0;
        const map = {0 : 1};
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (map[sum - k]) ret += map[sum - k];
            map[sum] = (map[sum] || 0) + 1;
        }
        console.log(ret);
    }
    subarraySum([1,1,1], 2);
})();
(function() {
    class priority_queue {
        q;
        comparator;
        constructor(comparator) {
            this.q = [];
            this.comparator = comparator;
        }
        pop() {
            return this.q.sort(this.comparator).shift();
        }
        push(v) {
            this.q.push(v);
        }
        isEmpty() {
            return !(this.q.length > 0);
        }
    }
    const w = new priority_queue((a, b) => a - b);
    w.push(3);
    w.push(9);
    w.push(1);
    while (!w.isEmpty()) {
        console.log(w.pop());
    }
    function leastInterval(tasks, n) {
        let cycle = n + 1, ret = [];
        const map = tasks.reduce((m, task) => {
            m[task] = (m[task] || 0) + 1;
            return m;
        }, {});
        const q = new priority_queue((a, b) => b[0] - a[0]); 
        for (let task in map) {
            q.push([map[task], task]);
        }
        while (!q.isEmpty()) {
            const tmp = [];
            let cnt = 0;
            for (let i = 0; i < cycle; i++) {
                if (!q.isEmpty()) {
                    let d = q.pop();
                    tmp.push(d);
                    cnt++;
                    ret.push(d[1]);
                }
            }
            for (let d of tmp) {
                if (--d[0] > 0) q.push(d);
            }
            while (cnt++ < cycle && !q.isEmpty()) {
                ret.push('-');
            }
            //ret += q.isEmpty() ? cnt : cycle;
        }
        console.log('total task len=', ret);
    }
    leastInterval(['A','A','A','B','B','B'], 2);
    leastInterval(['A', 'A', 'A', 'A', 'B', 'B', 'B', 'E', 'E', 'F', 'F', 'G', 'G'], 3);
})();
(function() {
    function maxSumSubmatrix(matrix, k) {
        if (!matrix || !matrix[0]) return 0;
        let m = matrix.size(), n = matrix[0].size(), res = Number.MIN_VALUE;
        const sum = new Array(m);
        for (let i = 0; i < m; i++) sum[i] = new Array(n);
        for (let i = 0; i < m; ++i) {
            for (let j = 0; j < n; ++j) {
                let t = matrix[i][j];
                if (i > 0) t += sum[i - 1][j];
                if (j > 0) t += sum[i][j - 1];
                if (i > 0 && j > 0) t -= sum[i - 1][j - 1];
                sum[i][j] = t;
                for (let r = 0; r <= i; ++r) {
                    for (let c = 0; c <= j; ++c) {
                        let d = sum[i][j];
                        if (r > 0) d -= sum[r - 1][j];
                        if (c > 0) d -= sum[i][c - 1];
                        if (r > 0 && c > 0) d += sum[r - 1][c - 1];
                        if (d <= k) res = Math.max(res, d);
                    }
                }
            }
        }
        return res;
    }
})();
(function() {
    function wordBreak(s, dict) {
        let len = s.length;
        const dp = new Array(len + 1);
        dp.fill(false);
        dp[0] = true;
        for (let i = 0; i < len + 1; ++i) {
            for (let j = 0; j < i; ++j) {
                if (dp[j] && dict.has(s.substr(j, i-j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        console.log(dp[len]);
    }
    wordBreak('leetcode', new Set(['leet', 'code']));
    function wordBreak2(s, dict) {
        const res = [];
        let out = [];
        const possible = new Array(s.length + 1);
        possible.fill(true);
        wordBreakDFS(s, dict, 0, possible, out, res);
        console.log(res);
        return res;
    }
    function wordBreakDFS(s, dict, start, possible, out, res) {
        if (start == s.length) {
            res.push(out.join(' '));
            return;
        }
        for (let i = start; i < s.length; ++i) {
            let word = s.substr(start, i - start + 1);
            if (dict.has(word) && possible[i + 1]) {
                out.push(word);
                let oldSize = res.length;
                wordBreakDFS(s, dict, i + 1, possible, out, res);
                if (res.length === oldSize) possible[i + 1] = false;
                out.pop();
            }
        }
    }
    wordBreak2('catsanddog', new Set(['cat', 'cats', 'and', 'sand', 'dog']));
})();
(function() {
    class Node {
        v;
        left;
        right
        constructor(v) {
            this.v = v;
            this.left = null;
            this.right = null;
        }
    }
    const root = new Node(1);
    const l = new Node(2);
    l.left = new Node(3);
    l.right = new Node(4);
    const r = new Node(5);
    r.right = new Node(6);
    root.left = l;
    root.right = r;
    function visitList(head) {
        const ret = [];
        while (head) {
            ret.push(head.v);
            head = head.left;
        }
        console.log(ret.join('->'));
    }
    function visit(root) {
        if (!root) return;
        console.log(root.v);
        visit(root.left);
        visit(root.right);
    }
    visit(root);
    function iterPreVisit(root) {
        const st = [], out = [];
        let node = root;
        while (node || st.length) {
            while (node) {
                out.push(node.v);
                st.push(node);
                node = node.left;
            }
            node = st.pop().right;           
        }
        console.log(out.join('->'));
    }
    iterPreVisit(root);
    let head, last;        
    function visitTree(root) {
        if (!root) return;
        let left = root.left;
        if (!head) {
            head = root;
            last = root;
        } else {
            last.left = root;
            last = root;  
        }
        visitTree(left);
        visitTree(root.right);
    }
    visitTree(root);
    visitList(head);
})();
(function() {
    class Node {
        next;
        v;
        constructor(v) {
            this.v = v;
            this.next = null; 
        }
    }
    const head = new Node(1);
    const two = new Node(2);
    const three = new Node(3);
    const four = new Node(4);
    head.next = two;
    two.next = three;
    three.next = four;
    function visitList(head) {
        const ret = [];
        while (head) {
            ret.push(head.v);
            head = head.next;
        }
        console.log(ret.join('->'));
    }
    visitList(head);
    function reverseList(head) {
        let node = head, next, dummy = new Node('');
        while (node) {
            next = node.next;
            node.next = dummy.next;
            dummy.next = node;
            node = next;
        }
        let r = dummy.next;
        visitList(r);
    }
    //reverseList(head);
    function reverse(head) {
        if (!head.next) return head;
        let h = reverse(head.next);
        head.next.next = head;
        head.next = null;
        return h;
    }
    visitList(reverse(head));
})();
(function() {
    class NestedIterator {
        st;
        constructor(arr) {
            this.st = [];
            this.FlatArray(arr);
        }
        private FlatArray(arr) {
            for (let i = arr.length - 1; i >= 0; i--) {
                this.st.push(arr[i]);
            }
        }
        hasNext() {
            return this.st.length > 0;
        }
        next() {
            let top = this.st.pop();
            if (Array.isArray(top)) {
                this.FlatArray(top);
                top = this.st.pop();
            }
            return top;
        }
    }
    const it = new NestedIterator([[1,1],2,[1,1]]);
    while(it.hasNext()) {
        console.log(it.next());
    }
})();
(function() {
    function calculate(s) {
        const st = [];
        let num = 0, sign = 1, pre = 0;
        for (let i = 0; i < s.length; i++) {
            let c = s[i];
            if (c === ' ' || c === '(' || c === ')') continue;
            if (/\d/.test(c)) {
                num = 10 * num + c;
            } else if (c === '+' || c === '-') {
                pre += num * sign;
                sign = c === '+' ? 1 : -1;
                num = 0; 
            }
        }
        pre += num * sign;
        console.log('pre=', pre);
    }
    calculate('1 + 1');
    calculate(' 2-1 + 2 ');
    calculate('(1+(4+5+2)-3)+(6+8)');
})();
(function() {
    class Node {
        v;
        left;
        right;
        constructor(v) {
            this.v = v;
            this.left = this.right = null;
        }
    }
    function visit(root) {
        if (!root) return;
        console.log(root.v);
        visit(root.left);
        visit(root.right);
    }
    function str2tree(str) {
        const st = [];
        let num = '';
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            if (/\d/.test(c)) {
                num += c;
            } else {
                if (num.length) {
                    st.push(new Node(num));
                    num = '';                    
                }
                if (c === ')') {
                    let top = st.pop();
                    let parent = st[st.length - 1];
                    if (!parent.left) parent.left = top;
                    else parent.right = top;
                }
            }
        }
        let root = st.pop();
        visit(root);
    }
    str2tree('4(2(3)(1))(6(5))');
})();
(function() {
    function find(n, tmp, ret) {
        if (n === 0) {
            ret.push(tmp.join(''));
            return;
        }
        const map = {1: 1, 6 : 9, 8 : 8, 9 : 6};
        if (n % 2 === 1) {
            [0, 1, 8].forEach(num => {
                tmp.push(num);
                find(n - 1, tmp, ret);
                tmp.pop();
            });
        } else {
            for (let key in map) {
                tmp.unshift(key);
                tmp.push(map[key]);
                find(n - 2, tmp, ret);
                tmp.pop();
                tmp.shift();
            }
        }
    }
    function findStrobogrammatic(n) {
        const ret = [], tmp = [];
        find(n, tmp, ret);
        console.log(ret);
    }
    findStrobogrammatic(3);
})();
(function() {
    function isValid(k, s) {
        if (s.length === 0) return false;
        if (k === 0 && s[0] === '0') return false;
        if (k !== 0 && s.length > 1 && s[0] === '0') return false;
        let res = parseInt(s, 10);
        return res <= 255 && res >= 0;
    }
    function dfs(s, k, tmp, ret) {
        if (k === 0 && s.length === 0) {
            ret.push(tmp.join('.'));
            return;
        }
        for (let i = 1; i <= Math.min(3, s.length); i++) {
            let ip = s.substr(0, i);
            if (isValid(k, ip)) {
                tmp.push(ip);
                dfs(s.substr(i), k - 1, tmp, ret);
                tmp.pop();
            }
        }
    }
    function restoreIpAddresses(s) {
        const res = [], tmp = [];
        dfs(s, 4, tmp, res);
        console.log(res);
        return res;
    }
    restoreIpAddresses('25525511135');
})();
(function() {
    function read4(buff) {
        return 10;
    }
    class ReadLine {
        readPos;
        writePos;
        buff;
        constructor() {
            this.readPos = 0;
            this.writePos = 0;
            this.buff = new Array(4);
        }
        public read(buf) {
            let ret = 0, i = 0;
            while (true) {
                if (this.readPos === this.writePos) {
                    this.writePos = read4(this.buff);
                    this.readPos === 0;
                    if (this.writePos === 0) return ret;
                }
                buf[i++] = this.buff[this.readPos++];
                if (buf[i - 1] === '\n') return ret;
                ret++;
            }
        }
    };
})();