/*
Write a function that takes an unsigned integer and returns the number of '1'
bits it has (also known as the Hamming weight).

Note:

Note that in some languages such as Java, there is no unsigned integer type.
In this case, the input will be given as a signed integer type. It should not
affect your implementation, as the integer's internal binary representation is
the same, whether it is signed or unsigned.
In Java, the compiler represents the signed integers using 2's complement
notation. Therefore, in Example 3 above, the input represents the signed
integer. -3.

Follow up: 

If this function is called many times, how would you optimize it?

Interesting read:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

In the parameters section, you can pass parameters to convert numbers to a
certain base. For example, n.toString(2) will convert n to base 2 (binary).
If n == 11, n.toString(2) = '1011'

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND

The bitwise AND operator (&) returns a 1 in each bit position for which the corresponding bits of both operands are 1s.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift

Helps understand what unsigned right shift (>>>) does
*/

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
// O(n) Time | O(1) Space - where n is the size of the number in base 2
// Naive approach that checks through all the bits, counting all set bits
const hammingWeight = (n) => {
  const DEBUG = true
  let count = 0
  while (n !== 0) {
    if (DEBUG) {
      console.log(n.toString(2))
    }
    count += n & 1
    n = n >>> 1
  }
  return count
}

// O(log(n)) Time | O(1) Space
// This solution uses Brian Kernighan's bit count algorithm
// Explanation here: https://www.youtube.com/watch?v=KJnhAUkxAho
const hammingWeight = (n) => {
  const DEBUG = true
  let count = 0
  while (n !== 0) {
    if (DEBUG) {
      console.log('n = ', n)
      console.log('n in loop %d :', count, n.toString(2))
      console.log('n - 1 in loop %d :', count, (n - 1).toString(2))
      console.log('-----------------')
    }
    n = n & (n - 1)
    count++
  }
  return count
}
