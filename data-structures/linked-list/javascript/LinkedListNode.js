export default class LinkedListNode {
  constructor(value, next = null) { // 一个单链表的节点，包含两个部分
    this.value = value;
    this.next = next;
  }

  //
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}