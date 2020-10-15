/**
 * Write a ContinuousMedianHandler class that supports:
 *    - The continuous insertion of numbers with the insert method.
 *    - The instant (O(1) Time) retrieval of the median of the numbers
 *      that have been inserted thus far with the getMedian method.
 *
 * The getMedian method has already been written for you. You simply have to
 * write the insert method.
 *
 * The median of a set of numbers is the "middle" number when the numbers are
 * ordered from smallest to greatest. If there's an odd number of numbers in
 * the set, as in {1, 3, 7}, the median is the number in the middle (3 in this
 * case); if there's an even number of numbers in the set, as in {1, 3, 7, 8},
 * the median is the average of the two middle numbers ((3 + 7) / 2 === 5 in
 * this case).
 */

/**
 * The suggested solution to this problem uses the concept of heaps, however, I
 * found it way easier to implement binary search in the insert method to find
 * the position in which I had to insert an element in the array.
 * Assuming that the splice method can insert elements in constant time, the
 * Time and Space complexities are:
 * O(log(n)) Time | O(n) Space - where n is the number of elements stored in
 * the numbers array.
 */
class ContinuousMedianHandler {
  constructor() {
    this.numbers = []
    this.median = null
  }

  insert(number) {
    let mid = 0
    if (this.numbers.length === 0) this.numbers.push(number)
    else {
      let left = 0
      let right = this.numbers.length - 1
      while (left <= right) {
        mid = Math.floor((left + right) / 2)
        if (this.numbers[mid] > number) {
          right = mid - 1
        } else if (this.numbers[mid] < number) {
          left = mid + 1
        } else break
      }
      if (this.numbers[mid] < number) mid++
      this.numbers.splice(mid, 0, number)
    }
    mid = Math.floor(this.numbers.length / 2)
    if (this.numbers.length % 2 === 0) {
      this.median = (this.numbers[mid] + this.numbers[mid - 1]) / 2
    } else {
      this.median = this.numbers[mid]
    }
  }

  getMedian() {
    return this.median
  }
}
