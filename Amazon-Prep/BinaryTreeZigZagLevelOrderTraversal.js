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
 * @return {number[][]}
 */
let zigzagLevelOrder = function(root) {
    if (root == null) return [];

    let result = [];
    let queue = [root];
    let nodesLeft = 1;
    let level = [];
    let goingRight = true
    while (queue.length) {
        let curr = queue.shift();
        nodesLeft--;
        if (goingRight) {
            level.push(curr.val);
        } else {
            level.unshift(curr.val);
        }

        if (curr.left != null) {
            queue.push(curr.left);
        }
        if (curr.right != null) {
            queue.push(curr.right);
        }

        if (nodesLeft == 0) {
            result.push(level);
            nodesLeft = queue.length;
            level = [];
            goingRight = !goingRight;
        }
    }

    return result;
};