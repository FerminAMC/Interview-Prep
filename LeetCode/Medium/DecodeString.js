/*
Link: https://leetcode.com/problems/decode-string/
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the
square brackets is being repeated exactly k times. Note that k is guaranteed to
be a positive integer.

You may assume that the input string is always valid; No extra white spaces,
square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits
and that digits are only for those repeat numbers, k. For example, there won't
be input like 3a or 2[4].

Sample Input:
string = "3[a]2[bc]"
result = "aaabcbc"
*/

function decodeString(string) {
  return decoder(1, 0, string)[1]
}

// O(s*k) Time | O(s*k) Space - where s is the size of the string and k is the
// highest possible integer k.
function decoder(k, idx, string) {
  let tempString = ''
  let i = idx
  for (; i < string.length; i++) {
    const char = string[i]
    if (char === ']') {
      break
    } else if (char.charCodeAt() >= 48 && char.charCodeAt() <= 57) {
      let digit = char
      let j = i + 1
      while (string[j] !== '[') {
        digit += string[j]
        j++
      }
      digit = parseInt(digit)
      const recursion = decoder(digit, j + 1, string)
      i = recursion[0]
      tempString += recursion[1]
    } else {
      tempString += char
    }
  }
  const singleString = tempString
  while (k-- > 1) {
    tempString += singleString
  }
  return [i, tempString]
}
