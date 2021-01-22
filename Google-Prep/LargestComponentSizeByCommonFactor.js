/*
Problem:
Given a non-empty array of unique positive integers A, consider the following
graph:

    There are A.length nodes, labelled A[0] to A[A.length - 1];
    There is an edge between A[i] and A[j] if and only if A[i] and A[j] share a
        common factor greater than 1.

Return the size of the largest connected component in the graph.

Example: 
    Input: [2,3,6,7,4,12,21,39]
    Output: 8

Approach:
    This is a problem that is solved using the Union Find data structure. It
    creates groups of nodes, joining them of a particular node that they might
    have in common. In this case, the commonality is the common factors one
    number might have with another.

    Common factors are numbers that multiplied by another number, give a target
    number. For example: 3 * 2 = 6 => the factors of 6 are 2 and 3.

    Knowing that, you have to look for all the factors of a number and use the
    union in the Union Find data structure, between the target number and the
    factor that was found. This has to be repeated for all numbers.

    After the all numbers have been linked or united to a group, we look one by
    one again to search for the factors they have in common. The union find 
    structure returns the parent of a particular number, so if two numbers have
    the same parent, it means that they have a common factor. and we can add
    them together.
    
    After all the counting is done, simply return the max count that was found.
*/

const largestComponentSize = A => {
    let maxNum = Math.max(...A);
    let unionFind = new UnionFind(maxNum);
    let max = 0;
    // O(N * sqrt(M) * log*(M)) Time
    for (let num of A) {
        let len = Math.floor(Math.sqrt(num));
        // O(sqrt(M) * log*(M)) Time
        for (let factor = 2; factor < len + 1; factor++) {
            if (num % factor === 0) {
                unionFind.union(num, factor);
                unionFind.union(num, num / factor);
            }
        }
    }
    let groupSizes = {};
    for (let num of A) {
        let groupId = unionFind.find(num);
        let count = (groupId in groupSizes) ? groupSizes[groupId] : 0;
        groupSizes[groupId] = count + 1;
        max = Math.max(max, count + 1);
    }
    return max;
}

// Union or Find both have a time complexity of O(log*(n))
// log* is the iterated logarithm. 
class UnionFind {
    constructor(size) {
        this.parent = new Array(size + 1);
        this.size = new Array(size + 1);
        for (let i = 0; i < size + 1; i++){
            this.parent[i] = i;
            this.size[i] = 1;
        }
    }

    find = (x) => {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union = (x, y) => {
        let parentX = this.find(x);
        let parentY = this.find(y);

        if (parentX === parentY) return parentX;

        if (this.size[parentX] > this.size[parentY]) {
            // here we are making parentX be the node with less members
            let temp = parentX;
            parentX = parentY;
            parentY = temp;
        }
        // adding the smaller component to the larger one
        this.parent[parentX] = parentY;
        this.size[parentY] += this.size[parentX];
        return parentY;
    }
}
