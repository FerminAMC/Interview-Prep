/*
You are given an n x n 2D matrix representing an image, rotate the image by 90
degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input
2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
*/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = matrix => {
    const DEBUG = false;
    const len = matrix.length - 1;
    let i = 0;
    let j = 0;
    let level = 1;
    while (true) {
        if (matrix.length % 2 !== 0 && j === Math.floor(matrix.length / 2)) {
            break;
        }
        
        let num1 = matrix[j][i];
        let num2 = matrix[i][len - level + 1];
        let num3 = matrix[len - level + 1][len - i];
        let num4 = matrix[len - i][j];

        matrix[j][i] = num4;
        matrix[i][len - level + 1] = num1;
        matrix[len - level + 1][len - i] = num2;
        matrix[len - i][j] = num3;

        if (DEBUG) {
            console.log('i', i);
            console.log('j', j);
            console.log('num1', num1);
            console.log('num2', num2);
            console.log('num3', num3);
            console.log('num4', num4);
            console.log('--------------');
        }

        if (matrix.length % 2 === 0 
            && j === Math.floor(matrix.length / 2) - 1) break;

        if (i === len - level) {
            level++;
            j++;
            i = j;
        } else {
            i++;
        }
    }
    console.log(matrix);
}