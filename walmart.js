function shortestWordDistance(words, word1, word2) {
    let idx1= -1, idx2 = -1, min = words.length
    words.forEach((word, i) => {
        if (word === word1 && idx1 === -1) {
            idx1 = i
        } else if (word === word2 && idx2 === -1) {
            idx2 = i
        } else if (word === word1 && word1 === word2) {
            idx1 = idx2
            idx2 = i
        }
        if (idx1 !== -1 && idx2 !== -1) {
            min = Math.min(min, Math.abs(idx2 - idx1))
        }
    })
    return min
}
console.log(shortestWordDistance(['practice', 'makes', 'perfect', 'coding', 'makes'], 'makes', 'coding'))
console.log(shortestWordDistance(['practice', 'makes', 'perfect', 'coding', 'makes', 'makes'], 'makes', 'makes'))
class Node {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }
}
function kthSmallest(root, k) {
    let kth = null
    function dfs(node) {
        if (!node || !!kth) return
        dfs(node.left)
        if (!!kth) return
        k--
        if (k === 0) {
            kth = node.val
            return
        }
        dfs(node.right)
    }
    dfs(root)
    console.log('kth=', kth)
}
const root = new Node(10)
root.left = new Node(6)
root.left.left = new Node(2)
root.left.right = new Node(8)
root.right = new Node(12)
root.right.left = new Node(11)
console.log('*'.repeat(20)) //2, 6, 8, 10, 11, 12
kthSmallest(root, 6)
function canPermutePalindrome(s) {
    /*return Array.from(s.split('').reduce((map, c) => {
        map.set(c, !!map.get(c) ? map.get(c) + 1 : 1)
        return map
    }, new Map()).values()).filter(value => value % 2 === 1).length <= 1*/
    const map = new Map(), pair = []
    s.split('').forEach(c => {
        if (map.has(c)) {
            pair.push(c)
            map.delete(c)
        } else {
            map.set(c, 1)
        }
    })
    const last = Array.from(map.keys())
    const ret = []
    function dfs(i) {
        if (i >= pair.length) {
            ret.push(pair.concat(last).concat(pair.reverse()).join(''))
            return
        }
        for (let j = i; j < pair.length; j++) {
            [pair[i], pair[j]] = [pair[j], pair[i]];
            dfs(i + 1);
            [pair[i], pair[j]] = [pair[j], pair[i]];
        }
    }
    dfs(0)
    return ret
}
console.log(canPermutePalindrome('aacbbbb'))
//console.log(canPermutePalindrome('code'))
console.log(canPermutePalindrome('aab'))
console.log(canPermutePalindrome('carerac'))
console.log(canPermutePalindrome('aabb'))

