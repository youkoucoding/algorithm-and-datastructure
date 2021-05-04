// 数组实现队列
public class ArrayQueue {
  // array items size:n
  private String[] items;
  private int n = 0;

  //head 表示队列头下标， tail表示尾下标
  private int head = 0;
  private int tail = 0;

  // 一个size为 capacity 的数组
  public ArrayQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

  // 入队
  public boolean enqueue(String item) {
    // // tail==n 表示队列已满
    // if(tail==n) return false;
    // items[tail] = item;
    // ++tail;
    // return true;
    // 改造入队操作，使队列在空间不足时，集中触发数据搬移（因为出队操作会在队列前端释放空间），降低时间复杂度
    // tail==n 表示队列末尾没有空间了
    if(tail == n) {
      // tailo == n && head ==0 ,队列全满
      if(head==0) return false;
      // 数据搬移
      for (int i = head; i < tail; ++i) {
        items[i-head] = items[i];
      }

      // 数据搬移完成后，更新head tail
      tail -= head;
      head = 0;    
    }

    items[tail] = item;
    ++tail;
    return true;
  }

  // 出队
  public String dequeue(){
    // head == tail 表示空队列
    if(head == tail) return null;
    String ret = items[head];
    ++head;
    return ret;
  }
}

// 链表实现队列

// 循环队列
public class CircularQueue {
  // 数组 items 大小： n
  private String[] items;
  private int n = 0;
  //head 表示队头下标 tail 尾部下标
  private int head = 0;
  private int tail = 0;

  // 申请一个大小为 capacity 的数组
  public CircularQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

  public boolean enqueue(String item) {
    // 队满了
    if((tail + 1) % n == head) return false;
    items[tail] = item;
    tail = (tail + 1) % n;
    return true;
  }

  // 出队列
  public String dequeue() {
    if(head == tail) return null;
    String ret = items[head];
    head = (head + 1) % n;
    return ret;
  }

}