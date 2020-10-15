/**
 * Median is the middle value in an ordered integer list. If the size of the
 * list is even, there is no middle value. So the median is the mean of the two
 * middle values.
 *
 * For example,
 * [2, 3, 5] => the median is 3
 * [2, 3] => the median is (2 + 3) / 2 = 2.5
 *
 * Design a data structure that supports the following two operations:
 *    * void addNum(int num) - Add an integer number from the data stream to the
 *                             data structure.
 *    * double findMedian() - Return the median of all elements so far.
 */

/**
 * initialize your data structure here.
 */
var MedianFinder = function () {
  this.nums = []
}

/**
 * @param {number} num
 * @return {void}
 * O(log(n)) insertion thanks to the binary search implementation
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.nums.length === 0) this.nums.push(num)
  else {
    // Binary search implementation
    let left = 0
    let right = this.nums.length - 1
    let mid = 0
    while (left <= right) {
      mid = Math.floor((right + left) / 2)
      if (this.nums[mid] === num) {
        break
      } else if (this.nums[mid] > num) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    num > this.nums[mid] ? mid++ : mid
    this.nums.splice(mid, 0, num)
  }
}

/**
 * @return {number}
 * O(1) Time - O(1) Space
 */
MedianFinder.prototype.findMedian = function () {
  const middle = Math.floor(this.nums.length / 2)
  if (this.nums.length % 2 === 0) {
    const median = (this.nums[middle] + this.nums[middle - 1]) / 2
    return median
  } else {
    return this.nums[middle]
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
