/*var endorsements = [
  { skill: 'javascript', user: 'Chad' },
  { skill: 'javascript', user: 'Bill' },
  { skill: 'css', user: 'Sue' },
  { skill: 'javascript', user: 'Sue' },
  { skill: 'css', user: 'Bill' },
  { skill: 'html', user: 'Sue' }
];

// Result
[
  { skill: 'javascript', user: [ 'Chad', 'Bill', 'Sue' ], count: 3 },
  { skill: 'css', user: [ 'Sue', 'Bill' ], count: 2 },
  { skill: 'html', user: [ 'Sue' ], count: 1 }
];
*/
const endorsements = [
    { skill: 'javascript', user: 'Chad' },
    { skill: 'javascript', user: 'Bill' },
    { skill: 'css', user: 'Sue' },
    { skill: 'javascript', user: 'Sue' },
    { skill: 'css', user: 'Bill' },
    { skill: 'html', user: 'Sue' } 
];

const group = endorsements => {
    const g = endorsements.reduce((g, cur) => {
        if (!g[cur.skill]) {
            g[cur.skill] = {skill: cur.skill, user:[], count: 0};
        }
        g[cur.skill].user.push(cur.user);
        g[cur.skill].count += 1; 
        return g;
    }, {});
    return Object.keys(g).reduce((pre, key) => {
        pre.push(g[key]);
        return pre;
    }, []);
};

let re = group(endorsements);
console.log(re);