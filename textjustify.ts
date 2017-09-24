const justify = (strs, exspaces) => {
    let space = Math.floor(exspaces/(strs.length - 1)), 
        remain = exspaces%(strs.length - 1), ret = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let addspace = space + 1;
        if (remain > 0) {
            addspace++;
            remain--;
        }
        ret += ' '.repeat(addspace) + strs[i];
    }
    return ret;
};
const textJustify = (strs, len) => {
    let length = strs[0].length, hold = [strs[0]], ret = [];
    for (let i = 1; i < strs.length; i++) {
        if (length + strs[i].length + 1 > len) {
            ret.push(justify(hold, len - length));
            hold = [strs[i]];
            length = strs[i].length;
        } else {
            length += (strs[i].length + 1);
            hold.push(strs[i]);
        }
    }
    ret.push(hold.join(' ') + ' '.repeat(len - length));
    return ret;
};
r = textJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16);
r.forEach(element => {
    console.log('\'' + element + '\'');
});

//credit karma
function number2Roman(n) {
    const roman = ['M', 'D', 'C', 'L', 'X', 'V', 'I'], value = [1000, 500, 100, 50, 10, 5, 1];
    let ret = '';
    for (let i = 0; i < 7; i += 2) {
        let x = Math.floor(n / value[i]);
        if (x < 4) ret += roman[i].repeat(x);
        else if (x === 4) ret += roman[i] + roman[i - 1];
        else if (x > 4 && x < 9) ret += roman[i - 1] + roman[i].repeat(x - 5);
        else if (x === 9) ret += roman[i] + roman[i - 2];
        n %= value[i];
    }
    console.log(ret);
}
number2Roman(1437);

function roman2number(str) {
    let res = 0;
    const map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
    for (let i = 0; i < str.length; i++) {
        let val = map[str[i]];
        if (i === str.length - 1 || map[str[i + 1]] <= map[str[i]]) res += val;
        else res -= val;
    }
    console.log(str, '=', res);
}
roman2number('MCDXXXVII');

function polish(arr) {
    if (arr.length == 1) return +arr[0];
    const s = [], op = {'+' : (a, b) => a + b, '-' : (a, b) => a - b, '*' : (a, b) => a * b, '/' : (a, b) => a/b},
    keys = new Set(Object.keys(op));
    for (let i = 0; i < arr.length; i++) {
        if (!keys.has(arr[i])) {
            s.push(+arr[i]);
        } else {
            let m = s.pop(), n = s.pop();
            s.push(op[arr[i]].call(null, n, m));
        }
    }
    return s.pop();
}
r = polish(['2', '1', '+', '3', '*']);
console.log('r=', r);

class Codec2 {
    constructor(){}
    encode(strs) {
        let res = '';
        for (let a of strs) {
            res += a === null ? -1 + '/' : a.length + '/' + a;
        }
        return res;
    }
    decode(str) {
        let res = [];
        while (str.length > 0) {
            let found = str.indexOf('/');
            let len = parseInt(str.substring(0, found), 10);
            if (len >= 0) {
                res.push(str.substr(found + 1, len));
            } else {
                res.push(null);
                len = 0;
            }
            str = str.substring(found + 1 + len);
        }
        return res;
    }
};
r = new Codec2();
d = r.encode(['abc', null, 'q', '']);
console.log('d=', d);
w = r.decode(d);
console.log('w=', w);

