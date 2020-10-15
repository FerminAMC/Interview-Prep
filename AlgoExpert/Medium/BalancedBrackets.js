/**
 * Write a function that takes in a string made up of brackets ( (), [], {} )
 * and other optional characters. The function should return a boolean
 * representing whether the string is balanced with regards to brackets.
 *
 * A string is said to be balanced if it has as many opening brackets of a
 * certain type as it has closing brackets of that type and if no bracket is
 * unmatched. Note that an opening bracket can't match a corresponding that
 * comes after it. Also, brackets can't overlap each other as in [(]).
 */

/**
 * So, the first idea that comes to mind is to use a stack for this problem.
 * I want to cycle through the string and if I encounter an opening bracket,
 * I add it to the stack. If I encounter a closing bracket, I pop an element
 * from the stack and check if it is the corresponding opening bracket. If
 * it is, I move one, otherwise, I return false.
 * I think I can make another function to get the opening bracket and make the
 * code look a bit cleaner.
 * In order to avoid the case when we don't close all brackets, at the end I
 * check if the stack is empty. If it is, it means all brackets were closed,
 * otherwise, some remained opened.
 * O(n) Time | O(n) Space - where n is the size of the string.
 */
function balancedBrackets(string) {
  const stack = []
  for (let i = 0; i < string.length; i++) {
    let currentChar = string[i]
    if (currentChar === '(' || currentChar === '[' || currentChar === '{') {
      stack.push(currentChar)
    } else if (
      currentChar === ')' ||
      currentChar === ']' ||
      currentChar === '}'
    ) {
      let charRetrieved = stack.pop()
      let expectedBracket = openingBracket(currentChar)
      if (charRetrieved !== expectedBracket) {
        return false
      }
    }
  }
  return stack.length === 0
}

function openingBracket(char) {
  let openingBracket = ''
  switch (char) {
    case ')':
      openingBracket = '('
      break
    case ']':
      openingBracket = '['
      break
    case '}':
      openingBracket = '{'
      break
    default:
      break
  }
  return openingBracket
}
