/**
 * Given an array nums of n integers where n > 1, return an array output such
 * that output[i] is equal to the product of all elements of nums except nums[i]
 *
 * Example:
 * nums = [1, 2, 3, 4]
 * result = [24, 12, 8, 6]
 *
 * Constraint:
 * Solve this problem in O(n) Time and without division.
 */

/**
 * This solution uses two extra arrays, left and right. With the example input
 * they would look like this:
 * nums =   [ 1,  2, 3, 4]
 * left =   [ 1,  1, 2, 6]
 * right =  [24, 12, 4, 1]
 * result = [24, 12, 8, 6]
 *
 * With those two arrays, the result array can be filled like so:
 * result[i] = left[i] * right[i]
 *
 * O(n) Time | O(n) Space
 */
function productExceptSelf(nums) {
  const result = []
  const left = new Array(nums.length)
  left[0] = 1
  const right = new Array(nums.length)
  right[right.length - 1] = 1
  for (let i = 1, j = nums.length - 2; i < nums.length && j >= 0; i++, j--) {
    left[i] = nums[i - 1] * left[i - 1]
    right[j] = nums[j + 1] * right[j + 1]
  }

  for (let i = 0; i < nums.length; i++) {
    result.push(left[i] * right[i])
  }
  return result
}

/**
 * There is an extra note that asks us to solve this in constant space, without
 * taking into account the result array. This can be achived by treating the
 * result array as the left or right array in the previous solution. This way,
 * once we calculate the result array as the left or right one, we can start
 * calculating the other one on the spot.
 * O(n) Time | O(1) Space *If we don't take into consideration the result array
 */
function productExceptSelf(nums) {
  const result = new Array(nums.length)
  result[result.length - 1] = 1
  for (let j = nums.length - 2; j >= 0; j--) {
    result[j] = nums[j + 1] * result[j + 1]
  }
  let currentProduct = 1
  for (let i = 1; i < nums.length; i++) {
    currentProduct *= nums[i - 1]
    result[i] = result[i] * currentProduct
  }

  return result
}
