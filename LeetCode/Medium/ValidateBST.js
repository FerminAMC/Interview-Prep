/**
 * Link: -
 * Given a binary tree, determine if it is a valid BST.
 *
 * Assume a BST is defined as follows:
 *    - The left subtree of a node contains only nodes with keys less than the
 *      node's key.
 *    - The right subtree of a node contains only nodes with keys greater than
 *      the node's key.
 *    - Both the left and right subtrees must also be BSTs.
 */

// O(n) Time | O(n) Space - where n is the number of nodes in the tree.
function isValidBST(root) {
  return validBSTHelper(root, [])
}

function validBSTHelper(head, array) {
  if (head === null) return true
  const left = validBSTHelper(head.left, array)
  array.push(head.val)
  if (array.length > 1 && array[array.length - 1] <= array[array.length - 2]) {
    return false
  }
  const right = validBSTHelper(head.right, array)
  return left && right
}
