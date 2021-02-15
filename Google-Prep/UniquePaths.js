/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the
diagram below).

The robot can only move either down or right at any point in time. The robot is
trying to reach the bottom-right corner of the grid (marked 'Finish' in the
diagram below).

How many possible unique paths are there?
*/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function(m, n) {
    let visited = new Array(m);
    for (let i = 0; i < m; i++) visited[i] = new Array(n).fill(1);

    for (let row = 1; row < m; row++) {
        for (let col = 1; col < n; col++) {
            visited[row][col] = visited[row - 1][col] + visited[row][col - 1];
        }
    }
    return visited[m - 1][n - 1];
};