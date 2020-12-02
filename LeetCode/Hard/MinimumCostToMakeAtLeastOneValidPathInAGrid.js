/*
Link: https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/
You are given a m x n grid. Each cell of the grid has a sign pointing to the
next cell you should visit if you are currently in this cell. The sign of
grid[i][j] can be:
  * 1 which means go to the cell to the right. (i.e go from grid[i][j] to
    grid[i][j + 1])
  * 2 which means go to the cell to the left. (i.e go from grid[i][j] to
    grid[i][j - 1])
  * 3 which means go to the lower cell. (i.e go from grid[i][j] to
    grid[i + 1][j])
  * 4 which means go to the upper cell. (i.e go from grid[i][j] to
    grid[i - 1][j])

Notice that there could be some invalid signs on the cells of the grid which
point outside of the grid.

You will initially start at the upper left cell (0, 0). A valid path in the grid
is a path which starts from the upper left cell (0, 0) and ends at the
bottom-right cell (m - 1, n - 1) following the signs on the grid. The valid path
doesn't have to be the shortest. 

You can modify the sign on a cell with cost = 1. You can modify the sign on a
cell one time only.

Return the minimum cost to make the grid have at least one valid path.
*/

/*
Adjacency matrix for version 1
[
  [[[0,1],0],[[1, 0], 1]],
  [[[0,0],0], [[1, 1], 1]],
  [[[0, 0], 0], [[1, 1], 1]],
  [[[1, 0], 1], [[0, 1], 1]]
]

Input: grid = [[1,2],[4,3]]
Output: 1
*/

// Both versions are very similar, with the difference being in how I store the
// destination value in the adjacency matrix. In version one I store it as a
// tuple of integers, row and col, and for version 2 I convert row and col to
// a string.

// Version 1
const minCost = (grid) => {
  const numberOfVertex = grid.length * grid[0].length
  const adjacencyMatrix = createAdjacencyMatrix(grid)
  const minDistances = []
  for (let i = 0; i < grid.length; i++) {
    minDistances.push(new Array(grid[i].length).fill(Infinity))
  }
  minDistances[0][0] = 0
  const visited = new Set()

  while (visited.size !== numberOfVertex) {
    const [vertex, currentMinCost] = getVertexWithMinDistance(
      minDistances,
      visited,
    )
    if (currentMinCost === Infinity) break
    visited.add(vertex)

    for (const edge of adjacencyMatrix.get(vertex)) {
      const [destination, costToDestination] = edge
      const vertexId = edge[0][0].toString() + edge[0][1].toString()
      if (visited.has(vertexId)) continue

      const newPathCost = currentMinCost + costToDestination
      const currentDestinationCost =
        minDistances[destination[0]][destination[1]]
      minDistances[destination[0]][destination[1]] = Math.min(
        newPathCost,
        currentDestinationCost,
      )
    }
  }

  return minDistances[grid.length - 1][grid[0].length - 1]
}

const createAdjacencyMatrix = (grid) => {
  const adjacencyMatrix = new Map()
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const neighbors = getNeighborsWithCost(i, j, grid)
      const vertexId = i.toString() + j.toString()
      adjacencyMatrix.set(vertexId, neighbors)
    }
  }
  return adjacencyMatrix
}

const getNeighborsWithCost = (row, col, grid) => {
  const neighbors = []
  // Right
  if (col < grid[row].length - 1) {
    let cost = 1
    if (grid[row][col] === 1) cost = 0
    neighbors.push([[row, col + 1], cost])
  }
  // Left
  if (col > 0) {
    let cost = 1
    if (grid[row][col] === 2) cost = 0
    neighbors.push([[row, col - 1], cost])
  }
  // Up
  if (row > 0) {
    let cost = 1
    if (grid[row][col] === 4) cost = 0
    neighbors.push([[row - 1, col], cost])
  }
  // Down
  if (row < grid.length - 1) {
    let cost = 1
    if (grid[row][col] === 3) cost = 0
    neighbors.push([[row + 1, col], cost])
  }

  return neighbors
}

const getVertexWithMinDistance = (distances, visited) => {
  let currentMinCost = Infinity
  let vertex = ''
  for (let i = 0; i < distances.length; i++) {
    for (let j = 0; j < distances[i].length; j++) {
      const cost = distances[i][j]
      vertexId = i.toString() + j.toString()
      if (visited.has(vertexId)) continue
      if (cost <= currentMinCost) {
        currentMinCost = cost
        vertex = vertexId
      }
    }
  }
  return [vertex, currentMinCost]
}

// Version 2
const minCost = (grid) => {
  const numberOfVertex = grid.length * grid[0].length
  const adjacencyMatrix = createAdjacencyMatrix(grid)
  const minDistances = {}
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      minDistances[i.toString() + j.toString()] = Infinity
    }
  }
  minDistances['00'] = 0
  const visited = new Set()

  while (visited.size !== numberOfVertex) {
    const [vertex, currentMinCost] = getVertexWithMinDistance(
      minDistances,
      visited,
    )
    if (currentMinCost === Infinity) break
    visited.add(vertex)

    for (const edge of adjacencyMatrix[vertex]) {
      const [destination, costToDestination] = edge
      if (visited.has(destination)) continue

      const newPathCost = currentMinCost + costToDestination
      const currentDestinationCost = minDistances[destination]
      minDistances[destination] = Math.min(newPathCost, currentDestinationCost)
    }
  }

  return minDistances[
    grid.length.toString() - 1 + (grid[0].length - 1).toString()
  ]
}

const createAdjacencyMatrix = (grid) => {
  const adjacencyMatrix = {}
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const neighbors = getNeighborsWithCost(i, j, grid)
      adjacencyMatrix[i.toString() + j.toString()] = neighbors
    }
  }
  return adjacencyMatrix
}

const getNeighborsWithCost = (row, col, grid) => {
  const neighbors = []
  // Right
  if (col < grid[row].length - 1) {
    let cost = 1
    if (grid[row][col] === 1) cost = 0
    neighbors.push([row.toString() + (col + 1).toString(), cost])
  }
  // Left
  if (col > 0) {
    let cost = 1
    if (grid[row][col] === 2) cost = 0
    neighbors.push([row.toString() + (col - 1).toString(), cost])
  }
  // Up
  if (row > 0) {
    let cost = 1
    if (grid[row][col] === 4) cost = 0
    neighbors.push([(row - 1).toString() + col.toString(), cost])
  }
  // Down
  if (row < grid.length - 1) {
    let cost = 1
    if (grid[row][col] === 3) cost = 0
    neighbors.push([(row + 1).toString() + col.toString(), cost])
  }

  return neighbors
}

const getVertexWithMinDistance = (distances, visited) => {
  let currentMinCost = Infinity
  let vertex = ''
  for (const vertexId in distances) {
    const cost = distances[vertexId]
    if (visited.has(vertexId)) continue
    if (cost <= currentMinCost) {
      currentMinCost = cost
      vertex = vertexId
    }
  }
  return [vertex, currentMinCost]
}
