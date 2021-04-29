import LinkedListNode from './LinkedListNode';
import Comparator from '../../../utils/comparator/Comparator';

export default class LinkedList {
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    /** @var LinkedListNode */
    this.head = null;

    /** @var LinkedListNode */
    this.tail = null;

    /**新实例化一个比较器对象存成compare属性 */
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  prepend(value) {
    // Make new node to be a head. 添加新的头节点
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this; // this 是 链表的实例化对象。
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append(value) { // 尾部添加新节点
    const newNode = new LinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;//将旧的尾节点和新尾节点连接起来
    this.tail = newNode;// 尾节点（指针）指向新节点

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete(value) {
    //第一步判断是否存在节点
    if (!this.head) {
      return null;
    }

    let deletedNode = null; // 表示没有要删除的节点

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    // 条件： 头指针存在且头节点的值和要删除的值相等
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head; // 当前的头节点

    // 以下循环，重新确定了 currentNode 的位置
    if (currentNode !== null) {
      while (currentNode.next) {
        // If next node must be deleted then make next node to be a next next one.
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }


    // 由于上面的循环，下面的判断才可用
    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode; // 返回最后一个被删除的节点
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   * 查找给定值对应的节点
   */
  find({ value = undefined, callback = undefined }) {

    // 首先判断，此列表是否存在节点
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value...
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next; //继续循环比较下一个节点
    }

    return null; //找不到, 返回null
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deletedTail = this.tail; // 首先 将尾节点保存下来，

    if (this.head === this.tail) {
      // There is only one node in linked list.
      //接下来删除它，再将保存它的变量返回
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head; // 声明一个现节点
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   * 将一个数组内的每个元素作为新节点插入链表结尾
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this; //返回链表对象
  }

  /**
   * @return {LinkedListNode[]}
   * 将链表所有节点的值转换成一个数组
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   * 返回将链表所有节点的值调用节点自身的toString方法经由callback处理后的值变成字符串组成的数组
   */
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   * 反转链表
   */
  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.next; //存下下一个节点

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode; //当前节点的下一个节点赋值为上一个节点

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode; //上一个节点赋值为当前节点
      currNode = nextNode; //当前节点赋值为下一个节点
    }

    // Reset head and tail.
    //反转顺序处理完后重置头尾指针 
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}