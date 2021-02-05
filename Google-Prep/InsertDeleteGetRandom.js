/*
Implement the RandomizedSet class:

    bool insert(int val) Inserts an item val into the set if not present.
        Returns true if the item was not present, false otherwise.
    bool remove(int val) Removes an item val from the set if present. Returns
        true if the item was present, false otherwise.
    int getRandom() Returns a random element from the current set of elements
        (it's guaranteed that at least one element exists when this method is
        called). Each element must have the same probability of being returned.

Follow up: Could you implement the functions of the class with each function
works in average O(1) time?
*/

/**
 * Initialize your data structure here.
 */
const RandomizedSet = function() {
    this.map = new Map();
    this.vals = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) {
        return false;
    } else {
        this.map.set(val, this.vals.length);
        this.vals.push(val);
        return true;
    }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.map.has(val)) {
        let index = this.map.get(val);
        this.map.delete(val);
        let lastVal = this.vals.pop();
        if (lastVal === val) return true;
        this.vals[index] = lastVal;
        this.map.set(lastVal, index);
        return true;
    }
    return false;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    let rand = Math.floor(Math.random() * this.vals.length);
    console.log(rand);
    return this.vals[rand];
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */