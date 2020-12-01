/**
 * Link: https://leetcode.com/problems/word-squares/
 * Given a set of words (without duplicates), find all word squares you can
 * build from them.
 *
 * A sequence of words forms a valid word square if the kth row and column read
 * the exact same string, where 0 <= k max(numRows, numColumns).
 *
 * For example, the word sequence ["ball","area","lead","lady"] forms a square
 * because each word reads the same both horizontally and vertically.
 *
 *   b a l l
 *   a r e a
 *   l e a d
 *   l a d y
 *
 * Note:
 *    - There's at least 1 and at most 1000 words.
 *    - All words will have the exact same length.
 *    - Word length is at least 1 and at most 5.
 *    - Each word contains only lowercase English alphabet a-z.
 *
 * Example:
 * Input: ["abat","baba","atan","atal"]
 * Output: [["baba", "abat", "baba", "atan"], ["baba", "abat", "baba", "atal"]]
 */

/**
 * Explanation:
 * Input = [ball, able, area, lead, lady]
 *
 * The prefix at step 1.1, "ll" doesn't throw out any candidate words, so we
 * discard that word and backtrack to step 0.
 *
 * Step 0:       Step 1.1:     Step 1.2:     Step 2:       Step 3:
 *    b a l l       b a l l       b a l l       b a l l       b a l l
 *    a             a b l e       a r e a       a r e a       a r e a
 *    l             l             l             l e a d       l e a d
 *    l             l             l             l             l a d y
 *
 * For every step we look for every possible word that has the desired prefix.
 * In each step the prefix increases by one letter. The trie structure is very
 * useful to store all words and find if a word exists with a given prefix.
 * Once we have the list of words that have a particular prefix, we check if
 * adding those words gives us a word square, so if we reach the limit, it means
 * that the current word combination in the call stack is a valid one, so we add
 * it to the result array. In the backtracking function, if we reach the line
 * of wordSquare.pop() it means that the candidate word we tried did not
 * fulfill the contitions, so we try with another candidate. If there are no
 * more candidates, we try with a new word, repeating the process untill we
 * check all word combinations.
 *
 * O(N * 26^L * L) Time | O(N * L) Space - where N is the number of words and L
 * is the length of a single words
 */
function wordSquares(words) {
  const result = []
  const trie = new Trie()
  for (const word of words) {
    trie.addWord(word)
  }
  for (const word of words) {
    const wordSquare = [word]
    backtracking(1, words[0].length, trie, wordSquare, result)
  }
  return result
}

function backtracking(step, limit, trie, wordSquare, result) {
  if (step === limit) {
    result.push([...wordSquare])
    return
  }
  let prefix = ''
  for (const word of wordSquare) {
    prefix += word[step]
  }
  const candidates = trie.getWordsWithPrefix(prefix)
  for (const candidate of candidates) {
    wordSquare.push(candidate)
    backtracking(step + 1, limit, trie, wordSquare, result)
    wordSquare.pop()
  }
}

class Trie {
  constructor() {
    this.root = {}
    this.endSymbol = '*'
  }

  addWord(word) {
    let currentNode = this.root
    for (const char of word) {
      if (!(char in currentNode)) {
        currentNode[char] = {}
      }
      currentNode = currentNode[char]
    }
    currentNode[this.endSymbol] = word
  }

  getWordsWithPrefix(prefix) {
    const foundWords = []
    let currentNode = this.root
    for (const char of prefix) {
      if (!(char in currentNode)) return []
      currentNode = currentNode[char]
    }
    this.recursiveHelper(currentNode, foundWords)
    return foundWords
  }

  recursiveHelper(node, foundWords) {
    if (this.endSymbol in node) {
      foundWords.push(node[this.endSymbol])
      return
    }
    for (const key of Object.keys(node)) {
      this.recursiveHelper(node[key], foundWords)
    }
    return
  }
}
