/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const gameOfLife = function(board) {
    const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1],
        [0, -1], [-1, -1]];
    
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            let current = board[row][col];
            let ones = 0;
            let ceros = 0;
            for (let direction of directions) {
                let newRow = row + direction[0];
                let newCol = col + direction[1];
                if (newRow < 0 || newRow === board.length) continue;
                if (newCol < 0 || newCol === board[0].length) continue;
                
                let newVal = board[newRow][newCol];
                if (newVal === 1 || newVal === -1) {
                    ones++;
                }
            }
            board[row][col] = livesOrDies(current, ones);
        }
    }
    
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (board[row][col] === 2) board[row][col] = 1;
            if (board[row][col] === -1) board[row][col] = 0;
        }
    }
    
    return;
};

const livesOrDies = function(val, ones) {
    if (val === 0) {
        return ones === 3 ? 2 : 0;
    } else {
        if (ones > 3 || ones < 2) {
            return -1;
        } else {
            return 1;
        }
    }
}