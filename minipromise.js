function Promise (fn) {
    this._thens = []
    fn.call(this, this.resolve.bind(this), this.reject.bind(this))
}
Promise.prototype = {
	then: function (onResolve, onReject) {
        this._thens.push({ resolve: onResolve, reject: onReject })
        return this
    },
	resolve: function(val) { this._complete('resolve', val) },
	reject: function(ex) { this._complete('reject', ex) },
	_complete: function(which, arg) {
		this.then = which === 'resolve' ?
			(resolve, reject) => resolve && resolve(arg) :
			(resolve, reject) => reject && reject(arg);
		this.resolve = this.reject = () => { throw new Error('Promise already completed.') }
		let aThen, i = 0;
		while (aThen = this._thens[i++]) { aThen[which] && aThen[which](arg) }
		delete this._thens
	}
}
Promise.all = function(...promises) {
    return new Promise(resolve => {
        const ret = Array(promises.length)
        let count = 0
        function finish(res, i) {
            ret[i] = res
            count++
            if (count === ret.length) {
                resolve(ret)
            }
        }
        promises.forEach((promise, i) => promise.then(value => finish(value, i)))
    })
}
function something() {
    return new Promise(function(resolve) {
        setTimeout(() => resolve(99999), 100)
    })
}
something().then(value => console.log('Wu GOT:', value)).then(value => console.log('PPPP:', value))

setTimeout(() => {
    something().then(tweets => {
        console.log(tweets)
    })
}, 2000)

function something2() {
    return new Promise(function(resolve) {
        setTimeout(() => resolve(200), 200) 
    })
}
Promise.all(something(), something2()).then(function([t1, t2]) {
    console.log('all results=', [t1, t2])
})