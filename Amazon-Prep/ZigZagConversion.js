/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert = function(s, numRows) {
    if (numRows == 1) return s;

    let zigZagMatrix = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        zigZagMatrix[i] = []; 
    }
    let row = 0;
    let goingUp = false;
    for (let i = 0; i < s.length; i++) {
        if (row == numRows - 1) {
            goingUp = true;
        } else if (row == 0) {
            goingUp = false;
        }

        zigZagMatrix[row].push(s[i]);

        if (goingUp) {
            row--;
        } else { // going down
            row++;
        }    
    }

    let ans = '';
    for (let i = 0; i < zigZagMatrix.length; i++) {
        for (let j = 0; j < zigZagMatrix[i].length; j++) {
            ans += zigZagMatrix[i][j];
        }
    }

    return ans;
};