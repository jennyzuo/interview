/*
<div id="foo-bar">
   <input type="text" name="foo.bar" value="hello world">
</div>

<div id="foo-bar-baz">
   <input type="text" name="foo.baz" value="hello world">
   <input type="text" name="foo.baq.bad" value="hello world">
   <input type="text" name="oof" value="hello world">
</div>
*/
const data = {
    'foo-bar': {'foo' : 'hello world 1'},
    'foo-bar-baz': {
        'foo.baz' : 'hello world 2',
        'foo.baq.bad' : 'hello world 3',
        'foo.baq.good' : 'hello world 9',        
        'oof' : 'hello world 4'
    }
}
const genMap = id => {
    return Object.keys(data[id]).reduce((pre, cur) => {
        let keys = cur.split('.'), 
            lastKey = keys.pop(), parent = pre;
        keys.forEach(key => {
            parent[key] = parent[key] || {};
            parent = parent[key];
        });
        parent[lastKey] = data[id][cur];
        return pre;
    }, {});
};
let json = genMap('foo-bar');
console.log(json);
console.log('----------------');
json = genMap('foo-bar-baz');
console.log(json);