function findMax(arr) {
    let left = 0, right = arr.length - 1
    while (left < right - 1) {
        let mid = left + Math.floor((right - left) / 2)
        if (arr[mid] < arr[right]) {
            if (arr[mid] > arr[left]) {
                return arr[right]
            } else {
                right = mid - 1
            }
        } else {
            left = mid
        }
    }
    return Math.max(arr[left], arr[right])
}
console.log(findMax([5, 6, 7, 9, 0, 1, 2, 4]))
function findMin(arr) {
    let left = 0, right = arr.length - 1
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if (arr[mid] < arr[right]) {
            if (arr[mid] > arr[left]) {
                return arr[left]
            } else {
                right = mid
            }
        } else {
            left = mid + 1
        }
    }
    return Math.min(arr[left], arr[right])
}
console.log(findMin([9, 0, 1, 2, 4, 5, 6, 7]))
class Item {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}
class KV {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.list = []
        this.map = new Map()
    }
    get(key) {
        const kv = this.map.get(key)
        if (!kv) return -1
        const idx = this.list.indexOf(kv)
        this.list.splice(idx, 1)
        this.list.push(kv)
    }
    put(key, value) {
        if (this.list.length >= this.capacity) {
            const kv = this.list.splice(0, 1)[0]
            this.map.delete(kv.key)
        }
        const kv = this.map.has(key) ? this.map.get(key) : new KV(key, value)
        const idx = this.list.indexOf(key)
        idx >= 0 && this.list.splice(idx, 1)
        this.list.push(kv)
        this.map.set(key, kv)
    }
}
const lru = new LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
console.log('lru=', lru.list, lru.map)
lru.get(1)
console.log('lru=', lru.list, lru.map)
function trap(heights) {
    st = []
    let i = 0, res = 0, n = heights.length
    while (i < n) {
        if (st.length === 0 || heights[i] <= heights[st[st.length - 1]]) {
            st.push(i++);
        } else {
            let t = st.pop()
            if (st.length === 0) continue
            res += (Math.min(heights[i], heights[st[st.length - 1]]) - heights[t]) 
                    * (i - st[st.length - 1] - 1)
        }
    }
    return res;
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
function mountainPath(matrix) {
    const m = matrix.length, n = matrix[0].length
    const visited = Array(m).fill(false).map(_ => Array(n).fill(false))
    let max = 0, sum = 0
    function dfs(i, j, pre) {
        if (i < 0 || i >= m || j < 0 || j >= n || visited[i][j] || 
            (pre !== null && pre <= matrix[i][j])) return
        visited[i][j] = true
        sum += matrix[i][j]
        max = Math.max(max, sum)
        dfs(i + 1, j, matrix[i][j])
        dfs(i - 1, j, matrix[i][j])
        dfs(i, j + 1, matrix[i][j])
        dfs(i, j - 1, matrix[i][j])
        visited[i][j] = false
        sum -= matrix[i][j]
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            sum = 0
            dfs(i, j, null)
        }
    }
    console.log('max=', max)
}
mountainPath([[1, 2, 3, 4], [0, 2, 6, 8], [0, 1, 1, 0]])
//给一个int n, 找min square 
//example: N = 12; N = 2^2 + 2^2 + 2^2    k = 3;
//N = 3^2 + 1^2 + 1^2 + 1^2    k = 4;  so return 3.
function minK(n) {
    const cache = new Map([[1, 1]])
    function find(k) {
        if (cache.get(k)) return cache.get(k)
        if (Math.sqrt(k) % 1 === 0) {
            cache.set(k, 1)
            return 1
        }
        let min = Number.MAX_VALUE
        for (let i = 1; i <= k/2; i++) {
            min = Math.min(min, find(i) + find(k - i))
        }
        cache.set(k, min)
        return min
    }
    for (let i = 2; i <= n; i++) {
        find(i)
    }
    console.log(cache.get(n))
}
minK(12)
function findKthLargest(arr, k) {
    function partition(left, right) {
        const pivot = arr[left]
        let i = left + 1, j = right
        while (i <= j) {
            if (arr[i] <= pivot) {
                i++
                continue
            }
            if (arr[j] >= pivot) {
                j--
                continue
            }
            [arr[i++], arr[j--]] = [arr[j], arr[i]];
        }
        [arr[j], arr[left]] = [arr[left], arr[j]];
        return j
    }
    let left = 0, right = arr.length - 1    
    while (true) {
        let pos = partition(left, right)
        if (pos === k - 1) return arr[pos]
        else if (pos > k - 1) right = pos - 1
        else left = pos + 1
    }
}
console.log(findKthLargest([3,2,1,5,6,4], 2))
function diff(a, b) {
    const res = {...a}
    for (const key in b) {
        if (res[key]) {
            if (res[key] === b[key]) {
                delete res[key]
            } else {
                res[key] = [res[key], b[key]]
            }
        } else {
            res[key] = b[key]
        }
    }
    for (const key in res) {
        if (Array.isArray(res[key])) {
            res[key].forEach(v => console.log(`${key}=>${v}`))
        } else {
            console.log(`${key}=>${res[key]}`)
        }
    }
}
diff( {a: 1, b: 2, c:3}, {a: 1, b: 3, d:4})
function flatten(arr) {
    function* dfs(item) {
        if (Array.isArray(item)) {
            for (const sub of item) {
                yield * dfs(sub)
            }
        } else {
            yield item    
        }
    }
    const ret = [...dfs(arr)]
    console.log('ret===', ret)
}
flatten([1, [2, 3, [4, 5]], [[6, 7]], 8])
function flatten2(arr) {
    /*
    const q =  [...arr], ret = []
    while (q.length) {
        const cur = q.shift()
        if (Array.isArray(cur)) {
            q.unshift(...cur)
        } else {
            ret.push(cur)
        }
    }
    console.log('ret===', ret)
    */
   const q = [], ret = []
   for (let i = arr.length - 1; i >= 0; i--) {
       q.push(arr[i])
   }
   while (q.length) {
       const cur = q.pop()
       if (!Array.isArray(cur)) {
           ret.push(cur)
       } else {
           for (let i = cur.length - 1; i >=0; i--) {
               q.push(cur[i])
           }
       }
   }
   console.log('ret===', ret)
}
flatten2([1, [2, 3, [4, 5]], [[6, 7]], 8])
function flatten3(arr) {
    console.log(arr)
}
flatten3([1, 2, [1 , 2, 3], {"a": "c"}, [4]])
function stringify(obj) {
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            return '[' + obj.map(item => stringify(item)).join(',') + ']'
        } else {
            const kv = []
            for (const key in obj) {
                kv.push(`"${key}"` + ':' + stringify(obj[key]))
            }
            return '{' + kv.join(',') + '}'
        }
    } else {
        return typeof obj === 'number' ? obj.toString() : `"${obj}"`
    }
}
const ob = {a: 1, b: [1, 2, 3], c: {d: 'yong', k: [9, 0]}}
console.log(stringify(ob))
console.log(JSON.stringify(ob))
function merge(obj1, obj2) {
    const ret = {}
    for (const key in obj1) {
        if (!obj2[key]) {
            ret[key] = obj1[key]
        } else {
            if (typeof obj1[key] !== typeof obj2[key] || 
                (typeof obj1[key] === typeof obj2[key] && 
                    typeof obj1[key] !== 'object')) {
                ret[key] = [obj1[key], obj2[key]]
            } else {
                ret[key] = merge(obj1[key], obj2[key])
            }
        }
    }
    for (const key in obj2) {
        if (!ret[key]) {
            ret[key] = obj2[key]
        }
    }
    return ret
}
console.log(merge({a: 1, b: 2, c: {d: 3}}, {b: 'a', c: {d: 4}}))
class TNode {
    constructor(val) {
        this.val = val
        this.children = []
    }
}
function naryTree(root) {
    function serialize(node) {
        if (node.children.length === 0) return node.val
        return `${node.val}(${node.children.map(n => serialize(n)).join(',')})`
    }
    function deserialize(str) {
        console.log('str=', str)
    }
    const r = serialize(root)
    deserialize(r)
}
const r = new TNode(1)
r.children.push(new TNode(2))
r.children[0].children.push(new TNode(5))
r.children[0].children.push(new TNode(6))
r.children[0].children[1].children.push(new TNode(11))
r.children.push(new TNode(3))
r.children.push(new TNode(4))
r.children[2].children.push(new TNode(7))
r.children[2].children.push(new TNode(8))
r.children[2].children.push(new TNode(9))
r.children[2].children.push(new TNode(10))
naryTree(r);
/*
const star = ({rate}) => (
    Array(5).fill(1).map((_, i) => {
        <div key = {i}>
            { i < rate ? `*` : `[]`}
        </div>
    })
)
*/
function pyramidPrint(n) {
    Array(n).fill(1).forEach((_, i) => console.log(Array(i + 1).fill(i + 1).join('')))
}
pyramidPrint(4)
/*要求写一个类，完成template string功能。具体如下：
var tmp = Template("{name} is a {if #isMale}man{/if}.")
tmp.format({name:'John', isMale:false})
这样就会输出 John is a man.
要实现的东西有3层：. From 1point 3acres bbs
1. Variable replacement 2. If statement 3. Nested if statement */
function parseHtmlTemplate(str, obj) {
    const ifs = []
    let ret = ''
    for (let i = 0; i < str.length; i++) {
        const c = str[i]
        if (c === '{') {
            if (str.slice(i + 1, i + 3) === 'if') {
                const variable = str.slice(str.indexOf('#', i) + 1, str.indexOf('}', i))
                ifs.push((ifs.length ? ifs[ifs.length - 1] : true) && obj[variable])                
                i = str.indexOf('}', i)
            } else if (str.slice(i + 1, i + 4) === '/if') {
                i = i + 4
                ifs.pop()
            } else {
                const variable = str.slice(i + 1, str.indexOf('}', i))
                ret += obj[variable]
                i = str.indexOf('}', i)
            }
        } else {
            if (ifs.length === 0 || ifs[ifs.length - 1]) {
                ret += c
            }
        }
    }
    console.log('ret=', ret)
}
parseHtmlTemplate('my name is {name} is a {if #isMale}man of {if #power}powerful{/if}, good {/if}.', 
    {name:'John', isMale:true, power:false})

