function firstunique(arr) {
    const occurs = {};
    arr.forEach(item => {
        let t = occurs[item] || 0;
        occurs[item] = t + 1;
    });
    for (let i = 0; i < arr.length; i++) {
        if (occurs[arr[i]] === 1) {
            return i;
        }
    }
    return -1;
}
console.log(firstunique(['a', 'b', 'c', 'a', 'c', 'b', 'k']));
function sieveOfEratosthenes(n) {
    const prime = new Array(n + 1);
    prime.fill(true);
    for (let i = 2; i * i <= n; i++) {
        if (prime[i]) {
            for (let j = i*2; j <= n; j += i) {
                prime[j] = false;
            }
        }
    }
    const ret = [];
    for (let i = 2; i <= n; i++) {
        prime[i] && ret.push(i);
    }
    return ret.join(',');
}
console.log(sieveOfEratosthenes(30));
function permutation(arr) {
    const visited = new Array(arr.length).fill(false);
    const ret = [];
    function helper(arr, visited, temp) {
        if (arr.length === temp.length) {
            ret.push(temp.slice(0));
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && visited[i - 1] && arr[i] === arr[i - 1]) continue;
            if (visited[i] === false) {
                temp.push(arr[i]);
                visited[i] = true;
                helper(arr,visited, temp);
                visited[i] = false;
                temp.pop();
            }
        }
    }
    helper(arr, visited, []);
    return ret;
}
console.log(permutation([3, 2, 2, 1]));
function mergeInterval(arr) {
    arr.sort((a, b) => a[0] - b[0]);
    const ret = [];
    let [start, end] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        let [s, e] = arr[i];
        if (s > end) {
            ret.push([start, end]);
            [start, end] = [s, e];
        } else {
            end = Math.max(end, e);
        }
    }
    ret.push([start, end]);
    return ret;
}
console.log(mergeInterval([[1,3], [8,10], [2,6], [15,18]]));
class TicTacToe {
    constructor(n) {
        this.rows = new Array(n);
        this.cols = new Array(n);
        this.diag = 0;
        this.revDiag = 0;
        this.totalstep = 0;
        this.firststep = 0;
        this.isgameover = false;
        this.board = new Array(n);
        for (let i = 0; i < n; i++) {
            this.board[i] = new Array(n).fill(false);
        }
    }
    positions() {
        let ret = [], N = this.board.length;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (!this.board[i][j]) {
                    ret.push([i, j]);
                }
            }
        }
        return ret;
    }
    canplay(playerid) {
        if (playerid === 1) {
            return this.firststep < this.board.length;
        } else {
            (this.totalstep - this.firststep) < this.board.length;
        }
    }
    isgameover() {
        return this.isgameover;
    }
    move(row, col, player) {
        if (this.board[row][col]) return;
        this.board[row][col] = true;
        let N = this.board.length;
        let add = player === 1 ? 1 : -1;
        this.rows[row] += add;
        this.cols[col] += add;
        this.diag += row === col ? add : 0;
        this.revDiag += row == this.n - col - 1 ? add : 0;
        this.isgameover = Math.abs(this.rows[row]) === N
            || Math.abs(this.cols[col]) === N
            || Math.abs(this.diag) === N
            || Math.abs(this.revDiag) === N
    }
    
};
const game = new TicTacToe(3);
function airplan(arr) {
    const ret = [];
    const oil = arr.map((i, index) => [index, i]);
    let remain = oil;
    let zero = remain.filter(([_, oil]) => oil === 0);
    while (zero.length > 0) {
        ret.push(...zero);
        remain = remain.filter(([_, oil]) => oil !== 0).map(([_, oil]) => [_, oil - 1]);
        zero = remain.filter(([_, oil]) => oil === 0);
    }
    if (remain.length > 0) {
        ret.push(...remain);
    }
    return ret.map(([index, _]) => index);
}
console.log(airplan([2, 4, 1, 0]));
function isPair(str) {
    const map = new Map([['}','{'], [']','['], [')','(']]);
    const open = new Set(map.values());
    const close = new Set(map.keys());
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        if (open.has(str[i])) {
            stack.push(str[i]);
        } else {
            if (stack[stack.length - 1] !== map.get(str[i])) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.length === 0;
}
console.log(isPair('[[({})]]'));
function sortFreq(str) {
    const freq = new Map();
    str.split('').forEach(i => {
        let c = freq.get(i) || 0;
        freq.set(i, c + 1);
    });
    return [...freq.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([k, _]) => k);
}
console.log(sortFreq('abcbadb'));
function airplan2(arr) {
    const oil = arr.map((oil, index) => [oil, index])
                   .sort((a, b) => a[0] - b[0]);
    const ret = [];
    let pre = -1, i = 0;
    while (i < arr.length) {
        if (oil[i][0] === pre) {
            ret.push(oil[i][1]);
            i++;
        } else if (oil[i][0] === pre + 1) {
            ret.push(oil[i][1]);
            pre = oil[i][0];
            i++;
        } else break;
    }
    if (i < arr.length) {
        ret.push(...oil.slice(i).map(([_, index]) => index));
    }
    return ret;
}
console.log(airplan2([2, 1, 4, 1, 0]));
console.log(airplan2([2, 3, 4, 5]));
console.log(airplan2([2, 2, 0, 2]));
console.log(airplan2([3, 4, 0, 2, 1]));
function wordbreak(str, dict) {
    dict = new Set(dict);
    const res = new Array(str.length + 1).fill(false);
    res[0] = true;
    for (let i = 0; i <= str.length; i++) {
        for (let j = 0; j < i; j++) {
            const temp = str.substring(j, i);
            if (dict.has(temp) && res[j]) {
                res[i] = true;
                break;
            }
        }
    }
    return res[str.length];
}
console.log(wordbreak('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog']));
function wordbreak2(str, dict) {
    dict = new Set(dict);
    const res = new Array(str.length + 1).fill(false);
    res[0] = true;
    const retStr = new Array(str.length + 1);
    retStr[0] = [''];
    for (let i = 0; i <= str.length; i++) {
        for (let j = 0; j < i; j++) {
            const temp = str.substring(j, i);
            if (dict.has(temp) && res[j]) {
                res[i] = true;
                (retStr[i] = retStr[i] || [])
                    .push(...retStr[j].map(i => !i.length ? temp : i + ' ' + temp));
            }
        }
    }
    return retStr[str.length];
}
console.log(wordbreak2('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog']));
function sellads(arr) {
    arr = [0, ...arr];
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i] + arr[arr.length - 1 - i]);
    }
    return max;
}
console.log(sellads([2,5,7,8]));
function sellads2(arr) {
    const dp = new Array(arr.length + 1);
    for (let i = 0; i <= arr.length; i++) {
        dp[i] = new Array(arr.length + 1).fill(0);
    }
    let globalMax = 0;
    for (let i = 1; i <= arr.length; i++) {
        for (let j = 1; j <= arr.length; j++) {
            for (let k = 0; k < j; k++) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][k] + arr[j - k - 1]);
                globalMax = Math.max(globalMax, dp[i][j]);
            }
        }
    }
    //dp.map(row => row.map(col => col)).forEach(i => console.log(i + ','));
    return globalMax;
}
console.log(sellads2([2, 5, 7, 8]));
function arrangeMovie(arranges) {
    const movies = Object.keys(arranges);
    const timeSet = new Set();
    function arrange(index, temp) {
        if (index === movies.length) return true;
        const times = arranges[movies[index]];
        for (let i = 0; i < times.length; i++) {
            if (timeSet.has(times[i])) continue;
            timeSet.add(times[i]);
            temp.push(times[i]);
            if (arrange(index + 1, temp)) return true;
            temp.pop(times[i]);
            timeSet.delete(times[i]);
        }
        return false;
    }
    const res = []
    if (arrange(0, res)) {
        console.log(res);
    }
}
arrangeMovie({
    'Shining' : [14, 15, 16],
    'Baby driver' : [14, 15],
    'Pulp fiction' : [14, 15]
});//shining16, kill bill 15, pulp fiction 14
const Service = (function () {
    const Service = function () {
      this.say = "Hello";
    }    
    Service.prototype.publicMethod = function () {
      privateMethod.call(this);
    }  
    const privateMethod = function () {
      console.log(this.say);
    }
    return Service;
})();
const service = new Service();
//service.privateMethod();
service.publicMethod();
const say = Symbol('say');
const name = Symbol('name');
class People {
  constructor (str) {
    this[name] = str;
  }
  
