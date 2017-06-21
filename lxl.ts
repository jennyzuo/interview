const rotat = (array, n) => {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        let mid = low + Math.floor((high - low)/2);
        if (array[mid] === n) return mid;
        if (array[low] < array[mid]) {
            if (array[low] <= n &&  n < array[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (array[mid] < n && n <= array[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
};
const findMin = array => {
    let low = 0, high = array.length - 1;
    while (low < high) {
        if (array[low] < array[high]) return low;
        if (high - low === 1) return array[high] > array[low] ? low : high;
        let mid = low + Math.floor((high - low)/2);
        if (array[low] > array[mid]) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
};
const findMax = array => {
    let low = 0, high = array.length - 1;
    while (low < high) {
        if (array[low] < array[high]) return high;
        if (high - low === 1) return array[high] > array[low] ? high : low;
        let mid = low + Math.floor((high - low)/2);
        if (array[low] > array[mid]) {
            high = mid - 1;
        } else {
            low = mid;
        }
    }
    return low;
};
r = [9, 16, 1, 2, 3, 4, 5, 6, 7];
let rr = rotat(r, 3);
console.log(`(${rr})=`, r[rr]);
rr = findMin(r);
console.log(`(${rr})=`, r[rr]);
rr = findMax(r);
console.log(`(${rr})=`, r[rr]);