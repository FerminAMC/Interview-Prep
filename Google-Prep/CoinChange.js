/*
You are given coins of different denominations and a total amount of money
amount. Write a function to compute the fewest number of coins that you need to
make up that amount. If that amount of money cannot be made up by any
combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example: 
    Input: coins = [1,2,5], amount = 11
    Output: 3
    Explanation: 11 = 5 + 5 + 1
*/

const coinChange = (coins, amount) => {
    if (amount === 0) return 0;
    let dpArr = new Array(amount + 1).fill(-1);
    dpArr[0] = 0;
    let minCoins = Infinity;
    for (let coin of coins) {
        for (let i = 1; i <= amount; i++) {
            if (coin > i) continue;
            let substraction = i - coin;
            if (dpArr[substraction] === -1) continue;
            let possibleChange = 1 + dpArr[substraction];
            if (dpArr[i] === -1) {
                dpArr[i] = possibleChange;
            } else {
                dpArr[i] = Math.min(dpArr[i], possibleChange);
            }
        }
    }
    return dpArr[amount];
}