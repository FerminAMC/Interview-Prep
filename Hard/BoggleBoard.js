/**
 * You're given a two-dimensional array (a matrix) of potentially unequal height
 * and width containing letters; this matrix represents a boggle board. You're
 * also given a list of words.
 *
 * Write a function that returns an array of all the words contained in the
 * boggle board by connecting adjacent (horizontally, vertically, or diagonally)
 * letters, without using a single letter at a given position more than once;
 * while a word can of course have repeated letters, those repeated letters
 * must come from different positions in the boggle board in order for the word
 * to be contained in the board. Note that two or more words are allowed to
 * overlap and use the same letters in the boggle board.
 */

function boggleBoard(board, words) {
  // Constructing the Trie
  trie = new Trie()
  for (const word of words) {
    trie.addWord(word)
  }
  const foundWords = {}
  const visited = board.map((row) => row.map((letter) => false))
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      explore(board, visited, trie.root, foundWords, row, col)
    }
  }
  return Object.keys(foundWords)
}

function explore(board, visited, trieNode, foundWords, row, col) {
  if (visited[row][col]) return
  const letter = board[row][col]
  if (!(letter in trieNode)) return
  visited[row][col] = true
  trieNode = trieNode[letter]
  if ('*' in trieNode) foundWords[trieNode['*']] = true
  neighbors = getNeighbors(board, row, col)
  for (const neighbor of neighbors) {
    let newRow = neighbor[0]
    let newCol = neighbor[1]
    explore(board, visited, trieNode, foundWords, newRow, newCol)
  }
  visited[row][col] = false
}

function getNeighbors(board, row, col) {
  const neighbors = []
  // Right
  if (col < board[row].length - 1) {
    neighbors.push([row, col + 1])
  }
  // Bottom-right
  if (col < board[row].length - 1 && row < board.length - 1) {
    neighbors.push([row + 1, col + 1])
  }
  // Bottom
  if (row < board.length - 1) {
    neighbors.push([row + 1, col])
  }
  // Bottom-left
  if (col > 0 && row < board.length - 1) {
    neighbors.push([row + 1, col - 1])
  }
  // Left
  if (col > 0) {
    neighbors.push([row, col - 1])
  }
  // Top-left
  if (col > 0 && row > 0) {
    neighbors.push([row - 1, col - 1])
  }
  // Top
  if (row > 0) {
    neighbors.push([row - 1, col])
  }
  // Top-right
  if (col < board[row].length - 1 && row > 0) {
    neighbors.push([row - 1, col + 1])
  }
  return neighbors
}

class Trie {
  constructor() {
    this.root = {}
    this.endSymbol = '*'
  }

  addWord(word) {
    let node = this.root
    for (const letter of word) {
      if (!(letter in node)) {
        node[letter] = {}
      }
      node = node[letter]
    }
    node[this.endSymbol] = word
  }
}
