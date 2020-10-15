/**
 * Min coin change... You've solved this before, you better be able to do it
 * again hehe.
 *
 * The way to solve this is by solving smaller problems. With the given coins,
 * how do I give the minimum change for 0, 1, 2, ..., n
 * This will probably need to be stored in an array of size n. n + 1 since I
 * want to count 0.
 * The minimum change for 0 is 0
 * So the array can look like this:
 * coins = [1, 2, 5]
 * amount = 11
 * expected result = 3
 * minChange = []
 *
 * Since I am asked to return -1 in case there is no change, I'll fill the whole
 * minChange array with -1, assuming that there is no change for any amount
 * except 0
 * Now I want to cycle through every different coin I have, checking how I can
 * make change for every amount
 *
 * So first coin is 1 and amount == 1
 * amountRemaining = coin(1) - amount(1) = 0
 * minChange[1] = 1 (because we used one coin in previous step, 1-1) +
 *                minChange(amountRemaining)
 *
 * So on the first pass, the array should look like so:
 * minChange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 *
 * Before changing the array, I want to make sure that I actually keep the min
 * change for that particular amount
 * I also want to check for the case were there is no change
 * I only take a look at the coin when I now it is smaller or equal to the
 * amount, otherwise, I skip it.
 *
 * The time complexity of this is O(ca) were c is the number of coins and a is
 * the amount, since I created an array of size amount+1 and loop through it.
 * Space complexity is O(a) where a is the amount given
 */

function coinChange(coins, amount) {
  const minChange = new Array(amount + 1).fill(-1)
  minChange[0] = 0
  for (let coin of coins) {
    for (let n = 1; n < minChange.length; n++) {
      if (coin <= n) {
        let amountRemaining = n - coin
        // This means that there is no way to make change for that coin and amount
        if (minChange[amountRemaining] === -1) continue
        let currentChange = 1 + minChange[amountRemaining]
        // In the first pass, the minChange[amount] will be -1 so
        // Math.min won't work.
        if (minChange[n] === -1) {
          minChange[n] = currentChange
        } else {
          minChange[n] = Math.min(minChange[n], currentChange)
        }
      }
    }
  }
  return minChange[amount]
}
