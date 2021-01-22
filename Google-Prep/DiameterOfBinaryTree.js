/*
Given a binary tree, you need to compute the length of the diameter of the
tree. The diameter of a binary tree is the length of the longest path between
any two nodes in a tree. This path may or may not pass through the root. 
*/

let max;
const diameterOfBinaryTree = root => {
    max = 1
    inOrder(root);
    return max - 1;
}

const inOrder = (node) => {
    if (node === null) return 0;
    let leftMax = inOrder(node.left);
    let rightMax = inOrder(node.right);
    max = Math.max(max, leftMax + rightMax + 1);
    return Math.max(leftMax, rightMax) + 1;
}