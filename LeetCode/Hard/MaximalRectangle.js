/**
 * Link: https://leetcode.com/problems/maximal-rectangle/
 * Given a matrix filled with 1s and 0s, find the largest rectangle containing
 * only 1s and return its area.
 */
/**
 * One thing comes to mind. I am thinking of another matrix of the same size,
 * filled only with zeros, whenever I find a one in the matrix, I add it to the
 * extra matrix.
 * That initial idea was right. I had to calculate all heights in the matrix.
 * Once I had those heights, It was a matter of moving through the entire
 * matrix. If I found a '1', I started expanding to the right and to the left.
 * I used the heights calculated when the extra matrix was created to check if
 * the heights to the left and to the right were greater or equal to the
 * expansion point. If they were, it meant that there were bars to the right or
 * left at least as big as the current one in the expansion point. Following
 * that idea, trying to expand from every point in the matrix, eventually you
 * can find the maximal rectangle.
 *
 * A possible way to optimize this solution is by modifying the given matrix
 * itself. That way we wouldn't need any extra space, achieving a constant space
 *
 * O(N*C) Time | O(N) Space - where N is the number of 1s and 0s in the matrix
 * and C is the number of 1s and 0s in a given row.
 */
function maximalRectangle(matrix) {
  let maxRectangle = -Infinity
  const heightMatrix = initializeMatrix(matrix)
  for (let i = matrix.length - 1; i >= 0; i--) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '1') {
        let currentRectangle = 1
        currentRectangle += expandLeft(i, j, heightMatrix)
        currentRectangle += expandRight(i, j, heightMatrix)
        currentRectangle *= heightMatrix[i][j]
        maxRectangle = Math.max(maxRectangle, currentRectangle)
      }
    }
  }
  return maxRectangle === -Infinity ? 0 : maxRectangle
}

function initializeMatrix(matrix) {
  const heightMatrix = []
  for (let i = 0; i < matrix.length; i++) {
    const row = []
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(0)
    }
    heightMatrix.push(row)
  }

  // calculating heights
  for (let i = 0; i < heightMatrix.length; i++) {
    for (let j = 0; j < heightMatrix[i].length; j++) {
      if (matrix[i][j] === '1') {
        if (i === 0) {
          heightMatrix[i][j] = 1
        } else {
          heightMatrix[i][j] = heightMatrix[i - 1][j] + 1
        }
      }
    }
  }
  return heightMatrix
}

function expandLeft(row, col, matrix) {
  let maxLeft = 0
  const initialNum = matrix[row][col]
  while (col > 0) {
    if (initialNum <= matrix[row][col - 1]) {
      maxLeft++
      col--
    } else {
      break
    }
  }
  return maxLeft
}

function expandRight(row, col, matrix) {
  let maxRight = 0
  const initialNum = matrix[row][col]
  while (col < matrix[row].length - 1) {
    if (initialNum <= matrix[row][col + 1]) {
      maxRight++
      col++
    } else {
      break
    }
  }
  return maxRight
}
