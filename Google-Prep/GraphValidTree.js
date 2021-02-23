/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
const validTree = function(n, edges) {
    let adjacencyList = {};
    for (let i = 0; i < n; i++) {
        let set = new Set();
        adjacencyList[i] = set;
    }
    for (let edge of edges) {
        adjacencyList[edge[0]].add(edge[1]);
        adjacencyList[edge[1]].add(edge[0]);
    }
    
    let stack = [0];
    let seen = {};
    seen[0] = -1;
    while(stack.length) {
        let node = stack.pop();
        for (let neighbor of adjacencyList[node]) {
            if (seen[node] === neighbor) {
                continue;   
            }
            if (neighbor in seen) {
                return false;
            }
            stack.push(neighbor);
            seen[neighbor] = node;
        }
    }
    console.log(seen);
    return Object.keys(seen).length === n;
};
