/**
 * Write a BST class for a Binary Search Tree. The class should support:
 *    - Inserting values with the insert method.
 *    - Removing values with the remove method; this method should only remove
 *      the first instance of a given value.
 *    - Searching for values with the contains method
 *
 * Note that you can't remove values from a single-node tree. In other words,
 * calling the remove method on a single-node tree should simply not do
 * anything.
 *
 * Each BST node has an integer value, a left child node, and a right child
 * node. A node is said to be a valid BST node if and only if it satisfies the
 * BST property: its value is strictly greater that the vales of every node to
 * its left; its value is less than or equal to the values of every node to its
 * right; and its children nodes are either valid BST nodes themselves or
 * None / null.
 */

class BST {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = BST(value)
      } else {
        this.left.insert(value)
      }
    } else {
      if (this.right === null) {
        this.right = BST(value)
      } else {
        this.right.insert(value)
      }
    }
    return this
  }

  contains(value) {
    // Write your code here.
  }

  remove(value) {
    // Write your code here.
    // Do not edit the return statement of this method.
    return this
  }
}
