/**
 * The Fibonacci sequenc is defined as follows: the first number of the sequence
 * is 0, the second number is 1, and the nth number is the sum of the (n-1)th
 * and (n-2)th numbers. Write a function that takes an integer n and returns the
 * nth Fibonacci number.
 *
 * n = 1
 * result = 0
 *
 * n = 2
 * result = 1 // 0, 1
 *
 * n = 6
 * result = 5 // 0, 1, 1, 2, 3, 5
 */

// Iterative solution
// O(n) time - O(n) space
function getNthFib(n) {
  const sequence = [0, 1]
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2])
  }
  return sequence[n - 1]
}

// Iterative solution with constant memory
// O(n) time - O(1) space
function getNthFib(n) {
  const lastTwo = [0, 1]
  for (let i = 2; i < n; i++) {
    const nthFib = lastTwo[0] + lastTwo[1]
    lastTwo[0] = lastTwo[1]
    lastTwo[1] = nthFib
  }
  return n > 1 ? lastTwo[1] : lastTwo[0]
}

// Recursive solution with memoization
// O(n) time - O(n) space
function getNthFib(n, sequence = {1: 0, 2: 1}) {
  if (sequence[n]) {
    return sequence[n]
  } else {
    sequence[n] = getNthFib(n - 1, sequence) + getNthFib(n - 2, sequence)
    return sequence[n]
  }
}
