/**
 * Write a function that takes in an array of at least three integers and,
 * without sorting the input array, returns a sorted array of the three largest
 * integers in the input array.
 * The function should return duplicate integers if necessary; for example, it
 * should return [10, 10, 12] for an input array of [10, 5, 9, 10, 12]
 */

// O(n) time - O(1) space - where n is the ammount of numbers in the array
function findThreeLargestNumbers(array) {
  let largestNums = Array(3).fill(Number.MIN_SAFE_INTEGER)
  for (const num of array) {
    if (num > largestNums[2]) {
      largestNums[0] = largestNums[1]
      largestNums[1] = largestNums[2]
      largestNums[2] = num
    } else if (num > largestNums[1]) {
      largestNums[0] = largestNums[1]
      largestNums[1] = num
    } else if (num > largestNums[0]) {
      largestNums[0] = num
    }
  }
  return largestNums
}

// Scalable solution
// O(n) time - O(1) space - where n is the ammount of numbers in the array
function findThreeLargestNumbers(array) {
  const largestNums = Array(3).fill(null)
  for (const num of array) {
    if (largestNums[2] === null || num > largestNums[2]) {
      shiftNumbers(largestNums, num, 2)
    } else if (largestNums[1] === null || num > largestNums[1]) {
      shiftNumbers(largestNums, num, 1)
    } else if (largestNums[0] === null || num > largestNums[0]) {
      shiftNumbers(largestNums, num, 0)
    }
  }
  return largestNums
}

function shiftNumbers(array, num, index) {
  for (let i = 0; i <= index; i++) {
    if (i === index) {
      array[i] = num
    } else {
      array[i] = array[i + 1]
    }
  }
}
