/**
 * Write a function that takes in a non-empty array of distinct integers and an
 * integer representing a target sum. The function should find all triplets in
 * the array that sum up to the target sum and return a two-dimensional array
 * of all these triplets. The numbers in each triplet should be ordered in
 * ascending order, and the triplets themselves should be ordered in
 * ascending order with respect to te numbers they hold.
 *
 * If no three numbers sum up to the target sum, the function should return an
 * empty array.
 *
 * array = [12, 3, 1, 2, -6, 5, -8, 6]
 * targetSum = 0
 * result = [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
 */

// Formula to find each triplet: currentSum = currentNum + Left + Right
// O(n^2) time - O(n) space
function threeNumberSum(array, targetSum) {
  const result = []
  array.sort((a, b) => a - b)
  for (let i = 0; i < array.length - 2; i++) {
    const tempTargetSum = targetSum - array[i]
    twoNumberSum(array, tempTargetSum, array[i], i + 1, result)
  }
  return result
}

function twoNumberSum(array, targetSum, currentNum, idx, result) {
  let left = idx
  let right = array.length - 1
  while (left < right) {
    if (array[left] + array[right] === targetSum) {
      result.push([currentNum, array[left], array[right]])
      left++
      right--
    } else if (array[left] + array[right] > targetSum) {
      right--
    } else if (array[left] + array[right] < targetSum) {
      left++
    }
  }
}
