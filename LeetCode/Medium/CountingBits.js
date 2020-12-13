/*
Link: https://leetcode.com/problems/counting-bits/
Given a non negative integer number num. For every numbers i in the range
0 ≤ i ≤ num calculate the number of 1's in their binary representation and
return them as an array.

Example input:
Input: 5
Output: [0,1,1,2,1,2]

Explanation:
0 in binary has no 1s
1 in binary has one 1
2 in binary has one 1
3 in binary has two 1s
4 in binary has one 1
5 in binary has two 1s

Follow up: 
It is very easy to come up with a solution with run time O(n*sizeof(integer)).
But can you do it in linear time O(n) /possibly in a single pass?
Space complexity should be O(n).
Can you do it like a boss? Do it without using any builtin function like
__builtin_popcount in c++ or in any other language.
*/

/**
 * @param {number} num
 * @return {number[]}
 */
// O(nlog(k)) Time | O(n) Space - where n is the ranage of 0 to num inclusive
// and k is the number of bits in every number in that range
const countBits = (num) => {
  const resultArray = new Array(num + 1)
  resultArray[0] = 0
  for (let i = 1; i <= num; i++) {
    resultArray[i] = hammingWeight(i)
  }
  return resultArray
}

// For information regarding Hamming Weight, please check problem NumberOf1Bits
// in the LeetCode/Easy folder
// O(log(n)) Time | O(1) Space - where n is the number of bits in num
const hammingWeight = (num) => {
  let counter = 0
  while (num !== 0) {
    num = num & (num - 1)
    counter++
  }
  return counter
}

// ----------------------------------------------------------------------------
// Algorithm:
// Suppose we have an integer: x = (1001011101)base2 = (605)base10
// and we already calculated and stored all the results of 0 to x - 1.
// Then we know that x is different by one bit with a number we already
// calculated: x' = (1011101)base2 = (93)base10
// They are different only in the most significant bit.
// A similar technique can be applied for the least significant bit.
// DP + Least Significant Bit:
// x = (1001011101)base2 = (605)base10
// x'= (100101110)base2 = (302)base10
// So at x we have the same amount of set bits as in x' + 1
// P(x) = P(x & (x - 1)) + 1
// This uses the same principle as in the Brian Kernighan's bit count algorithm
const countBits = (num) => {
  const DEBUG = true
  const result = new Array(num + 1)
  result[0] = 0
  for (let i = 1; i <= num; i++) {
    if (DEBUG) {
      console.log('Loop %d:', i, 'i & (i - 1) =', i & (i - 1))
      console.log('%d in base 2:', i, i.toString(2))
      console.log('%d - 1 base 2:', i, (i - 1).toString(2))
      console.log('-----------------')
    }
    result[i] = result[i & (i - 1)] + 1
  }
  return result
}
