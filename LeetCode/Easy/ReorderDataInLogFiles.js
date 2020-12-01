/**
 * Link: https://leetcode.com/problems/reorder-data-in-log-files/
 * You have an array of logs. Each log is a space delimited string of words.
 *
 * For each log, the first word is an alphanumeric identifier. Then, either:
 *    Each word after the identifier will consist only of lowercase letters.
 *    Each word after the identifier will consist only of digits.
 *
 * We will call these two varieties of logs letter-logs and digit-logs. It is
 * guaranteed that each log has at least one word after its identifier.
 *
 * Reorder the logs so that all of the letter-logs come before any digit-logs.
 * The letter-logs are ordered alphabetically, ignoring the identifier. If both
 * logs have the same value, then the identifier has to be taken into account.
 *
 * The digit-logs must remain in the same order.
 * logs = ["dig1 8 1","let1 art can","dig2 3 6","let2 own kit","let3 art zero"]
 * out = ["let1 art can","let3 art zero","let2 own kit","dig1 8 1","dig2 3 6"]
 */

// The trick here was to know how to use the compare function of the language
// built in sort function.
// When string 1, represented by 'a' has to come before string 2, represented
// by 'b', we must return -1.
// When 'a' has to come after 'b', we must return 1.
// When 'a' and 'b' should remain in place, we return 0.
// That is what is being done in the compare function for
// Array.sort([compareFunction])

// O(n log(n)) Time | O(1) Space
// Time complexity is like that due to the sort function in javascript.
// Space complexity is constant because all changes are done in-place
var reorderLogFiles = function (logs) {
  logs.sort(function (a, b) {
    const firstPair = a.split(/ (.+)/)
    const secondPair = b.split(/ (.+)/)
    const isNumber1 = isNumberLog(firstPair[1])
    const isNumber2 = isNumberLog(secondPair[1])
    if (!isNumber1 && !isNumber2) {
      const compareResult = firstPair[1].localeCompare(secondPair[1])
      if (compareResult != 0) {
        return compareResult
      } else {
        return firstPair[0].localeCompare(secondPair[0])
      }
    } else if (!isNumber1 && isNumber2) {
      return -1
    } else if (isNumber1 && !isNumber2) {
      return 1
    } else return 0
  })

  return logs
}

let isNumberLog = function (log) {
  const firstValCode = log[0].charCodeAt()
  if (firstValCode > 47 && firstValCode < 58) {
    return true
  } else {
    return false
  }
}
