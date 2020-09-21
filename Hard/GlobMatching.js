/**
 * Glob Matching:
 *
 * In most modern-day computers, glob patterns are used to refer to multiple
 * file names on the computer's system at once.
 *
 * Glob patterns typically take advantage of the following two special
 * characters:
 *    * Wildcards, represented by the * symbol, which match any number of
 *      characters, including zero characters.
 *    * Question marks, represented by the ? symbol, which match any single
 *      character (exactly one).
 * For example, the glob pattern "*.js" matches any file name ending in the
 * JavaScript .js extension.
 *
 * Write a function that takes in a file name and a pattern (both strings) and
 * returns whether that file name matches the pattern
 */

/**
 * fileName = "abcdefg"
 * pattern = "a*e?g"
 * matchTable =
 *          ""     a      *      e      ?      g
 *   "" [ true,  false, false, false, false, false ],
 *   a  [ false, true,  true,  false, false, false ],
 *   b  [ false, false, true,  false, false, false ],
 *   c  [ false, false, true,  false, false, false ],
 *   d  [ false, false, true,  false, false, false ],
 *   e  [ false, false, true,  true,  false, false ],
 *   f  [ false, false, true,  false, true,  false ],
 *   g  [ false, false, true,  false, false, true  ]
 *
 * This is a dynamic programming problem. If we try to solve it via the
 * brute-force way, we will hit a wall and probably never solve it.
 *
 * The optimal way to solve this is with an (n + 1) x (m + 1) matrix, where n
 * and m are the lengths of the fileName and pattern strings respectively. We
 * fill all values in the matrix with false, except for (0, 0) which is the
 * base case and is set to true. Additionally, the first row in the matchTable
 * we check if we have a '*' in the pattern[j - 1]. If we do, we set
 * matchTable[0][j] = matchTable[0][j-1].
 *
 * Now that the matchTable has been initialized, we can iterate through the
 * entire table. Since the first row and column represent empty strings, we
 * start from row = 1 and col = 1. We have three possible scenarios:
 *    1) pattern[j - 1] === '*': we set matchTable[i][j] to true if
 *        matchTable[i][j - 1] === true || matchTable[i - 1][j] === true,
 *        otherwise, we set the value to false
 *    2) pattern[j - 1] === '?': matchTable[i][j] = matchTable[i - 1][j - 1]
 *    3) pattern[j - 1] === fileName[i - 1]: we do the same as in case 2
 * If none of those cases are fulfilled, we just leave matchTable[i][j] as is.
 *
 * After the table has been completely filled with the previously mentioned
 * rules, we simply return matchTable[fileName.length][pattern.length]
 *
 * O(n*m) Time | O(n*m) Space
 */
function globMatching(fileName, pattern) {
  const matchTable = initializeTable(fileName, pattern)
  for (let i = 1; i <= fileName.length; i++) {
    for (let j = 1; j <= pattern.length; j++) {
      if (pattern[j - 1] === '*') {
        matchTable[i][j] = matchTable[i][j - 1] || matchTable[i - 1][j]
      } else if (pattern[j - 1] === '?' || pattern[j - 1] === fileName[i - 1]) {
        matchTable[i][j] = matchTable[i - 1][j - 1]
      }
    }
  }
  return matchTable[fileName.length][pattern.length]
}

function initializeTable(fileName, pattern) {
  const matchTable = []
  for (let i = 0; i <= fileName.length; i++) {
    const row = []
    for (let j = 0; j <= pattern.length; j++) {
      row.push(false)
    }
    matchTable.push(row)
  }
  matchTable[0][0] = true
  for (let j = 1; j <= pattern.length; j++) {
    if (pattern[j - 1] === '*') matchTable[0][j] = matchTable[0][j - 1]
  }
  return matchTable
}
