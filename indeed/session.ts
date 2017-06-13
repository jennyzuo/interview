/*
这个file每一行都是(user_id, timestamp,action_type)
要求根据userid和timestamp划分session，划分规则是一个session里面相邻的两个操作间隔不超过10分钟
*/
class Session {
    private sessionSpan = 10;
    private sessionMap = {};
    private timelines = [];
    public readLog(log) {
        let [uid, timestamp, action] = log.split(',');
        timestamp = parseInt(timestamp);
        this.removeExpireSession(timestamp);
        if (this.sessionMap[uid] === undefined) {
            this.sessionMap[uid] = [];
            this.timelines.push({uid, timestamp});
        }
        this.sessionMap[uid].push({timestamp, action});
    }
    private removeExpireSession(timestamp) {
        let i = 0;
        while (i < this.timelines.length) {
            if (this.dumpSession(this.timelines[i].uid, timestamp)) {
                this.timelines.splice(i, 1);
            } else {
                i++;
            }
        }
    }
    private dumpSession(uid, timestamp) {
        const actions = this.sessionMap[uid] = this.sessionMap[uid] || [];
        if (actions.length && actions[0].timestamp + this.sessionSpan < timestamp) {
            console.log('--' + actions.reduce((acc, log) => {
                return acc + '(' + log.timestamp + ':' + log.action + ')';
            },'uid:' + uid) + '---');
            delete this.sessionMap[uid];
            return true;
        }
    }
}

const logs = `123,12,click
456,16,search
123,18,idle
456,24,click
345,59,click`;
const se = new Session();
for (let log of logs.split('\n')) {
    se.readLog(log);
}