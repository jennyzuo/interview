function reverseList() {
    class Item {
        constructor(value) {
            this.value = value
            this.next = null
        }
    }
    function visit(head) {
        const ret = []
        while (head) {
            ret.push(head.value)
            head = head.next
        }
        console.log(ret.join('->'))
    }
    const a = new Item('a'), b = new Item('b')
    const c = new Item('c'), d = new Item('d')
    a.next = b, b.next = c, c.next = d
    function reverse(head) {
        if (!head.next) return head
        let h = reverse(head.next)
        head.next.next = head
        head.next = null
        return h
    }
    visit(reverse(a))
}
reverseList()
function rotateImage() {
    function rotote(m) {
        let n = m.length
        for (let i = 0; i < n/2; i++) {
            for (let j = i; j < n - 1 - i; j++) {
                const tmp = m[i][j]
                m[i][j] = m[n - 1 - j][i]
                m[n - 1 - j][i] = m[n - 1 - i][n - 1 - j]
                m[n - 1 - i][n - 1 - j] = m[j][n - 1 - i]
                m[j][n - 1 - i] = tmp
            }
        }
    }
    let counter = 1
    function buildMatrix(n) {
        const r = new Array(n)
        for (let i = 0; i < n; i++) {
            r[i] = new Array(n)
            for (let j = 0; j < n; j++) {
                r[i][j] = counter++
            }
        }
        return r
    }
    const m = buildMatrix(3)
    rotote(m)
    console.log(m)
}
rotateImage()
function productExceptSelf() {
    const a = [1, 2, 3, 4]
    const b = new Array(a.length).fill(1)
    let head = 1, back = 1
    for (let i = 0, j = a.length - 1; i < a.length; i++, j--) {
        b[i] *= head
        b[j] *= back
        head *= a[i]
        back *= a[j]
    }
    console.log(b)
}
productExceptSelf()
function longestPalindrome() {
    function max(str) {
        const dp = new Array(str.length)
        for (let i = 0; i < str.length; i++) {
            dp[i] = new Array(str.length).fill(false)
        }
        let left = right = len = 0
        for (let i = 0; i < str.length; i++) {
            for (let j = 0; j < i; j++) {
                if (str[i] === str[j] && ((i - j) <=2 || dp[i + 1][j - 1])) {
                    dp[j][i] = true
                    if (len < i - j + 1) {
                        left = j, right = i, len = i - j + 1
                    }
                }
            }
        }
        return str.substring(left, len)
    }
    console.log(max('babad'))
}
longestPalindrome()
function BSTIterator() {
    class Node {
        constructor(value) {
            this.value = value
            this.left = this.right = null
        }
    }
    const s = Symbol('root')
    class Iter {
        [s](node) {
            while (node) {
                this.st.push(node)
                node = node.left
            }
        }
        constructor(root) {
            this.st = []
            this[s](root)
        }
        hasNext() {
            return this.st.length > 0
        }
        next() {
            let r = this.st.pop()
            this[s](r.right)
            return r.value
        }
    }
    const a = new Node(1), b = new Node(2), c = new Node(3)
    a.right = b, b.right = c
    const it = new Iter(a)
    while (it.hasNext()) {
        console.log(it.next())
    }
}
BSTIterator()
function wordSearch() {
    const m = [[...'ABCE'], [...'SFCS'], [...'ADEE']]
    function dfs(row, col, index, str, visited) {
        if (index === str.length) return true
        if (row >= m.length || row < 0 || col >= m[row].length || 
            col < 0 || visited[row][col] || m[row][col] !== str[index]) return false
        visited[row][col] = true
        if (dfs(row + 1, col, index + 1, str, visited)) return true
        if (dfs(row, col + 1, index + 1, str, visited)) return true
        if (dfs(row - 1, col, index + 1, str, visited)) return true
        if (dfs(row, col - 1, index + 1, str, visited)) return true
        visited[row][col] = false
        return false
    }
    function search(str) {
        const visited = new Array(m.length)
        for (let i = 0; i < m.length; i++) {
            visited[i] = new Array(m[i].length).fill(false)
        }
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                if (dfs(i, j, 0, str, visited)) return true          
            }
        }
        return false
    }
    console.log(search('ABCCED'))
    console.log(search('SEE'))
    console.log(search('ABCB'))
}
wordSearch()
function compareVersion() {
    function compare(a, b) {
        const v = '.0123456789'
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] === b[i]) continue
            let m = v.indexOf(a[i]), n = v.indexOf(b[i])
            if (m === 0) return -1
            if (n === 0) return 1
            return m - n 
        }
        return a.length - b.length
    }
    console.log(['1.2', '1.11', '0.1', '13.37', '1.1'].sort(compare))
}
compareVersion()
function removeComments() {
    function isBlockComment(line) {

    }
    function remove(arr) {
        let bComment = false
        const clean = [], tmp = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                let first = arr[i][j], second = arr[i][j + 1], pair = `${first}${second}`
                if (pair === '*/') {
                    bComment = false
                    j++
                } else if (pair === '//') {
                    break
                } else if (pair === '/*') {
                    bComment = true
                    j++
                } else {
                    if (!bComment && first) tmp.push(first)
                }
            }
            if (!bComment && tmp.length > 0) {
                clean.push(tmp.join(''))
                tmp.length = 0
            }
        }
        return clean
    }
    console.log(remove( ['/*Test program */', 'int main()', '{ ', '  // variable declaration ', 'int a, b, c;', 
    '/* This is a test', '   multiline  ', '   comment for ', '   testing */', 'a = b + c;', '}']))
    console.log(remove(['a/*comment', 'line', 'more_comment*/b']))
    console.log(remove(['w//aa/*db*/c', 'k']))
    console.log(remove(['w/*aadb*/cbk//xyz', 'k']))
}
removeComments()
console.log(Math.pow(2, 64))
function solveEquation() {
    function extract(str) {
        str += '+'
        let x = 0, num = 0, sign = '+', s = ''
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '+' || str[i] === '-') {
                let c = sign === '+' ? 1 : -1
                if (s[s.length - 1] === 'x') {
                    x += c * (s.length === 1 ? 1 : parseInt(s.substring(0, s.length - 1), 10))
                } else {
                    num += c * parseInt(s, 10)
                }
                s = ''
                sign = str[i]
            } else {
                s += str[i]
            }
        }
        return [x, num]
    }
    function divid(str) {
        const [left, right] = str.split('='), [x1, num1] = extract(left), [x2, num2] = extract(right)
        if ( x1 - x2 === 0) return 'infinite'
        else return `x=${(num1 - num2)/(x1 - x2)}` 
    }
    console.log(divid('x+5-3+x=6+x-2'))
    console.log(divid('x=x'))
    console.log(divid('2x=x'))
    console.log(divid('x=x+2'))
    console.log(divid('2x+3x-6x=x+2'))
}
solveEquation()
class Student {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    say() {
        console.log('I am a student')
    }
}
const st = new Student('Yong', 33)
console.log(st.name, st.age, st.id)
console.log(Math.max(1, 2, 11, 3, 4, 5))
class ScienceStudent extends Student {
    constructor(name, age) {
        super(name, age)
    }
    say() {
        console.log('I am science student')
    }
}
const stu = new ScienceStudent('Yixin', 33)
console.log(stu.name, stu.age)
stu.say()
const arr = ['a', 'b', 'c']
for (const [index, value] of arr.entries()) {
    console.log(index, value)
}
const obj = {
    msg: 'pong',
    ping() {
        return this.msg
    }
}
console.log(obj.ping())
const  EventEmitter  =  require('events')
const machine = {
    __proto__: new EventEmitter()
}
console.log(machine)
console.log(machine instanceof EventEmitter)
machine.on('event', msg => console.log(`received message:${msg}`))
machine.emit('event', 'Hello World')
function* fib() {
    let a = 0, b = 1
    yield(a)
    while (true) {
        [a, b] = [b, a + b]
        yield b
    }
}
const v = fib()
console.log(v.toString(), '<>', v[Symbol.toStringTag])
for (const n of fib()) {
    if (n > 100) break
    console.log(n + ' ')
}
const objj = { foo: 1}
const p = new Proxy(objj, {
    get(target, prop) {
        console.log(`Program is trying to fetch the property "${prop}"`)
        return target[prop]
    },
    set(target, prop, value) {
        console.log(`Setting value "${value}" on the key "${prop}" in the target object`)
        target[prop] = value
        return false
    }
})
function sum(n) {
    const carry = [n]
    const ret =  (x) => {
        carry.push(x)
        return ret
    }
    ret.toString = () => {
        return carry.reduce((acc, cur) => acc + cur, 0)
    }
    return ret
}
total = sum(3)(4)(5)(6)(7)(8) + 100
console.log(`toal=${total}`)
let x = {}
x.valueOf = Math.random
console.log(x + 1)
const addLogging = (fn) => (...args) => {
    console.log(`entering ${fn.name}: ${args}`)
    try {
        const v = fn(...args)
        console.log(`exiting ${fn.name}: ${v}`)
        return v
    } catch(throwError) {
        console.log(`exiting ${fn.name}: ${throwError}`)
        throw throwError
    }
}
const memoize = (fn) => {
    const cache = {}
    return x => x in cache ? cache[x] : cache[x] = fn(x)
}
function ttt(n) {
    if (n == 0 || n === 1) return n
    return ttt(n - 2) + ttt(n - 1)
}
const mod = memoize(ttt)
console.log(ttt(9), '=fib=', mod(9))
console.log(ttt.length)
const getHandler = {
        get(target, property, receiver) {
            if (typeof target[property] === "function") { 
                // requesting a method? return a wrapped version
                return (...args) => {
                    console.log('>>>>>>>>>>>>>', property)
                    const result = target[property](...args);
                    return (result === undefined) ? receiver : result;
                }
            } else { 
                // an attribute was requested - just return it
                return target[property];
            }
        }
    };
    
