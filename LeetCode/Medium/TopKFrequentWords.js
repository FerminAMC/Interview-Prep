/*
Link: https://leetcode.com/problems/top-k-frequent-words/
Given a non-empty list of words, return the k most frequent elements.
Your answer should be sorted by frequency from highest to lowest. If two words
have the same frequency, then the word with the lower alphabetical order comes
first.

Note:
  1 - You may assume k is always valid, 1 <= k <= number of unique elements.
  2 - Input words contain only lowercase letters.

Follow up: 
  1 - Try solving it in O(n log(k)) Time and O(n) Space.
*/
function topKFrequent(words, k) {
  const wordVals = {}

  for (const word of words) {
    if (word in wordVals) {
      wordVals[word] += 1
    } else {
      wordVals[word] = 1
    }
  }
  const tuples = Object.entries(wordVals)
  tuples.sort((a, b) => {
    if (a[1] - b[1] === 0) {
      return a[0].localeCompare(b[0])
    } else return b[1] - a[1]
  })
  console.log(tuples)
  return tuples.slice(0, k).map((arr) => arr[0])
}
