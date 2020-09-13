/**
 * Given n non-negative integers representing an elevation map where the width
 * of each bar is 1, compute how much water it is able to trap after raining.
 *
 * Note: Check leetcode for an image of the elevation map.
 * Input: [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 */

/**
 * In order to calculate how much water can be stored between the columns, first
 * we need the maximum size of the left and right walls at every column. Then
 * we can get the water stored in that column by getting the min height of those
 * two walls and substracting the height in the current position.
 *
 * In order to get the max left height for every position we need to traverse
 * the array once from left to right, comparing every height and leaving the max
 * value at any given point in time. Similarly, we can get the max right height
 * by going from right to left. Once we have both max heights for every position
 * we can calculate the amount of water stored in each column.
 *
 * O(n) Time | O(n) Space - since we are storing leftMax and rightMax, we need
 * to allocate 2n space, but that allows us to have a time complexity of O(n)
 */
const trap = function (height) {
  let rainCatched = 0
  const leftMax = Array(height.length)
  const rightMax = Array(height.length)

  leftMax[0] = height[0]
  rightMax[height.length - 1] = height[height.length - 1]
  let i = 1
  let j = height.length - 2
  while (i < height.length && j >= 0) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
    rightMax[j] = Math.max(rightMax[j + 1], height[j])
    i++
    j--
  }

  for (let i = 1; i < height.length - 2; i++) {
    rainCatched += Math.min(leftMax[i], rightMax[i]) - height[i]
  }

  return rainCatched
}
