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
