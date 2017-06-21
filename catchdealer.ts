/*
http://www.1point3acres.com/bbs/forum.php?mod=viewthread&tid=229744
Palantir OA
 */
const THROTTLE_AMOUNT = 500000;
const removeExpire = (trades, day) => {
    while(trades.length && trades[0].day + 3 < day) {
        trades.shift();
    }
};
const tryCatchDealer = (trades, newPrice) => {
    const ret = [];
    trades.forEach(trade => {
        let deltaPrice = newPrice - trade.price;
        Object.keys(trade).forEach(name => {
            if (name !== 'day') {
                let amount = trade[name];
                if (amount * deltaPrice >= THROTTLE_AMOUNT ||
                    amount * deltaPrice <= -1 * THROTTLE_AMOUNT) {
                        ret.push(trade.day + '|' + name);
                }
            }
        });
    });
    return ret;
};
const catchDealer = data => {
    const trades = [], ret = new Set();
    let price;
    for (let line of data.split('\n')) {
        const info = line.split('|');
        let day = parseInt(info[0], 10);
        removeExpire(trades, day);
        if (info.length == 2) {
            price = parseInt(info[1], 10); 
            const dealers = tryCatchDealer(trades, price);
            if (dealers.length) {
                dealers.forEach(dealer => ret.add(dealer));
            }
        } else {
            let [daySlot] = trades.filter(trade => trade.day === day);
            if (daySlot === undefined) {
                daySlot = {day, price};
                trades.push(daySlot);
            }
            let [ , name, , amount] = info;
            daySlot[name] = daySlot[name] || parseInt(amount, 10);
        }
    }
    return Array.from(ret);
};

r = catchDealer(`0|20
0|Kristi|SELL|300
0|Will|BUY|500
0|Tom|BUY|5000
0|Shilpa|BUY|150
1|Tom|BUY|150000
3|25
5|Shilpa|SELL|150
8|Kristi|SELL|60000
9|Shilpa|BUY|50
10|15
11|5
14|Will|BUY|10000
15|Will|BUY|10000
16|Will|BUY|10000
17|25`);
console.log('----------');
console.log(r);
//1|TOM
//8|Kristi