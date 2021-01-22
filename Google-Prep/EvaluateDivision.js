/*
You are given an array of variable pairs equations and an array of real numbers
values, where equations[i] = [Ai, Bi] and values[i] represent the equation
Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single
variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth
query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined,
return -1.0.

Note: The input is always valid. You may assume that evaluating the queries
will not result in division by zero and that there is no contradiction.


Example:
    Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0],
            queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
    Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
    Explanation: 
    Given: a / b = 2.0, b / c = 3.0
    queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
    return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
*/

class UnionFind {
    constructor () {
        this.table = {};
    }

    find = nodeId => {
        if (!(nodeId in this.table)) {
            this.table[nodeId] = {"parent": nodeId, "weight": 1};
        }
        let node = this.table[nodeId];

        if (nodeId !== node.parent) {
            let newNode = this.find(node.parent);
            let newId = newNode.parent;
            let newWeight = newNode.weight;
            this.table[nodeId].parent = newId;
            this.table[nodeId].weight = newWeight * node.weight;
        }
        return this.table[nodeId];
    }

    union = (dividend, divisor, value) => {
        let dividendNode = this.find(dividend);
        let divisorNode = this.find(divisor);

        if (dividendNode.parent !== divisorNode.parent) {
            dividendNode.parent = divisorNode.parent;
            dividendNode.weight = 
                (divisorNode.weight * value) / dividendNode.weight;
        }
    }
}

const calcEquation = (equations, values, queries) => {
    let unionFind = new UnionFind();
    for (let i = 0; i < equations.length; i++) {
        let equation = equations[i];
        let value = values[i];
        unionFind.union(equation[0], equation[1], value);
    }
    let results = [];
    for (let query of queries) {
        let dividend = query[0];
        let divisor = query[1];
        if (!(dividend in unionFind.table) || !(divisor in unionFind.table)) {
            results.push(-1.0);
        } else {
            let dividendNode = unionFind.find(dividend);
            let divisorNode = unionFind.find(divisor);
            if (dividendNode.parent !== divisorNode.parent) {
                results.push(-1.0);
            } else {
                results.push(dividendNode.weight / divisorNode.weight);
            }
        }
    }
    return results;
}