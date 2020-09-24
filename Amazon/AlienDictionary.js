/**
 * There is a new alien language which uses the latin alphabet. However, the
 * order among letters are unkown to you. You receive a list of non-empty words
 * from the dictionary, where words are sorted lexicographically by the rules
 * of this new language. Derive the order of letters in this language.
 */

// This is only the first approach. I solve the test case, but still haven't
// solved it for all cases.
/**
 * @param {string[]} words
 * @return {string}
 */
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
