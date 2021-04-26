/**
 * @param {character[][]} grid
 * @return {number}
 */
let numIslands = function(grid) {
    let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let islandCounter = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] == '1') {
                islandCounter++;
                grid[row][col] = '0';
                bfs([row, col], grid);
            }
        }
    }
    
    return islandCounter;
};

let bfs = function(pos, grid) {
    let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    for (let direction of directions) {
        let newRow = pos[0] + direction[0];
        let newCol = pos[1] + direction[1];
        if (newRow < 0 || newRow == grid.length) continue;
        if (newCol < 0 || newCol == grid[0].length) continue;
        if (grid[newRow][newCol] == '1') {
            grid[newRow][newCol] = '0';
            bfs([newRow, newCol], grid);
        }
    }
};