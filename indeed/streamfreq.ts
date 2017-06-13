/*
Given n sorted stream, and a constant number k. The stream type is like iterator
and it has two functions, move() and getValue(), find a list of numbers that each
of them appears at least k times in these streams. Duplicate numbers in a stream
should be counted as once.
*/
class PriorityQueue {
    public data = [];
    private comparator; 
    constructor(comparator = null) {
        this.comparator = comparator;
    }
    public isEmpty() {
        return this.data.length === 0;
    }
    public peek() {
        return this.data.length > 0 && this.data[0];
    }
    private swap(i, j) {
        let t = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = t; 
    }
    private sort() {
        if (this.data.length <= 1) return;
        let minIdx = 0;
        this.comparator = this.comparator || function(a, b) { return a - b };
        for (let i = 1; i < this.data.length; i++) {
            if (this.comparator.call(null, this.data[minIdx], this.data[i]) >= 0) {
                minIdx = i;
            }
        }
        this.swap(0, minIdx);
    }
    public poll() {
        let index = 0, ret = this.data.splice(0, 1)[0];
        this.sort();
        return ret;
    }
    offer(value) {
        this.data.push(value);
        this.sort();
    }
}
class DStream {
    private iterator;
    private next;
    constructor(list) {
        this.iterator = list[Symbol.iterator]();
    }
    public move() {
        this.next = this.iterator.next();
        return this.next.done === false;
    }
    public getValue() {
        return this.next.value;
    }
}
class StreamNode {
    public val;
    public id;
    constructor(val, id) {
        this.val = val;
        this.id = id;
    }
}

const pushNext = (lists, id, minQ) => {
    if (lists[id].move()) {
        minQ.offer(new StreamNode(lists[id].getValue(), id));
    }
};
const getNumberInAtLeastKStream = (lists, k) => {
    const minQ = new PriorityQueue((a, b) => {
        if (a.val > b.val) return 1;
        if (a.val < b.val) return -1;
        return a.id < b.val ? -1 : 1;
    });
    const retObj = {};
    let id = 0;
    lists.forEach(list => {
        if (list.move()) {
            minQ.offer(new StreamNode(list.getValue(), id++));
        }
    });
    let preStreamNode = minQ.poll();
    let preNode = {val: preStreamNode.val, id: preStreamNode.id}, count = 1;
    pushNext(lists, preNode.id, minQ);
    while (!minQ.isEmpty()) {
        let currNode = minQ.poll();
        console.log(currNode);
        if (currNode.val === preNode.val) {
            if (currNode.id !== preNode.id) {
                preNode.id = currNode.id;
                count++;
            }
            pushNext(lists, preNode.id, minQ);
        } else {
            if (count >= k) retObj[preNode.val] = count;
            preNode = {val: currNode.val, id:currNode.id};
            count = 1;
            pushNext(lists, preNode.id, minQ);
        }
    }
    if (count !== 0 && count >= k) retObj[preNode.val] = count;
    return retObj;
};
const arr1 = [1, 1, 2, 3, 7], arr2 = [1, 1, 2, 5, 6], arr3 = [2, 5, 7];
const lists = [new DStream(arr1), new DStream(arr2), new DStream(arr3)];
r = getNumberInAtLeastKStream(lists, 2);
console.log(r);
/*pq.offer(1);
pq.offer(12);
pq.offer(5);
pq.offer(26);
pq.offer(7);
pq.offer(14);
pq.offer(3);
pq.offer(7);
pq.offer(2);
while(!pq.isEmpty()) {
    console.log(pq.poll());
}
let w = [1, 2, 3, 4];
let iter = w[Symbol.iterator]();
let dd = iter.next();
console.log(dd);
*/