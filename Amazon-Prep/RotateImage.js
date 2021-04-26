/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
let rotate = function(matrix) {
    let hollowCenter = matrix.length % 2 != 0;
    let level = 0;
    let width = matrix.length - 1;
    while (width > 1 || (width > 0 && !hollowCenter)) {
        for (let i = level, j = 0; i < width; i++, j++) {
            let top = matrix[level][i];
            let right = matrix[i][width];
            let bottom = matrix[width][width - j];
            let left = matrix[width - j][level];

            matrix[i][width] = top; // Right
            matrix[width][width - j] = right; // Bottom
            matrix[width - j][level] = bottom; // Left
            matrix[level][i] = left; // Top
        }
        level++;
        width--;
    }

    return matrix;
};