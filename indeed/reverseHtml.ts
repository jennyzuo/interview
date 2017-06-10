//reverse the string with html entity, but keep html entity not reversed
const reverse = (str, start, end) => {
    for (let i = start, j = end; i < j; i++, j--) {
        let tmp = str[i];
        str[i] = str[j];
        str[j] = tmp;
    }
};
const reverseHtml = str => {
    str = str.split('');
    reverse(str, 0, str.length - 1);
    let end = -1, pairs = [];
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === '&') {
            end = i;
        } else if (str[i] === ';' && end !== -1) {
            reverse(str, i, end);
            end = -1;
        }
    }
    return str.join('');
};
const test2 = str => {
    console.log(str);
    console.log(reverseHtml(str));
    console.log('-------------');
};
test2('1234&eur;o;5677&&eu;567&');
test2('&euro4321');