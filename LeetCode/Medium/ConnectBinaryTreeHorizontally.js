// Link: https://www.geeksforgeeks.org/connect-nodes-at-same-level/
class binaryTree {
  constructor(number) {
    this.left = null
    this.right = null
    this.next = null
    this.value = number
  }
}
// O(n) Time | O(n) Space
function connectNodes(root) {
  let currentNode = root
  const queue = []
  queue.push(currentNode.left)
  queue.push(currentNode.right)
  let childNum = queue.length
  while (queue.length) {
    currentNode = queue.shift()
    if (currentNode.left !== null) queue.push(currentNode.left)
    if (currentNode.right !== null) queue.push(currentNode.right)
    childNum--
    if (childNum > 0) {
      currenNode.next = queue[0]
    }
    if (childNum === 0) {
      currentNode.next = null
      childNum = queue.length
    }
  }
  return root
}
