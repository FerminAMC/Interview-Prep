/*
You're gien an array of arrays where each subarray holds two integer values and
represents an item; the first integer is the item's value, and the second
integer is the item's weight. You're also given an integer representing the
maximum capacity of a knapsack that you have.

Your goal is to fit items in your knapsack without having the sum of their
weights exceed the knapsack's capacity, all the while maximizing their combined
value. Note that you only have one of each item at your disposal.

Write a function that returns the maximized combined value of the items that you
should pick as well as an array of the indices of each item picked.

If there are multiple combinations of items that maximize the total value in the
knapsack, your function can return any of them.
*/

/*
Values matrix looks as follows after the formulas have been applied:

        0  1  2  3  4  5  6  7  8  9  10
[]      0  0  0  0  0  0  0  0  0  0  0
[1, 2]  0  0  1  1  1  1  1  1  1  1  1
[4, 3]  0  0  1  4  4  5  5  5  5  5  5
[5, 6]  0  0  1  4  4  5  5  5  6  9  9
[6, 7]  0  0  1  4  4  5  5  6  6  9  10

O(c*i) Time | O(c*i) Space - where c is the capacity and i is the number of
items.
*/
function knapsackProblem(items, capacity) {
  const values = initializeValues(items, capacity)
  for (let i = 1; i <= items.length; i++) {
    const value = items[i - 1][0]
    const weight = items[i - 1][1]
    for (let j = 0; j <= capacity; j++) {
      if (weight <= j) {
        values[i][j] = Math.max(
          values[i - 1][j],
          values[i - 1][j - weight] + value,
        )
      } else {
        values[i][j] = values[i - 1][j]
      }
    }
  }
  return getItems(values, items)
}

function initializeValues(items, capacity) {
  const values = []
  for (let i = 0; i <= items.length; i++) {
    const row = new Array(capacity + 1).fill(0)
    values.push(row)
  }
  return values
}

function getItems(values, items) {
  let row = values.length - 1
  let col = values[0].length - 1
  const result = [values[row][col], []]
  while (values[row][col] !== 0) {
    if (values[row][col] === values[row - 1][col]) {
      row--
    } else {
      result[1].push(row - 1)
      row--
      col = col - items[row][1]
    }
  }
  return result
}
