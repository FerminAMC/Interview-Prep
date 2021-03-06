/**
 * The distance between a node in a Binary Tree and the tree's root is called
 * the node's depth. Write a function that takes in a Binary Tree and returns
 * the sum of its nodes' depths.
 * tree =                     1
 *                          /   \
 *                         2     3
 *                       /  \   / \
 *                     4     5 6   7
 *                   /  \
 *                  8   9
 * result = 16
 */

function nodeDepths(root) {
  const depthSum = nodeDepth(root, 0)
  return depthSum
}

function nodeDepth(node, depth) {
  if (node == null) return 0

  return (
    depth + nodeDepth(node.left, depth + 1) + nodeDepth(node.right, depth + 1)
  )
}

// O(n) time - O(h) space - where n is the number of nodes in the tree and h is
// the height of the tree
function nodeDepths(root) {
  const queue = []
  let depth = 0
  let sum = 0
  queue.push(root)
  let levelNodes = queue.length
  while (queue.length > 0) {
    const currentNode = queue.shift()
    levelNodes--
    if (currentNode.left) {
      queue.push(currentNode.left)
    }
    if (currentNode.right) {
      queue.push(currentNode.right)
    }
    if (levelNodes == 0) {
      depth++ // 1
      levelNodes = queue.length // 2
      sum += depth * levelNodes // 2
    }
  }
  return sum
}
