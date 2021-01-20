/*
Given an m x n 2d grid map of '1's (land) and '0's (water), return the number
of islands.

An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. You may assume all four edges of the grid are all
surrounded by water.

Example: 
    Input: grid = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ]
    Output: 1
*/

/**
 * @param {character[][]} grid
 * @return {number}
 */
// O(n*m) Time | O(n*m) Space - where n and m are the height and width of the
// matrix
const numIslands = grid => {
    let islands = 0;
    let visited = grid.map((row) => row.map((value) => false));
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (visited[i][j]) continue;
            islands += checkForIsland(grid, i, j, visited);
        }
    }
    return islands;
}

const checkForIsland = (grid, i, j, visited) => {
    let queue = [[i, j]];
    let foundIsland = false;
    while (queue.length) {
        let node = queue.shift();
        let row = node[0];
        let col = node[1];
        if (visited[row][col]) continue;
        visited[row][col] = true;
        if (grid[row][col] == '0') continue;
        foundIsland = true;
        getNeighbors(visited, row, col, queue);
    }
    return foundIsland ? 1 : 0;
}

const getNeighbors = (visited, i, j, queue) => {
    // left
    if (j > 0 && !visited[i][j - 1]) {
        queue.push([i, j - 1]);
    }
    // right
    if (j < visited[0].length - 1 && !visited[i][j + 1]) {
        queue.push([i, j + 1]);
    }
    // up
    if (i > 0 && !visited[i - 1][j]) {
        queue.push([i - 1, j]);
    }
    // down
    if (i < visited.length - 1 && !visited[i + 1][j]) {
        queue.push([i + 1, j]);
    }
}