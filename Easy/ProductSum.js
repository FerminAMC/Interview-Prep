/**
 * Write a function that takes in a "special" array and returns its product sum.
 *
 * A "special" array is a non-empty array that contains either integers or other
 * "special" arrays. The product sum of a "special" array is the sum of its
 * elements, where "special" arrrays inside it are summed themselves and then
 * multiplied by their level of depth.
 *
 * The depth of a "special" array is how far nested it is. For instance, the
 * depth of [] is 1; the depth of the inner array in [[]] is 2; the depth of the
 * innermost array in [[[]]] is 3.
 *
 * Therefore, the product sum of [x, y] is x + y; the product sum of [x, [y, z]]
 * is x + 2 * (y + z); the product sum of [x, [y, [z]]] is x + 2 * (y + 3z)
 *
 * array = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
 * result = 12 // calculated as: 5 + 2 + 2*(7 - 1) + 3 + 2*(6 + 3*(-13 + 8) + 4)
 */

function productSum(array) {
  return specialSum(array, 0, 1)
}

// O(n) time - O(d) space - where d is the greatest depth reached in the
// "special" arrays in the array and n is the number of elements in the array,
// including sub-elements.
function specialSum(array, sum, depth) {
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] != 'number') {
      sum += depth * specialSum(array[i], 0, depth + 1)
    } else {
      sum += array[i] * depth
    }
  }
  return sum
}
