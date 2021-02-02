/*
For a binary tree T, we can define a flip operation as follows: choose any node,
and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can
make X equal to Y after some number of flip operations.

Given the roots of two binary trees root1 and root2, return true if the two
trees are flip equivelent or false otherwise.
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
// O(n) Time | O(d) Space - where n is the number of nodes of the smallest tree
// and d is the depth of the smallest tree.
const flipEquiv = (root1, root2) => {
    if (root1 == null || root2 == null) return root1 == null && root2 == null;
    if (root1.val != root2.val) return false;

    let leftFlipped = flipEquiv(root1.left, root2.right);
    let leftUnflipped = flipEquiv(root1.left, root2.left);
    let leftEquiv = leftFlipped || leftUnflipped;

    let rightFlipped = flipEquiv(root1.right, root2.left);
    let rightUnflipped = flipEquiv(root1.right, root2.right);
    let rightEquiv = rightFlipped || rightUnflipped;

    return leftEquiv && rightEquiv;
}