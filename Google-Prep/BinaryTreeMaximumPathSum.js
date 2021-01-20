/*
A path in a binary tree is a sequence of nodes where each pair of adjacent
nodes in the sequence has an edge connecting them. A node can only appear in
the sequence at most once. Note that the path does not need to pass through the
root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any path.

Example:
    Input: root = [1,2,3]
    Output: 6
    Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 
                 2 + 1 + 3 = 6.
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
 * @param {TreeNode} root
 * @return {number}
 */
const maxPathSum = root => {
    [_, maxSum] = inOrder(root);
    return maxSum;
}
const inOrder = (root) => {
    if (root === null) return [-Infinity, -Infinity];
    let [leftBranchSum, leftMaxPathSum] = inOrder(root.left);
    let [rightBranchSum, rightMaxPathSum] = inOrder(root.right);
    let maxBranch = Math.max(leftBranchSum, rightBranchSum);
    let maxBranchSum = Math.max(maxBranch + root.val, root.val);
    let maxBranchRootSum = Math.max(maxBranchSum, leftBranchSum + rightBranchSum + root.val);
    let maxPathSum = Math.max(leftMaxPathSum, rightMaxPathSum, maxBranchRootSum);
    return [maxBranchSum, maxPathSum];
}