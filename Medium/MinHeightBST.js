/**
 * Write a function that takes in a non-empty array of distinct integers,
 * constructs a BST from the integers, and returns the root of the BST.
 *
 * The function should minimize the height of the BST
 */

/**
 * This solution uses the insert method in the BST class, which has a time
 * complexity of O(log(n)), so the whole time complexity of the minHeightBst
 * solution is of O(nlog(n)).
 */
function minHeightBst(array) {
  let left = 0
  let right = array.length - 1
  return constructBST(array, null, left, right)
}

function constructBST(array, tree, left, right) {
  if (left > right) return null

  const midIdx = Math.floor((right + left) / 2)
  const midVal = array[midIdx]
  if (tree === null) {
    const tree = new BST(midVal)
  } else {
    tree.insert(midVal)
  }
  constructBST(array, tree, left, midIdx - 1)
  constructBST(array, tree, midIdx + 1, right)
  return tree
}

// O(n) Time - O(n) Space
// This version doesn't use the inster method of the BST class, cutting down the
// time complexity to O(n) from O(nlog(n))
function minHeightBst(array) {
  return constructBST(array, null, 0, array.length - 1)
}

function constructBST(array, bstNode, left, right) {
  if (left > right) return null

  const midIdx = Math.floor((right + left) / 2)
  const midVal = array[midIdx]
  const newBstNode = new BST(midVal)

  if (bstNode === null) {
    bstNode = newBstNode
  } else {
    if (midVal > bstNode.value) {
      bstNode.right = newBstNode
      bstNode = bstNode.right
    } else if (midVal < bstNode.value) {
      bstNode.left = newBstNode
      bstNode = bstNode.left
    }
  }

  constructBST(array, bstNode, left, midIdx - 1)
  constructBST(array, bstNode, midIdx + 1, right)
  return bstNode
}

// Iterative version
function minHeightBst(array) {
  let newLen = Math.floor(array.length / 2)
  const tree = new BST(array[newLen])
  array.splice(newLen, 1)
  while (array.length) {
    while (newLen !== 0) {
      newLen = Math.floor(newLen / 2)
      tree.insert(array[newLen])
      array.splice(newLen, 1)
    }
    newLen = array.length
  }
  return tree
}
