/**
 * Write a function that takes in a binary tree and inverts it. In other words,
 * the function should swap every left node in the tree for its corresponding
 * right node.
 */

// O(n) Time - O(d) Space - where n is the number of nodes and d is the depth of
// the tree
function invertBinaryTree(tree) {
  const newTree = treeInverter(tree, null)
  tree.left = newTree.left
  tree.right = newTree.right
}

function treeInverter(originalTree, newTree) {
  if (originalTree === null) return null

  newNode = new BinaryTree(originalTree.value)
  newTree = newNode
  newTree.left = treeInverter(originalTree.right, newTree.left)
  newTree.right = treeInverter(originalTree.left, newTree.right)

  return newTree
}
