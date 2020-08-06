/**
 * You're given an array of integers and an integer. Write a function that
 * moves all instances of that integer in the array to the end of the array
 * and returns the array.
 *
 * The function should perform this in place and doesn't need to maintain the
 * order of the other integers.
 *
 * array = [2, 1, 2, 2, 2, 3, 4, 2]
 * toMove = 2
 * result = [1, 3, 4, 2, 2, 2, 2, 2] - the numbers 1, 3, and 4 can be in a
 * different order.
 */

// Solution 1
// O(n) time - O(1) space
function moveElementToEnd(array, toMove) {
  let lastMove = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] === toMove) {
      lastMove = i
      while (array[i] === toMove && i < array.length - 1) {
        i++
        if (array[i] != toMove) {
          array[lastMove] = array[i]
          array[i] = toMove
          lastMove++
        }
      }
    }
  }
  return array
}

// Solution 2. This solution plays with indexes in the same was is in
// Two Number Sum
// O(n) time - O(1) space
function moveElementToEnd(array, toMove) {
  let left = 0
  let right = array.length - 1
  while (left < right) {
    while (left < right && array[right] === toMove) right--
    if (array[left] === toMove && left != right) {
      array[left] = array[right]
      array[right] = toMove
    }
    left++
  }
  return array
}
