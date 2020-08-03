/**
 * Write a function that takes in an array of integers and returns a sorted
 * version of that array. Use the bubble sort algorith to sort the array.
 */

// O(n^2) time - O(1) space
function bubbleSort(array) {
  let arraySize = array.length - 1
  let swap = false
  let i = 0
  while (i <= arraySize) {
    if (array[i] > array[i + 1]) {
      swap = true
      const temp = array[i]
      array[i] = array[i + 1]
      array[i + 1] = temp
    }
    i++
    if (i == arraySize && swap) {
      i = 0
      arraySize--
      swap = false
    }
  }
  return array
}
