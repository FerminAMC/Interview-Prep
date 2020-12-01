/**
 * Link: https://leetcode.com/problems/critical-connections-in-a-network/
 * There are n servers numbered from 0 to n-1 connected by undirected
 * server-to-server connections forming a network where connections[i] = [a, b]
 * represent a connection between servers a and b. Any server can reach any
 * other directly or indirectly through the network.
 *
 * A critical connection is a connection that, if removed, will make some server
 * unable to reach some other server.
 * Return all critical connections in the network in any order.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    n-1 <= connections.length <= 10^5
 *    connections[i][0] != connections[i][1]
 *    There are no repeated connections.
 */

// O(V+E) Time | O(V+E) Space - where V is the number of vertices and E is the
// number of edges in the graph
// In order to understand this solution please watch this video:
// https://youtu.be/RYaakWv5m6o
const criticalConnections = function (n, connections) {
  const criticalEdges = []
  const adjacencyList = {}
  for (let i = 0; i < n; i++) {
    adjacencyList[i] = []
  }
  for (let [node1, node2] of connections) {
    adjacencyList[node1].push(node2)
    adjacencyList[node2].push(node1)
  }
  const low = Array(n).fill(0)
  const visited = Array(n).fill(0)
  let id = 0

  const dfsTarjan = function (currentNode, previousNode) {
    id++
    visited[currentNode] = id
    low[currentNode] = id
    for (let neighbor of adjacencyList[currentNode]) {
      if (neighbor === previousNode) continue
      if (!visited[neighbor]) dfsTarjan(neighbor, currentNode)

      low[currentNode] = Math.min(low[currentNode], low[neighbor])

      if (visited[currentNode] < low[neighbor]) {
        criticalEdges.push([currentNode, neighbor])
      }
    }
  }

  dfsTarjan(0, null)
  return criticalEdges
}
