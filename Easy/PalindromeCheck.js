/**
 * Write a function that takes in a non-empty string and returns a boolean
 * representing whether the string is a palindrome.
 * A palindrome is defined as a string that's written the same forward and
 * backward. Note that single-character strings are palindromes.
 *
 * string = "abcdcba"
 * result = true
 */

// O(n) time - O(1) space
function isPalindrome(string) {
  left = 0
  right = string.length - 1
  while (left < right) {
    if (string[left] != string[right]) return false
    left++
    right--
  }
  return true
}
