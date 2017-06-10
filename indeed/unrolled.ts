/* Unrolled Linked List，有以下数据结构:
class Node { char[] chars = new char[5]; //固定大小5 int len; } 
class LinkedList { Node head; int totalLen; } 
实现以下成员函数：char get(int index), void insert(char ch, int index) 
get比较容易，就是从head traverse，定位第index个char；insert有点麻烦，有几种情况需要考虑。 
时间有点不太够，所以insert函数没完全实现 T.
*/
class LinkNode {
    public chars = new Array(5);
    public len;
    public next;
    constructor() {}
};
class UnRolledList {
    public totalLen;
    public head;
    constructor(public heada, public total) {
        this.head = heada;
        this.totalLen= total;
    }
}
const a1 = new LinkNode();
a1.chars = ['1', '2', '3', '4', '5'];
a1.len = 5;
const a2 = new LinkNode();
a2.len = 4;
a2.chars = ['a', 'b', 'c', 'd'/*, 'e'*/];
a1.next = a2;
const Ulist = new UnRolledList(a1, 9);
const get = (index) => { 
  let node = Ulist.head;
  let total = Ulist.totalLen;
  if (index > total) {
      return '';
  }
  while (node && node.len < index + 1) {
      index -= node.len;
      node = node.next;
  }
  return node.chars[index];
}

ret = get(15);
console.log(ret);
 
const insert = (ch, index) => {
    let node = Ulist.head;
    let total = Ulist.totalLen;
    if (node === undefined || total < 0 || index > total) {
        return;
    }
    while (node && node.len < index + 1) {
        index -= node.len;
        node = node.next;
    }
    if (node.len < 5) {
        for (let i = node.len; i > index; i--) {
            node.chars[i] = node.chars[i - 1];
        }
        node.chars[index] = ch;
    } else  {
        const newNode = new LinkNode();
        newNode.len = 5 - index;
        newNode.chars = node.chars.splice(index);
        node.chars.push(ch);
        node.len = index + 1;
        newNode.next = node.next;
        node.next = newNode;
    }
    Ulist.totalLen++;
 }
console.log('--------------------');
insert('8', 2);
console.log(Ulist.head);