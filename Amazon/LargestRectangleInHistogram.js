/**
 * Given n non-negative integers representing the histogram's bar height where
 * the width of each bar is 1, find the area of largest rectangle in the
 * histogram.
 */

/**
 * When you look closely at this problem, it is very similar to the Maximal
 * Rectangle problem. The only difference is that we have the heights for this
 * problem in the histogram, so no further calculations are needed in that
 * regard. Now, following the same idea, from every point, we expand to the
 * left and right, getting the possible width for a particular point in the
 * histogram, and then multiplying that width with the height of that point.
 * We do this for every point in the histogram, and we eventually get the
 * biggest rectangle.
 * O(n^2) Time | O(1) Space - where n is the number of points in the histogram
 */
function largestRectangleArea(heights) {
  let maxRectangle = -Infinity
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] > 0) {
      let currentRectangle = 1
      currentRectangle += expandLeft(i, heights)
      currentRectangle += expandRight(i, heights)
      currentRectangle *= heights[i]
      maxRectangle = Math.max(maxRectangle, currentRectangle)
    }
  }
  return maxRectangle === -Infinity ? 0 : maxRectangle
}

function expandLeft(i, heights) {
  let expansionPoint = heights[i]
  let maxLeft = 0
  while (i > 0) {
    if (expansionPoint <= heights[i - 1]) {
      maxLeft++
      i--
    } else break
  }
  return maxLeft
}

function expandRight(i, heights) {
  let expansionPoint = heights[i]
  let maxRight = 0
  while (i < heights.length - 1) {
    if (expansionPoint <= heights[i + 1]) {
      maxRight++
      i++
    } else break
  }
  return maxRight
}
