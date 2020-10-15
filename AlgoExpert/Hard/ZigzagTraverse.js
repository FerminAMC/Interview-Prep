/**
 * Write a function that takes in an n x m two-dimensional array (that can be
 * square-shaped when n === m) and returns a one-dimensional array of all the
 * array's elements in zigzag order.
 *
 * Zigzag order starts at the top left corner of the two-dimensional array,
 * goes down by one element, and proceeds inn a zigzag pattern all the way to
 * the bottom right corner.
 */

function zigzagTraverse(array) {
  if (array.length === 1) return array[0]
  let goingDown = true
  let row = 0
  let col = 0
  const height = array.length - 1
  const width = array[0].length - 1
  const result = []
  while (!isOutOfBounds(row, col, height, width)) {
    if (goingDown) {
      const indexes = movingDown(row, col, array, result)
      row = indexes[0]
      col = indexes[1]
      goingDown = false
    } else {
      const indexes = movingUp(row, col, array, result)
      row = indexes[0]
      col = indexes[1]
      goingDown = true
    }
  }
  return result
}

function movingDown(row, col, array, result) {
  const height = array.length - 1
  const width = array[0].length - 1
  while (true) {
    result.push(array[row][col])
    if (row === height || col === 0) {
      if (row === height) {
        col++
        break
      } else {
        row++
        break
      }
    } else {
      row++
      col--
    }
  }
  return [row, col]
}

function movingUp(row, col, array, result) {
  const height = array.length - 1
  const width = array[0].length - 1
  while (true) {
    result.push(array[row][col])
    if (row === 0 || col === width) {
      if (col === width) {
        row++
        break
      } else {
        col++
        break
      }
    } else {
      row--
      col++
    }
  }
  return [row, col]
}

function isOutOfBounds(row, col, height, width) {
  return row < 0 || col < 0 || row > height || col > width
}
