/**
 * Given an array of positive integers representing coin denominations and a
 * single non-negative integer n representing a target amounnt of money, write
 * a function that returns the smalles number of coins needed to make change
 * for (to sum up to) that target amount using the given coin denominations.
 *
 * Note that you have access to an unlimited amount of coins. In other words,
 * if the denominations are [1, 5, 10], you have access to an unlimited amount
 * of 1s, 5s, and 10s.
 *
 * If it is impossible to make change for the target amount, return -1.
 */

/**
 * This was my first approach to this problem. It solved 14/15 test cases.
 * Definitely works most of the times, but there are some edge cases where it
 * doesn't perform as well. This was the case that failed:
 * n = 10
 * denoms = [1, 3, 10]
 *
 * O(d^2) Time | O(1) Space - where d is the number of coins given.
 */
function minNumberOfCoinsForChange(target, denoms) {
  if (target === 0) return 0
  denoms.sort((a, b) => a - b)
  console.log(denoms)
  let minCoins = Infinity
  let foundChange = false
  for (let i = denoms.length - 1; i >= 0; i--) {
    if (denoms[i] > target) continue
    let currentAmount = target
    let currentCoins = 0
    for (let j = i; j >= 0; j--) {
      currentCoins += Math.floor(currentAmount / denoms[j])
      currentAmount -= denoms[j] * Math.floor(currentAmount / denoms[j])
      if (currentAmount === 0) {
        foundChange = true
        minCoins = Math.min(currentCoins, minCoins)
      }
    }
  }

  return foundChange ? minCoins : -1
}

/**
 * This problem is very similar to the one of number of ways to make change. It
 * relies on making an array of size n+1 that stores the minimun number of coins
 * needed to give change. It looks like so:
 * n = 5
 * denoms = [1, 2, 5]
 * minWays = [0 -1 -1 -1 -1 -1]
 *
 * Once we have that array defined, we check if the current denomination is <=
 * to the current amount. If it is, we check that
 * minWays[currentAmount - denom] != -1. If it is equal to -1, it means that
 * there is no possible way to make change for that specific amount, so we
 * continue. Then we calculate the number of coins for the particular amount
 * like so: currentCoins = 1 + minWays[currentAmount - denom]. We use +1 because
 * that is the 1 coin we are using + whatever it takes us to make change for
 * currentAmount - denom.
 * O(dn) Time | O(n) Space - where n is the target amount given and d is the
 * number of coins in the denoms array.
 */
function minNumberOfCoinsForChange(n, denoms) {
  let minWays = new Array(n + 1).fill(-1)
  minWays[0] = 0
  for (let denom of denoms) {
    for (let currentAmount = 0; currentAmount < n + 1; currentAmount++) {
      if (denom <= currentAmount) {
        if (minWays[currentAmount - denom] === -1) continue
        let currentCoins = 1 + minWays[currentAmount - denom]
        if (minWays[currentAmount] === -1) {
          minWays[currentAmount] = currentCoins
        } else {
          minWays[currentAmount] = Math.min(
            currentCoins,
            minWays[currentAmount],
          )
        }
      }
    }
  }
  return minWays[n]
}
