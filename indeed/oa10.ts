/*每个员工有个manager， manager的创新分数会限制员工的创新分数。
比如：  如果manage 是5分，员工是6分，那么员工就要decrease 到5分。 
输入： 员工个数
［0号员工分数］［－1］  //-1表示 这个员工没有上司，是CEO
［1号员工的分数］[x]   //x是他的manger，不一定是0
［2号员工的分数 ]［y］
输出：公司总分数。*/
const readline = require('readline');
const r1 = readline.createInterface(process.stdin, process.stdout);
r1.setPrompt('\x1B[39m' + '> ');
r1.prompt();
let id = 0, lines, rootId;
const scores = [], subs = {};
const handleInput = commands => {
    let [score, mid] = commands;
    scores.push(parseInt(score));
    mid = parseInt(mid);
    if (mid === -1) {
        rootId = id;
    } else {
        subs[mid] = subs[mid] || [];
        subs[mid].push(id);
    }
    id++;
};
const cal = () => {
    console.log(scores);
    const q = [rootId];
    let sum = 0;
    while (q.length > 0) {
        let mid = q.splice(0, 1)[0];
        sum += scores[mid];
        if (subs[mid]) {
            subs[mid].forEach(sub => {
                if (scores[mid] < scores[sub]) {
                    scores[sub] = scores[mid];
                }
                q.push(sub);
            });
        }
    }
    console.log(scores);
    return sum;
    process.exit(0);
};
r1.on('line', cmd => {
    let command = cmd.trim().split(/\s+/);
    if (lines === undefined) lines = command[0];
    else {
        lines--;
        console.log(command);
        handleInput(command);
        if (lines === 0) r1.close();
    }
    r1.prompt();
});
r1.on('close', () => cal());
//3 [5 2] [7 2] [4 -1]
//4 [1 1] [2 -1] [3 1] [4 0]