/**
 * Given a string and an integer k, you need to reverse the first k characters
 * for every 2k characters counting from the start of the string. If there are
 * less than k characters left, reverse all of them. If there are less than 2k,
 * but greater than or equal to k chracters, then reverse the first k characters
 * and leave the others as is.
 */

// There is a function in Javascript called reverse. Might want to look into
// that as well. This is good enough for now.
// O(n) Time | O(n) Space
const reverseStr = function (s, k) {
  const chars = s.split('')
  for (let i = 0; i < chars.length; i += k * 2) {
    stringReversal(chars, i, i + k - 1)
  }
  return chars.toString().replace(/,/g, '')
}

const stringReversal = function (chars, left, right) {
  while (left < right) {
    const aux = chars[left]
    chars[left] = chars[right]
    chars[right] = aux
    left++
    right--
  }
}
