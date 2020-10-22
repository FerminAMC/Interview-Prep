/*
Write a MinMaxStack class for a Min Max Stack. The class should support:
  - Pushing and popping values on and off the stack.
  - Peeking at the value at the top of the stack.
  - Getting both the minimum and the maximum values in the stack at any given
    point in time.

All class methods, when considered independently, should run in constant time
and constant space.
*/
class MinMaxStack {
  constructor(){
    this.minMaxStack = [];
    this.stack = [];
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  pop() {
    this.minMaxStack.pop();
    return this.stack.pop();
  }

  push(number) {
    this.stack.push(number);
    let newMin = number;
    let newMax = number;
    if(this.minMaxStack.length){
      newMin = Math.min(this.minMaxStack[this.minMaxStack.length - 1][0],
        number);
      newMax = Math.max(this.minMaxStack[this.minMaxStack.length - 1][1],
        number);
    }
    this.minMaxStack.push([newMin, newMax]);
  }

  getMin() {
    return this.minMaxStack[this.minMaxStack.length - 1][0];
  }

  getMax() {
    return this.minMaxStack[this.minMaxStack.length - 1][1];
  }
}