const a = [1, [2, 3, 4], [[5, 6, [[7, 8]]]], [9]];

const flatten = a => {
    return a.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return pre.concat(flatten(cur))
        } else {
            return pre.concat([cur]);
        }
    }, []);
};

const flatten2 = a => {
    const res = a.slice();
    let i = 0;
    while (i < res.length) {
        if (Array.isArray(res[i])) {
            res.splice(i, 1, ...res[i]);
        }
        else {
            i++;
        }
    }
    return res;
};

let ret = flatten(a);
console.log(ret);
ret = flatten2(a);
console.log(ret);