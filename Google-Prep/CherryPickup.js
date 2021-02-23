/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function(grid) {
    let dpMatrix = grid.map(row => row.map(col => [0, 0]));
    dpMatrix[0][0][0] = grid[0][0];
    dpMatrix[0][grid[0].length - 1][1] = grid[0][grid[0].length - 1];
    buildMatrix(dpMatrix, grid);
    console.log(dpMatrix);

    let row = grid.length - 1;
    let maxSum = 0;
    for (let col = 0; col < dpMatrix[0].length; col++) {
        let sumOne = dpMatrix[row][col - 1][0] + dpMatrix[row][col][1];
        let sumTwo = dpMatrix[row][col - 1][1] + dpMatrix[row][col][0];
        let maxSum = Math.max(maxSum, sumOne, sumTwo);
    }
    
    return maxSum;
};

const buildMatrix = function(matrix, original) {
    let colLen = matrix[0].length;
    const directions = [0, 1, -1];
    
    // From left to right
    for (let row = 1; row < matrix.length; row++) {
        for (let col = 0; col < colLen && col <= row; col++) {
            let max = 0;
            for (let direction of directions) {
                let prevRow = row - 1;
                let prevCol = col + direction;
                if (prevCol < 0 || prevCol == colLen) continue;
                max = Math.max(max, matrix[prevRow][prevCol][0]);
            }
            matrix[row][col][0] = max + original[row][col];
        }
    }
    
    // From right to left
    for (let row = 1; row < matrix.length; row++) {
        for (let col = colLen - 1; col >= 0 && col >= colLen - row; col--) {
            let max = 0;
            for (let direction of directions) {
                let prevRow = row - 1;
                let prevCol = col + direction;
                if (prevCol < 0 || prevCol == colLen) continue;
                max = Math.max(max, matrix[prevRow][prevCol][1]);
            }
            matrix[row][col][1] = max + original[row][col]; 
        }
    }  
};