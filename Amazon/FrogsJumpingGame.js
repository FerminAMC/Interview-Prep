/*
Frog's jumping Game

A frog needs to find a path to cross the pond from the beginning to the end, 
using the minimum number of jumps possible.

The pond is represented by a not-empty, not-null array of integers with values 
from 0 to 10, for example: [1, 1, 3, 2, 2, 0, 5, 1, 6, 0]
The frog always starts at index 0 of the array, the end of the pond is the last 
index in the array.

Each value in the array determines the maximum length of the jump that the frog 
can leap forward, starting from that position.
For example a value of 3, means that the frog can choose to move forward either
 one, two or three positions.

Write a function that returns the minimal number of jumps that a frog needs to
use to cross the pond.

[1, 1, 3, 2, 2, 0, 5, 1, 6, 0]  
*/

/**
 * This was my approach during my practice interview for Amazon. I was told
 * that this solution works, however, a more optimal solution would be to treat
 * this as a graph and that would have gotten me the most points.
 * O(n^2) Time | O(n) Space - where n is equal to the number of elements in the
 * array.
 */
function frogJumping(array) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    let currentNumber = array[i]
    if (currentNumber === 1) {
      result.push(1)
      continue
    }
    while (currentNumber > 0) {
      let nextPosition = i + currentNumber
      if (nextPosition > array.length - 1) {
        currentNumber--
        continue
      }
      let nextJump = array[nextPosition]
      if (nextPosition === array.length - 1) {
        result.push(currentNumber)
        return result
      } else if (nextJump !== 0 && nextPosition < array.length) {
        result.push(currentNumber)
        i = nextPosition - 1
        break
      } else {
        currentNumber--
      }
    }
    if (currentNumber === 0) return false
  }
  return result
}

/**
 * This approach treats the input of stones as a graph. Since the numbers in
 * the array are not unique, they cannot be used as identifiers for the node
 * names. Instead, I use the position of the number in the array as the node
 * identifier. The child nodes connected to the parent are derived from the
 * number of steps you can take from array[i] to array[i + array[i]]. Once
 * the adjacency matrix has been defined, you can traverse it with BFS or DFS.
 * This is still not the optimal solution. It tells you wether or not you can
 * cross the pond, and it gives you the positions in the array you can go
 * through, but it won't always give the optimal path. For an optimal path, I
 * still need to implement Dijkstras algorithm somehow. Maybe I'll apply it to
 * this problem some other time.
 * O(v+e) Time | O(v+e) Space - where v is the number of vertices in the graph
 * and e is the number of edges.
 */
function frogJumping(array) {
  const graph = {}
  // Initializing the graph
  for (let i = 0; i < array.length; i++) {
    let currentNum = array[i]
    graph[i] = []
    while (currentNum > 0) {
      let nextPosition = i + currentNum
      if (nextPosition > array.length - 1) {
        currentNum--
        continue
      }
      graph[i].push(nextPosition)
      currentNum--
    }
  }
  let routes = []
  let foundTarget = dfs(0, graph, routes, array.length - 1)
  console.log(routes)
  return foundTarget
}

function dfs(node, graph, route, target) {
  if (node === target) return true
  if (graph[node].length === 0) return false
  for (let child of graph[node]) {
    let foundTarget = dfs(child, graph, route, target)
    if (foundTarget) {
      route.push(child)
      return true
    }
  }
  return false
}