const chainify = (obj) => new Proxy(obj, getHandler)
class City {
    constructor(name, lat, long) {
      this.name = name;
      this.lat = lat;
      this.long = long;
    }
  
    getName() {
      return this.name;
    }
  
    setName(newName) {
      this.name = newName;
    }
  
    setLat(newLat) {
      this.lat = newLat;
    }
  
    setLong(newLong) {
      this.long = newLong;
    }
  
    getCoords() {
      return [this.lat, this.long];
    }
  }
myCity = new City("Montevideo, Uruguay", -34.9011, -56.1645);
myCity = chainify(myCity)
myCity.setLat(-1000.000)
console.log(myCity.name)
const pipeline2 = (...fns) => 
    fns.reduce((result,f) => (...args) => f(result(...args)));
fn1 = (x) => { return `fn1(${x})`}
fn2 = (x) => { return `fn2(${x})` }
console.log(pipeline2(fn1, fn2)('a'))
const objCopy = obj => {
    let copy = Object.create(Object.getPrototypeOf(obj))
    Object.getOwnPropertyNames(obj).forEach(prop => Object.defineProperty(
        copy,
        prop,
        Object.getOwnPropertyDescriptor(obj, prop)
    ))
    return copy
}
const myObj = {fk: 22, st: 12, desc: 'couple', do: () => {return 100}}
const myCopy = objCopy(myObj)
console.log(myObj, myCopy)
const deepCopy = obj => {
    let aux = obj
    if (obj && typeof obj === 'object') {
        aux = new obj.constructor()
        Object.getOwnPropertyNames(obj).forEach(prop => {
            (aux[prop] = deepCopy(obj[prop]))
        })
    }
    return aux
}
let oldObject = {
    d: 22,
    m: 9,
    o: { c: 'MVD', i: 'UY', f: { a: 56 } }
}
let newObject = deepCopy(oldObject)
newObject.d = 8888
newObject.o.f.a = 999999
console.log(newObject)
console.log(oldObject)
const data = [
    {number: 32, president:'Franklin D. Roosevelt', took_office:'1933-03-04', left_office:'1945-04-12'},
    {number: 33, president: 'Harry S. Truman', took_office: '1945-04-12', left_office: '1953-01-20'},
    {number: 34, president: 'Dwight D. Eisenhower', took_office: '1953-01-20', left_office: '1961-01-20'},
    {number: 35, president: 'John F.Kennedy', took_office: '1961-01-20', left_office: '1963-11-22'},
    {number: 37, president: 'Richard Nixon', took_office: '1969-01-20', left_office: '1974-08-09'},
    {number: 38, president: 'Gerald Ford', took_office: '1974-08-09', left_office: '1977-01-20'},
    {number: 39, president: 'Jimmy Carter', took_office: '1977-01-20', left_office: '1981-01-20'},
    {number: 36, president: 'Lyndon B. Johnson', took_office: '1963-11-22', left_office: '1969-01-20'},
]
function sort(key) {
    const r = data.sort((a, b) => {
        if(key === 'number') {
            return a[key] - b[key]
        } else if (key === 'president') {
            return a[key].localeCompare(b[key])
        } else {
            return new Date(a[key]).getTime() - new Date(b[key]).getTime() 
        }
    }).map(p => p[key])
    console.log(r)
}
sort('took_office')
function presidentOnDate(date) {
    const m = new Date(date).getTime()
    if (isNaN(m)) return null
    r = data.filter(p => new Date(p.took_office).getTime() <= m && new Date(p.left_office).getTime() > m)
    console.log(r)
}
presidentOnDate('1974-10-20')
function isOverlap(p,date1, date2) {
    took = new Date(p.took_office).getTime()
    left = new Date(p.left_office).getTime()
    if (left < date1 || took > date2) {
        return false
    } else {
        return true
    }
}
function presidnetInRange(date1, date2) {
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    const r = data.filter(p => isOverlap(p, date1, date2))
    console.log(r)
}
console.log('*'.repeat(20))
presidnetInRange('1961-02-11', '1974-06-09')
function TicTacToe() {
    this.init()
}
TicTacToe.prototype.getCurrentState = function() {
    return this.state[this.state.length - 1]
}
TicTacToe.prototype.reset = function() {
    this.init()
}
TicTacToe.prototype.init = function() {
    this.state = []
    this.state.push({
        activePlayer: 'x',
        currentBoard: this.freshBoard()
    })
}
TicTacToe.prototype.updatedBoard = function(x, y) {
    const state = this.getCurrentState()
    const activePlayer = state.activePlayer
    const currentBoard = state.currentBoard
    const newBoard = []
    for (let i = 0; i < currentBoard.length; i++) {
        newBoard.push(currentBoard[i].concat())
    }
    newBoard[x][y] = activePlayer
    return newBoard
}
TicTacToe.prototype.freshBoard = function() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
}
TicTacToe.prototype.undo = function() {
    this.state.pop()
}
TicTacToe.prototype.isValidTurn = function(x, y) {
    const state = this.getCurrentState()
    const board = state.currentBoard
    if (x < 0 || x >= board.length || y < 0 || y >= board[0].length || !!board[x][y]) {
        return false
    }
    return true
}
TicTacToe.prototype.isWinningTurn = function(activePlayer, updatedBoard) {
    const checkVertical = function() {
        for (let col = 0; col < updatedBoard[0].length; col++) {
            let count = 0
            for (let row = 0; row < updatedBoard.length; row++) {
                if (updatedBoard[row][col] === activePlayer) {
                    count++
                }
            }
            if (count === updatedBoard.length) {
                return true
            }
        }
        return false
    }
    const checkHorizontal = function() {
        for (let row = 0; row < updatedBoard.length; row++) {
            let count = 0
            for (let col = 0; col < updatedBoard[0].length; col++) {
                if (updatedBoard[row][col] === activePlayer) {
                    count++
                }
            }
            if (count == updatedBoard[0].length) {
                return true
            }
        }
        return false
    }
    const checkDiagonal = function() {
        let row = 0, col = 0,count = 0
        while (row < updatedBoard.length && col < updatedBoard[0].length) {
            if (updatedBoard[row][col] === activePlayer) {
                count++
            }
            row++
            col++
        }
        if (count === updatedBoard.length) {
            return true
        }
        row = 0, col = updatedBoard[0].length, count = 0
        while (row < updatedBoard.length && col >= 0) {
            if (updatedBoard[row][col] === activePlayer) {
                count++
            }
            row++
            col--
        }
        if (count === updatedBoard.length) {
            return true
        }
        return false
    }
    if (checkDiagonal() || checkHorizontal() || checkVertical()) {
        return true
    }
    return false
}
TicTacToe.prototype.takeTurn = function(x, y) {
    const state = this.getCurrentState()
    let valid = false
    let winning = false
    if (this.isValidTurn(x, y)) {
        var newState = {
            activePlayer: (state.activePlayer == 'x') ? 'o' : 'x'
        }
        valid = true
        newState.currentBoard = this.updatedBoard(x, y)
        newState.winningMove = winning = this.isWinningTurn(state.activePlayer, newState.currentBoard)
        this.state.push(newState)
    }
    return {
        board: !!newState ? newState.currentBoard : state.currentBoard,
        moveBy: state.activePlayer,
        valid: valid,
        winning: winning
    }
}
const tictactoe = new TicTacToe()
console.log(tictactoe.takeTurn(0, 10))
console.log(tictactoe.takeTurn(2, 0))
console.log(tictactoe.takeTurn(0, 1))
console.log(tictactoe.takeTurn(2, 2))
console.log('-'.repeat(20))
console.log(tictactoe.takeTurn(0, 2))
function checkNumbers(x) {
    const returnObj = {
        luck: [],
        unluck: [],
        whoknows: []
    }
    for (let i = 1; i <= x; i++) {
        const seven = i % 7 === 0, thirteen = i % 13 === 0
        if (seven && thirteen) {
            returnObj.whoknows.push(i)
        } else if (seven) {
            returnObj.luck.push(i)
        } else if (thirteen) {
            returnObj.unluck.push(i)
        }
    }
    return returnObj
}
console.log(checkNumbers(100))
function checkNumbers2(x, p, q) {
    r = new Array(x).fill(0).map((_, i) => i + 1).map(n => {
        const contain = n.toString().indexOf(p) != -1 || n.toString().indexOf(q) != -1
        const divid = n % p === 0 || n % q === 0
        if (contain && divid) {
            return 'OUTTHINK'
        } else if (contain) {
            return 'THINK'
        } else if (divid) {
            return 'OUT'
        } else {
            return n
        }
    })
    console.log(r)
}
checkNumbers2(20, 3, 4)
checkNumbers2(7, 2, 3)
function clean(word) {
    return word.split('').filter(c => c !== ' ' && c !== '"' && c !== '?')
        .map(c => c.toLowerCase()).join('')
}
function sentence(str) {
    m = {}
    str.split('|').forEach(line => {
        ns = line.split(' ').map(word => clean(word)).join(' ')
        if (!m[ns]) {
            m[ns] = line
        }
    })
    for (key in m) {
        for (key2 in m) {
            if (key != key2 && key2.indexOf(key) != -1) {
                delete m[key]
            }
        }
    }
    return Array.from(Object.values(m))
}
//console.log(sentence('IBM "congitive" computing'))
r = sentence(`IBM cognitive computing|IBM "cognitive" computing is a revolution|ibm cognitive computing|"IBM Cognitive Computing" is a revolution?`)
console.log(r)

