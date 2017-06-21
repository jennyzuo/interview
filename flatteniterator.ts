/* Airbnb
Given: [[],[1,2,3],[4,5],[],[],[6],[7,8],[],[9],[10],[]] 
Print: 1 2 3 4 5 6 7 8 9 10 
Remove even elements  Should result in: [[],[1,3],[5],[],[],[],[7],[],[9],[],[]] Print: 1 3 5 7 9
*/
const aina = [[],[1,2,3],[4,5],[],[],[6],[7,8],[],[9],[10],[]];
class Iterator {
    row = 0;
    col = 0;
    value;
    array;
    private moveforward() {
        this.value = null;
        while (true) {
            if (this.row >= this.array.length) break;
            let currArray = this.array[this.row];
            if (this.col < currArray.length) {
                this.value = currArray[this.col];
                break;
            } else {
                this.row++;
                this.col = 0;
            }
        }
    }

    public hasNext() {
        this.col++;
        this.moveforward();
        return !!this.value;
    }
    public next() {
        return this.value;
    }
    public remove() {
        if (this.value) {
            let currArray = this.array[this.row];
            currArray.splice(this.col, 1);
            return this.value;
        } else {
            throw new Error('empty value');
        }
    }
    constructor(array) {
        this.array = array;
        this.col--;
        this.moveforward();
    }
}

const it = new Iterator(aina);
while (it.hasNext()) {
    console.log(it.next());
}