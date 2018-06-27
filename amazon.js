function findAnagrams() {
    function find(str, p) {
        const map = p.split('').reduce((map, c) => {
            map[c] = (map[c] || 0) + 1
            return map
        }, {})
        let cnt = 0
        const ret = []
        for (let i = 0; i < str.length; i++) {
            if (map[str[i]] !== undefined) {
                map[str[i]] -= 1
                if (map[str[i]] >= 0) cnt++
            }
            if (i >= p.length) {
                let left = i - p.length
                if (map[str[left]] !== undefined) {
                    map[str[left]] += 1
                    if (map[str[left]] > 0) cnt--
                }
            }
            if (cnt === p.length) ret.push(i - p.length + 1)            
        }
        return ret
    }
    console.log(find('abab', 'ab'))
    console.log(find('cbaebabacd', 'abc'))
}
findAnagrams()
const s = new Set()
s.add([[0, 1], [-1, 1]])
console.log(s.has([[0, 1], [-1, 1]]))

function mergeStr(a, b) {
    let ret = ''
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        ret += `${a[i]}${b[i]}`
    }
    if (a.length > b.length) {
        ret += a.substring(b.length)
    } else if (a.length < b.length) {
        ret += b.substring(a.length)
    }
    return ret
}
console.log(mergeStr('abc', 'def'))
function getDate(str) {
    const ret = str.split('/')
    const months = ['January', 'February', 'March', 'April', 
        'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    ret[0] = months[parseInt(ret[0], 10) - 1]
    return ret.join(' ')
}
console.log(getDate('12/12/2001'))

function compareDates(a, b) {
    // boolean comparator for dates
    const diff = new Date(a).getTime() - new Date(b).getTime()
    if (diff === 0) return 0
    return diff > 0 ? 1 : -1
}

function arrangeItems() {
    const birthdays = [
        {
          name: "John Sina",
          birth: "11/30/2011"
        }, {
          name: "Barcy Washington",
          birth: "09/16/1992"
        }, {
          name: "Peter Parker",
          birth: "01/16/1992"
        }, {
          name: "Jimmy Shergil",
          birth: "12/12/2001"
        }, {
          name: "Alexander Alfred",
          birth: "02/09/1891"
        }, {
          name: "Krishna Gupta",
          birth: "12/01/1982"
        }, {
          name: "Sania Mirza",
          birth: "11/30/2011"
        }, {
          name: "Lata Pathak",
          birth: "10/31/1999"
        }
      ];

      birthdays.sort((a, b) => compareDates(a.birth, b.birth))
      console.log(birthdays)
}
arrangeItems()
const https = require('https')
function getPage(movie, page) {
    const url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${movie}&page=${page}`
    return new Promise(resolve => {
        https.get(url, resp => {
            let data = ''
            resp.on('data', chunk => data += chunk)
            resp.on('end', () => resolve(JSON.parse(data)))
        }).on('error', error => {
            resolve({})
        })
    })
}
async function test() {
    const movie = 'spiderman', pageOffset = getPage.bind(null, movie)
    const firstPage = await getPage(movie, 1)
    let titles = firstPage.data.map(item => item.Title)
    if (firstPage.total_pages > 1) {
        const remainResponse = await Promise.all(Array(firstPage.total_pages - 1)
                .fill(0).map((_, index) => index + 2)
                .map(page => pageOffset(page)))
        titles = remainResponse.reduce((acc, resp) => acc.concat(resp.data), [])
                 .map(item => item.Title).concat(titles)
    }
    console.log(titles.sort().join('\n'))
}
//test()
function helper(zombies, k, visited) {
    visited[k] = true
    for (let i = 0; i < zombies.length; i++) {
        if (zombies[k][i] !== '1' || visited[i]) continue
        helper(zombies, i, visited)
    }
}
function zombieCluster(zombies) {
    const n = zombies.length
    let res = 0
    const visited = new Array(n).fill(false)
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue
        helper(zombies, i, visited)
        res++
    }
    return res
}
r = zombieCluster(['1100', '1110', '0110', '0001'])
console.log('r=', r)

function test(a, b) {
    let x = a, y = b
    while (x != y) {
        if (x > y) x = x - y
        else if (x < y) y = y - x
    }
    console.log(x, y)
    var txt = new Array('tim', 'kim', 'jim')
}
test(2437, 875)
let d = new Date();
const nextMonday = () => {
    let d = new Date();
  	do {
  	    d.setDate(d.getDate()+1);
    } while (d.getDay()!==1);
	  return d;
}
console.log(nextMonday().getDate())




