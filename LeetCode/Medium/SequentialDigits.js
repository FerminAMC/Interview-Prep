/**
 * Link: https://leetcode.com/problems/sequential-digits/
 * An innteger has sequential digits if and only if each digit in the number is
 * one more than the previous digit.
 *
 * Return a sorted list of all the integers in the range [low, high] inclusive
 * that have sequential digits.
 *
 * Example 1:
 * low = 100, high = 300
 * result = [123, 234]
 */

function sequentialDigits(low, high) {
  const maxSequential = '123456789'
  const sequentialDigits = []
  let lowNumDigits = Math.floor(Math.log10(low) + 1)
  const highNumDigits = Math.floor(Math.log10(high) + 1)

  let start = 0
  while (lowNumDigits <= highNumDigits) {
    const end = start + lowNumDigits
    if (end > maxSequential.length) {
      lowNumDigits++
      start = 0
      continue
    }
    const currentSequentialNum = parseInt(maxSequential.slice(start, end))
    if (currentSequentialNum > high) break
    if (currentSequentialNum >= low && currentSequentialNum <= high) {
      sequentialDigits.push(currentSequentialNum)
    }
    start++
  }

  return sequentialDigits
}
