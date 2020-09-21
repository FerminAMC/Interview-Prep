/**
 * You're given three inputs, all of which are instances of an AncestralTree
 * class that have an ancestor property pointing to their youngest ancestor.
 * The first input is the top ancestor in an ancestral tree (i.e., the only
 * instance that has no ancestor--its ancestor property points to None / null),
 * and the other two inputs are descendants in the ancestral tree.
 *
 * Write a function that returns the youngest common ancestor to the two
 * descendants.
 *
 * Note that a descendant is considered its own ancestor. So in the simple
 * ancestral tree below, the youngest common ancestor to nodes A and B is
 * node A.
 *
 *      A
 *     /
 *    B
 * ---------------------------
 * topAncestor = node A
 * descendantOne = node E
 * descendantTwo = node I
 *
 *                A
 *             /    \
 *           B       C
 *         /   \   /  \
 *       D     E  F    G
 *     /  \
 *    H   I
 *
 * youngestCommonAncestor = node B
 */

/**
 * The first thing that comes to mind is to do a DFS, but then I realized that
 * I already have the noddes I want, descendants one and two. That gives me
 * another idea; to a BFS on the tree, to see in what level each of the
 * descendants is located. with that, I can bring the node that is found deepest
 * in the tree, and go back on its ancestors, until I am located at the same
 * level as the other node. In the example above, I would find that E is at
 * depth 2 and I is at depth 3. With that information, I can go from I to D,
 * and then start moving both nodes up at the same time, until they meet at a
 * common ancestor, in this case, the will meet in node B.
 *
 * I just realized that you can't go from the topAncestor down to its children.
 * You have to go from the bottom to the top.
 *
 * One of the ancestor arrays might be bigger. That happens when one of the
 * descendants is in a deeper level in the tree than the other one. For this I
 * created the startingIndex, which will be the starting point for comparisons
 * for the largest array. Then it is just a matter of comparing every value in
 * both arrays.
 *
 * This solution can be cleaned further, by changing the getAncestors function
 * so that it fills both arrays needed at the same time in only one pass.
 *
 * O(d) Time | O(d) Space - where d is the depth of the tree
 */
function getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
  const ancestorsOne = []
  const ancestorsTwo = []
  getAncestors(descendantOne, ancestorsOne)
  getAncestors(descendantTwo, ancestorsTwo)
  if (ancestorsOne.length > ancestorsTwo.length) {
    const startingIndex = ancestorsOne.length - ancestorsTwo.length
    return findCommonNode(startingIndex, 0, ancestorsOne, ancestorsTwo)
  } else if (ancestorsOne.length < ancestorsTwo.length) {
    const startingIndex = ancestorsTwo.length - ancestorsOne.length
    return findCommonNode(0, startingIndex, ancestorsOne, ancestorsTwo)
  } else {
    return findCommonNode(0, 0, ancestorsOne, ancestorsTwo)
  }
}

function getAncestors(descendant, ancestors) {
  let currentNode = descendant
  while (currentNode !== null) {
    ancestors.push(currentNode)
    currentNode = currentNode.ancestor
  }
}

function findCommonNode(idxOne, idxTwo, arrayOne, arrayTwo) {
  for (
    ;
    idxOne < arrayOne.length && idxTwo < arrayTwo.length;
    idxOne++, idxTwo++
  ) {
    if (arrayOne[idxOne] === arrayTwo[idxTwo]) return arrayOne[idxOne]
  }
}
