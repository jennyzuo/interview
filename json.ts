const stringify = json => {
    let retStr = '';
    if (Array.isArray(json)) {
        retStr += '[';
        retStr += json.reduce((acc, item, i) => {
            acc += i > 0 ? ',' : '';
            acc += stringify(item);
            return acc;
        }, '');
        retStr += ']';
    } else if (typeof json === 'object') {
        retStr += '{';
        retStr += Object.keys(json).reduce((acc, key, i) => {
            acc += i > 0 ? ',' + key + ':' : key + ':';
            acc += stringify(json[key]);  
            return acc;
        }, '');
        retStr += '}';
    } else {
        retStr += json + '';
    }
    return retStr;
};

const test = json => {
    let rest = stringify(json);
    console.log(typeof rest + ':' + rest);
    console.log('------------');
};
test([1, 5, "false"]);
test({});
test(true);
test('foo');
test({x: 5});
test([{x: 5, y: 4}, true, 'foo', [1, 2, 3], {y: {m: ['a', 'b', 'c']}}]);


const parseToken = token => {
    if (token === 'null') {
        return null;
    } else if (token === 'true' || token === 'false') {
        return token === 'true';
    } else {
        let n = parseFloat(token);
        if (isNaN(n)) {
            return token;
        }
        return n;
    }
};
const handleToken = (stack, token) => {
    if (token === '') return;
    stack.push(parseToken(token));
};
const parse = str => {
    const stack = [];
    let token = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') continue;
        if (str[i] === '[' || str[i] === '{') {
            stack.push(str[i]);
        } else if (str[i] === ']') {
            handleToken(stack, token);
            const arr = [];
            while(stack[stack.length - 1] !== '[') {
                arr.push(stack.pop());
            }
            stack[stack.length - 1] = arr.reverse();
            token = '';
        } else if (str[i] === '}') {
            handleToken(stack, token);
            const obj = {}, tmp = [];
            while(stack[stack.length - 1] !== '{') {
                let obj = {};
                let v = stack.pop();
                let k = stack.pop();
                obj[k] = v;
                tmp.push(obj);
            }
            Object.assign(obj, ...tmp.reverse());
            stack[stack.length - 1] = obj;
            token = '';
        } else if (str[i] === ',' || str[i] === ':') {
            handleToken(stack, token);
            token = '';
        } else token += str[i];
    }
    return stack.length > 0 ? stack.pop() : token;
};

const t = str => {
    console.log(JSON.stringify(parse(str)));
    console.log('-----------');
};
t('false');
t('abc');
t('{}');
t('{x:5}');
t('[1,5,{x:4}]');
t('{x:[1,2]}');
t('[1,[1,{x:[false,{q:m}]},null]]');
t('[{x:5,y:4}]');
t('[{x:5,y:4},true,foo,[1,2,3],{y:{m:[a,b,c]}}]');