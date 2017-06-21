/*
给出若干行的文字，再给query，输出所在的行数。行数要排序。先根据出现的频率排序，如果频率一样，
就按照行数大小来排序。
举例：
a b     //1
b a a   //2
a b b   //3
a       //4
query(a),输出就是（2，1，3,4），query(b)输出(3,1,2)
query(a & b) 输出(2,3,1)
query(a | b) 输出(2,3,1,4)
因为query(a&b)(a|b)的频率计算都是单独算a和b出现次数然后求和的。
*/
class QueryService {
    private wordIdx = new Map();
    private lineno = 1;
    private parseline(line) {
        const words = line.split(' ').reduce((acc, word) => {
            acc[word] = acc[word] || 0;
            acc[word] += 1;
            return acc;
        }, {});
        for (let word in words) {
            this.wordIdx[word] = this.wordIdx[word] || new Map();
            this.wordIdx[word][this.lineno + ''] = words[word];
        }
        this.lineno++;        
    }
    public readline(line) {
        this.parseline(line);
    }
    public query(search) {
        const searchKeys = search.split(/[&|\|]/g);
        const combineMap = searchKeys.reduce((acc, key) => {
            for (let line in this.wordIdx[key]) {
                acc[line] = acc[line] || 0;
                acc[line] += this.wordIdx[key][line];
            }
            return acc;
        }, {});
        return Object.keys(combineMap).reduce((acc, line) => {
            acc.push({line, count: combineMap[line]});
            return acc;
        },[])
        .sort((a, b) => a.count ===  b.count ? a.line - b.line : b.count - a.count)
        .map(item => item.line);
    }
}

const words = `a b
b a a
a b b
a k`;
const qService = new QueryService();
for (let line of words.split('\n')) {
    qService.readline(line);
}
r = qService.query('a');
console.log(r);