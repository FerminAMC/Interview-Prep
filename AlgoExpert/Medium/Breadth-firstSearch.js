/**
 * You're given a Node class that has a name and an array of optimal children
 * nodes. When put together, nodes form an acyclic tree-like structure.
 *
 * Implement the breadthFirstSearch methon on the Node class, which takes in an
 * empty array, traverses the tree using the Breadth-first Search approach
 * (specifically navigating the tree from left to right), stores all of the
 * nodes' names in the input array and returns it.
 */

/**
 * This is solved with a queue. Have a while loop from 0 to queue.size. Update
 * that size with the number of child nodes currently stored in the queue. Then,
 * you just print el polled element. They will all appear in sorted order
 */
class Node {
  constructor(name) {
    this.name = name
    this.children = []
  }

  addChild(name) {
    this.children.push(new Node(name))
    return this
  }

  breadthFirstSearch(array) {
    const queue = [this]
    let queueSize = queue.length
    while (queueSize > 0) {
      queueSize--
      const currentNode = queue.shift()
      array.push(currentNode.name)
      for (let child of currentNode.children) {
        queue.push(child)
      }
      if (queueSize === 0) {
        queueSize = queue.length
      }
    }
    return array
  }
}
