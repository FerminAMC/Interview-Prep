/**
 * Write a function that takes in an n x m two-dimensional array (that can be
 * square-shaped when n == m) and returns a one-dimensional array of all the
 * array's elements in spiral order.
 *
 * Spiral order starts at the top left corner of the two-dimensional array, goes
 * to the right, and proceeds in a spiral pattern all the until every element
 * has been visited.
 *
 * array = [
 *           startCol     endCol
 *              |           |
 *              V           V
 *  startRow ->[1,   2,  3, 4],
 *            [12, 13, 14, 5],
 *            [11, 16, 15, 6],
 *   endRow ->[10, 9,   8, 7]
 * ]
 * result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16]
 */

/**
 * This solution has to be viewed as traversing a perimeter of an array or a
 * matrix. I set bonding points at each limit of the perimeter; the startCol,
 * endCol, startRow, and endRow. Once I pass through all sides of the perimeter,
 * I need to reduce the bounds of the perimeter in order to create the spiral
 * traversal.
 * The same logic can be adapted in a recursive solution.
 * O(n) time - O(n) space
 */
function spiralTraverse(array) {
  const result = []
  let startCol = 0
  let endCol = array[0].length - 1
  let startRow = 0
  let endRow = array.length - 1

  while (startCol <= endCol && startRow <= endRow) {
    // Going right
    for (let col = startCol; col <= endCol; col++) {
      result.push(array[startRow][col])
    }
    // Going down
    for (let row = startRow + 1; row <= endRow; row++) {
      result.push(array[row][endCol])
    }
    // Going left
    for (let col = endCol - 1; col >= startCol; col--) {
      // Handle the edge case when there's a single row
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this row, which
      // we've already counted in the first for loop above.
      if (startRow === endRow) break
      result.push(array[endRow][col])
    }
    // Going up
    for (let row = endRow - 1; row > startRow; row--) {
      // Handle the edge case when there's a single column
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this column, which
      // we've already counted in the second for loop above.
      if (startCol === endCol) break
      result.push(array[row][startCol])
    }
    startCol++
    endCol--
    startRow++
    endRow--
  }

  return result
}
