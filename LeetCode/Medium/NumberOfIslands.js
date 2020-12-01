/**
 * Link: https://leetcode.com/problems/number-of-islands/
 * Given a 2d grid map of 1s (land) and 0s (water), count the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands
 * horizontally or vertically. You may assume all four edges of the grid are all
 * surrounded by water.
 *
 */

// Test Input:
// [["1","1","0","0","0"],
// ["1","1","0","0","0"],
// ["0","0","1","0","0"],
// ["0","0","0","1","1"]]
// Output: 3

// This problem is very similar to the River Sizes one in the Medium folder.
// The only difference here is that you have to return the number of islands
// instead of the sizes of each river. To solve this you have to traverse the
// whole island when you find land (a "1") and keep track of the places you have
// already visited, so no computations are made for that particular node.

// O(n) Time | O(n) Space - where n is the number of elements in the grid
var numIslands = function (grid) {
  let numberOfIslands = 0
  const visited = grid.map((row) => row.map((value) => false))
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (visited[i][j]) continue
      numberOfIslands += traverseIsland(grid, visited, i, j)
    }
  }
  return numberOfIslands
}

// Depth First Search approach to an nxm matrix
var traverseIsland = function (grid, visited, i, j) {
  const nodesToVisit = [[i, j]]
  let foundIsland = false
  while (nodesToVisit.length) {
    currentNode = nodesToVisit.pop()
    i = currentNode[0]
    j = currentNode[1]
    if (visited[i][j]) continue
    visited[i][j] = true
    if (grid[i][j] === '0') continue
    foundIsland = true
    getNeighborNodes(visited, i, j, nodesToVisit)
  }
  return foundIsland ? 1 : 0
}

var getNeighborNodes = function (visited, i, j, nodesToVisit) {
  // Top Node
  if (i > 0 && !visited[i - 1][j]) nodesToVisit.push([i - 1, j])

  // Bottom Node
  if (i < visited.length - 1 && !visited[i + 1][j])
    nodesToVisit.push([i + 1, j])

  // Left Node
  if (j > 0 && !visited[i][j - 1]) nodesToVisit.push([i, j - 1])

  // Right Node
  if (j < visited[i].length - 1 && !visited[i][j + 1])
    nodesToVisit.push([i, j + 1])
}
