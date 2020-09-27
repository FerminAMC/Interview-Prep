/**
 * Write a function that takes in two strings and returns the minimum number
 * of edit operations that need to be performed on the first string to obtain
 * the second string.
 *
 * There are three edit operations: insertion of a character, deletion of a
 * character, and substitution of a character for another character.
 */

/**
 * In order to solve this problem we have to use dynamic programming, with a
 * matching table of size str1.length + 1 x str2.length + 1. The first row and
 * col of the table will have starting values of 0 to n. Once that table has
 * been created, the rule fo fill every other square in the table is the
 * following: if(str1[row - 1] === str2[col - 1]) then we take the value of the
 * topLeft corner adjacent to the current position in the table, otherwise, we
 * take whatever value is smallest around the position, either left, top or the
 * top left corner and to that value we add 1, symbolizing the shift that has
 * be made at that position.
 * After filling the entire matching table, we end up with a table like the
 * following:
 *
 *       ""  y  a  b  d
 *   "" [ 0, 1, 2, 3, 4 ],
 *    a [ 1, 1, 1, 2, 3 ],
 *    b [ 2, 2, 2, 1, 2 ],
 *    c [ 3, 3, 3, 2, 2 ]
 *
 * The answer to the problem will be at the bottom right corner of the matrix.
 * All we have to do then is return that value.
 */
function levenshteinDistance(str1, str2) {
  const matchTable = initializeTable(str1, str2)
  for (let row = 1; row <= str1.length; row++) {
    const currentStr1 = str1[row - 1]
    for (let col = 1; col <= str2.length; col++) {
      const currentStr2 = str2[col - 1]
      const leftVal = matchTable[row][col - 1]
      const topVal = matchTable[row - 1][col]
      const topLeftVal = matchTable[row - 1][col - 1]
      if (currentStr1 === currentStr2) {
        matchTable[row][col] = topLeftVal
      } else {
        matchTable[row][col] = Math.min(leftVal, topVal, topLeftVal) + 1
      }
    }
  }
  return matchTable[str2.length][str1.length]
}

function initializeTable(str1, str2) {
  const matchTable = []
  for (let i = 0; i <= str1.length; i++) {
    const currentRow = new Array(str2.length + 1).fill(0)
    matchTable.push(currentRow)
  }
  // Filling row 1
  for (let i = 1; i <= str2.length; i++) {
    matchTable[0][i] = matchTable[0][i - 1] + 1
  }
  // Filling column 1
  for (let i = 1; i <= str1.length; i++) {
    matchTable[i][0] = matchTable[i - 1][0] + 1
  }
  return matchTable
}
