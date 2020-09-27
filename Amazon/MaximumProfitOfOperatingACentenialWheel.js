/**
 * You are the operator of a Centennial Wheel that has four gondolas, and each
 * gondola has room for up to four people. You have the ability to rotate the
 * gondolas counterclockwise, which costs you runningCost dollars.
 *
 * You are given an array customers of length n where customers[i] is the
 * number of new customers arriving just before the ith rotation (0 - indexed).
 * This means you must rotate the wheel i times before customer[i] arrives.
 * Each customer pays boardingCost dollars when they board on the gondola
 * closest to the ground and will exit once that gondola reaches the ground
 * again.
 *
 * You can stop the wheel at any time, including before serving all customers.
 * If you decide to stop serving customers, all subsequent rotations are free
 * in order to get all the customers down safely. Note that if there are
 * currently more than four customers waiting at the wheel, only four will
 * board the gondola, and the rest will wait for the next rotation.
 *
 * Return the minimum number of rotations you need to perform to maximize your
 * profit. If there is no scenario where the profit is positive, return -1.
 *
 * Example 1:
 * Input: customers = [10,10,6,4,7], boardingCost = 3, runningCost = 8
 * Output: 9
 * Explanation:
 *  1. 10 customers arrive, 4 board and 6 wait, the wheel rotates. Current
 *     profit is 4 * $3 - 1 * $8 = $4.
 *  2. 10 customers arrive, 4 board and 12 wait, the wheel rotates. Current
 *     profit is 8 * $3 - 2 * $8 = $8.
 *  3. 6 customers arrive, 4 board and 14 wait, the wheel rotates. Current
 *     profit is 12 * $3 - 3 * $8 = $12.
 *  4. 4 customers arrive, 4 board and 14 wait, the wheel rotates. Current
 *     profit is 16 * $3 - 4 * $8 = $16.
 *  5. 7 customers arrive, 4 board and 17 wait, the wheel rotates. Current
 *     profit is 20 * $3 - 5 * $8 = $20.
 *  6. 4 board and 13 wait, the wheel rotates. Current profit is
 *     24 * $3 - 6 * $8 = $24.
 *  7. 4 board and 9 wait, the wheel rotates. Current profit is
 *     28 * $3 - 7 * $8 = $28.
 *  8. 4 board and 5 wait, the wheel rotates. Current profit is
 *     32 * $3 - 8 * $8 = $32.
 *  9. 4 board and 1 waits, the wheel rotates. Current profit is
 *     36 * $3 - 9 * $8 = $36.
 *  10. 1 board and 0 wait, the wheel rotates. Current profit is
 *     37 * $3 - 10 * $8 = $31.
 *  The highest profit was $36 after rotating the wheel 9 times.
 *
 * Example 2:
 * Input: customers = [3,4,0,5,1], boardingCost = 1, runningCost = 92
 * Output: -1
 * Explanation:
 *  1. 3 customers arrive, 3 board and 0 wait, the wheel rotates. Current
 *     profit is 3 * $1 - 1 * $92 = -$89.
 *  2. 4 customers arrive, 4 board and 0 wait, the wheel rotates. Current
 *     profit is 7 * $1 - 2 * $92 = -$177.
 *  3. 0 customers arrive, 0 board and 0 wait, the wheel rotates. Current
 *     profit is 7 * $1 - 3 * $92 = -$269.
 *  4. 5 customers arrive, 4 board and 1 waits, the wheel rotates. Current
 *     profit is 12 * $1 - 4 * $92 = -$356.
 *  5. 1 customer arrives, 2 board and 0 wait, the wheel rotates. Current
 *     profit is 13 * $1 - 5 * $92 = -$447.
 *  The profit was never positive, so return -1.
 *
 * Note:
 * In the examples that were given, it doesn't seem to matter how many people
 * are on top of the gondola, as long as they enter in batches of 4 at most.
 */
function minOperationsMaxProfit(customers, boardingCost, runningCost) {
  let minRotations = 0
  let maxProfit = 0
  let totalProfit = 0
  let customersAboard = 0
  let rotations = 0
  for (let i = 0; i < customers.length - 1; i++) {
    let currentCustomers = customers[i]
    rotations++
    if (currentCustomers > 4) {
      customers[i + 1] += currentCustomers - 4
      currentCustomers = 4
    }
    customersAboard += currentCustomers
    let currentProfit = customersAboard * boardingCost - rotations * runningCost
    totalProfit = currentProfit
    if (totalProfit > maxProfit) {
      minRotations = rotations
      maxProfit = totalProfit
    }
  }

  while (customers[customers.length - 1] > 0) {
    let currentCustomers = customers[customers.length - 1]
    rotations++
    if (currentCustomers > 4) {
      customers[customers.length - 1] -= 4
      currentCustomers = 4
    } else {
      customers[customers.length - 1] -= currentCustomers
    }
    customersAboard += currentCustomers
    let currentProfit = customersAboard * boardingCost - rotations * runningCost
    totalProfit = currentProfit
    if (totalProfit > maxProfit) {
      minRotations = rotations
      maxProfit = totalProfit
    }
  }
  return minRotations === 0 ? -1 : minRotations
}
