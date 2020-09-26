/**
 * There is a new alien language which uses the latin alphabet. However, the
 * order among letters are unkown to you. You receive a list of non-empty words
 * from the dictionary, where words are sorted lexicographically by the rules
 * of this new language. Derive the order of letters in this language.
 *
 * Input:
 * [
 *   "wrt",
 *   "wrf",
 *   "er",
 *   "ett",
 *   "rftt"
 * ]
 * Output: "wertf"
 */

/**
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words) {
  let uniqueLetters = []
  const graph = {}
  for (let word of words) {
    for (let i = 0; i < word.length; i++) {
      graph[word[i]] = {children: [], parents: [], numParents: 0}
      if (!uniqueLetters.includes(word[i])) uniqueLetters.push(word[i])
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i]
    const word2 = words[i + 1]
    // Takes care of an edge case were word 1 has the same prefix as word2,
    // but word1 is longer. For example: ["abc", "ab"]
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return ''
    }
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        graph[word1[j]].children.push(word2[j])
        graph[word2[j]].parents.push(word1[j])
        graph[word2[j]].numParents++
        break
      }
    }
  }
  const noParents = []
  for (let letter of uniqueLetters) {
    if (graph[letter].numParents === 0) noParents.push(letter)
  }
  let order = ''

  while (noParents.length) {
    const currentNode = noParents.pop()
    order += currentNode
    for (let child of graph[currentNode].children) {
      const indexOfParent = graph[child].parents.indexOf(currentNode)
      graph[child].parents.splice(indexOfParent, 1)
      graph[child].numParents--
      if (graph[child].numParents === 0) noParents.push(child)
    }
    graph[currentNode].children = []
  }

  return order.length === uniqueLetters.length ? order : ''
}

/**
 * This is only the first approach. I solve the test case, but still haven't
 * solved it for all cases. I don't really use topological sort here, so this
 * won't apply in other cases.
var alienOrder = function (words) {
  let order = ''
  let lastCharAdded = ''
  let counter = 0
  while (counter < words.length) {
    counter = 0
    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      if (word === '') {
        counter++
        continue
      }
      let currentChar = word[0]
      words[i] = word.slice(1)
      if (!order.includes(currentChar)) {
        lastCharAdded = currentChar
        order += currentChar
      }
    }
  }

  return order
}
 */
