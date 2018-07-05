/*
const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');

range(1, 200)
  .pipe(filter(x => x % 2 === 1), map(x => x + x))
  .subscribe(x => console.log(x));
*/


var allMoves = Rx.Observable.fromEvent(document, 'mousemove').filter(e => e.clientX < window.innerWidth /2)
.subscribe(e => console.log('>>>>>', e.clientX))

/*allMoves.subscribe(function(e) {
  console.log(e.clientX, e.clientY);
});

var movesOnTheRight = allMoves.filter(function(e) {
  return e.clientX > window.innerWidth / 2;
});

var movesOnTheLeft = allMoves.filter(function(e) {
  return e.clientX < window.innerWidth / 2;
});

movesOnTheRight.subscribe(function(e) {
  console.log('Mouse is on the right:', e.clientX);
});

movesOnTheLeft.subscribe(function(e) {
  console.log('Mouse is on the left:', e.clientX);
});
*/