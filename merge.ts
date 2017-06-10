/*
obj1 = {a: 1, b: 2, c: {d: 3}}
obj2 = {b: 'a', c: {d: 4}}，
write function merge(obj1, obj2)，
merge result is: {a: 1, b: [2, 'a'], c: {d: [3, 4]}}
*/
const obj1 = {a: 1, b: 2, c: {d: 3, w: 1, u: 's'}};
const obj2 = {b: 'a', c: {d: 4, w: {c: 'g'}, h: 't'}, d: {q: 9}};

const mergeObj = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const diff = obj1Keys.filter(key => obj2Keys.indexOf(key) < 0).
                 concat(obj2Keys.filter(key => obj1Keys.indexOf(key) < 0));
    const common = obj1Keys.filter(key => obj2Keys.indexOf(key) >= 0);
    const d = diff.reduce((pre, key) => {
        pre[key] = obj1[key] || obj2[key];
        return pre;
    }, {});
    const c = common.reduce((pre, key) => {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            pre[key] = mergeObj(obj1[key], obj2[key]);
        } else {
            pre[key] = [obj1[key], obj2[key]];
        }
        return pre;
    }, {});
    return Object.assign({}, d, c);
};

let r = mergeObj(obj1, obj2);
console.log(r);
console.log('---------------');
r = mergeObj({a: 1}, {a: 2});
console.log(r);