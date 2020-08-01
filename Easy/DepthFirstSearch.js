/**
 * You're given a node class that has a name and an array of optional children
 * nodes. When put together, nodes form an acyclic tree-like structure.
 * Implement the depth first search method on the Node class, which takes in an
 * empty array, traverses the tree using Depth-first Search approach
 * (specifically navigating the tree from left to right), stores all of the
 * nodes' names in the input array, and returns it.
 *
 * graph =           A
 *                /  |  \
 *               B   C   D
 *              / \     / \
 *             E   F   G   H
 *                / \   \
 *               I   J   K
 * array = ["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"]
 */

// O(V+E) time - O(V) space where V is the number of vertices and E is the
// number of edges
function depthFirstSearch(array) {
  array.push(this.name)
  for (const child of this.children) {
    child.depthFirstSearch(array)
  }
  return array
}
