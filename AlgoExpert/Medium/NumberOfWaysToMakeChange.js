/**
 * Given an array of distinct positive integers representing coin denominations
 * and a single non-negative integer n representing a target amount of money,
 * write a function that returns the number of ways to make change for that
 * target amount using the given coin denominations.
 *
 * Note that an unlimited amount of coins is at your disposal.
 */

/**
 * The formula to solve this problem is:
 *    if(currentCoin <= currentAmount):
 *        ways[currentAmount] += ways[currentAmount - currentCoin]
 *
 * The reason the index is currentAmount - currentCoin is because that
 * will jump to the part of the ways array were we calculated the number of
 * ways to make change for amount - coin.
 * O(nd) Time | O(n) Space - where n is the target amount of money and d is the
 * number of different coin denominations.
 */
function numberOfWaysToMakeChange(n, denoms) {
  let numWays = new Array(n + 1).fill(0)
  numWays[0] = 1
  for (let i = 0; i < denoms.length; i++) {
    for (let amount = 1; amount < numWays.length; amount++) {
      if (denoms[i] <= amount) {
        numWays[amount] += numWays[amount - denoms[i]]
      }
    }
  }
  return numWays[n]
}
