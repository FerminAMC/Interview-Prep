/**
 * Write a function that takes in an array of integers and returns a sorted
 * version of that array. Use the Insetion Sort algorithm to sort the array.
 */

// O(n^2) time - O(1) space
function insertionSort(array) {
  let sortedIdx = 0
  let currentIdx = 1
  while (sortedIdx < array.length) {
    if (array[sortedIdx] > array[currentIdx]) {
      for (let i = sortedIdx; i >= 0; i--) {
        let swap = false
        if (array[i] > array[i + 1]) {
          swap = true
          const temp = array[i]
          array[i] = array[i + 1]
          array[i + 1] = temp
        }
        if (!swap) {
          i = -1
        }
      }
    }
    sortedIdx++
    currentIdx++
  }
  return array
}

// Prettier version, same time and space complexity
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i
    while (j > 0 && array[j - 1] > array[j]) {
      const temp = array[j - 1]
      array[j - 1] = array[j]
      array[j] = temp
      j--
    }
  }
  return array
}
