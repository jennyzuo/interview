//WORD DISTANCE I, II
const distance = (words, word1, word2) => {
    let p1 = -1, p2 = -1, min = words.length;
    for (let i = 0; i < words.length; i++) {
        if (words[i] === word1 && words[i] === word2) {
            if (p1 === -1) p1 = i;
            else if (p2 === -1) p2 = i;
            else if (p1 > p2) p2 = i;
            else p1 = i;            
        } else if (words[i] === word1) p1 = i;
        else if (word[i] === word2) p2 = i;
        if (p1 !== -1 && p2 !== -1) min = Math.min(min, Math.abs(p1 - p2));
    }
    return min;
};

let word = ['practice', 'makes', 'perfect', 'coding', 'makes', 'Good', 'makes', 'perfect'];
let dis = distance(word, 'coding', 'practice');
console.log(dis);
dis = distance(word, 'makes', 'makes');
console.log(dis);

class WordDistance {
    word2IdxMap = {};
    constructor(words) {
        for(let i = 0; i < words.length; i++){
            let cur = words[i];
            this.word2IdxMap[cur] = this.word2IdxMap[cur] || [];
            this.word2IdxMap[cur].push(i);
        }
    }
    public shortest(word1, word2) {
        const l1 = this.word2IdxMap[word1];
        const l2 = this.word2IdxMap[word2];
        let res = Number.MAX_VALUE;
        if(l1 == null || l2 == null) return res;
        let p1 = 0, p2 = 0;
        while(p1 < l1.length && p2 < l2.length) {
            let temp = Math.abs(l1[p1] - l2[p2]);
            res = Math.min(res, temp);
            if(l1[p1] < l2[p2]){
                p1++;
            }
            else {
                p2++;
            }
        }
        return res;
    }
}
dis = new WordDistance(word);
r = dis.shortest('coding', 'practice');
console.log(r);