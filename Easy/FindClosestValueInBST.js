/**
 * Function that takes in a Binary Search Tree (BST) and a target integer value
 * and returns the closest value to that target value contained in the BST.
 *
 * Each BST node has an integer value, a left child node, and a right child node
 *
 * tree =  10
 *       /    \
 *      5      15
 *     / \    /  \
 *    2   5  13   22
 *   /         \
 *  1          14
 *
 * target = 12
 * result = 13
 */

function findClosestValueInBst(tree, target) {
  let closest = tree.value
  let current = tree.value
  let nextNode = tree
  while (true) {
    if (closest == target) return target
    nextNode = current < target ? nextNode.right : nextNode.left
    if (nextNode == null) break
    current = nextNode.value
    if (Math.abs(closest - target) > Math.abs(current - target)) {
      closest = nextNode.value
    }
  }
  return closest
}
