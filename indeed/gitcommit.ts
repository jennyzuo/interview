/*
给出一个Git的commit，找出所有的parents。每个节点都有一个或多个parent。
另外每个commit都是带着ID的
第二题就是找到两个commit的公共祖先。
*/
class GitNode {
    public id;
    public parents = [];
    constructor (id) {
        this.id = id;
    }
}
const findAllCommits = node => {
    const ret = [], queue = [], visited = new Set();
    queue.push(node);
    visited.add(node);
    while (queue.length > 0) {
        let [cur] = queue.splice(0, 1);
        ret.push(cur);
        cur.parents.forEach(parent => {
            if (!visited.has(parent)) {
                queue.push(parent);
                visited.add(parent);
            }
        });
    }
    return ret;
};
const findLCA = (node1, node2) => {
    if (!!!node1 || !!!node2) return;
    if (node1 === node2) return node1;
    const q1 = [], q2 = [], v1 = new Set(), v2 = new Set();
    q1.push(node1);
    v1.add(node1);
    q2.push(node2);
    v2.add(node2);
    while (q1.length > 0 && q2.length > 0) {
        for (let i = q1.length; i > 0; i--) {
            let [cur] = q1.splice(0, 1);
            for (let j = 0; j < cur.parents.length; j++) {
                let parent = cur.parents[j];
                if (v2.has(parent)) return parent;
                if (!v1.has(parent)) {
                    q1.push(parent);
                    v1.add(parent);
                }
            };
        }
        for (let i = q2.length; i > 0; i--) {
            let [cur] = q2.splice(0, 1);
            for (let j = 0; j < cur.parents.length; j++) {
                let parent = cur.parents[j];
                if (v1.has(parent)) return parent;
                if (!v2.has(parent)) {
                    q2.push(parent);
                    v2.add(parent);
                }
            };
        }
    }
}

/*
5 <- 4<- 2
   \    \
    \ <-3<- 1
*/
const g1 = new GitNode(1);
const g2 = new GitNode(2);
const g3 = new GitNode(3);
const g4 = new GitNode(4);
const g5 = new GitNode(5);
g1.parents.push(g3);
g1.parents.push(g4);
g2.parents.push(g4);
g3.parents.push(g5);
g4.parents.push(g5);
r = findAllCommits(g1);
console.log(r);
r = findLCA(g2, g1);
console.log(r);