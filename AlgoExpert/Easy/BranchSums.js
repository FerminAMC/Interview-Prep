/**
 * Wwrite a function that takes in a Binary Tree and returns a list of its
 * branch sums ordered from leftmost branch sum to rightmost branch sum.
 * A branch sum is the sum of all values in a Binary Tree branch. A Binary Tree
 * branch is a path of nodes in a tree that starts at the root node and ends at
 * any leaf node.
 *
 * tree =                     1
 *                          /   \
 *                         2     3
 *                       /  \   / \
 *                     4     5 6   7
 *                   /  \   /
 *                  8   9  10
 *
 * result = [15, 16, 18, 10, 11]
 * 15 == 1 + 2 + 4 + 8
 * 16 == 1 + 2 + 4 + 9
 * 18 == 1 + 2 + 5 + 10
 * 10 == 1 + 3 + 6
 * 11 == 1 + 3 + 7
 */

function branchSums(root) {
  const result = []
  branchSum(root, 0, result)
  return result
}

// O(n) time - O(n) space
function branchSum(node, sum, array) {
  if (node == null) return

  const currentSum = sum + node.value

  if (node.left == null && node.right == null) {
    array.push(currentSum)
    return
  }

  branchSum(node.left, currentSum, array)
  branchSum(node.right, currentSum, array)
}