function zigzagLevelOrder(root) {
    const a = [root], b = [], res = []
    let isa = false
    while (a.length || b.length) {
        const tmp = []
        while (a.length) {
            const top =a.pop()
            tmp.push(top.val)
            top.left && b.push(top.left)
            top.right && b.push(top.right)
        }
        tmp.length && res.push([...tmp])
        tmp.length = 0
        while (b.length) {
            const top = b.pop()
            tmp.push(top.val)
            top.right && a.push(top.right)
            top.left && a.push(top.left)
        }
        tmp.length && res.push([...tmp])
    }
    console.log('res=', res)
}
const rroot = new Node(3)
rroot.left = new Node(9)
rroot.right = new Node(20)
rroot.right.left = new Node(15)
rroot.right.right = new Node(7)
zigzagLevelOrder(rroot)
function serPrint() {
    const arr = ['A', 'B', 'C']
    arr.reduce(async (pre, cur) => {
        await pre
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('>>>>>', cur)
                resolve()
            }, Math.floor(Math.random() * 1000) + 1)
        })
    }, Promise.resolve())

    arr.reduce((pre, cur) => {
        return pre.then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('>>>>>', cur)
                    resolve()
                }, Math.floor(Math.random() * 1000) + 1)
            })    
        })
    }, Promise.resolve())
    function pp(i) {
        if (i === arr.length) {
            return
        }
        setTimeout(() => {
            console.log('>>>>>', arr[i])
            pp(i + 1)
        }, Math.floor(Math.random() * 100) + 1)
    }
    pp(0)
}
//serPrint()
console.log('*'.repeat(20))
function regexString(str) {
    const re = [/^(?<department>[a-zA-Z]+)[\s+|\-\:]?(?<course>\d+)\s+(?<year>\d{2}|\d{4})\s+(?<semester>[fF]all|[wW]inter|[Ss]pring|[Ss]ummer)$/g,
        /^(?<department>[a-zA-Z]+)[\s|\-\:]?(?<course>\d+)\s+(?<semester>[fF]all|[Ww]inter|[Ss]pring|[Ss]ummer)\s*(?<year>\d{2}|\d{4})$/g,
        /^(?<department>[a-zA-Z]+)[\s|\-\:]?(?<course>\d+)\s+(?<semester>F|W|S|Su)(?<year>\d{2}|\d{4})$/g]
    let match
    for (let i = 0; i < re.length && !match; i++) {
        match = re[i].exec(str)
    }
    const m = {Su:'Summer', S:'Spring', F:'Fall', W:'Winter'}
    if (match) {
        console.log('Department:', match.groups.department)
        console.log('Course:', match.groups.course)
        console.log('Year:', match.groups.year.length === 2 ? 20 + match.groups.year : match.groups.year)
        console.log('Semester:', match.groups.semester.length <= 2 ? m[match.groups.semester] : match.groups.semester)
    } else console.log('invlidate:', str, match)
    console.log('*'.repeat(20))
}
//['Math-123 Su2018', 'CS555 2016 fall', 'CS 777 Fall 2014', 'CS 111 Fall 2014', 'CS-999 Fall 14', 'CS:111 F2016'].forEach(regexString)
function regexString2(str) {
    /*
    const departmentCourseRe = /^(?<department>[a-zA-Z]+)(\s+|\:|\-)?(?<course>\d+)\s+/
    const match = departmentCourseRe.exec(str)
    if (!match) {
        console.log('error????')
    }
    //console.log('====match====', `|${match[0]}|`)
    const remain = str.substring(match[0].length)
    //console.log('remain:', `|${remain}|`)
    const semesterYearRe = /^(?<semester>[fF]all|[Ww]inter|[Ss]pring|[Ss]ummer|F|W|S|Su)\s*(?<year>\d{2}|\d{4})$/
    const match2 = semesterYearRe.exec(remain);
    if (match2) {
        console.log('match333333==', `|${match2[0]}|`, `|${match2.groups.semester}|`, `|${match2.groups.year}|`)
    }
    const yearSemesterRe2 = /^(?<year>\d{2}|\d{4})\s*(?<semester>[fF]all|[Ww]inter|[Ss]pring|[Ss]ummer|F|W|S|Su)$/
    const match3 = yearSemesterRe2.exec(remain);
    if (match3) {
        console.log(`|${match3.groups.semester}|`, `|${match3.groups.year}|`)
    }*/
    const re = [/^([a-zA-Z]+)(\s+|:|-)?(\d+)\s+([fF]all|[Ww]inter|[Ss]pring|[Ss]ummer|F|W|S|Su)\s*(\d{2}|\d{4})$/,
    /^([a-zA-Z]+)(\s+|:|-)?(\d+)\s+(\d{2}|\d{4})\s*([fF]all|[Ww]inter|[Ss]pring|[Ss]ummer|F|W|S|Su)$/]
    let match, i
    for (i = 0; i < re.length && !match; i++) {
        match = re[i].exec(str)
    }
    const m = {Su:'Summer', S:'Spring', F:'Fall', W:'Winter'}
    if (match) {
        console.log('Department:', match[1])
        console.log('Course:', match[3])
        const yearIdx = i === 1 ? 5 : 4
        const semesterIdx = i === 1 ? 4 : 5
        console.log('Year:', match[yearIdx].length === 2 ? 20 + match[yearIdx] : match[yearIdx])
        console.log('Semester:', match[semesterIdx].length <= 2 ? m[match[semesterIdx]] : match[semesterIdx])
    } else console.log('invlidate:', str)
    
}
//regexString2('CS 555 Su13')
function parseStringWithoutReg(str) {
    const strs = [], nums = [];
    let tmp = '';
    for (let i = 0; i <= str.length; i++) {
        if (str[i] === ' ' || !str[i] || (isNaN(+str[i]) && !isNaN(str[i - 1]) 
            || (!isNaN(+str[i]) && isNaN(str[i - 1])))) {
            if (tmp.length) {
                if (!isNaN(+tmp)) {
                    nums.push(tmp);
                } else {
                    strs.push(tmp);
                }
                tmp = '';
            }
        }
        str[i] !== ' ' && (tmp += str[i])
    }
    console.log('<><>?', strs);
    if (strs.length !== 2) {
        throw new Error('Error' + str);
    }
    let [department, semester] = strs;
    if (department.slice(-1) === '-' || department.slice(-1) === ':') {
        department = department.substring(0, department.length - 1);
    }
    if (!/\w+$/.test(department)) {
        throw new Error('Department is invalidate:' + str.replace(department, `<b>${department}</b>`));
    }
    if (!/[fF]all$|[Ww]inter$|[Ss]pring$|[Ss]ummer$|F$|W$|S$|Su$/.test(semester)) {
        throw new Error('Semester is invalidate:' + str.replace(semester, `<b>${semester}</b>`));
    }
    const map = {Su:'Summer', S:'Spring', F:'Fall', W:'Winter'}
    if (semester.length <= 2) {
        semester = map[semester];
    }
    if (nums.length !== 2) {
        throw new Error('Error');
    }
    let [course, year] = nums;
    if (!(year.length === 2 || year.length === 4)) {
        throw new Error('year is invalidate:' + str.replace(year, `<b>${year}</b>`))
    }
    if (year.length === 2) {
        year = 20 + year;
    }
    console.log('Department:', department)
    console.log('Course:', course)
    console.log('Year:', year)
    console.log('Semester:', semester)
    console.log('*'.repeat(20))
}
try {
    parseStringWithoutReg('CS 1234 20218S');
} catch(e) {
    console.log(e.message)
}
['CS 1234 2018 Spring', 'CS 1234 2018Spring', 'CS 1234 2018S', 'CS 1234 18 Spring',
'CS 1234 18Spring', 'CS 1234 18S', 'CS1234 2018 Spring', 'CS1234 2018Spring',
'CS1234 2018S', 'CS1234 18 Spring', 'CS1234 18Spring', 'CS1234 18S',
'CS-1234 2018 Spring', 'CS-1234 2018Spring', 'CS-1234 2018S','CS-1234 18 Spring',
'CS-1234 18Spring', 'CS-1234 18S', 'CS:1234 2018 Spring', 'CS:1234 2018Spring',
'CS:1234 2018S', 'CS:1234 18 Spring', 'CS:1234 18Spring', 'CS:1234 18S', 'CS 1234 Spring 2018',
'CS 1234 Spring2018', 'CS 1234 Spring18', 'CS 1234 S 2018', 'CS 1234 S2018', 'CS 1234 S18',
'CS1234 Spring 2018', 'CS1234 Spring2018', 'CS1234 Spring18', 'CS1234 S 2018','CS1234 S2018',
'CS1234 S18', 'CS-1234 Spring 2018', 'CS-1234 Spring2018', 'CS-1234 Spring18',
'CS-1234 S 2018', 'CS-1234 S2018', 'CS-1234 S18', 'CS:1234 Spring 2018', 'CS:1234 Spring2018',
'CS:1234 Spring18', 'CS:1234 S 2018', 'CS:1234 S2018', 'CS:1234 S18'].forEach(str => parseStringWithoutReg(str));

