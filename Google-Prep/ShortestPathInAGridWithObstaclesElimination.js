/*
Given a m * n grid, where each cell is either 0 (empty) or 1 (obstacle). In one
step, you can move up, down, left or right from and to an empty cell.

Return the minimum number of steps to walk from the upper left corner (0, 0) to
the lower right corner (m-1, n-1) given that you can eliminate at most k
obstacles. If it is not possible to find such walk return -1.
*/

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const shortestPath = function(grid, k) {
    let path = grid.map(row => row.map(col => Infinity));
    path[0][0] = 1;
    let visited = grid.map(row => row.map(col => false));
    const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]]; 
    let minPath = Infinity;
    bfs(k, [0, 0]);

    return minPath == Infinity ? -1 : minPath;

    function bfs(k, pos) {
        let row = pos[0];
        let col = pos[1];
        if (row == grid.length - 1 && col == grid[0].length - 1) {
            minPath = Math.min(minPath, path[row][col] - 1);
        }
        
        visited[row][col] = true;
        for (let direction of directions) {
            let newRow = row + direction[0];
            let newCol = col + direction[1];
            if (newRow < 0 || newRow >= grid.length) continue;
            if (newCol < 0 || newCol >= grid[0].length) continue;
            if (!visited[newRow][newCol]) {
                if (grid[newRow][newCol] == 1 && k > 0) {
                    let temp = path[newRow][newCol];
                    path[newRow][newCol] = getMin(path, [newRow, newCol],
                        directions) + 1;
                    bfs(k - 1, [newRow, newCol]);
                    path[newRow][newCol] = temp;
                } else if (grid[newRow][newCol] !== 1){
                    path[newRow][newCol] = getMin(path, [newRow, newCol],
                        directions) + 1;
                    bfs(k, [newRow, newCol]);
                }
            }
        }
        visited[pos[0]][pos[1]] = false;
    }
};

const getMin = function(path, pos, directions) {
    let min = Infinity;
    for (let direction of directions) {
        let newRow = pos[0] + direction[0];
        let newCol = pos[1] + direction[1];
        if (newRow < 0 || newRow >= path.length) continue;
        if (newCol < 0 || newCol >= path[0].length) continue;
        min = Math.min(min, path[newRow][newCol]);
    }
    return min;
}
