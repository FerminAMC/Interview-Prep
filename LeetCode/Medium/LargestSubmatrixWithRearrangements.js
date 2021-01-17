/*
You are given a binary matrix matrix of size m x n, and you are allowed to
rearrange the columns of the matrix in any order.

Return the area of the largest submatrix within matrix where every element of
the submatrix is 1 after reordering the columns optimally.

Example:
Input: matrix = [[0,0,1],[1,1,1],[1,0,1]]
Output: 4
Explanation: You can rearrange the columns as shown above.
The largest submatrix of 1s, in bold, has an area of 4.
*/

/**
 * @param {number[][]} matrix
 * @return {number}
 */
// O(nm) Time | O(m) Space - where n is the height of the matrix and m is the 
// width. 
const largestSubmatrix = matrix => {
    let maxArea = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0 && i > 0) {
                matrix[i][j] += matrix[i - 1][j]; 
            }
        }
        let currentRow = [...matrix[i]];
        currentRow.sort((a, b) => b - a);
        for (let k = 0; k < matrix[0].length; k++) {
            // Neat trick from LeetCode
            maxArea = Math.max(maxArea, currentRow[k] * (k + 1));
        }
    }
    return maxArea;
}