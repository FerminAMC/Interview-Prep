/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
const updateBoard = function(board, click) {
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1],
        [-1, -1], [1, -1]];
    if (board[click[0]][click[1]] === 'M') {
        board[click[0]][click[1]] = 'X';
        return board;
    }
    bfs(click[0], click[1]);
    return board;
    
    function bfs(row, col) {
        let mines = 0;
        for (let direction of directions) {
            let newRow = row + direction[0];
            let newCol = col + direction[1];
            if (newRow < 0 || newCol < 0) continue;
            if (newRow === board.length || newCol === board[0].length) continue;
            if (board[newRow][newCol] === 'M') {
                mines++;
            }
        }
        board[row][col] = mines === 0 ? 'B' : mines.toString();
        if (mines === 0) {
            for (let direction of directions) {
                let newRow = row + direction[0];
                let newCol = col + direction[1];
                if (newRow < 0 || newCol < 0) continue;
                if (newRow === board.length || newCol === board[0].length) {
                    continue;
                }
                if (board[newRow][newCol] === 'E') {
                    bfs(newRow, newCol);
                }
            }
        }
        return;
    }
};