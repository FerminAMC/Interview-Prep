/*
On a 2D plane, we place n stones at some integer coordinate points. Each
coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same column as
another stone that has not been removed.

Given an array stones of length n where stones[i] = [xi, yi] represents the
location of the ith stone, return the largest possible number of stones that
can be removed.
*/

const removeStones = stones => {
    const unionFind = new UnionFind(20000);
    for (let stone of stones) {
        unionFind.union(stone[0], stone[1] + 10000);
    }

    const seen = new Set();
    for (let stone of stones) {
        seen.add(unionFind.find(stone[0]));
    }
    return stones.length - seen.size;
}

class UnionFind {
    constructor(N) {
        this.parent = new Array(N);
        for (let i = 0; i < N; i++){
            this.parent[i] = i;
        }
    }

    find = x => {
        if (x !== this.parent[x]) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union = (x, y) => {
        this.parent[this.find(x)] = this.find(y);
    }
}