function gene() {
    const info = ['CS', '1234', '2018', 'Spring'], ret = []
    function dfs(i, str) {
        if (i >= 4) {
            ret.push(str)
            return
        }
        if (i === 0) {
            dfs(i + 1, `${info[0]}`)
        } else if (i === 1) {
            dfs(i + 1, str + ` ${info[1]}`)
            dfs(i + 1, str + `${info[1]}`)
            dfs(i + 1, str + `-${info[1]}`)
            dfs(i + 1, str + `:${info[1]}`)
        } else if (i === 2) {
            dfs(i + 1, str + ` ${info[2]}`)
            dfs(i + 1, str + ` ${/\d+/.test(info[2]) ? info[2].slice(2) : info[2] === 'Summer' ? 'Su':info[2][0]}`)
        } else if (i === 3) {
            dfs(i + 1, str + ` ${info[3]}`)
            dfs(i + 1, str + `${info[3]}`)
            dfs(i + 1, str + `${/\d+/.test(info[3]) ? info[3].slice(2) : info[3] === 'Summer' ? 'Su':info[3][0]}`)
        }
    }
    dfs(0, '');
    [info[2], info[3]] = [info[3], info[2]];
    dfs(0, '')
    console.log(ret)
}
gene()

function approximateMatch(text, prefix, suffix) {
    function score(str, full) {
        for (let i = 0; i < str.length; i++) {
            if (full.indexOf(str.substring(i)) === 0) return str.length - i
        }
        return 0
    }
    let maxScore = 0, maxSub
    for (let i =  0; i < text.length; i++) {
        for (let j = i + 1; j <= text.length; j++) {
            const sub = text.substring(i, j)
            const s = score(prefix, sub) + score(sub, suffix)
            if (s > maxScore || (s === maxScore && sub.localeCompare(maxSub)) < 0) {
                maxScore = s
                maxSub = sub
            }
        }
    }
    console.log('maxSub:', maxSub)
}
approximateMatch('nothing', 'bruno', 'ingenious')
approximateMatch('ab', 'b', 'a')

