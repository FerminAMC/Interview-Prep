/**
 * Write a function that takes in an array of strings and groups anagrams
 * together.
 *
 * Anagrams are strings made up of exactly the same letters, where order doesn't
 * matter. For example, "cinema" and "iceman" are anagrams; similarly, "foo" and
 * "ofo" are anagrams.
 *
 * Your function should return a list of anagram groups in no particular order.
 *
 * Input:
 * words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]
 * result = [["yo", "oy"], ["act", "tac", "cat"], ["foo"], ["flop", "olfp"]]
 */

// O(n*w) Time | O(n*w) Space - where n is the number of words and w is the length
// of the longest word.
function groupAnagrams(words) {
  const hashMap = {}
  const anagrams = []
  for (let word of words) {
    let hash = getWordHash(word)
    if (hash in hashMap) {
      if (isAnagram(hashMap[hash][0], word)) {
        hashMap[hash].push(word)
      } else {
        hash += 1299689 // Just a random number. Its a prime number though :P
        if (hash in hashMap) {
          hashMap[hash].push(word)
        } else {
          hashMap[hash] = [word]
        }
      }
    } else {
      hashMap[hash] = [word]
    }
  }
  for (let hash in hashMap) {
    anagrams.push(hashMap[hash])
  }
  return anagrams
}

// O(w) Time | O(1) Space
function getWordHash(word) {
  let hash = 0
  for (let i = 0; i < word.length; i++) {
    hash += word.charCodeAt(i)
  }
  return hash
}

// O(w) Time | O(n) Space - here I'm assuming that the includes function takes
// constant time. Since space complexity is already O(n) I could put the letters
// of a word in a hashmap and make the lookup constant.
function isAnagram(word1, word2) {
  if (word1.length !== word2.length) return false
  const word2Array = [...word2]
  for (let i = 0; i < word1.length; i++) {
    if (!word2Array.includes(word1[i])) return false
  }
  return true
}
