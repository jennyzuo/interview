const union = (board, i, j) => i * board.length + j;
const trace = (board, i, j, road, visited, remain) => {
    if (remain === 0) {
        console.log(road.map(item => item[0]).join(','));
        return
    }
    const dir = [[-1, 0, 'up'], [1, 0, 'down'], [0, -1, 'left'], [0, 1, 'right']];
    for (let d = 0; d < 4; d++) {
        let x = dir[d][0] + i;
        let y = dir[d][1] + j;
        if (x >= 0 && x < board.length && y >= 0 && y < board[0].length && board[x][y] === 1
        && !visited.has(union(board, i, j) + ',' + union(board, x, y))) {
            road.push([dir[d][2], union(board, i, j) + ',' + union(board, x, y)]);
            visited.add(union(board, i, j) + ',' + union(board, x, y));
            if (!visited.has(union(board, x, y) + ',' + union(board, i, j))) remain--;
            trace(board, x, y, road, visited, remain);
            let [, v] = road.pop();
            visited.delete(v);
        }
    }

};
const findPath = (board, i, j) => {
    const road = [], visited = new Set();
    const dir = [[-1, 0, 'left'], [1, 0, 'right'], [0, -1, 'up'], [0, 1, 'down']];
    let remain = 2;
    trace(board, i, j, road, visited, remain);
};
const board = 
[[1,0],
[1, 1]];
//console.log(board[1][0]);
findPath(board, 1, 0);

/*给一个maze,打印出 从给定位置的1开始访问完其它所有1的路径
  1 0
  1 1
给定位置的1  
  x = 0
  y = 1  
  可能的结果是
  r.moveUp();
  r.moveDown();
  r.moveRight();
*/