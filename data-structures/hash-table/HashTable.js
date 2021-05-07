import LinkedList from '../linked-list/js/LinkedList';

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions are being handled.
// 哈希表的size直接影响冲突的次数。
// 哈希表size越大，冲突越少。
// 因为示范的目的这里size设置的很小以便展示如何处理冲突
const defaultHashTableSize = 32;

export default class HashTable {

  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    // 初始化确定固定大小的哈希表，并且每一 bucket 填充一个空 链表
    // ⬇️ 先用null填充一个hashTableSize大小的数组，再将每一个数组元素map为一个空链表，然后赋值
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   * 哈希函数
   */
  hash(key) {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    // charCodeAt(i)是第i个字符的编码，n是key的长度，PRIME是自定义的任意数字 31
    // 将 键字符串 的每一个字符的编码累加求总和后的数作为哈希值
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size. 取余，减小hash值
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   * 
   * 存入新的键 值 对
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash; //在keys对象里存入key: keyHash
    const bucketLinkedList = this.buckets[keyHash]; //keyHash对应的buckets链表

    // 调用链表的find方法查找看链表里有没有相同的key的节点
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    // 如果没有，在链表的结尾插入新节点，节点的值是键值对的对象{key: key, value: value}
    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   * 删除key对应的节点
   */
  delete(key) {
    const keyHash = this.hash(key);  //根据key计算出key哈希值
    delete this.keys[key]; //从keys对象里删除key: keyHash   delete 操作符--用于删除对象的某个属性
    const bucketLinkedList = this.buckets[keyHash]; //keyHash对应的buckets链表
    //调用链表的find方法查找链表里相同的key的节点
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    //如果找到了，就将这个节点从链表里删除，并返回被删的节点
    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   * 获取key对应的value
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)]; //keyHash对应的buckets链表
    //调用链表的find方法查找链表里相同的key的节点
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * @param {string} key
   * @return {boolean}
   * 查看哈希表里有没有对应的key
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
  * @return {string[]}
  * 获取所有key组成的数组
  */
  getKeys() {
    return Object.keys(this.keys);  // object.keys()  返回对象key 的一个数组
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return {*[]}
   */
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }

}