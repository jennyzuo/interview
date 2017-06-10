const moveLookupTable = {
    [[
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ]]: 0,
    [[
        'o', 'x', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ]]: 6,
    [[
        'o', 'x', 'x',
        ' ', ' ', ' ',
        'o', ' ', ' '
    ]]: 3,
    [[
        'o', 'x', ' ',
        'x', ' ', ' ',
        'o', ' ', ' '
    ]]: 8,
    [[
        'o', 'x', ' ',
        ' ', 'x', ' ',
        'o', ' ', ' '
    ]]: 3,
    [[
        'o', 'x', ' ',
        ' ', ' ', 'x',
        'o', ' ', ' '
    ]]: 3,
    [[
        'o', 'x', ' ',
        ' ', ' ', ' ',
        'o', 'x', ' '
    ]]: 3,
    [[
        'o', 'x', ' ',
        ' ', ' ', ' ',
        'o', ' ', 'x'
    ]]: 3
};
let next = moveLookupTable[[
    'o', 'x', ' ',
    ' ', ' ', ' ',
    'o', 'x', ' '
]];
console.log(moveLookupTable);
console.log('next=', next);

const statefulNaughtAndCross = () => {
    const state = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ];
    return (x = null) => {
        if (!!x) {
            if (state[x] === ' ') {
                state[x] = 'x';
            } else throw 'occupied!';
        }
        let o = moveLookupTable[state];
        state[o] = 'o';
        return o;
    }
};

const agame = statefulNaughtAndCross();
let stat = agame();
console.log('stat', stat);