function binary(a, b) {
    function num1(n) {
        let c = 0
        while (n != 0) {
            console.log('-----', n)
            n = n & (n - 1)
            c++
        }
        return c
    }
    console.log('<><>', 100000000 * 100000000, num1(100000000 * 100000000))
    const r = '445231'
        .split('')
        .sort()
        .reduce((acc, i, index) => acc += index % 2 === 1 ? i + ':' : i).slice(0, -1)
    console.log('r=', r)
}
//第一题问 两数相乘得到的数转换成二进制数中一的个数。要考虑数很大的情况
//第二题是给六个数字，排成时刻，输出排列时间最小的时刻。lz用的dfs
//445231 这样的input，output 是要 12:34:45 这样的形式吗？ 
function reverseWord(str) {
    let ret = '', tmp = ''
    for (let i = 0; i <= str.length; i++) {
        if (!! str[i] && str[i] !== ' ') {
            tmp += str[i]
        } else {
            ret = ret.length > 0 ? tmp + ' ' + ret : tmp
            tmp = ''
        }
    }
    return ret
}
console.log(reverseWord(' The   fox jump over       horse      '))
function game(matrix) {
    let m = matrix.length, n = matrix[0].length
    function print(arr) {
        arr.forEach(row => console.log(row.join(' ')))
    }
    function status(arr) {
        return arr.reduce((acc, row) => acc + row.join(''), '');
    }
    function isWin(arr) {
        return status([[1, 2, 3], [4, 5, 6], [7, 8, ' ']]) === status(arr);
    }
    print(matrix)
    let row, col;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === ' ') {
                row = i;
                col = j;
            }
        }
    }
    const dirs = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    dirs.forEach(([i, j]) => {
        const r = row + i;
        const c = col + j;
        if (r >= 0 && r < m && c >= 0 && c < n) {
            [matrix[row][col], matrix[r][c]] = [matrix[r][c], matrix[row][col]];
            console.log('*'.repeat(20));
            print(matrix);
            if (isWin(matrix)) {
                console.log('OOPS, you win')
            }
            [matrix[row][col], matrix[r][c]] = [matrix[r][c], matrix[row][col]];
        }
    })
}
game([[1, 2, 3], [4, 5, 6], [7, ' ', 8]])
function prefix(words, board) {
    class TrieNode {
        constructor() {
            this.str = ''
            this.child = {}
        }
    }
    class Trie {
        constructor() {
            this.root = new TrieNode();         
        }
        insert(s) {
            let p = this.root
            for (let c of s) {
                if (!p.child[c]) p.child[c] = new TrieNode();
                p = p.child[c];
            }
            p.str = s;
        }
    }
    const tree = new Trie();
    for (const word of words) {
        tree.insert(word);
    }
    const visit = Array(board.length).fill(false).map(_ => Array(board[0].length).fill(false));
    const res = [];
    function search(p, i, j) {
        if (p.str.length > 0) {
            res.push(p.str);
        }
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        visit[i][j] = true;
        dirs.forEach(([row, col]) => {
            const nx = row + i;
            const ny = col + j;
            if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length && !visit[nx][ny] && p.child[board[nx][ny]] !== undefined) {
                search(p.child[board[nx][ny]], nx, ny);
            }
        })
        visit[i][j] = false;
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (tree.root.child[board[i][j]]) {
                search(tree.root.child[board[i][j]], i, j);
            }
        }
    }
    console.log('res=', res);
}
prefix(['oath', 'pea', 'eat', 'rain'], 
[['o', 'a', 'a', 'n'], ['e','t','a','e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']])
function quantCast() {
    function findSum(arr, sum) {
        const map = arr.reduce((m, item) => {
            m.set(item, m.get(item) ? m.get(item) + 1 : 1);
            return m;
        }, new Map());
        const ret = [];
        for (let [value, total] of map.entries()) {
            if (map.has(sum - value)) {
                let count = 0;
                if (sum - value === value && total > 1) {
                   count = Math.floor(total / 2);
                } else {
                    count = map.get(sum - value) * total;
                }
                while (count--) {
                    ret.push([value, sum - value]);
                }
                map.set(sum-value, 0);
                map.set(value, 0);
            }
        }
        console.log(ret);
    }
    findSum([2, 1, 4, 9, 1, 3, 6, 3, 5, 7, 5, 1], 6);
    function ww(a) {
        let total = a;
        function inner(a) {
            total += a;
        }
        inner.toString = () => total;
        return inner;
    }
    console.log('ret=' + ww(1))
    console.log('ret=' + ww(2))
    console.log('ret=' + ww(3))

    function counts(key) {
        if (!counts.map) counts.map = {}
        const map = counts.map
        const count = map[key] = !!map[key] ? map[key] + 1 : 1
        return () => {
            return count
        }
    }

    const countA = counts('A')
    const countB = counts('B')
    const countC = counts('A')
    console.log(countA())
    console.log(countB())
    console.log(countC())
    console.log(counts.map)
}
quantCast();
//找两个object的不同
function f() {
    function f(data, scb, ecb) {
        if(success) 
            scb(data);
        else
            ecb(data);
    }
    function retry(n, data, scb, ecb) {
        function wrapperEcb(data) {
            n--;
            if (n == 0) {
                ecb(data)
            } else {
                f(data, scb, wrapperEcb)
            }
        }
        f(data, scb, wrapperEcb)
    }
    function parseQuery(str) {
        const q = str.lastIndexOf('?')
        const ret = {}
        if (q < 0) return ret
        const query = str.substring(q + 1)
        query.split('&').forEach(query => {
            let [key, value] = query.split('=')
            const frame = value.indexOf('#')
            if (frame > 0) value = value.substring(0, frame)
            if (!ret[key]) ret[key] = value
            else if (ret[key]) {
                if (Array.isArray(ret[key])) ret[key].push(value)
                else ret[key] = [ret[key], value]
            }
        })
        console.log(ret)
    }
    parseQuery('http://www.linkedin.com?q1=v1&q2=v2#xxx&q1=v4')
    const v = Array.from([{skill: 'javascript', user: 'user1'}, {skill: 'css', user: 'user2'}, 
    {skill: 'html', user: 'user3'}, {skill: 'javascript', user: 'user2'}, 
    {skill: 'css', user: 'user3'}, {skill: 'javascript', user: 'user3'}]
    .reduce((m, cur) => {
        if (!m.get(cur.skill)) m.set(cur.skill, {skill: cur.skill, users: [], count: 0})
        m.get(cur.skill).users.push(cur.user)
        m.get(cur.skill).count++
        return m
    }, new Map()).values()).sort((a, b) => b.count - a.count)
    console.log(v)
    function* flat(args) {
        for (const arg of args) {
            Array.isArray(arg) ? yield * flat(arg) : yield arg
        }
    }
    console.log([...flat([1, [2, 3], [4, 5, [6], [7, [8, [9]]]]])])
}
f()
function ladderLength(begin, end, dict) {
    dict = new Set(dict)
    const lenMap = { [begin] : null }
    const q = [begin]
    while (q.length) {
        const word = q.pop()
        for (let i = 0; i < word.length; i++) {
            for (let j = 'a'.charCodeAt(0); j <= 'z'.charCodeAt(0); j++) {
                const newWord = word.slice(0, i) + String.fromCharCode(j) + word.slice(i + 1)
                if (newWord === end) {
                    const ret = [word, end]
                    let p = lenMap[word]
                    while (!!p) {
                        ret.unshift(p)
                        p = lenMap[p]
                    }
                    return ret
                }
                if (dict.has(newWord) && !lenMap[newWord]) {
                    lenMap[newWord] = word
                    q.push(newWord)
                }
            }
        }
    }
    return ''
}
function ladderLength2(begin, end, dict) {
    let minLength = Number.MAX_VALUE
    dict = new Set(dict)
    const visited = new Set()
    const path = []
    let ret = []
    function dfs(word) {
        if (word === end) {
          if (path.length + 1 < minLength) {
            minLength = path.length + 1
            ret = []
            ret.push([...path, end])
          } else if (path.length + 1 === minLength) {
            ret.push([...path, end])
          }
          return
        }
        visited.add(word)
        path.push(word)
        for (let i = 0; i < word.length; i++) {
            for (let j = 'a'.charCodeAt(0); j <= 'z'.charCodeAt(0); j++) {
                const newWord = word.slice(0, i) + String.fromCharCode(j) + word.slice(i + 1)
                if (dict.has(newWord) && !visited.has(newWord)) {
                    dfs(newWord)
                }
            }
        }
        visited.delete(word)
        path.pop()
    }
    dfs(begin)
    return ret
}
console.log(ladderLength2('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']))
console.log(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']))
function calcuate(str) {
    let ret = 0, tmp = 0, op = '+'
    //let a = b = null
    for (let i = 0; i <= str.length; i++) {
        const c = str[i]
        if (c === ' ') continue
        if (Number.isInteger(+c)) {
            tmp = 10 * tmp + (+c)
        } else {
            if (op === '+') ret += tmp
            else if (op === '-') ret -= tmp
            tmp = 0
            op = c
        }
    }
    return ret
}
console.log(calcuate(' 22-10 + 20 '), eval(' 22-10 + 20 '))
console.log(calcuate('1+4+5+2-3+6+8'), eval('1+4+5+2-3+6+8'))
function calcuate2(str) {
    let ret = 0, tmp = 0, op = '+', mult = null
    for (let i = 0; i <= str.length; i++) {
        const c = str[i]
        if (c === ' ') continue
        if (Number.isInteger(+c)) {
            tmp = 10 * tmp + (+c)
        } else {
            if (op === '*') {
                mult *= tmp
            }
            if (['+', '-', undefined].includes(c)) {
                if (op === '*') ret += mult
                else if (op === '+') ret += tmp
                else ret -= tmp
                mult = null
            } else if (!mult) {
                mult = tmp
            }
            op = c
            tmp = 0
        }
    }
    return ret
}
console.log(calcuate2('3*9+2*2-7+6*2*4'), eval('3*9+2*2-7+6*2*4'))
function zigZagconveresion(str, k) {
    const ret = Array(k).fill(1).map(_ => [])
    let n = 0
    while ( n < str.length) {
        for (let i = 0; i < k && n < str.length; i++) {
            ret[i].push(str[n++])
        }
        for (let i = k - 2; i >= 1 && n < str.length; i--) {
            ret[i].push(str[n++])
        }
    }
    return ret.map(row => row.join('')).join('')
}
console.log(zigZagconveresion('PAYPALISHIRING', 3))
console.log(zigZagconveresion('0123456789ABCDEF', 3))
console.log(zigZagconveresion('0123456789ABCDEF', 2))
//5. 单词梯子1.5，输出一条路径。follow up是不能用BFS，怎么改进。
//2. 给一个integer data stream，让设计数据结构，可以实时知道某个数是第几大。
//top k elements，没写代码，三种方法做，地里有面经以前的人考过，很详细的分析时间空间复杂度，
//比如hashmap 的size是K 也得考虑进去
//举个例子 a=b c=d a!=c 这个是不矛盾的 a=b c=d a!=c a=c 这个就是矛盾的
//我给出的做法就是union find follow up就是优化 复杂度什么的
//top k smallest elements in the 2d sorted matrix  每一行每一列都分别sort
//给一个BST，求输出所有root to leaf的depth的平均值。recursive & iterative
//longest increase subarray
//说是有很多很多信号塔，信号塔之间强度和信号塔之间距离成正比，问求A塔到B塔的最少信号or距离，
//lz用的类似A＊的做法做的，小哥认可了，主要考点在于bfs怎么找出下一个塔，小哥是用半径画圆filter掉不可能的点，
//我是用heuristic 先估算再每次在candidates里面找