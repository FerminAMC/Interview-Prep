/**
  Given a stream of integers and a window size, calculate the moving average of
  all integers in the sliding window.

  Example:
  MovingAverage m = new MovingAverage(3);
  m.next(1) = 1
  m.next(10) = (1 + 10) / 2
  m.next(3) = (1 + 10 + 3) / 3
  m.next(5) = (10 + 3 + 5) / 3
 */

class MovingAverage extends LinkedList<Integer>{
  private int size;
  private double sum;

  /** Initialize your data structure here. */
  public MovingAverage(int size) {
    super();
    this.size = size;
    this.sum = 0;
  }
  
  public double next(int val) {
    if(super.size() == this.size){
      this.sum -= super.removeFirst();
      this.sum += val;
      super.add(val);
    }else {
      super.add(val);
      this.sum += val;
    }
    return this.sum/super.size();
  }
}