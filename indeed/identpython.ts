/* 给一段Python代码，还有一些列规则，然后写程序检测该代码是否符合该规则（主要是Python的缩进规则），
1.第一行无缩进 
2.前一行是冒号结尾，下一行缩进要比这一行多 
3.同一个块里面缩进相同
4. 如果下一行缩进变少，必须要变少到之前出现过的有效缩进
*/
const strs = [
    'def function():',
    '   print(\"Hello world\")',
    '   print(\"Hello world\")',
    '   if i==1:',
    '       print(\"asdf\")'
];
const strs2 = [
    'def fun():',
    '   for x in range(0,10):',
    '       print "test"',
    '   print "finished"'
];
const indent = str => {
    for (var i = 0; i < str.length; i++) {
        if (str[i] != ' ') break;
    }
    return i;
};
const isValidate = strs => {
    if (strs === null || strs.length == 0) return true;
    const stack = [];
    let currIndent = indent(strs[0]);
    if (indent(strs[0]) !== 0) return false;
    stack.push(0);
    for (let i = 1; i < strs.length; i++) {
        let preIndent = stack[stack.length - 1];
        currIndent = indent(strs[i]);
        if (strs[i - 1][strs[i - 1].length - 1] === ':') {
            if (currIndent <= preIndent) return false;
        } else {
            if (currIndent > preIndent) return false;
            while (stack.length > 0 && stack[stack.length - 1] > currIndent) {
                stack.pop();
            }
            if (stack[stack.length - 1] !== currIndent) return false;
        }
        stack.push(currIndent);
    }
    return true;
};

ret = isValidate(strs2);
console.log(ret);
ret = isValidate(strs);
console.log(ret);