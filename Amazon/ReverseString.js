/**
 * Write a function that reverses a string. The input string is given as an
 * array of characters char[].
 *
 * Do not allocate extra space for another array, you must do this by
 * modifying the input array in-place with O(1) extra memory.
 *
 * You may assume all the characters consists of printable ascii characters.
 */

const reverseString = function (s) {
  let left = 0,
    right = s.length - 1
  while (left < right) {
    const aux = s[left]
    s[left] = s[right]
    s[right] = aux
    left++
    right--
  }
  return s
}
