/*
Serialization is the process of converting a data structure or object into a
sequence of bits so that it can be stored in a file or memory buffer, or
transmitted across a network connection link to be reconstructed later in the
same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no
restriction on how your serialization/deserialization algorithm should work.
You just need to ensure that a binary tree can be serialized to a string and
this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a
binary tree. You do not necessarily need to follow this format, so please be
creative and come up with different approaches yourself.
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = (root) => {
    let serializedTree = dfs(root, '');
    return serializedTree;
}

const dfs = (node, serialized) => {
    if (node === null) {
        serialized += 'null~';
        return serialized;
    }
    serialized += node.val + '~';
    serialized = dfs(node.left, serialized);
    serialized = dfs(node.right, serialized);
    return serialized;
} 

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = (data) => {
    data = data.split('~');
    data.pop();
    let firstVal = data.shift();
    if (firstVal === 'null') {
        return null;
    }
    let root = new TreeNode(parseInt(firstVal));
    dfsDeserialize(root, data);
    return root;
}

// [1, 2, null, null, 3, 4, null, null, 5, null, null]
const dfsDeserialize = (prev, array) => {
    if (array.length === 0) {
        return;
    }
    let leftVal = array.shift();
    if (leftVal !== 'null'){
        prev.left = new TreeNode(parseInt(leftVal));
        dfsDeserialize(prev.left, array);
    }

    let rightVal = array.shift();
    if (rightVal !== 'null') {
        prev.right = new TreeNode(parseInt(rightVal));
        dfsDeserialize(prev.right, array);
    }
    

    return;
}