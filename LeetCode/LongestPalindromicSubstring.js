/**
 * Given a string s, find the longest palindromic substring in s. You may assume
 * that the max length of s is 1000.
 *
 * Example 1:
 *    Input: "babad"
 *    Output: "bab"
 *    Note: "aba" is also a valid answer.
 *
 * Example 2:
 *    Input: "cbbd"
 *    Output: "bb"
 */

// O(n^2) Time | O(1) Space
const longestPalindrome = function (s) {
  let left = 0
  let right = 0
  let max = 0
  for (let i = 0; i < s.length; i++) {
    // Expanding from a single character
    const len1 = expandCenter(s, i, i)
    // Expanding from two chars in order to find same char sequences
    const len2 = expandCenter(s, i, i + 1)
    const localMax = len1[2] > len2[2] ? len1 : len2
    if (localMax[2] > max) {
      max = localMax[2]
      left = localMax[0] + 1 // Offset.
      // Doesn't need an offset due to the way substring works
      right = localMax[1]
    }
  }
  return s.substring(left, right)
}

const expandCenter = function (s, left, right) {
  let isPalindrome = false
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    isPalindrome = true
    right++
    left--
  }
  const len = isPalindrome ? right - left - 1 : 0
  return [left, right, len]
}
