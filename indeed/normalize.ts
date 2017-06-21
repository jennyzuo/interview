/*
Given a rawTitle, and a list(or array) of clean titles. For each clean title,
the raw title can get a "match point". For example, if raw title is "senior software
engineer" and clean titles are "software engineer" and "mechanical engineer", the
"match point" will be 2 and 1. In this case we return "software engineer" because
it has higher "match point"
*/
const getScore = (raw, title) => {
    const a = raw.split(' '), b = title.split(' ');
    let col = a.length, row = b.length, res = 0;
    const dp = new Array(row);
    for (let i = 0; i < row; i++) {
        dp[i] = new Array(col);
        dp[i][0] = b[i] === a[0] ? 1 : 0;
    }
    for (let i = 0; i < col; i++) {
        dp[0][i] = b[0] === a[i] ? 1 : 0;
    }
    for (let i = 1; i < row; i++) {
        for (let j = 1; j < col; j++) {
            dp[i][j] = b[i] === a[j] ? dp[i - 1][j - 1] + 1 : 0;
            res = Math.max(res, dp[i][j]);
        }
    }
    return res;
};
const highestTitle = (raw, titles) => {
    let maxScore = Number.MIN_VALUE, maxTitle;
    titles.forEach(title => {
        if (getScore(raw, title) > maxScore) {
            maxTitle = title;
        }
    });
    return maxTitle;
};

let rawTitle = 'senior software engineer';
const cleanTitles = ['software engineer', 'mechanical engineer', 'senior software engineer'];
console.log(highestTitle(rawTitle, cleanTitles));
