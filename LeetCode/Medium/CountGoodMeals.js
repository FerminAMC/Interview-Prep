/*
Link: https://leetcode.com/problems/count-good-meals/
A good meal is a meal that contains exactly two different food items with a sum
of deliciousness equal to a power of two.

You can pick any two different foods to make a good meal.

Given an array of integers deliciousness where deliciousness[i] is the
deliciousness of the i​​​​​​th​​​​​​​​ item of food, return the number of different good meals
you can make from this list modulo 109 + 7.

Note that items with different indices are considered different even if they
have the same deliciousness value.
*/

const countPairs = (deliciousness) => {
  let counter = 0
  for (let i = 0; i < deliciousness.length; i++) {
    for (let j = i + 1; j < deliciousness.length; j++) {
      const currentSum = deliciousness[i] + deliciousness[j]
      if (currentSum % 2 === 0 || currentSum !== 0) {
        const hammingWeight = currentSum & (currentSum - 1)
        if (currentSum !== 0 && hammingWeight === 0) {
          counter++
        }
      }
    }
  }
  return counter
}
