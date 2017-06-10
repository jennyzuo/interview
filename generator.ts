//random generate a board with direction. 
//check whether there was go out board by a given initial position
const MOVE = {
    '←': ([x, y]) => [x - 1, y],
    '→': ([x, y]) => [x + 1, y],
    '↓': ([x, y]) => [x, y + 1],
    '↑': ([x, y]) => [x, y - 1]
};

const Board = (size = 8) => {
    const board = [];
    for (let i = 0; i < size; ++i) {
        board[i] = [];
        for (let j = 0; j < size; ++j) {
            board[i][j] = '←→↓↑'[Math.floor(Math.random() * 4)];
        }
    }
    const position = [
        Math.floor(Math.random() * size),
        Math.floor(Math.random() * size)
    ];
    return {board, position};
};

const Game = ({board, position}) => {
    const size = board[0].length;
    return ({
        *[Symbol.iterator]() {
            let [x, y] = position;
            while (x >= 0 && y >= 0 && x < size && y < size) {
                const direction = board[y][x];
                yield direction;
                [x, y] = MOVE[direction]([x, y]);
            }
        }
    });
};

const statefulMapWith = (fn, seed, iterable) => ({
    *[Symbol.iterator]() {
        let value, state = seed;
        for (let element of iterable) {
            [state, value] = fn(state, element);
            yield value;
        }
    }
});

const positionOf = (game) => 
    statefulMapWith((position, direction) => {
        const [x, y] = MOVE[direction](position);
        position = [x, y];
        return [position, `x: ${x}, y: ${y} (${direction})`]
    }, position, game);

const hasCycle = (orderedCollection) => {
    const visited = new Set();
    for (let element of orderedCollection) {
        if (visited.has(element)) {
            return true;
        }
        visited.add(element);
    }
    return false;
};

const {board, position} = Board();
console.log(board);
console.log(position);

const game = Game({board, position});
if (hasCycle(game)) {
    console.log('has cycle');
} else {
    for (let position of positionOf(game)) {
        console.log(position);
    }
}