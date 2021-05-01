### LinkedListNode

#### About 回调函数

```javascript

toString(callback){
  return callback ? callback(this.value) : `${this.value}`
}

```

### LinkedList class

#### 此链表类完成了以下方法

> 首先判断节点是否存在

1. prepend
2. append
3. delete
4. find
5. deleteTail
6. deleteHead
7. fromArray
8. toArray
9. toString
10. reverse
