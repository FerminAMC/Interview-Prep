/**
 * Write a SuffixTrie class for a Suffix-Trie-like data structure. The class
 * should have a root property set to be the root node of the trie and should
 * support:
 *
 *    - Creating the trie from a string; this will be done by calling the
 *      populateSuffixTrieFrom method upon class instantiation, which should
 *      populate the root of the class.
 *    - Searching for strings in the trie.
 *
 * Note that every string added to the trie should end with the special
 * endSymbol character "*".
 */
class SuffixTrie {
  constructor(string) {
    this.root = {}
    this.endSymbol = '*'
    this.populateSuffixTrieFrom(string)
  }

  // O(n^2) Time | O(n^2) Space - where n is the number of characters in the
  // string.
  populateSuffixTrieFrom(string) {
    for (let i = 0; i < string.length; i++) {
      let node = this.root
      for (let j = i; j < string.length; j++) {
        const letter = string[j]
        if (!(letter in node)) {
          node[letter] = {}
        }
        node = node[letter]
      }
      node[this.endSymbol] = true
    }
  }

  // O(n) Time | O(1) Space
  contains(string) {
    let node = this.root
    for (const letter of string) {
      if (!(letter in node)) return false
      node = node[letter]
    }
    return this.endSymbol in node
  }
}
