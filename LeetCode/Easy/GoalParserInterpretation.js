/*
Link: https://leetcode.com/problems/goal-parser-interpretation/
You own a Goal Parser that can interpret a string command. The command consists
of an alphabet of "G", "()" and/or "(al)" in some order. The Goal Parser will
interpret "G" as the string "G", "()" as the string "o", and "(al)" as the
string "al". The interpreted strings are then concatenated in the original
order.

Given the string command, return the Goal Parser's interpretation of command.
*/

const interpret = (command) => {
  let result = ''
  for (let i = 0; i < command.length; i++) {
    const currentLetter = command[i]
    const nextLetter = command[i + 1]
    if (currentLetter === 'G') {
      result += currentLetter
    } else if (nextLetter === 'a') {
      result += 'al'
      i += 3
    } else {
      result += 'o'
      i++
    }
  }
  return result
}
