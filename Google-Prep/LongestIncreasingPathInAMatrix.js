/*
Problem:
Given an m x n matrix, return the length of the longest increasing path in
matrix.

From each cell, you can either move in four directions: left, right, up, or
down. You may not move diagonally or move outside the boundary (i.e.,
wrap-around is not allowed).

Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].

Approach:
Recurssion.
Visit one element, keeping track of how many nodes we were able to reach with
the recurssion, keeping the max number. Do this for every single node.
DFS + memoization does the trick.
*/

// O(nm) Time | O(nm) Space - where n and m are the width and height of the
// matrix
const longestIncreasingPath = matrix => {
    let cache = matrix.map(row => row.map(val => 0));
    let max = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            max = Math.max(max, dfs(row, col, cache, matrix));
        }
    }
    return max;
}

const dfs = (row, col, cache, matrix) => {
    if (cache[row][col] !== 0) return cache[row][col];
    let val = matrix[row][col];
    // going up
    if (row > 0 && matrix[row - 1][col] > val) {
        cache[row][col] = Math.max(cache[row][col], dfs(row - 1, col, cache, matrix));
    }
    // going down
    if (row < matrix.length - 1 && matrix[row + 1][col] > val) {
        cache[row][col] = Math.max(cache[row][col], dfs(row + 1, col, cache, matrix)); 
    }
    // going left
    if (col > 0 && matrix[row][col - 1] > val) {
        cache[row][col] = Math.max(cache[row][col], dfs(row, col - 1, cache, matrix));
    }
    // going right
    if (col < matrix[0].length - 1 && matrix[row][col + 1] > val) {
        cache[row][col] = Math.max(cache[row][col], dfs(row, col + 1, cache, matrix));
    }
    return ++cache[row][col];
} 