/*
http://www.1point3acres.com/bbs/thread-223228-1-1.html
就是一个简历系统（Profile system）, 实现update和query。我的办法是建个Profile class，3个API
1) update(String profileId, String field, String value); //这时候版本要+1
2) get(String profileId, int version); //找对应版本的field和value
3) getField(String profileId, int version, String field); //找对应的value
每个用户有一个 profile，然后 profile 里有各种 field 和对应的 value，第一次 update 之后的 version 是 1，
再 update version 变成 2，依此类推。
*/
class Field {
    private stack = [];
    public getValue = version => {
        for (let i = this.stack.length - 1; i >= 0; i--) {
            if (this.stack[i].version <= version) {
                return this.stack[i].value;
            }
        }
    };
    public update = (value, version) => {
        this.stack.push({value, version});
    };
}
class profile {
    private peoples = {
        '123' : {a : new Field(), b : new Field(), version : 0}
    };
    constructor() { }
    public update = (profileId, field, value) => {
        const people = this.peoples[profileId];
        people.version++;
        if (people[field]) {
            people[field].update(value, people.version);
        }
    };
    public get = (profileId, version) => {
        const people = this.peoples[profileId];
        const ret = {};
        if (people === undefined || people.version < version) return ret;
        for (let f in people) {
            if (people[f] instanceof Field) {
                ret[f] = this.getField(profileId, version, f);
            }
        }
        return ret;
    };
    public getField = (profileId, version, field) => {
        const people = this.peoples[profileId];
        if (people && people.version <= version && people[field]) {
            return people[field].getValue(version);
        }
    };
}

const p = new profile();
p.update('123', 'a', 1);
p.update('123', 'b', 2);
p.update('123', 'a', 3);
let c = p.get('123', 3);
console.log('c:', c);
c = p.getField('123', 3, 'a');
console.log(c);