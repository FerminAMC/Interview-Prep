/*
Write a function that takes in a Binary Tree (where nodes have an additional
pointer to their parent node) and traverses it iteratively using the in-order
tree-traversal technique; the traversal should specifically not use recursion.
As the tree is being traversed, a callback function passed in as an argument to
the main function should be called on each node (i.e., callback(currentNode)).

Each BinaryTree node has an integer value, a parent node, a left child node, and
a right child node. Children nodes can either be BinaryTree nodes themselves or
null.
*/
function iterativeInOrderTraversal(tree, callback) {
  let prevNode = null
  let currNode = tree
  while (currNode !== null) {
    let nextNode
    if (prevNode === null || currNode.parent === prevNode) {
      if (currNode.left !== null) {
        nextNode = currNode.left
      } else {
        callback(currNode)
        nextNode = currNode.right !== null ? currNode.right : currNode.parent
      }
    } else if (currNode.left === prevNode) {
      callback(currNode)
      nextNode = currNode.right !== null ? currNode.right : currNode.parent
    } else {
      nextNode = currNode.parent
    }
    prevNode = currNode
    currNode = nextNode
  }
}
