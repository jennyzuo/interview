/*
summary range,给你[1,2,3,5,6,8,10] return "1-3,5-6,8,10" 
follow up 有duplicate number怎么办
比如 1，2，3，5，5，5  ->  "1->3, 5->5";.
1,2,3,5,5,6,7 -> "1->3, 5->7";, 
问了各种complexity, runtime和space.
如果允许间隔不一定是1: 比如:
1,3,5,6,9,12 ->" 1->5/2, 6->12/3"  同时输入range和间隔
signature是public string tostring(int[] numbers){....}
*/
const range = (arr, startIdx, endIdx, gap = 1) => {
    let ret = startIdx > 0 ? ',' : '';
    if (startIdx === endIdx) return ret + arr[startIdx] + (gap > 1 ? '/' + gap : '');
    else return ret + arr[startIdx] + '-' + arr[endIdx] + (gap > 1 ? '/' + gap : '');
};
const summaryRange = (arr) => {
    let startIdx = 0, preIdx = startIdx, rangeStr = '', gap = -1;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[preIdx] || gap === -1 || arr[i] === arr[preIdx] + gap) {
            gap = arr[i] - arr[preIdx];
            preIdx = i;
            continue;
        }
        rangeStr += range(arr, startIdx, i - 1, gap);
        startIdx = i;
        preIdx = i;
        gap = -1;
    }
    rangeStr += range(arr, startIdx, arr.length - 1, gap);
    return rangeStr;
};
r = summaryRange([1,2,3,5,6,8,10]);
console.log(r);
console.log('---------------')
r = summaryRange([1,2,3,5,5,5]);
console.log(r);
console.log('-------------');
r = summaryRange([1,3,5,6,9,12]);
console.log(r);