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
 var levelOrder = function(root) {
    if (root == null) return [];

    let result = [];
    let queue = [root];
    let nodesLeft = 1;
    let level = [];
    while (queue.length) {
        let curr = queue.shift();
        nodesLeft--;
        level.push(curr.val);
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
        }
    }

    return result;
};