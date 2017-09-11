const justify = (strs, exspaces) => {
    let space = Math.floor(exspaces/(strs.length - 1)), 
        remain = exspaces%(strs.length - 1), ret = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let addspace = space + 1;
        if (remain > 0) {
            addspace++;
            remain--;
        }
        ret += ' '.repeat(addspace) + strs[i];
    }
    return ret;
};
const textJustify = (strs, len) => {
    let length = strs[0].length, hold = [strs[0]], ret = [];
    for (let i = 1; i < strs.length; i++) {
        if (length + strs[i].length + 1 > len) {
            ret.push(justify(hold, len - length));
            hold = [strs[i]];
            length = strs[i].length;
        } else {
            length += (strs[i].length + 1);
            hold.push(strs[i]);
        }
    }
    ret.push(hold.join(' ') + ' '.repeat(len - length));
    return ret;
};
r = textJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16);
r.forEach(element => {
    console.log('\'' + element + '\'');
});

