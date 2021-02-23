/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    let disjointSet = new DisjointSet(n);
    for (let edge of edges) {
        disjointSet.join(edge[0], edge[1]);
    }
    let set = new Set();
    for (let i = 0; i < n; i++) {
        let group = disjointSet.find(i);
        set.add(group);
    }
    return set.size;
};

class DisjointSet {
    constructor(n) {
        this.groups = [];
        for (let i = 0; i < n; i++) {
            this.groups.push(i);
        }
    }
    
    find(x) {
        if (this.groups[x] !== x) {
            this.groups[x] = this.find(this.groups[x]);
        }
        return this.groups[x];
    }
    
    join(x, y) {
        x = this.find(x);
        y = this.find(y);
        this.groups[y] = x;
    }
}