const runner = gen => (...args) => {
    const generator = gen(...args);
    let first = 0
    return new Promise((resolve, reject) => {
        const run = (pre) => {
            first++
            const { value, done } = generator.next(pre);
            console.log(`${first}`.repeat(10))
            console.log(`${value}, ${done}`)
            if (done) {
                resolve(value);
            } else if (value instanceof Promise) {
                value.then(run, reject);
            } else {
                run(value);
            }
        }
        run();
    });
}
function fetch(url) {
    return Promise.resolve({
        blob() {
            return Promise.resolve('this is lob')
        }
    })
}
function createImageBitmap(blob) {
    return Promise.resolve('ths is final image')
}
  
const fetchImageAsync = runner(function* fetchImage(url) {
    const resp = yield fetch(url);
    console.log('resp=', resp)
    const blob = yield resp.blob();
    console.log('blob=', blob)
    const image = yield createImageBitmap(blob);  
    return image;
});
  

/*fetchImageAsync('my-image.png').then(image => {
    console.log('????', image)
});
*/
function sum(n) {
    const ret = function (x) {
        return sum(n + x);
    };
    ret.valueOf = ret.toString = function () {
        return n;
    };
    return ret;
}
r = sum(3)(4)(5)(6)
console.log('r=====', r)

function wordsAbbreviation(dict) {
    const candid = new Set(dict)
    let pre = 1
    const res = [], map = new Map()
    while (true) {
        if (candid.size === 0) return res
        map.clear()
        for (str of candid) {
            let key = str
            if (str.length > 2) {
                key = str.substring(0, pre) + (str.length - pre - 1) + str[str.length - 1]
            } else {
                res.push(str)
                candid.delete(str)
                continue
            }
            if (!map[key]) {
                map[key] = []
            }
            map[key].push(str)
        }
        for (let k in map) {
            if (map[k].length === 1) {
                res.push(k)
                candid.delete(map[k][0])
            }
        }
        pre += 1
    }
    return res
}
console.log(wordsAbbreviation(['like', 'god', 'internal', 'me', 'internet', 
    'interval', 'intension', 'face', 'intrusion']))
