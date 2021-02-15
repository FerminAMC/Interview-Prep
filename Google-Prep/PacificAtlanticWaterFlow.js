/*
Given an m x n matrix of non-negative integers representing the height of each
unit cell in a continent, the "Pacific ocean" touches the left and top edges of
the matrix and the "Atlantic ocean" touches the right and bottom edges.

Water can only flow in four directions (up, down, left, or right) from a cell to
another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and
Atlantic ocean.

Note:

    The order of returned grid coordinates does not matter.
    Both m and n are less than 150.


Example:

Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with
    parentheses in above matrix).

The solution below is not efficient. I do two passes, just changing the variable
ocean to true or false. I could certainly do just one pass, but I got lazy in
the end hehe.
*/

/**
 * O(m²) Time | O(m) Space - where m is the number of elements in the matrix
 * @param {number[][]} matrix
 * @return {number[][]}
 */
const pacificAtlantic = function(matrix) {
    if (matrix.length == 0) return [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const m = matrix.length;
    const n = matrix[0].length;
    let visited = matrix.map(row => row.map(col => false));

    let ans = [];
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            let pacific = checkOcean([row, col], matrix, visited,
                directions, true);
            let atlantic = checkOcean([row, col], matrix, visited,
                directions, false);

            if (pacific && atlantic) ans.push([row, col]);
        }
    }

    return ans;
};

const checkOcean = function(pos, matrix, visited, directions, ocean) {
    if ((pos[0] == 0 || pos[1] == 0)&& ocean) {
        return true;
    } else if ((pos[0] == matrix.length - 1 || pos[1] == matrix[0].length - 1) 
            && !ocean) {
        return true;
    }
    visited[ pos[0] ][ pos[1] ] = true;
    let ans = false;
    let prev = matrix[ pos[0] ][ pos[1] ];
    for (let direction of directions) {
        let newRow = pos[0] + direction[0];
        let newCol = pos[1] + direction[1];
        if (newRow >= matrix.length || newRow < 0) continue;
        if (newCol >= matrix[0].length || newCol < 0) continue;
        let newVal = matrix[ newRow ][ newCol ];
        if (newVal <= prev && !visited[newRow][newCol]) {
            ans = ans || checkOcean([ newRow, newCol ], matrix, visited,
                directions, ocean);
        }
    }
    visited[ pos[0] ][ pos[1] ] = false;
    return ans;
}