function cloneLinkList() {
    class Node {
        constructor(value) {
            this.value = value
            this.next = null
            this.random = null
        }
    }
    const a = new Node(1)
    const b = new Node(2)
    const c = new Node(3)
    a.next = b
    b.next = c
    a.random = c
    b.random = a
    c.random = c
    console.log(a.next.value, a.random.value)
    function copy(first) {
        const map = new Map()
        let last = null, origin = first
        while(!!first) {
            if (!map.get(first)) {
                map.set(first, new Node(first.value))
            }
            if (!!last) last.next = map.get(first)
            const random = first.random
            if (!map.get(random)) {
                map.set(random, new Node(random.value))
            }
            map.get(first).random = map.get(random)
            last = map.get(first)
            first = first.next
        }
        return map.get(origin)
    }
    const copied = copy(a)
    console.log(copied.value, copied.random.value)
    console.log(copied.next.value, copied.next.random.value)
    console.log(copied.next.next.value, copied.next.next.random.value)
}
cloneLinkList()
function maxSubArraySum() {
    function sum(arr) {
        let maxSoFar = Number.MIN_VALUE, maxEndHere = 0, start, end
        arr.forEach((i, index) => {
            if (maxEndHere === 0) start = index
            maxEndHere = maxEndHere + i
            if (maxSoFar < maxEndHere) {
                maxSoFar = maxEndHere
                end = index
            }
            maxEndHere = Math.max(0, maxEndHere)
        })
        console.log(arr.slice(start, end + 1))
        return maxSoFar
    }
    console.log(sum([-2, -3, 4, -1, -2, 1, 5, -3]))
}
maxSubArraySum()
function maxSumWithK() {
    function sum(arr, k) {
        const maxSum = new Array(arr.length).fill(0)
        maxSum[0] = arr[0]
        let curr_max = arr[0]
        for (let i = 1; i < arr.length; i++) {
            curr_max = Math.max(arr[i], curr_max + arr[i])
            maxSum[i] = curr_max
        }
        let sum = 0
        for (let i = 0; i < k; i++)
            sum += arr[i]
        let result = sum
        for (let i = k; i < arr.length; i++) {
            sum = sum + arr[i] - arr[i-k]
            result = Math.max(result, sum)
            result = Math.max(result, sum + maxSum[i-k])
        }
        return result
    }
    console.log(sum([-4, -2, 1, -3], 2))
    console.log(sum([1, 1, 1, 1, 1, 1], 2))
}
maxSumWithK()
function LRUCache() {
    class LRUCache {
        constructor(capacity) {
            this.capacity = capacity
            this.map = new Map()
            this.list = []
        }
        put(key, value) {
            if (this.list.length === this.capacity) {
                const removeKey = this.list.shift()
                this.map.delete(removeKey)
            }
            this.list.push(key)
            this.map.set(key, value)
        }
        get(key) {
            if (this.map.get(key)) {
                const removeKey = this.list.shift()
                this.list.push(removeKey)
                return this.map.get(key)
            }
            return -1
        }
    }
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    console.log(cache.get(1))
    cache.put(3, 3)
    console.log(cache.get(2))
    cache.put(4, 4)
    console.log(cache.get(1))
    console.log(cache.get(3))
    console.log(cache.get(4))
}
LRUCache()
function leastInterval() {
    function idle(tasks, n) {
        let mx = 0, mxCnt = 0
        const cnt = new Map()
        for (let task of tasks) {
            let cn = cnt.get(task) || 0
            cnt.set(task, cn + 1)
            if (mx === cn + 1) {
                ++mxCnt
            } else if (mx < cn + 1) {
                mx = cn + 1
                mxCnt = 1
            }
        }
        let partCnt = mx - 1, partLen = n - (mxCnt - 1), emptySlots = partCnt * partLen, 
            taskLeft = tasks.length - mx * mxCnt
        let idles = Math.max(0, emptySlots - taskLeft)
        return tasks.length + idles;
    }
    console.log(idle(['A', 'A', 'A', 'B', 'B', 'B', 'C'], 2))
}
leastInterval()
function leastInterval2() {
    function idle(tasks, n) {
        const ret = Array.from(tasks.reduce((acc, task) => {
            acc.set(task, (acc.get(task) || 0) + 1)
            return acc
        }, new Map()).entries()).sort((a, b) => b[1] - a[1])
        let [task, num] = ret.shift()
        const arrange = new Array(num)
        for (let i = 0; i < num; i++) {
            arrange[i] = [task]
        }
        ret.forEach(([task, num]) => {
            for (let i = 0; i < num; i++) {
                arrange[i].push(task)
            }
        })
        return arrange.reduce((acc, block, index) => {
            if (block.length < n + 1 && index !== arrange.length - 1) {
                acc.push(block.join('->') + '->idle->'.repeat(n - block.length + 1))
            } else {
                acc.push(block.join('->'))
            }
            return acc
        }, []).join('')
    }
    console.log(idle(['A', 'A', 'A', 'B', 'B', 'B'], 2))
}
leastInterval2()
function snapshot() {
    const removeKey = Symbol('remove')
    class Store {
        constructor() {
            this.map = new Map()
            this.snapId = 0
        }
        [removeKey](key) {
            for (let [value, snap] of this.map.get(key).entries()) {
                let idx = snap.indexOf(0)
                if (idx >= 0) {
                    snap.splice(idx, 1)
                    if (snap.length === 0) {
                        this.map.get(key).delete(value)
                    }
                    break
                }
            }
        }
        put(key, value) {
            if (!this.map.get(key)) {
                this.map.set(key, new Map())
            }
            this[removeKey](key)
            const valueMap = this.map.get(key)
            if (!valueMap.get(value)) {
                valueMap.set(value, [])
            }
            valueMap.get(value).push(0)
        }
        delete(key) {
            if (this.map.get(key)) {
                this[removeKey](key)
                if (this.map.get(key).size === 0) {
                    this.map.delete(key)
                }    
            }
        }
        get(key, snapId) {
            if (this.map.get(key)) {
                for (let [value, snap] of this.map.get(key).entries()) {
                    if (snap.indexOf(snapId) >= 0) {
                        return value
                    }
                }
            }
        }
        takeSnapshot() {
            ++this.snapId
            for (let [key, valueMap] of this.map.entries()) {
                if (this.get(key, 0)) {
                    for (let [value, snap] of valueMap.entries()) {
                        snap.push(this.snapId)
                    }
                }
            } 
        }
        deleteSnapshot(snapId) {
            for (let [key, valueMap] of this.map.entries()) {
                for (let [value, snap] of valueMap.entries()) {
                    let idx = snap.indexOf(snapId) 
                    if ( idx >= 0) {
                        snap.splice(idx, 1)
                        if (snap.length === 0) {
                            valueMap.delete(value)    
                        }
                    }
                }
                if (this.map.get(key).size === 0) {
                    this.map.delete(key)
                }
            }
        }
    }
    const store = new Store()
    store.put('k1', 'v1')
    store.put('k1', 'v11')
    //store.delete('k1')
    store.takeSnapshot()
    console.log(store.map)
    console.log(store.get('k1', 1))
    store.delete('k1')
    console.log(store.map)
    store.deleteSnapshot(1)
    console.log(store.map)
}
snapshot()
function accountsMerge() {
    function find(s, p) {
        return p.get(s) === s ? s : find(p.get(s), p);
    }
    function merge(accounts) {
        const owner = new Map()
        const parents = new Map()
        const unions = new Map()
        for (let a of accounts) {
            for (let i = 1; i < a.length; i++) {
                parents.set(a[i], a[i])
                owner.set(a[i], a[0])
            }
        }
        for (let a of accounts) {
            const p = find(a[1], parents)
            for (let i = 2; i < a.length; i++) {
                parents.set(find(a[i], parents), p)
            }
        }
        for(let a of accounts) {
            const p = find(a[1], parents)
            if (!unions.has(p)) unions.set(p, new Set())
            for (let i = 1; i < a.length; i++)
                unions.get(p).add(a[i])
        }
        const res = []
        for (let p of unions.keys()) {
            res.push(Array.from(Array.from(unions.get(p).keys()).reduce((acc, key) => {
                acc.add(owner.get(key))
                return acc
            }, new Set()).keys()))
        }
        return res
    }
    const set = merge([['John', 'john@gmail.com', 'john@fb.com'],
            ['Dan', 'dan@gmail.com', '+1234567'],
            ['john123', '+5412312', 'john123@skype.com'],
            ['john1985', '+5412312', 'john@fb.com']
        ])
    console.log(set)
}
accountsMerge()
function nestedInteger() {
    function flatten(arr) {
        return arr.reduce((acc, item) => {
            if (Array.isArray(item)) {
                acc.push(...flatten(item))
            } else {
                acc.push(item)
            }
            return acc
        }, [])
    }
    console.log(flatten([[1,1],2,[1,1]]))
    console.log(flatten([1,[4,[6]]]))
}
nestedInteger()
function shiftcipher() {
    function toInt(a) {
        const ret = [];
        for (let i = 1; i < a.length; i++) {
            ret.push((a.charCodeAt(i) - a.charCodeAt(i - 1) + 26) % 26)
        }
        return ret.join(',')
    }
    function isshift(a, b) {
        return toInt(a) === toInt(b)
    }
    console.log(isshift('abc','cde'))
    console.log(isshift('aby', 'cda'))
    console.log(isshift('abc', 'cdf'))
    function group(arr) {
        const map = new Map()
        arr.forEach(str => {
            const id = toInt(str)
            if (!map.has(id)) map.set(id, [])
            map.get(id).push(str)
        })
        return Array.from(map.values())
    }
    console.log(group((['abc', 'cde', 'def', 'acb', 'bdc'])))
}
shiftcipher()
function longestPrefix() {
    class TrieNode {
        constructor(ch) {
            this.ch = ch
            this.maxLen = 0
            this.maxNext = ''
            this.map = new Map()
            this.isword = false
        }
    }
    function fillTree(str, root) {
        let cur = root
        for (let i = 0; i < str.length; i++) {
            let c = str[i]
            if (!cur.map.has(c)) cur.map.set(c, new TrieNode(c))
            if (cur.maxLen < str.length) {
                cur.maxLen = str.length
                cur.maxNext = c
            }
            cur = cur.map.get(c)
        }
        cur.isword = true
    }
    function buildTrieTree(strs) {
        const root = new TrieNode('')
        strs.forEach(str => {
            fillTree(str, root)
        })
        return root
    }
    function getLongPrefix(root, str) {
        let cur = root
        for (let i = 0; i < str.length; i++) {
            let c = str[i]
            if (!cur.map.get(c)) return
            cur = cur.map.get(c)
        }
        const ret = []
        while (cur) {
            let next = cur.maxNext
            ret.push(next)
            cur = cur.map.get(next)
        }
        return str + ret.join('')
    }
    const tree = buildTrieTree(['abc', 'abkq'])
    console.log(getLongPrefix(tree, 'ab'))
}
longestPrefix()
function chain() {
    function find(index, parent) {
        return parent.get(index) === index ? index : find(parent.get(index), parent)
    }
    function group(arr) {
        const map = new Map()
        const parent = new Map()
        arr.forEach((block, index) => {
            block.forEach(str => {
                if (!map.has(str)) map.set(str, [])
                map.get(str).push(index)
            })
            parent.set(index, index)
        })
        for (let [_, values] of map) {
            const first = find(values[0], parent)
            for (let i = 1; i < values.length; i++) {
                parent.set(find(values[i], parent), first)
            }
        }
        const union = new Map()
        for (let [key, value] of parent) {
            if (!union.has(value)) union.set(value, [])
            union.get(value).push(key)
        }
        return Array.from(union.values())
    }
    console.log(group([['abc', 'def'],['def','ghi'],['abc','ghi','jkl']]))
}
chain()
function solveNQueens() {
    function isValidate(row, rows) {
        for (let i = 0; i < row; i++) {
            if (rows[i] === rows[row] || Math.abs(rows[i] - rows[row]) === row - i) return false
        }
        return true
    }
    function dfs(row, rows, res) {
        if (row === rows.length) {
            const r = []
            rows.forEach(i => {
                const d = new Array(rows.length).fill('.')
                d[i] = 'Q'
                r.push(d.join(''))
            })
            res.push(r)
        } else {
            for (let i = 0; i < rows.length; i++) {
                rows[row] = i
                if (isValidate(row, rows)) {
                    dfs(row + 1, rows, res)
                }                
            }
        }
    }
    const rows = new Array(4).fill('')
    const res = []
    dfs(0, rows, res)
    console.log(res)
}
solveNQueens()
function calculate() {
    function cal(str) {
        if(!str || str.length === 0) return 0
        let num = 0, sign = '+'
        const stack = [], op = {
            '-': () => stack.push(-num),
            '+': () => stack.push(num),
            '*': () => stack.push(stack.pop() * num),
            '/': () => stack.push(stack.pop() / num | 0)
        }
        for(let i = 0; i <= str.length; i++) {
            if (str[i] === ' ') continue
            if('0123456789'.indexOf(str[i]) >= 0) {
                num = num * 10 + parseInt(str[i], 10);
            } else {
                op[sign]()
                sign = str[i]
                num = 0
            }
        }
        return stack.reduce((acc, i) => acc + i, 0)
    }
    console.log(cal('3+2*2'))
    console.log(cal(' 3/2 '))
    console.log(cal(' 3+5 / 2 '))
}
calculate()
function minWindow() {
    function min(S, T) {
        if (T.length > S.length) return ''
        let res = '', left = 0, count = 0, minLen = S.length + 1
        const m = T.split('').reduce((acc, i) => {
            acc[i] = (acc[i] || 0) + 1
            return acc
        }, {})
        for (let right = 0; right < S.length; ++right) {
            if (m[S[right]] !== undefined) {
                m[S[right]] = m[S[right]] - 1 
                if (m[S[right]] >= 0) ++count
                while (count === T.length) {
                    if (right - left + 1 < minLen) {
                        minLen = right - left + 1
                        res = S.substr(left, minLen)
                    }
                    if (m[S[left]] !== undefined) {
                        m[S[left]] = m[S[left]] + 1
                        if (m[S[left]] > 0) --count
                    }
                    ++left
                }
            }
        }
        return res
    }
    console.log(min('ADOBECODEBANC', 'ABC'))
}
minWindow()
function fractionToDecimal() {
    function cal(num, den) {
        let res = [num / den | 0], rem = num % den
        if (rem === 0) return res.join('')
        res.push('.')
        const map = new Map()
        while (rem !== 0) {
            if (map.has(rem)) {
                res[map.get(rem)] = '(' + res[map.get(rem)]
                res.push(')')
                return res.join('')
            }
            map.set(rem, res.length)
            rem *= 10
            let div = rem / den | 0
            res.push(div)
            rem = rem % den
        }
        return res.join('')
    }
    console.log(cal(1, 2))
    console.log(cal(2, 1))
    console.log(cal(2, 3))
    console.log(cal(103, 450))
    console.log(cal(2245, 9900))
}
fractionToDecimal()
function matrixMultiple() {
    function multi(a, b) {
        const ret = new Array(a.length)
        for (let i = 0; i < a.length; i++) {
            ret[i] = new Array(b[0].length).fill(0)
        }
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[0].length; j++) {
                for (let k = 0; k < b[0].length; k++) {
                    ret[i][k] += a[i][j] * b[j][k]
                }
            }
        }
        return ret
    }
    console.log(multi([[1, 0, 0], [-1, 0, 3]], [[ 7, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 1 ]]))
    function multi2(a, b) {
        const ret = new Array(a.length)
        for (let i = 0; i < a.length; i++) {
            ret[i] = new Array(b[0].length).fill(0)
        }
        const v = []
        for (let i = 0; i < a.length; i++) {
            const row = []
            for (let j = 0; j < a[0].length; j++) {
                if (a[i][j] !== 0) row.push({row: i, col: j, value:a[i][j]});
            }
            v.push(row)
        }
        for (let i = 0; i < v.length; i++) {
            for (let j = 0; j < v[i].length; j++) {
                let {row, col, value} = v[i][j]
                for (let k = 0; k < b[0].length; k++) {
                    if (b[col][k] !== 0) ret[i][col] += value * b[col][k]
                }
            }
        }
        return ret
    }
    console.log(multi2([[1, 0, 0], [-1, 0, 3]], [[ 7, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 1 ]]))
}
matrixMultiple()
function chainstock() {
    const input = [['A', 'B', 0.1], ['B', 'C', 0.05], ['A', 'C', 0.02]]
    let sum = 0
    const map = input.reduce((acc, [a, b, c]) => {
        if (!acc.has(a)) acc.set(a, [])
        acc.get(a).push([b, c])
        return acc
    }, new Map())
    function dfs(source, path, destination) {
        if (source === destination) {
            sum += path.reduce((acc, i) => acc * i, 1)
        } else {
            const paths = map.get(source)
            paths.forEach(([d, v]) => {
                path.push(v)
                dfs(d, path, destination)
                path.pop()
            })
        }
    }
    dfs('A', [], 'C')
    console.log(sum)
}
function chainstock() {
    function dp(arr) {
        arr.sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : b[2] - a[2])
        const d = new Array(arr.length)
        d[0] = arr[0][0]
        let gMax = 0
        for (let i = 1; i < arr.length; i++) {
            let max = 0
            for (let j = 0; j < i; j++) {
                if (arr[j][2] >= arr[i][2]) {
                    max = Math.max(max, arr[i][0] + d[j])
                    gMax = Math.max(gMax, max)
                }
            }
            d[i] = max
        }
        return gMax
    }
    console.log(dp([[2, 5, 6], [3, 6, 4], [4, 4, 5], [7, 6, 3]]))
}
chainstock()
function localMax() {
    function local(nums) {
        const res = []
        if(!nums || nums.length === 0) return res
        let start = 0, end = nums.length - 1
        let mid = (start + end) / 2
        if (mid - 1 >= start && mid + 1 <= end) {
            if (nums[mid-1] < nums[mid] > nums[mid+1])
                res.append(nums[mid])
            else if (Math.abs(nums[mid] - nums[start]) !== mid - start)
                res.push(local(nums.slice(0, mid + 1)))
            else if (Math.abs(nums[end] - nums[mid]) !== end - mid)
                res.push(local(nums.slice(mid)))
        }
        return res
    }
    console.log(local([1,2,3,4,5,6,5,4,3,4,5,4,3,2,1,2,1]))
}
localMax()

function dfs(zombies, visited, x, y) {
    if (x < 0 || x >= zombies.length) return
    if (y < 0 || y >= zombies[0].length) return
    if (zombies[x][y] !== '1' || visited[x][y]) return
    visited[x][y] = true
    dfs(zombies, visited, x - 1, y)
    dfs(zombies, visited, x + 1, y)
    dfs(zombies, visited, x, y - 1)
    dfs(zombies, visited, x, y + 1)
}
function zombieCluster(zombies) {
    if (zombies.length === 0 || zombies[0].length === 0) return 0
    const m = zombies.length, n = zombies[0].length
    let res = 0
    const visited = new Array(m)
    for (let i = 0; i < n; i++) {
        visited[i] = new Array(n).fill(false)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (zombies[i][j] === '1' && !visited[i][j]) {
                dfs(zombies, visited, i, j)
                res++
            }
        }
    }
    return res
}
r = zombieCluster(['1100', '1110', '0110', '0001'])
console.log('r=', r)