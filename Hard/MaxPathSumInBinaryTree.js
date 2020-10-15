/*
Write a function that takes in a Binary Tree and returns its max path sum.

A path is a collection of connected nodes in a tree where no node is connected
to more than two other nodes; a path sum is the sum of the values of the nodes
in a particular path.

Each Binary Tree node has an integer value, a left child node, and a right child
node. Children nodes can either be Binary Trees themselves or null.
*/

/*
This solution takes two possible max values. You have to consider that the max
path sum may be entirely encased in one of the branches of the tree, so that has
to be taken into account. That is why there are two results, maxBranchSum and 
maxPathSum. maxBranchSum is the current max sum of an entire branch, and the 
maxPathSum may have the value of the sum of two branches plus a the parent node.
when we get back to the root of the tree, we check if the sum of the root node
plus both left and right branches is bigger than the current maxPathSum. That
way we can cover all edge cases.

O(n) Time | O(log(n)) Space - where n is the number of nodes in the tree.
*/
function maxPathSum(tree) {
  const [_, maxPathSum] = maxSum(tree);
  return maxPathSum;
}

function maxSum(node) {
  if (node === null) return [0, -Infinity];
  const [leftBranchSum, leftMaxPathSum] = maxSum(node.left);
  const [rightBranchSum, rightMaxPathSum] = maxSum(node.right);
  const maxChildBranchSum = Math.max(leftBranchSum, rightBranchSum);
  const maxBranchSum = Math.max(maxChildBranchSum + node.value, node.value);
  const maxRootBranchSum = Math.max(leftBranchSum + node.value + rightBranchSum, maxBranchSum);
  const maxPathSum = Math.max(leftMaxPathSum, maxRootBranchSum, rightMaxPathSum);
  return [maxBranchSum, maxPathSum];
}
