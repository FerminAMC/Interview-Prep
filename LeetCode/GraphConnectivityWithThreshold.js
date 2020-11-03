/*
We have n cities labeled from 1 to n. Two different cities with labels x and y
are directly connected by a bidirectional road if and only if the following
conditions are met:
    * x % z == 0
    * y % z == 0
    * z > threshold

Given the two integers, n and a threshold, and an array of queries, you must
determine for each queries[i] = [ai, bi] if cities ai and bi are connected.

Return an array of booleans, where array.length === queries.length and array[i]
is true if for the ith query there is a path between ai and bi or false if there
isn't.
*/

function areConnected(n, threshold, queries) {
  const answer = []
  const parents = new Array(n + 1)
  const ranks = new Array(n + 1).fill(1)
  for (let i = 1; i <= n; i++) parents[i] = i
  for (let i = threshold + 1; i <= n; i++) {
    let multiplier = 1
    while (multiplier * i <= n) {
      joinSets(i, i * multiplier, parents, ranks)
      multiplier++
    }
  }
  for (const query of queries) {
    answer.push(find(query[0], parents) === find(query[1], parents))
  }
  return answer
}

function find(x, parents) {
  if (parents[x] === x) return x
  else return find(parents[x], parents)
}

function joinSets(x, y, parents, ranks) {
  x = find(x, parents)
  y = find(y, parents)
  if (ranks[x] >= ranks[y]) {
    parents[y] = x
    ranks[x] += ranks[y]
  } else {
    parents[x] = y
    ranks[y] += ranks[x]
  }
}