(function() {
    const map = {'+': (a, b) => a + b, '*' : (a, b) => a * b}; 
    class Node {
        val;
        left;
        right;
        constructor(val) {
            this.val = val;
        }
    }
    const root = new Node('*');
    root.left = new Node(3);
    root.right = new Node('+');
    root.right.left = new Node(4);
    root.right.right = new Node(5);
    function eval(node) {
        function value(node) {
            return typeof node.val === 'number' ? node.val : map[node.val](value(node.left), value(node.right))
        }
        return value(root);
    }
    console.log(eval(root));
})();
console.log('<><><><>');
(function() {
    const colors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond",
    "blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue",
    "cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey",
    "darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen",
    "darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray",
    "dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod",
    "gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender",
    "lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow",
    "lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray",
    "lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine",
    "mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise",
    "mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive",
    "olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip",
    "peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon",
    "sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow",
    "springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke",
    "yellow","yellowgreen"];
    function match2(pattern, color) {
        let pre = new Array(color.length);
        pre.fill(0);
        for (let i = 0; i < pattern.length; i++) {
            let curr = new Array(color.length);
            for (let j = 0; j < color.length; j++) {
                curr[j] = color[j] === pattern[i] ? pre[j] + 1 : curr[j - 1];
            }
            pre = curr;
        }
        return pre[pre.length - 1] === pattern.length;
    }
    function match1(pattern, color) {
        const re = new RegExp(pattern.split('').join('\\S*'));
        return re.test(color);        
    }
    function findColor(pattern) {
        return colors.filter(color => match2(pattern, color));
    }
    let r = findColor('uqi');
    console.log('r=', r);
    r = findColor('zre');
    console.log('r=', r);
    r = findColor('gold');
    console.log('r=', r);
    //'uqi'//['darkturquoise', 'mediumaquamarine', 'mediumturquoise', 'paleturquoise', 'turquoise' ]
})();
(function() {
    const board = [
        [5, 3, '', '', 7, '', '', '', ''],
        [6, '', '', 1, 9, 5, '', '', ''],
        ['', 9, 8, '', '', '', '', 6, ''],
        [8, '', '', '', 6, '', '', '', 3],
        [4, '', '', 8, '', 3, '', '', 1],
        [7, '', '', '', 2, '', '', '', 6],
        ['', 6, '', '', '', '', 2, 8, ''],
        ['', '', '', 4, 1, 9, '', '', 5],
        ['', '', '', '', 8, '', '', 7, 9]
    ];
    function isValidSudoku(board) {
        let m = board.length, n = board[0].length;
        const row = [], col = [], cell = [];
        for (let i = 0; i < m; i++) {
            row.push(new Set());
            col.push(new Set());
            cell.push(new Set());
        }
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][j] !== '') {
                    if (row[i].has(board[i][j])) return false;
                    row[i].add(board[i][j]);
                    if (col[j].has(board[i][j])) return false;
                    col[j].add(board[i][j]);
                    if (cell[3 * Math.floor((i / 3)) + Math.floor(j / 3)][board[i][j]]) return false;
                    cell[3 * Math.floor((i / 3)) + Math.floor(j / 3)].add(board[i][j]);
                }
            }
        }
        return true;
    }
    r = isValidSudoku(board);
    console.log('r=', r);
})();
(function() {
    function dfs(candidates, target, start, out, res) {
        if (target < 0) return;
        else if (target === 0) res.push([...out]);
        else {
            for (let i = start; i < candidates.length; ++i) {
                out.push(candidates[i]);
                dfs(candidates, target - candidates[i], i, out, res);
                out.pop();
            }
        }
    }

    function combinationSum(candidates, target) {
        const res = [], out = [];
        candidates.sort((a, b) => a - b);
        dfs(candidates, target, 0, out, res);
        return res;
    }
    r = combinationSum([2, 3, 6, 7], 7);
    console.log('r=====', r);
})();

function permutation(arr) {
    function dfs(visited, out, res) {
        if (out.length === arr.length) {
            res.push([...out]);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (!visited[i]) {
                visited[i] = true;
                out.push(arr[i]);
                dfs(visited, out, res);
                out.pop();
                visited[i] = false;
            }
        }
    }
    const visited = new Array(arr.length);
    visited.fill(false);
    const res = [], out = [];
    dfs(visited, out, res);
    console.log(res);
    console.log('=======');
    function iter() {
        let pre = [[arr[0]]];
        for (let i = 1; i < arr.length; i++) {
            let cur = [];
            for (let k = 0; k < pre.length; k++) {
                let org = pre[k];
                for (let j = 0; j < org.length + 1; j++) {
                    let t = org.slice();
                    t.splice(j, 0, arr[i]);
                    cur.push(t);
                }
            }
            pre = cur;
        }
        return pre;
    }
    r = iter();
    console.log(r);
}
permutation([1,2,3]);
function primes(n) {
    const num = new Array(n - 1);
    num.fill(true);
    num[0] = false;
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= limit; ++i) {
        if (num[i - 1]) {
            for (let j = i * i; j < n; j += i) {
                num[j - 1] = false;
            }
        }
    }
    const res = [];
    for (let j = 0; j < n - 1; ++j) {
        if (num[j]) res.push(j + 1);
    }
    return res;
}
r = primes(120);
console.log(r);
//问我搭建一个system，收取用户request，然后要同时发出一千个partner的call，最后把结果呈献给用户。
//问我如何搭建一个auth服务.

//Write a function addSubtract that will do the following : addSubtract(5)(8)(3) -> 5 + 8 - 3 -> 10 
//addSubtract(2)(1)(1)(5)(3)(2) -> 2 + 1 - 1 + 5 - 3 + 2 -> 6 etc.

function addSubtract(n) {
    let counter = 1, total = n;
    function ret(a) {
        counter++;
        if (counter > 2 && counter % 2 === 0) {
            total -= a;
        } else total += a;
        return ret;
    }
    ret.prototype.toString = function() {
        return total;
    }
    return ret;
}
console.log(+addSubtract(5)(8));

console.log('>>>>>>>>>>>');
function slow(callback) {
    setTimeout(function(){
        if (Math.random() > 0.5) {
            return callback("Error 417",null)
        }
        callback(null, {id:123});
    },500);
}

