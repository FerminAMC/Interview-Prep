/*
Design a stack that supports push, pop, top, and retrieving the minimum element
in constant time.

    push(x) -- Push element x onto stack.
    pop() -- Removes the element on top of the stack.
    top() -- Get the top element.
    getMin() -- Retrieve the minimum element in the stack.
*/

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
};

/** 
 * In this function is where all magic happens. We need to store every element
 * in pairs, with x, the value we want to push into the stack, and the min value
 * up until that point. Since the values below won't change, it doesn't matter
 * if we get an even smaller value after, by the time we reach this value again,
 * that smaller value will be long gone. We have to pop elements before we can
 * reach the bottom elements. That's how we can achieve constant time
 * operations. At first I was thinking of using two separate structures, one was
 * going to have every element inserted in order, but that will take log(n) time
 * no matter what. 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if (this.stack.length === 0) {
        this.stack.push([x, x]);
    } else {
        let min = Math.min(x, this.getMin());
        this.stack.push([x, min]);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1][0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.stack[this.stack.length - 1][1];
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */