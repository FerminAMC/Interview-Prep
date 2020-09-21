/**
 * You're given an array of positive integers where each non-zero integer
 * represents the height of a pillar of width 1. Imagine water being poured
 * over all of the pillars; write a function that returns the surface area of
 * the water trapped between the pillars viewed from the front. Note that
 * spilled water should be ignored.
 */

/**
 * For this problem, I want to know what is the min height of the pillars that
 * surround a particular part of the array, so I want two arrays that represent
 * said pillars, storing the maximum height at a certain point.
 * Since I'm gonna be storing the max height and all numbers in the array are
 * positive, I can fill the array with zeros and Math.max won't have any issues.
 * O(n) Time | O(n) Space - where
 */
function waterArea(heights) {
  let waterStored = 0
  const leftPillars = new Array(heights.length).fill(0)
  leftPillars[0] = heights[0]
  const rightPillars = new Array(heights.length).fill(0)
  rightPillars[heights.length - 1] = heights[heights.length - 1]
  for (let i = 1, j = heights.length - 2; i < heights.length; i++, j--) {
    leftPillars[i] = Math.max(leftPillars[i - 1], heights[i])
    rightPillars[j] = Math.max(rightPillars[j + 1], heights[j])
  }

  for (let i = 0; i < heights.length; i++) {
    waterStored += Math.min(leftPillars[i], rightPillars[i]) - heights[i]
  }
  return waterStored
}

/**
 * I'm not very clear on why this solution works, but it follows a very similar
 * logic to the solution above. The only difference is the space complexity. By
 * not storing all the max heights of the pillars, the space complexity becomes
 * constant. Since I don't really understand this answer, I won't really use it
 * in an interview.
 * O(n) Time | O(1) Space
 */
function waterArea(heights) {
  let waterStored = 0
  let left = 0
  let right = heights.length - 1
  let leftPillar = heights[left]
  let rightPillar = heights[right]

  while (left < right) {
    if (heights[left] < heights[right]) {
      left++
      leftPillar = Math.max(heights[left], leftPillar)
      waterStored += leftPillar - heights[left]
    } else {
      right--
      rightPillar = Math.max(heights[right], rightPillar)
      waterStored += rightPillar - heights[right]
    }
  }
  return waterStored
}
