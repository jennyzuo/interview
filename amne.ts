function slide(arr, k) {
    /* continuous increment 1 /decrement 1 contribute to total trends */
    function change(n) {
        return n * (n + 1) / 2 - (n - 1) * n / 2;
    }
    let sum = 0, lastContinueIdx = 0;
    const q = []; /** hold continuos increment/decrement numbers */
    if (k === 1) console.log(sum);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) {/* increment 1 case */
            if (q[q.length - 1] > 0 && lastContinueIdx + 1 === i) { /** continuous increment 1*/
                q[q.length - 1]++; //contriubte 1 more increment to continuous increments
                sum += change(q[q.length - 1]);
            } else if (q.length === 0 || q[q.length - 1] < 0 || lastContinueIdx + 1 < i) {/**first increment */
                q.push(1);
                sum += 1;
            }
            lastContinueIdx = i;
        } else if (arr[i] < arr[i - 1]) {/**decrement 1 case */
            if (q[q.length - 1] < 0 && lastContinueIdx + 1 === i) { /** continuous decrement 1*/
                q[q.length - 1]--;
                sum -= change(-q[q.length - 1]);
            } else if (q.length === 0 || q[q.length - 1] > 0 || lastContinueIdx + 1 < i) {/**first decrement */
                q.push(-1);
                sum -= 1;
            }
            lastContinueIdx = i;
        }
        if (i >= k) {
            if (arr[i - k + 1] > arr[i - k]) { //slide continuous increment
                sum -= change(q[0]);
                q[0]--;
            } else if (arr[i - k + 1] < arr[i - k]) { //slide continuous decrement
                sum += change(-q[0]);
                q[0]++;
            }
            if (q[0] === 0) q.shift();
        }
        if (i >= k - 1) console.log(sum);
    }
}

const readline = require('readline'), fs = require('fs'), filename = process.argv[2];
let prices, k, number, n = 0;
readline.createInterface({
  input: fs.createReadStream(filename)
}).on('line', line => {
  if (n === 0) {
      n++;
      [number, k] = line.split(' ').filter(i => i.length > 0);
  } else if (n === 1) {
      prices = line.split(' ').filter(i => i.length > 0);
  }
}).on('close', () => {
    if (prices.length === parseInt(number, 10) && prices.length >= k) {
        const t1 = new Date();
        slide(prices, k);
        const t2 = new Date();
        const seconds = Math.floor((t2.getTime() - t1.getTime()) / 1000);
        console.log(`time elapsed: ${seconds} seconds`);
    }
});