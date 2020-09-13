/**
 * You're given a two-dimensional array (a matrix) of potentially unequal height
 * and width containing only 0s and 1s. Each 0 represents land, and each 1
 * represents part of a river. A river consists of any number of 1s that are
 * either horizontally or vertically adjacent (but not diagonally adjacent). The
 * number of adjacent 1s forming a river determine its size.
 *
 * Note that the river can twist. In other words, it doesn't have to be a
 * straight vertical or horizontal line; it can be L-shaped, for example.
 *
 * Write a function that returns an array of the sizes of all rivers represented
 * in the input matrix. The sizes don't need to be in any particular order.
 *
 *   matrix = [
 *     [1, 0, 0, 1, 0],
 *     [1, 0, 1, 0, 0],
 *     [0, 0, 1, 0, 1],
 *     [1, 0, 1, 0, 1],
 *     [1, 0, 1, 1, 0]
 *   ]
 *
 *  result = [2, 1, 5, 2, 2] // The numbers could be ordered differently.
 *
 *  matrix = [
 *    [1, ,  , 1,  ],
 *    [1, , 1,  ,  ],
 *    [ , , 1,  , 1],
 *    [1, , 1,  , 1],
 *    [1, , 1, 1,  ]
 * ]
 */

// O(n) Time | O(n) Space - where n is the number of elements in the matrix
function riverSizes(matrix) {
  const sizes = []
  const visited = matrix.map((row) => row.map((value) => false))
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (visited[i][j]) continue
      followTheRiver(matrix, visited, sizes, i, j)
    }
  }
  return sizes
}

function followTheRiver(matrix, visited, sizes, i, j) {
  let currentRiverSize = 0
  const nodesToExplore = [[i, j]]
  while (nodesToExplore.length) {
    const currentNode = nodesToExplore.pop()
    i = currentNode[0]
    j = currentNode[1]
    if (visited[i][j]) continue
    visited[i][j] = true
    if (matrix[i][j] === 0) continue
    currentRiverSize++
    getUnvisitedNeighbors(visited, nodesToExplore, i, j)
  }
  if (currentRiverSize > 0) sizes.push(currentRiverSize)
}

function getUnvisitedNeighbors(visited, nodesToExplore, i, j) {
  if (i > 0 && !visited[i - 1][j]) nodesToExplore.push([i - 1, j])
  if (i < visited.length - 1 && !visited[i + 1][j])
    nodesToExplore.push([i + 1, j])
  if (j > 0 && !visited[i][j - 1]) nodesToExplore.push([i, j - 1])
  if (j < visited[0].length - 1 && !visited[i][j + 1])
    nodesToExplore.push([i, j + 1])
}
