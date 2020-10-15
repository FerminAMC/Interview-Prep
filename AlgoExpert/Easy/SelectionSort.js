/**
 * Write a function that takes in an array of integers and return a sorted
 * version of that array. Use th Selection Sort algorithm to sort the array.
 */

// O(n^2) time - O(1) space
function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[min] > array[j]) {
        min = j
      }
    }
    if (min != i) {
      const temp = array[i]
      array[i] = array[min]
      array[min] = temp
    }
  }
  return array
}