console.log('*'.repeat(50))

Array.prototype.myMap = function(fn) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        res.push(fn(this[i]))
    }
    return res
}
console.log([1, 2, 3].myMap(i => `=${i}=`))
Array.prototype.myFilter = function(fn) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            res.push(this[i])
        }
    }
    return res
}
console.log([1, 2, 3].myFilter(i => i % 2 !== 0))
Array.prototype.myReduce = function(fn, init) {
    let acc = init !== undefined ? init : this[0]
    for (let i = init !== undefined ? 0 : 1; i < this.length; i++) {
        acc = fn(acc, this[i])
    }
    return acc
}
console.log([1, 2, 3].reduce((acc, i) => acc + i, 0))
console.log([1, 2, 3].myReduce((acc, i) => acc + i, 0))
console.log([{ x: 22 }, { x: 42 }].reduce((acc, cur) => Math.max(acc.x, cur.x)))
console.log([{ x: 22 }, { x: 42 }].myReduce((acc, cur) => Math.max(acc.x, cur.x)))

function Deferred() {
    this.promise = new myPromise()
}
Deferred.prototype.resolve = function(obj) {
    const promise = this.promise
    let handler
    while ((handler = promise.queue.shift())) {
        if (handler && handler.fulfilled) {
            const ret = handler.fulfilled(obj)
            if (ret && ret.isPromise) {
                ret.queue = promise.queue
                this.promise = ret
                return
            }
        }
    }
}
Deferred.prototype.reject = function(err) {
    const promise = this.promise
    let handler
    while ((handler = promise.queue.shift())) {
        if (handler && handler.error) {
            const ret = handler.error(err)
            if (ret && ret.isPromise) {
                ret.queue = promise.queue
                this.promise = ret
                return
            }
        }
    }
}
Deferred.prototype.callback =  function() {
    return (err, file) => {
        if (err) {
            return this.reject(err)
        }
        this.resolve(file)
    }
}
function myPromise() {
    this.queue = []
    this.isPromise = true
}
myPromise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    const handler = {}
    if (typeof fulfilledHandler === 'function') {
        handler.fulfilled = fulfilledHandler
    }
    if (typeof errorHandler === 'function') {
        handler.error = errorHandler
    }
    this.queue.push(handler)
    return this;
}
const fs = require('fs')
var readFile1 = function (file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
}
var readFile2 = function (file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
}
/*
readFile1('file1.txt', 'utf8').then(function (file1) {
    return readFile2(file1.trim(), 'utf8');
}).then(function (file2) {
    console.log(file2);
})
*/
const scb = data => console.log(`success:${data}`)
const ecb = data => console.log(`fail: ${data}`)
function f(data, scb, ecb) {
    if(success) {
        scb(data)
    }
    else {
        ecb(data)
    }
}
function retry(n, data, scb, ecb) {
    let retries = n
    function wrappered(data) {
        if (retries === 0) {
            ecb(data)
        }
        retries -= 1
        f(data, scb, wrappered)
    }
    f(data, scb, wrappered)
}
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null)
}
function mergeDeep(target, source) {
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} })
                mergeDeep(target[key], source[key])
            } else {
              Object.assign(target, { [key]: source[key] });
            }
        })
    }
    return target;
}
function dsum(target) {
    let sum = 0
    for (let i = 0; i <= target; i++) {
        sum += i
    }
    return sum
}
const promisfy = fn => {
    return new Promise(resolve => {
        setTimeout(() => resolve(fn(), 10))
    })
}
//写一个function, 给一个array consisting of many tasks. 要求顺序执行tasks， 
//并且同一时间正在执行的task的数量不能超过3个
const tasks = Array(5).fill(0).map((_, idx) => promisfy(dsum.bind(this, idx)))
function serizeWithK(tasks, k) {
    function execute(i) {
        if (i > tasks.length) {
            console.log('>>>>> Done!')
        } else {
            const subTasks = i + k < tasks.length ? tasks.slice(i, i + k) : tasks.slice(i)
            Promise.all(subTasks).then(values => {
                console.log('values=', values)
                execute(i + k)
            })
        }
    }
    execute(0)
}
//serizeWithK(tasks, 3)
//check all的html checkbox
const Foo = function(a) {
    this.bar = function() {   
      console.log('this.bar>>>', a);
    };
    this.a = a
    var a = 1;
    this.baz = function() {
        console.log('this.baz>>', a);
    };
};
Foo.prototype = {
    biz: function() {   
      console.log('this.biz in prototype>>>', this.a);
    }
};
var f = new Foo(8);
f.bar()
f.baz()
f.biz()
function extraQueryString(s) {
    const ret = {}
    const markIdx = s.indexOf('?')
    if (markIdx < 0) return ret
    s.substring(markIdx + 1).split('&').forEach(item => {
        let [q, v] = item.split('=')
        const fragment = v.indexOf('#')
        v = fragment < 0 ? v : v.substring(0, fragment)
        if (!ret[q]) {
            ret[q] = v
        } else {
            if (Array.isArray(ret[q])) ret[q].push(v)
            else ret[q] = [ret[q], v]
        }
    })
    return ret
}
console.log(extraQueryString('http://www.linkedin.com?q1=v1&q2=v2#xxx&q1=v3&q1=v4'))
function add(x, y) {
    return x + y
}
function undoable(fn) {
    const st = []
    function wrapper(...args) {
        r = fn(...args)
        st.push(r)
        return r
    }
    wrapper.undo = function() {
        if (st.length > 0) {
            st.pop()
            r = st[st.length - 1]
            return r
        }
    }
    wrapper.redo = function() {
        if (st.length > 0) {
            const top =st[st.length - 1]
            st.push(top)
            return top    
        }
    }
    return wrapper
}
const wrapperAdd = undoable(add)
console.log('r ==', wrapperAdd(1, 2), wrapperAdd(3, 4))
console.log('undo=', wrapperAdd.undo())
function parall(tasks, cb) {
    let count = 0
    function finish() {
        count++
        if (count === tasks.length) {
            cb()
        }
    }
    task.forEach(task => task(finsh))
}
function parallK(tasks, k) {
    function cb(startIdx) {
        if (startIdx >= tasks.length) {
            console.log('all Done!')
        } else {
            const endIdx = startIdx + k < tasks.length ? startIdx + k : tasks.length - 1
            parall(tasks.slice(startIdx, endIdx), cb.bind(this, endIdx + 1))
        }
    }
    parallK(tasks, 0)
}
function range(arr) {
    let left = 0
    const ret = []
    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] !== arr[left] + 1) {
            ret.push(left < i - 1 ? `${arr[left]}-${arr[i - 1]}` : `${arr[left]}`)
            left = i
        }
    }
    return ret
}
console.log(range([-2, -1, 2, 3, 6]))
class TaskQueue {
    constructor(delay) {
        this.delay = delay
        this.q = []
    }
    enqueue(task, cb, priority) {
        this.q.push([task, cb, priority])
    }
    run() {
        if (this.q.length > 0) {
            let m = 0
            for (let i = 1; i < this.q.length; i++) {
                if (this.q[i][2] > this.q[m][2]) {
                    m = i
                }
            }
            const [curTask, cb, p] = this.q.splice(m, 1)[0]
            try {
                const ret = curTask()
                cb(ret)
            } catch(e) {cb(null, e)}
            setTimeout(() => this.run(), this.delay)
        }
    }
    cancel(task) {
        for (let i = 0; i < this.q.length; i++) {
            if (this.q[i][0] === task) {
                this.q.splice(i, 1)
                return
            }
        }
        console.warn('task already cancled or currently is running')
    }
}
const tq = new TaskQueue(100)
tq.enqueue(() => Math.max(1, 2), (ret) => console.log('max =', ret), 1)
tq.enqueue(() => Math.min(1, 2), (ret) => console.log('min=', ret), 9)
//tq.enqueue(() => console.log('333333'))
//tq.run()
function countAndSay(str) {
    let pre = str[0], count = 1, res = ''
    for (let i = 1; i <= str.length; i++) {
        if (str[i] === pre) {
            count++
        } else {
            res += `${count}${pre}`
            count = 1
            pre = str[i]
        }
    }
    console.log(res)
}
countAndSay('22231')
class Node {
    constructor(value) {
        this.value = value
        this.left = this.right = null
    }
}
function visit(root) {
    const res = []
    function dfs(r) {
        if (!r) return
        dfs(r.left)
        res.push(r.value)
        dfs(r.right)
    }
    dfs(root)
    return res.join(',')
}
const root = new Node(10)
root.left = new Node(8)
root.left.right = new Node(9)
root.right = new Node(19)
root.right.right = new Node(22)
console.log('tree=', visit(root))
function serialize(root) {
    const res = []
    function dfs(r) {
        if (!r) {
            res.push('*')
        } else {
            res.push(r.value)
            dfs(r.left)
            dfs(r.right)
        }
    }
    dfs(root)
    return res.join('_')
}
console.log(serialize(root))
function deserialize(str) {
    const tokens = str.split('_')
    function dfs(i) {
        if (i >= tokens.length || tokens[i] === '*') {
            return [null, i + 1]
        }
        const node = new Node(tokens[i])
        const [left, ii] = dfs(i + 1)
        const [right, iii] = dfs(ii)
        node.left = left
        node.right = right
        return [node, iii]
    }
    const [root, _] = dfs(0)
    console.log('dtree=', visit(root))
}
deserialize(serialize(root))
const visited = Array(2).fill(false).map(_ => Array(2).fill(false))
console.log(visited)
const kk = new Set()
kk.add(12)
console.log(kk.has(12), kk.delete(13))
const kkk = new Map()
kkk.set('a', 100)
console.log(kkk.delete('a'))
function sortColor(arr) {
    let left = 0, right = arr.length - 1
    for (let i = 0; i < arr.length && i <= right; i++) {
        if (arr[i] === 0) {
            [arr[left++], arr[i]] = [arr[i], arr[left]]
        } else if (arr[i] === 2) {
            [arr[i--], arr[right--]] = [arr[right], arr[i]]
        }
    }
    console.log(arr)
}
sortColor([1, 2, 0, 2, 0, 1, 1])
class LinkNode {
    constructor(value) {
        this.value = value
        this.next = null
    }
}
function visitLink(head) {
    const ret = []
    while (head) {
        ret.push(head.value)
        head = head.next
    }
    console.log(ret.join(','))
}
const head = new LinkNode(1)
head.next = new LinkNode(2)
head.next.next = new LinkNode(3)
function removeNode(head, value) {
    const dummy = new Node(-1)
    dummy.next = head
    let last = dummy
    while (last) {
        if (last.next && last.next.value === value) {
            last.next = last.next.next
            break
        }
        last = last.next
    }
    return dummy.next
}
visitLink(removeNode(head, 1))
function reverseFirstN(head, n) {
    if (n === 1) return head
    let a = head, cur = head.next
    n--
    while (cur && n > 0) {
        let tmp = cur.next
        cur.next = a
        a = cur
        cur = tmp
        n--
    }
    head.next = cur
    return a
}
visitLink(reverseFirstN(head, 2))
function reverse(first) {
    visitLink(first)
    function dfs(node) {
        if (!node.next) {
            return node
        }
        const last = node.next
        const f = dfs(node.next)
        last.next = node
        node.next = null
        return f
    }
    const n = dfs(first)
    visitLink(n)
}
const first = new LinkNode(0)
first.next = new LinkNode(1)
first.next.next = new LinkNode(2)
first.next.next.next = new LinkNode(3)
function reverse2(first) {
    let h = null
    while (first) {
        const next = first.next
        first.next = null
        h && (first.next = h)
        h = first
        first = next
    }
    return h
}
console.log('>>>>>>')
visitLink(reverse2(first))
//reverse(first)
