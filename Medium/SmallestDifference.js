/**
 * Write a function that takes in two non-empty arrays of integers, finds the
 * pair of numbers (one from each array) whose absolute difference is closest
 * to zero, and returns an array containing these two numbers, with the number
 * from the first array in the first position.
 *
 * You can assume that there will oly be one pair of numbers with the smallest
 * difference.
 *
 * arrayOne = [-1, 5, 10, 20, 28, 3]
 * arrayTwo = [26, 134, 135, 15, 17]
 * result = [28, 26]
 */

// Brute force solution
// O(n^2) time - O(1) space
function smallestDifference(arrayOne, arrayTwo) {
  let min = Number.MAX_SAFE_INTEGER
  const result = []
  for (let i = 0; i < arrayOne.length; i++) {
    for (let j = 0; j < arrayTwo.length; j++) {
      const currentDif = Math.abs(arrayOne[i] - arrayTwo[j])
      if (currentDif < min) {
        min = currentDif
        result[0] = arrayOne[i]
        result[1] = arrayTwo[j]
      }
      if (min === 0) return result
    }
  }
  return result
}

// Optimal solution
// Sorted arrayOne = [-1, 3, 5, 10, 20, 28]
// Sorted arrayTwo = [15, 17, 26, 134, 135]
// O(nlog(n) + mlog(m)) time - O(1) space - where n is the number of elements in
// arrayOne and m the number of elements in arrayTwo
function smallestDifference(arrayOne, arrayTwo) {
  arrayOne.sort((a, b) => a - b)
  arrayTwo.sort((a, b) => a - b)
  let currentOne = arrayOne[arrayOne.length - 1]
  let currentTwo = arrayTwo[arrayTwo.length - 1]
  let min = Math.abs(currentOne - currentTwo)
  let idxOne = arrayOne.length - 1
  let idxTwo = arrayTwo.length - 1
  const result = [currentOne, currentTwo]
  while (idxOne >= 0 && idxTwo >= 0 && min != 0) {
    if (currentOne > currentTwo) {
      idxOne--
      currentOne = arrayOne[idxOne]
    } else if (currentTwo > currentOne) {
      idxTwo--
      currentTwo = arrayTwo[idxTwo]
    }
    if (Math.abs(currentOne - currentTwo) < min) {
      min = Math.abs(currentOne - currentTwo)
      result[0] = currentOne
      result[1] = currentTwo
    }
  }
  return result
}
