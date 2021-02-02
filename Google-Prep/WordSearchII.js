/*
Given an m x n board of characters and a list of strings words, return all
words on the board.

Each word must be constructed from letters of sequentially adjacent cells,
where adjacent cells are horizontally or vertically neighboring. The same
letter cell may not be used more than once in a word.
*/

const findWords = (board, words) => {
    words = new Set(words);
    let ans = new Set();
    let visited = board.map(row => row.map(col => false));
    const trie = new Trie(words);
                      // down,     up,    right,  left
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            const char = board[row][col];
            if (trie.hasPrefix(char)) {
                find(row, col, char, board, visited, directions, words, ans, trie);
            }
        }
    }
    return Array.from(ans);
}

const find = (row, col, prefix, board, visited, directions, words, ans, trie) => {
    if (words.has(prefix)) {
        ans.add(prefix);
    }
    if (!trie.hasPrefix(prefix)) {
        return;
    }
    visited[row][col] = true;
    for (let direction of directions) {
        let newRow = row + direction[0];
        let newCol = col + direction[1];
        if (newRow < 0 || newRow === visited.length) continue;
        if (newCol < 0 || newCol === visited[0].length) continue;
        if (visited[newRow][newCol]) continue;
        let newPrefix = prefix + board[newRow][newCol];
        find(newRow, newCol, newPrefix, board, visited, directions, words, ans, trie);
    }
    visited[row][col] = false;
    return;
}

class Trie {
    constructor(words) {
        this.root = {};
        this.endSymbol = '*';
        for (let word of words) {
            this.addWord(word);
        }
    }

    addWord(word) {
        let node = this.root;
        for (let char of word) {
            if (!(char in node)) {
                node[char] = {};
            }
            node = node[char];
        }
        node[this.endSymbol] = true;
    }

    hasPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!(char in node)) return false;
            node = node[char];
        }
        return true;
    }
}