function exec(fn) {
    const p = new Promise((resolve, reject) => {
        fn((error, data) => {
            if (!error) resolve(data);
            else reject(error);
        });
    }).catch(e => e);

    return {
        done: function(cb) {
            p.then(data => cb(data));
            return this;
        }, 
        fail: function(cb) {
            p.catch(error => cb(error));
        }
    };
}

exec(slow).done(function(data) {
    console.log(data);
}).fail(function(err){
    console.log("Error: " + err);
})

console.log('-----');
(function() {
    function isValid(str) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '(') count++;
            if (str[i] === ')') count--;
            if (count < 0) return false;
        }
        return count === 0;
    }
    function removeParentheses(str) {
        const visited = new Set(), ret = [], q = [str];
        visited.add(str);
        while (q.length) {
            let cur = q.shift();
            if (isValid(cur)) {
                ret.push(cur);
                continue;
            }
            for (let i = 0; i < cur.length; i++) {
                if (cur[i] === '(' || cur[i] === ')') {
                    let newStr = str.substring(0, i) + str.substring(i + 1);
                    if (!visited.has(newStr)) {
                        visited.add(newStr);
                        q.push(newStr);
                    }
                }
            }
        }
        console.log(ret);
    }
    removeParentheses('()())()');
    removeParentheses('(a)())()');
})();
(function() {
    const arr = [0, 1, 1, 2, 2, 3, 4];
    let last = 1;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            arr[last++] = arr[i];
        }
    }
    console.log(arr, last);

    const arr2 = [0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
    let pre = 0, count = 1;
    last = 1;
    if (arr2[1] === arr2[0]) count++;
    for (let i = 2; i < arr2.length; i++) {
        if (arr2[i] === arr2[last] && count == 2) continue;
        arr2[++last] = arr2[i];
        count = 1;
        if (arr2[last] === arr2[last - 1]) count++;
    }
    console.log(arr2, last);
})();

(function() {
    function isPattern(pattern, str) {
        const map1 = {}, map2 = {} , words = str.split(' ');
        for (let i = 0; i < pattern.length; i++) {
            let c = pattern[i], word = words[i];
            if (map1[c] && map2[word] && (map1[c] !== word || c !== map2[word])) return false;
            if (map1[c] && !map2[word]) return false;
            if (!map1[c] && map2[word]) return false;
            map1[c] = word;
            map2[word] = c;
        }
        return true;
    }
    r = isPattern('abba', 'dog cat cat dog');
    console.log(r);
    r = isPattern('abba', 'dog cat cat fish');
    console.log(r);
})();
(function() {
    //const arr = ['geeksforgeeks', 'geeks', 'geek', 'geezer'];
    const arr = ['apple', 'ape', 'april'];
    let k = -1;
    for (let i = 0; i < arr[0].length; i++) {
        for (var j = 1; j < arr.length; j++) {
            if (arr[j][i] !== arr[0][i]) break;
        }
        if (j === arr.length) k++;
        else break;
    }
    console.log('pre=', arr[0].substring(0, k + 1));
    function isCommonPrefix(strs, len) {
        const str1 = strs[0].substring(0, len);
        for (let i = 1; i < strs.length; i++)
            if (!strs[i].startsWith(str1))
                return false;
        return true;
    }
    function longestCommonPrefix(strs) {
        if (!strs || strs.length == 0) return '';
        let minLen = Number.MAX_VALUE;
        for (let str of strs)
            minLen = Math.min(minLen, str.length);
        let low = 1 , high = minLen;
        while (low <= high) {
            let middle = low + Math.floor((high - low) / 2);
            if (isCommonPrefix(strs, middle))
                low = middle + 1;
            else
                high = middle - 1;
        }
        return strs[0].substring(0, Math.floor((low + high) / 2));
    }
    r = longestCommonPrefix(arr);
    console.log('r=', r);
})();
(function() {
    class iter {
        q;
        constructor(arr) {
            this.q = [];
            arr.forEach(item => this.q.push(item));
        }
        hasNext() {
            return this.q.length > 0;
        }
        next() {
            let cur = this.q.shift();
            if (Array.isArray(cur)) {
                cur.forEach(item => this.q.unshift(item));
                return this.next();
            } else {
                return cur;
            }
        }
    }
    const t = new iter([[[1,1]],[2],[1,1], 3]);
    while (t.hasNext()) {
        console.log(t.next());
    }
})();

function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.walk = function() {
    console.log(this.name + ' walks');
  };
  
  function Rabbit(name) {
    this.name = name;
  }
  
  Rabbit.prototype = Animal.prototype;
  
  Rabbit.prototype.walk = function() {
    console.log(this.name + " bounces!");
  };
  r = new Animal('Yong');
  r.walk();
  