  [say]() {
    console.log('my name is ' + this[name]);
  }
  
  introduce() {
    this[say]();
  }
}
const people = new People('Yong');
people.introduce();
console.log(people.name);
console.log(people.say);
function findChildren(target) {
    return Promise.resolve(['A', 'B', 'C']);
}
function isChild(parent, target) {
    if (parent === target) return Promise.resolve(true);
    return new Promise((resolve, reject) => {
        const q = [findChildren(parent)];
        while (q.length > 0) {
            q.shift().then(children => {
                if (children.length > 0) {
                    if (children.contain(target)) return resolve(true);
                    children.forEach(child => {
                        q.push(findChildren(child));
                    });
                }
            });
        }
        reject(false);
    });
}
function knapsack(W, wt, val) {
    const dp = new Array(wt.length + 1);
    for (let i = 0; i < wt.length + 1; i++) {
        dp[i] = new Array(W + 1).fill(0);
    }
    for (let i = 1; i <= wt.length; i++) {
        for (w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]],  dp[i - 1][w]);
            }
            else {
                dp[i][w] = dp[i - 1][w];
            }
        }
     }     
     return dp[wt.length][W];
}
console.log(knapsack(50, [10, 20, 30], [60, 100, 120]));
/*
一个白人哥哥应该是主面试官，还有一个abc小姐姐主要负责补充，做了两道题，基本都是跟他家产品相关的，不是很难，
都是hashmap ＋ sort可以秒的
后来大概一个礼拜后收到了onsite邀请。11.2晚上welcome dinner，十个人，都是来自GT, UW, UT 和 UIUC的，
第一轮白人大叔，给出很多人一天中的空闲时间，给一个duration，返回这天中大家都空闲且时长大于duration的最早时间段。
第二轮美国小姐姐，问了一道dictionary构成phrase的题，不难，在乎时间复杂度，用hashset优化一下就好了。
小姐姐挺神奇的，follow up我给出解法之后她好像不是很满意，然后我尝试着想更好的解法，
实在想不出来然后厚脸皮说可不可以hint，小姐姐犹豫了半天也没说出个啥，我又给她解释了一下我的解法，
说明了一下时间复杂度不是很高blabla，后来她说了一句她看懂我的解法了，就结束了。
午饭后第三轮是一个白人哥哥，问了一道greedy的题，跟产品相关，可能真的最近在做这个所以大哥特别有话聊，
连续follow up了三轮。第四轮深坑，三哥data scientist，极其不友好，先是让我解释了半天实习做的东西，
然后说他没接触过optimization，听不懂我在说啥，然后就写题了，简单的dp，但是大哥又来坑了，
问我arraylist的get函数跟array的［］有啥区别，confused...然后大哥问我为啥要用.get().set(),
我说我要修改arraylist的值啊，他说他没听过这个function...然后第五轮director，问behavior，
聊得挺好的。然后就跟hr聊，结束了。 他家onsite体验挺好的，酒店不错，
第一天dinner前还雇了pedicab的小哥哥们带我们参观了一圈downtown，公司氛围，engineers和午餐也都很好。
第一题，给一个List<Integer>和一个int max，输出List<List<Integer>> result，
使得result的长度尽量小，并且result里面的每一个元素(也就是List<Integer>)的和不大于int max，
这道题比较tricky，做了半天没有相处很好的方法。后来问面试官，他们想的是要建立一个bst，然后用贪心的方法做，
每次从最大的数开始去填充这个max。到现在我也不是十分确定这样做会给出最优解
第二题，给一个int的array，没有duplicate，代表飞机剩的油量，油量剩0的时候一定要降落，每降落一架，
剩下的所有飞机油量都减1。如果没有是0油量的飞机，就按在array中的顺序降落。输出降落的飞机的次序。
第三题，给两个File类的array，按照timestamp排序。复制在一个array中存在但在另一个当中不存在的file，
假定copy（file）这个method存在
第四题，就和LC里面的word break很类似
1. 一个Texas的妹子，input是一个int[] ads,上面有n个可以放广告的位置，ads[i] 的意思是
同时卖了i个位置给一个顾客可以得到的收益，如果至多卖给两个顾客你能得到的最大收益是多少,
followup是如果不限制卖给多少个顾客最大收益是多少。
举个例子，{2,5,7,8}得到的最大收益是ads[1] + ads[1] = 10, 而不是ads[0] + ads[2] = 9, 
或者ads[3] = 8 第一题蛮简单，followup先用的dfs，最后拿dp优化的。
2. 一个白人大哥，这一轮聊得还行。给一个list of coupons，每个coupon会有对应的要求
譬如coupon 1 要求位置 == 1， coupons 2 要求位置 <= 2，第一轮只有等于和小于等于的情况，
问给定的这个list能否被满足。 followup是加上大于等于。
还是DFS做的，不过讨论了很多initialization的edge case，譬如如果有条件pos <= 100,000,000 
而list只有几十个，或者反过来。没讨论完edge case时间就到了。。
3. Behavior
问了下未来三年的发展方向和为什么要跳来这个小公司
4. 特别简单，就是hashmap的ood。。。具体题目不记得了，20分钟做完就开始聊天了。。
tic-tac-toe 游戏，board长度可输入，设计这个类。
要求有的方法：
1. 返回下一步可以走的位置
2. 每个选手最多可以有三(n)个棋子在board上
3. 如果一方获胜游戏结束
followup： 设计一个ai，每一步都是下一步里的最优，给定一个当前board的状态判断最后谁能赢

0/1 knapsack, 
return pairs of all ints that add up to a given number, 
Scheduling given peoples' start and end free times, 
edit distance given a dictionary.
Given a list of products and a list of coupons where each coupon can only be used once, 
compute the lowest net product price.  
*/
