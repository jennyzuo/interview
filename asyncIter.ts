//Asynchronously iterate through a list
const sequence = (array, callback) => {
    array.reduce((promise, item) => {
        return promise.then(() => callback(item));
    }, Promise.resolve());
};
const products = ['sku-1', 'sku-2', 'sku-3'];
sequence(products, sku => console.log('....sku:', sku));

//{a: {b: 1}, c: {k: {d: 2}}}
const g = {a: {b: 1}, c: {k: {d: 2}, o: {w: 3}}};
const allKeys = {};
const popKey = (g, prefix) => {
    Object.keys(g).forEach(key => {
        if (typeof g[key] === 'object') {
            popKey(g[key], prefix === '' ? key : prefix + '_' + key);
        } else {
            allKeys[prefix === '' ? key : prefix + '_ ' + key] = g[key];
        }
    });
};

popKey(g, '');
console.log(allKeys);
