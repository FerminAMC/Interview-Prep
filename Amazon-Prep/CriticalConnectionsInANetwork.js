/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
let criticalConnections = function(n, connections) {
    
    let nodes = {}
    for (let i = 0; i < n; i++) {
        nodes[i] = {rank: null, edges: []};
    }
    
    for (let connection of connections) {
        nodes[connection[0]].edges.push(connection[1]);
        nodes[connection[1]].edges.push(connection[0]);
    }
    
    console.log(nodes);
    dfs(0, 0);
    
    return [];
    
    function dfs(node, discoveryRank) {
        if (nodes[node].rank != null) return nodes[node].rank;
        
        nodes[node].rank = discoveryRank;
        let minRank = discoveryRank + 1;
        for (let edge of nodes[node].edges) {
            let edgeRank = nodes[edge].rank;
            
            // Skip parent nodes
            if (edgeRank != null && edgeRank == discoveryRank - 1) {
                continue;
            }
            
            let recursiveRank = dfs(edge, discoveryRank + 1);
            if (recursiveRank <= discoveryRank) {
                // remove this connection
                console.log(node, edge);
            }
            minRank = Math.min(minRank, recursiveRank);
        }
        
        return minRank;
    }
};