/*
一个Data Stream输入，每次读进来一个数。给一个int getNow()API获取当前timestamp.
完成两个函数。
1.record(int val)，输入的时候每次都自动调用record。
2.getAvg(),返回最近5分钟的平均值。
*/
const getNow = () => + new Date();
class Stream {
    private queue = [];
    private sum = 0;
    private span;
    constructor(span) {
        this.span = span;
    }
    private removeExpire = now => {
        while (this.queue.length  && this.queue[0].t + this.span < now ) {
            let [expire] = this.queue.splice(0, 1);
            this.sum -= expire.v;
        }
    };
    public record = val => {
        let now = getNow();
        this.removeExpire(now);
        this.queue.push({t : now, v: val});
        this.sum += val;
    };
    public getAvg = () => {
        let now = getNow();
        this.removeExpire(now);
        return this.sum === 0 ? 0 : this.sum/this.queue.length;
    };
    private quickSelect = (arr, k) => {
        let f = arr.pop();
        let less = arr.filter(i => i < f);
        if (less.length > k) return this.quickSelect(less, k);
        let eq = arr.filter(i => i === f);
        if (less.length + eq.length + 1 >= k) {
            return f;
        }
        return this.quickSelect([...arr.filter(i => i > f)], k - less.length - eq.length - 1);
    };
    public getMedia = () => {
        if (this.queue.length === 0) return null;
        const q = this.queue.reduce((acc, cur) => [...acc, cur.v], []);
        if (q.length % 2 === 0) {
            return this.quickSelect(q, q.length/2);
        } else {
            return (this.quickSelect(q, q.length/2 - 1) + this.quickSelect(q, q.length/2))/2;
        }
    }
}

const s = new Stream(50);
s.record(2);

setTimeout(()=>s.record(1), 2);
setTimeout(()=>s.record(4), 4);
setTimeout(()=>s.record(3), 6);

setTimeout(() => {
    r = s.getAvg();
    let m = s.getMedia();
    console.log(r, m);
}, 10);