/*
Problem:
Given the root of a complete binary tree, return the number of the nodes in the
tree.

According to Wikipedia, every level, except possibly the last, is completely
filled in a complete binary tree, and all nodes in the last level are as far
left as possible. It can have between 1 and 2h nodes inclusive at the last
level h.

Input:
    root = []
Output:
    number
Example:
    root = [1,2,3,4,5,6]
    result = 6
Approach:
Start visiting nodes from right to left, using the pre-order traversal method
in reverse.
While doing the traversal, count the levels. The right-most element should have
a lower level than the left-most element. This is because of the complete 
quality of the tree. 
Count how many tree nodes are at max-height -1 and check for the number of leaf
nodes.
If both leaf nodes are missing, we move to the next element at the left and 
repeat the check.
After that, the number of nodes can be taken from the data collected.
*/

// Code:

let foundAllNodes = false;
let nodesMissing = 0;
let maxLevel = Infinity;

// O(n) Time | O(log(n)) Space - where n is the number of nodes in the tree.
const countNodes = root => {
    if (root === null) return 0;
    let level = 0;
    preOrder(root, level);
    let numNodes = 0;
    for (let i = 0; i <= maxLevel + 1; i++) {
        numNodes += Math.pow(2, i);
    }
    return numNodes - nodesMissing;
}

const preOrder = (node, level) => {
    if (node === null) return;
    if (foundAllNodes) return;
    if (level > maxLevel) {
        foundAllNodes = true;
        return;
    }
    let missingRight = node.right === null;
    let missingLeft = node.left === null;
    if (missingRight) {
        maxLevel = level;
    } else if (missingLeft) {
        foundAllNodes = true;
    }

    if (level === maxLevel) {
        if (missingRight) nodesMissing++;
        if (missingLeft) nodesMissing++;
    }
    preOrder(node.right, level + 1);
    preOrder(node.left, level + 1);
    return;
}