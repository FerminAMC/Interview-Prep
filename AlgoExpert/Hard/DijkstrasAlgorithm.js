/*
You're given an integer start and a list edges of pairs of integers.

The list is what's called an adjacency list, and it represents a graph. The
number of vertices in the graph is equal to the length of edges, where each
index i in edges contains vertex i's outbound edges, in no particular order.
Each individual edge is represented by a pair of two numbers,
[destination, distance], where the destination is a positive integer denoting
the destination vertex and the distance is a positive integer representing the
length of the edge (the distance from vertex i to vertex destination). Note that
these edges are directed, meaning that you can only travel from a particular
vertex to its destination--not the other way around (unless the destination
vertex itself has an outbound edge to the original vertex).

Write a function that computes the lengths of the shortest paths between start
and all of the other vertices in the graph using Dijkstra's algorithm and
returns them in an array. Each index i in the output array should represent the
length of the shortest path between start and vertex i. If no path is found from
start to vertex i, then output[i] should be -1.

Note that the graph represented by edges won't contain any self-loops (vertices
that have an outbound edge to themselves) and will only have positively weighted
edges (i.e., no negative distances).

Input: 
start = 0
edges = [
  [[1, 7]],
  [[2, 6], [3, 20], [4, 3]],
  [[3, 14]],
  [[4, 2]],
  [],
  []
]
result = [0, 7, 13, 27, 10, -1]
*/

// O(v^2 + e) Time | O(v) Space - where v is the number of vertices and e is the
// number of edges in the input graph.
const dijkstrasAlgorithm = (start, edges) => {
  const numberOfVertices = edges.length
  const minDistances = new Array(numberOfVertices).fill(Infinity)
  minDistances[start] = 0
  const visited = new Set()

  while (visited.size !== numberOfVertices) {
    const [vertex, currentMinDistance] = getVertexWithMinDistance(
      minDistances,
      visited,
    )
    if (currentMinDistance === Infinity) break

    visited.add(vertex)
    for (const edge of edges[vertex]) {
      const [destination, distanceToDestination] = edge
      if (visited.has(destination)) continue

      const newPathDistance = currentMinDistance + distanceToDestination
      const currentDestinationDistance = minDistances[destination]
      minDistances[destination] = Math.min(
        newPathDistance,
        currentDestinationDistance,
      )
    }
  }

  return minDistances.map((x) => (x === Infinity ? -1 : x))
}

const getVertexWithMinDistance = (distances, visited) => {
  let currentMinDistance = Infinity
  let vertex = -1

  for (const [vertexIdx, distance] of distances.entries()) {
    if (visited.has(vertexIdx)) continue
    if (distance <= currentMinDistance) {
      vertex = vertexIdx
      currentMinDistance = distance
    }
  }

  return [vertex, currentMinDistance]
}
