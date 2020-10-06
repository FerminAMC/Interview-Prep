/**
 * A binary tree is named Even-Odd if it meets the following conditions:
 *    - The root of the binary tree is at level index 0, its children are at
 *      level index 1, their children are at level index 2, etc.
 *    - For every even-indexed level, all nodes at the level have odd integer
 *      values in strictly increasing order (from left to right).
 *    - For every odd-indexed level, all nodes at the level have even integer
 *      values in strictly decreasing order (from left to right).
 *
 * Given the root of a binary tree, return true if the binary tree is Even-Odd,
 * otherwise, return false.
 */
function isEvenOddTree(root) {
  let currentNode = root
  if (currentNode.val % 2 === 0) return false
  let level = 1
  const queue = []
  if (currentNode.left !== null) queue.push(currentNode.left)
  if (currentNode.right !== null) queue.push(currentNode.right)
  let childrenAtLevel = queue.length
  let prev = null
  while (queue.length) {
    let evenLevel = level % 2 === 0
    currentNode = queue.shift()
    childrenAtLevel--

    if (currentNode.left !== null) queue.push(currentNode.left)
    if (currentNode.right !== null) queue.push(currentNode.right)

    if (prev === null) {
      prev = currentNode.val
      if (evenLevel && prev % 2 === 0) return false
      else if (!evenLevel && prev % 2 !== 0) return false
    } else if (evenLevel) {
      if (prev >= currentNode.val) {
        return false
      } else if (currentNode.val % 2 === 0) return false
    } else if (!evenLevel) {
      if (prev <= currentNode.val) {
        return false
      } else if (currentNode.val % 2 !== 0) return false
    }
    prev = currentNode.val
    if (childrenAtLevel === 0) {
      level++
      prev = null
      childrenAtLevel = queue.length
    }
  }
  return true
}
