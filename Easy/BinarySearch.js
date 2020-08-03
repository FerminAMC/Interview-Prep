/**
 * Write a function that takes in a sorted array of integers as well as a target
 * integer. The function should use the Binary Search algorithm to determine if
 * the target integer is contained in the array and should return its index if
 * it is, otherwise -1.
 *
 * array = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73]
 * target = 33
 * answer = 3
 */

// O(log(n)) time - O(1) space
function binarySearch(array, target) {
  let left = 0
  let right = array.length
  let mid = Math.floor((left + right) / 2)

  while (left <= right) {
    if (array[mid] == target) return mid
    if (array[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
    mid = Math.floor((left + right) / 2)
  }

  return -1
}
