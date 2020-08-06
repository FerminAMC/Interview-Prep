/**
 * Given a non-empty string of lowercase letters and a non-negative integer
 * representing a key, write a fnction that returns a new string obtained by
 * shifting every leter in the input string by k positions in the alphabet,
 * where k is the key.
 *
 * Note that the leeters should "wrap" around the alphabet; in other words, the
 * letter z shifted by one returns the letter a.
 *
 * string = 'xyz'
 * key = 2
 * result = 'zab'
 */

// O(n) time - O(n) space
function caesarCipherEncryptor(string, key) {
  let result = ''
  for (let i = 0; i < string.length; i++) {
    const wrappedKey = key % 26
    let decimalVal = string.charCodeAt(i) + wrappedKey
    if (decimalVal > 122) {
      decimalVal = (decimalVal + 96) % 122
    }
    result += String.fromCharCode(decimalVal)
  }
  return result
}
