/*
Link: https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/
Given an integer n, return the decimal value of the binary string formed by
concatenating the binary representations of 1 to n in order, modulo 10^9 + 7.

In order to better understand the third step, convertBinaryToNum, please check
problem Convert Binary Number in a Linked List to Integer in the "Easy" folder.
*/
const MOD = 1000000007
// O(nlog(n))
const concatenatedBinary = (n) => {
  let result = 0
  for (let i = 1; i <= n; i++) {
    let numInBinary = convertNumToBinary(i)
    result = convertBinaryToNum(numInBinary, result)
  }
  return result
}

// O(log(n)) Time - where n is the size of number
const convertNumToBinary = (number) => {
  let binaryNumber = ''
  while (number > 0) {
    if (number % 2 === 0) {
      binaryNumber = '0' + binaryNumber
    } else {
      binaryNumber = '1' + binaryNumber
    }
    number = Math.floor(number / 2)
  }
  return binaryNumber
}

// O(n) Time - where n is the length of the binaryNumString
const convertBinaryToNum = (binaryNumString, currentCount) => {
  for (let i = 0; i < binaryNumString.length; i++) {
    const currentBit = parseInt(binaryNumString[i])
    currentCount = (currentCount * 2 + currentBit) % MOD
  }
  return currentCount
}
