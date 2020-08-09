/**
 * Write a function that takes in an array of integers and returns a boolean
 * representing whether the array is monotonic.
 *
 * An array is said to be monotonic if its elements, from left to right, are
 * entirely non-increasing or entirely non-decreasing.
 *
 * array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
 * isMonotonic = true
 */

// O(n) time - O(1) space
function isMonotonic(array) {
  let increases = false
  let decreases = false
  let i = 0
  while (i < array.length) {
    if (increases) {
      if (array[i] > array[i + 1]) return false
    } else if (decreases) {
      if (array[i] < array[i + 1]) return false
    }
    if (array[i] < array[i + 1]) {
      increases = true
    } else if (array[i] > array[i + 1]) {
      decreases = true
    }
    i++
  }
  return true
}

// More elegant solution, but exactly the same concept
// O(n) time - O(1) space
function isMonotonic(array) {
  let isIncreasing = true
  let isDecreasing = true
  for (let i = 0; i < array.length; i++) {
    if (array[i] < array[i + 1]) isDecreasing = false
    if (array[i] > array[i + 1]) isIncreasing = false
  }
  return isIncreasing || isDecreasing
}
