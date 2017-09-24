(function() {
    const dict = new Set(['hit', 'hot', 'dot', 'dog', 'lot', 'log', 'cog']);
    const start = 'hit', end = 'cog';
    const similiar = Array.from(dict).reduce((acc, word) => {
        for(let i = 0; i < word.length; i++) {
            let token = word.substring(0, i) + '*' + word.substring(i + 1);
            acc[token] = acc[token] || [];
            acc[token].push(word);
        }
        return acc;
    }, {});
    const q = [start], map = {[start] : [1, null]};
    while (q.length && !map[end]) {
        let cur = q.shift();
        for (let i = 0; i < cur.length; i++) {
            let token = cur.substring(0, i) + '*' + cur.substring(i + 1);
            const words = similiar[token];
            if (words) {
                for (let i = 0; i < words.length; i++) {
                    if (!map[words[i]]) {
                        map[words[i]] = [map[cur][0] + 1, cur];
                        q.push(words[i]);
                        if (words[i] === end) break;
                    }
                }
            }
        }
    }
    let p = map[end][1];
    const path = [end];
    while (p) {
        path.unshift(p);
        p = map[p][1];
    }
    console.log(path.join('->'));
})();
(function() {
    function isNumber(s) {
        let num = false, numAfterE = true, dot = false, exp = false, sign = false;
        for (let i = 0; i < s.length; ++i) {
            if (s[i] === ' ') {
                if (s[i + 1] !== ' ' && (num || dot || exp || sign)) return false;
            } else if (s[i] === '+' || s[i] === '-') {
                if (s[i - 1] !== 'e' && s[i - 1] !== ' ') return false;
                sign = true;
            } else if (/\d/.test(s[i])) {
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
    r = isNumber(' 005047e+6');
    console.log('r=', r);
})();
(function() {
    class TwoSum {
        m;
        constructor() {
            this.m = {};
        }
        add(number) {
            this.m[number] = this.m[number] || 0;
            this.m[number]++;
        }
        find(value) {
            for (let a in this.m) {
                let t = value - this.m[a];
                if ((t === +a && this.m[a] > 1) || (t !== +a && this.m[a])) return true;
            }
            return false;
        }
    };
})();
(function() {
    const words = ['practice', 'makes', 'perfect', 'coding', 'makes', 'makes'];
    const word1 = 'makes', word2 = 'makes';
    function shortestWordDistance(word1, word2) {
        let p1 = words.length, p2 = -p1, min = words.length;
        for (let i = 0; i < words.length; i++) {
            if (words[i] === word1) p1 = word1 === word2 ? p2 : i;
            if (words[i] === word2) p2 = i;
            min = Math.min(min, Math.abs(p2 - p1));
        }
        return min;
    }
    r = shortestWordDistance(word1, word2);
    console.log(r);
})();
(function() {
    const arr = [4, 5, 6, 0, 1, 2, 3], value = 5;
    function find(arr, value) {
        let low = 0, high = arr.length - 1;
        while (low < high) {
            let mid = low + Math.floor((high - low)/2);
            if (arr[mid] === value) return mid;
            if (arr[mid] < arr[high]) {
                if (arr[mid] < value && value < arr[high]) low = mid + 1;
                else high = mid - 1;
            } else {
                if (value < arr[mid] && value > arr[low]) high = mid - 1;
                else low = mid + 1;
            }
        }
        return -1;
    }
    r = find(arr, value);
    console.log(r, arr[r]);
    function findLowerest(arr) {
        let low = 0, high = arr.length - 1;
        while (low + 1 < high) {
            let mid = low + Math.floor((high - low)/2);
            if (arr[mid] < arr[high]) {
                high = mid;
            } else {
                low = mid;
            }
        }
        console.log(arr[low], arr[high]);
    }
    findLowerest(arr);
})();
(function() {
    function findRepeatedDnaSequences(s) {
        const res = [], st = new Set(), m = {'A': 0, 'C': 1, 'G': 2, 'T': 3};
        let cur = 0, i = 0;
        while (i < 9) cur = cur << 2 | m[s[i++]];
        while (i < s.length) {
            cur = ((cur & 0x3ffff) << 2) | (m[s[i++]]);
            if (st.has(cur)) res.push(s.substr(i - 10, 10));
            else st.add(cur);
        }
        return res;
    }
    r = findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT');
    console.log(r);
})();
(function() {
    const s = 'ADOBECODEBANC', t = 'ABC', m = {};
    let res = '', left = 0, count = 0, minLen = s.length + 1;
    for (let i = 0; i < t.length; ++i) {
        if (m[t[i]]) ++m[t[i]];
        else m[t[i]] = 1;
    }
    for (let right = 0; right < s.length; right++) {
        if (m[s[right]] !== undefined) {
            m[s[right]] = m[s[right]] - 1;
            if (m[s[right]] >= 0) ++count;
            while (count === t.length) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    res = s.substr(left, minLen);
                }
                if (m[s[left]] !== undefined) {
                    m[s[left]] = m[s[left]] + 1;
                    if (m[s[left]] > 0) --count;
                }
                ++left;
            }
        }
    }
    console.log('res=', res);    
})();
(function() {
    const arr = [2, 3, -2, 4];
    let max = arr[0], min = arr[0], maxAns = arr[0];
    for (let i = 1; i < arr.length; i++) {
       let mx = max, mn = min;
       max = Math.max.call(null, arr[i], mx*arr[i], mn*arr[i]);
       min = Math.min.call(null, arr[i], mx*arr[i], mn*arr[i]);
       maxAns = Math.max(max, maxAns);
    }
    console.log(maxAns);
})();
(function() {
    const intervals = [[1,2], [3,5], [6,7], [8,10], [12,16]], insert = [4,9];
    let i = 0, overlap = 0;
    while (i < intervals.length) {
        if (insert[1] < intervals[i][0]) break;
        if (insert[0] <= intervals[i][1]) {
            insert[0] = Math.min(insert[0], intervals[i][0]);
            insert[1] = Math.max(insert[1], intervals[i][1]);
            ++overlap;
        }
        ++i;
    }
    if (overlap > 0) intervals.splice(i - overlap, overlap);
    intervals.splice(i - overlap, 0, insert);
    console.log(intervals);
})();
console.log('===========>');
(function() {
    const str = 'A man, a plan, a canal: Panama';
    str.toLowerCase();
    function isPalindrome(str) {
        let left = 0, right = str.length - 1;
        while (left < right) {
            if (!/[a-zA-Z]/.test(str[left])) {
                left++;
                continue;
            }
            if (!/[a-zA-Z]/.test(str[right])) {
                right--;
                continue;
            }
            if (left >= right) break;
            if (str[left].toLowerCase() !== str[right].toLowerCase()) return false;
            left++;
            right--;
        }
        return true;
    }
    r = isPalindrome(str);
    console.log(r);
    r = isPalindrome('race a car');
    console.log(r);
})();
(function() {
    function subset(arr) {
        const ret = [[]];
        for (let i = 0; i < arr.length; i++) {
            let n = ret.length;
            for (let j = 0; j < n; j++) {
                const t = ret[j].slice();
                t.push(arr[i]);
                ret.push(t);
            }
        }
        console.log(ret);
    }
    subset([1, 2, 3]);
    function subset2(arr) {
        function dfs(index, tmp, ret) {
            if (index >= arr.length) {
                ret.push([...tmp]);
                return;
            }
            dfs(index + 1, tmp, ret);
            tmp.push(arr[index]);
            dfs(index + 1, tmp, ret);
            tmp.pop();
        }
        const tmp = [], ret = [];
        dfs(0, tmp, ret);
        console.log(ret);
    }
    subset2([1, 2, 3]);
})();
(function() {
    const dict = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const str = '23';
    function dfs(index, tmp, ret) {
        if (index >= str.length) {
            ret.push(tmp.join(''));
            return;
        }
        const chars = dict[parseInt(str[index], 10) - 2];
        chars.split('').forEach(c => {
            tmp.push(c);
            dfs(index + 1, tmp, ret);
            tmp.pop();
        });
    }
    const tmp = [], ret = [];
    dfs(0, tmp, ret);
    console.log(ret);
    let pre = [''];
    for (let i = 0; i < str.length; i++) {
        let chars = dict[parseInt(str[i], 10) - 2]; next = [];
        chars.split('').forEach(c => {
            pre.forEach(group => {
                next.push(group + c);
            });
        });
        pre = next;
    }
    console.log(pre);
})();

