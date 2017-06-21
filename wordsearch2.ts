class TrieNode {
    label;
    isword = false;
    children = {};
    constructor(label) {
        this.label = label;
    }
}
class Trie {
    root;
    constructor(label) {
        this.root = new TrieNode(label);
    }
    public insert(word) {
        let parent = this.root;
        for (let char of word) {
            let node = parent.children[char];
            if (!!!node) {
                node = new TrieNode(char);
                parent.children[char] = node;              
            }
            parent = node;
        }
        parent.isword = true;
    }
}
const search = (board, node, i, j, visited, res, matches) => {
    visited[i][j] = true;
    res.push(node.label);
    if (node.isword) {
        matches.push(res.join(''));
    }
    const dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let d = 0; d < dir.length; d++) {
        let x = dir[d][0] + i;
        let y = dir[d][1] + j;
        if (x >= 0 && x < board.length && y >= 0 && y < board[0].length && 
            !visited[x][y] && node.children[board[x][y]]) {
                search(board, node.children[board[x][y]], x, y, visited, res, matches);
        }
    }
    res.pop();
    visited[i][j] = false;
};
const wordseach = (words, board) => {
    const res = [], matches = [];
    const visited = new Array(board.length);
    for (let i = 0; i < board[0].length; i++) {
        visited[i] = new Array(board[0].length);
        visited[i].fill(false);
    }
    const t = new Trie('R');
    words.forEach(word => t.insert(word));
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (t.root.children[board[i][j]]) {
                search(board, t.root.children[board[i][j]], i, j, visited, res, matches);
            }
        }
    }
    return matches;
};
const words = ['oath','pea','eat','rain'];
const board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]; //["eat","oath"].
r = wordseach(words, board);
console.log(JSON.stringify(r));
