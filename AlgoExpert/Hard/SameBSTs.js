/*
An array of integers is said to represent the Binary Search Tree (BST) obtained
by inserting each integer in the array, from left to right, into the BST.

Write a function that takes in two arrays of integers and determines whether
these arrays represent the same BST. Note that you're not allowed to construct
any BSTs in your code.

A BST is a Binary Tree thar consists only of BST nodes. A node is said to be a
valid BST node if and only if it satisfies BST property: 
its value is strictly greater than the values of every not to its left; its
value is less than or equal to the values of every node to its right; and its
children nodes are either valid BST nodes themselves or null.
*/
function sameBsts(arrayOne, arrayTwo) {
  return sameBstsHelper(arrayOne, arrayTwo)
}

// O(n^2) Time | O(n^2) Space - where n is the number of elements in the largest
// array.
function sameBstsHelper(arrayOne, arrayTwo) {
  if (arrayOne.length === 0 && arrayTwo.length === 0) return true
  if (arrayOne.length === 0 || arrayTwo.length === 0) return false
  const rootOne = arrayOne.shift()
  const rootTwo = arrayTwo.shift()
  let leftSide
  let rightSide
  if (rootOne === rootTwo && arrayOne.length === arrayTwo.length) {
    const leftSideOne = buildLeftSide(rootOne, arrayOne)
    const leftSideTwo = buildLeftSide(rootTwo, arrayTwo)
    const rightSideOne = buildRightSide(rootOne, arrayOne)
    const rightSideTwo = buildRightSide(rootTwo, arrayTwo)
    leftSide = sameBstsHelper(leftSideOne, leftSideTwo)
    rightSide = sameBstsHelper(rightSideOne, rightSideTwo)
  } else {
    return false
  }
  return leftSide && rightSide
}

function buildLeftSide(value, array) {
  const leftSide = []
  for (const currVal of array) {
    if (currVal < value) {
      leftSide.push(currVal)
    }
  }
  return leftSide
}

function buildRightSide(value, array) {
  const rightSide = []
  for (const currVal of array) {
    if (currVal >= value) {
      rightSide.push(currVal)
    }
  }
  return rightSide
}
