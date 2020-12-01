/*
Link: https://leetcode.com/problems/redundant-connection/
In this problem, a tree is an undirected graph that is connected and has no
cycles.

The given input is a graph that started as a tree with N nodes (with distinct
values 1, 2, ..., N), with one additional edge added. The added edge has two
different vertices chosen from 1 to N, and was not an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a
pair [u, v] with u < v, that represents an undirected edge connecting nodes u
and v. 

Return an edge that can be removed so that the resulting graph is a tree of N
nodes. If there are multiple answers, return the answer that occurs last in the
given 2D-array. The answer edge [u, v] should be in the same format, with u < v.
*/
function findRedundantConnection(edges) {
  const parents = new Array(edges.length + 1)
  const ranks = new Array(edges.length + 1).fill(1)
  for (let i = 1; i <= edges.length; i++) parents[i] = i
  for (const edge of edges) {
    if (findSet(edge[0], parents) === findSet(edge[1], parents)) return edge
    connectSet(edge[0], edge[1], parents, ranks)
  }
  return []
}

function findSet(x, parents) {
  if (parents[x] === x) return x
  else return findSet(parents[x], parents)
}

function connectSet(x, y, parents, ranks) {
  x = findSet(x, parents)
  y = findSet(y, parents)
  if (ranks[x] >= ranks[y]) {
    parents[y] = x
    ranks[x] += ranks[y]
  } else {
    parents[x] = y
    ranks[y] += ranks[x]
  }
}
