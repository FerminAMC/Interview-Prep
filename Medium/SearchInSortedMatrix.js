/**
 * You're given a two-dimensional array (a matrix) of distinct integers and a
 * target integer. Each row in the matrix is sorted, and each column is also
 * sorted; the matrix doesn't necessarily have the same height and width.
 *
 * Write a function that returns an array of the row and column indices of the
 * target integer if it's contained in the matrix, otherwise [-1, -1].
 */

/**
 * This is the optimal solution. We start at the top left corner of the matrix
 * because at that spot is where the biggest numbers are. If our target is
 * greater than the value at [0, matrix[0].length - 1], we move the row one step
 * down, discarding the rest of the values in that entire row. Similarly, if
 * the value in the matrix is greater than the target, we move the column to the
 * left, discarding that whole column of values. This makes use of the fact that
 * the entire matrix is sorted.
 * Before starting to code a solution, talk with the interviewer about the idea
 * and check if he agrees with it. If he doesn't, maybe think of another
 * approach, instead of wasting precious time on a solution that is not the
 * desired one, like I did on the two examples below the optimal one.
 * Remember to be customer obsessed...
 *
 * O(n + m) Time | O(1) Space - where n is the width of the matrix and m is the
 * height of the matrix. The worst case is when the target is located in the
 * bottom-left corner of the matrix, making us move n+m spaces, hence the
 * n+m time complexity.
 */
function searchInSortedMatrix(matrix, target) {
  let row = 0
  let col = matrix[0].length - 1
  while (col >= 0 && row < matrix.length) {
    if (matrix[row][col] === target) {
      return [row, col]
    } else if (matrix[row][col] > target) {
      col--
    } else {
      row++
    }
  }
  return [-1, -1]
}

/**
 * The first thing that comes to mind is to loop through all rows in the
 * matrix. Check the following before looping through that row:
 * matrix[i][0] <= target <= matrix[i][matrix[i].length]
 * If that condition is not met, we can move to the next row. If the condition
 * is met, we can do Binary Search to find the desired value in log(n) time.
 * O(rlog(c)) Time | O(1) Space - where r is the number of rows and c is the
 * number of columns in the matrix.
 */
function searchInSortedMatrix(matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] <= target && target <= matrix[i][matrix[i].length - 1]) {
      const searchResult = binarySearch(matrix[i], target, i)
      if (searchResult[0]) {
        return searchResult.slice(1)
      }
    }
  }
  return [-1, -1]
}

function binarySearch(array, target, row) {
  let left = 0
  let right = array.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (array[mid] === target) {
      return [true, row, mid]
    } else if (array[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return [false]
}

/**
 * I just realized I need to pay closer attention to instructions. Since the
 * matrix is sorted by rows as well as columns, that means that something like
 * binary search, but in the whole matrix might be possible without the need
 * of exploring every row with the Binary Search approach.
 * I'll write the code for 1 pass of the matrix in a binary search fashion and
 * then figure out how to create the while loop.
 * This approach doesn't work. I'm leaving it here just as a reminder of that.
 */

function searchInSortedMatrix(matrix, target) {
  let topRow = 0
  let bottomRow = matrix.length - 1
  let leftCol = 0
  let rightCol = matrix[Math.floor((topRow + bottomRow) / 2)].length - 1
  while (topRow <= bottomRow && leftCol <= rightCol) {
    const midRow = Math.floor((topRow + bottomRow) / 2)
    const midCol = Math.floor((leftCol + rightCol) / 2)
    if (matrix[midRow][midCol] === target) {
      return [midRow, midCol]
    } else if (matrix[midRow][midCol] < target) {
      topRow = midRow + 1
      leftCol = midCol + 1
    } else {
      topRow = midRow - 1
      leftCol = midCol - 1
    }
  }
  return [-1, -1]
}
