/**
 * Write a function that takes in the head of a Singly Linked List, inverts its
 * bisection in place (i.e., doesn't create a brand new list), and returns
 * its new head.
 *
 * Inverting a Linked List's bisection means inverting the order of the nodes
 * in the list's two halves; se the sample inputs and outputs for examples.
 *
 * Each LinkedList node has an integer value as well as a next node pointing to
 * the next node in the list or to null if it's the tail of the list.
 *
 * Input 1:
 * head = 0 -> 1 -> 2 -> 3 -> 4 -> 5
 * Output:
 * result = 2 -> 1 -> 0 -> 5 -> 4 -> 3
 *
 * Input 2:
 * head = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
 * result = 2 -> 1 -> 0 -> 3 -> 6 -> 5 -> 4
 */

// O(n) Time | O(1) Space - where n is the number of nodes in the list
function invertedBisection(head) {
  let listSize = 0
  let currentNode = head
  while (currentNode !== null) {
    listSize++
    currentNode = currentNode.next
  }
  if (listSize < 4) return head

  const limit = Math.floor(listSize / 2)
  const firstHalf = invertHalf(head, limit)
  let secondHalf = null
  if (listSize % 2 === 0) {
    secondHalf = invertHalf(head.next, limit)
    head.next = secondHalf
  } else {
    secondHalf = invertHalf(head.next.next, limit)
    head.next.next = secondHalf
  }
  return firstHalf
}

function invertHalf(startNode, limit) {
  let prevNode = startNode
  let nextNode = startNode.next
  let nextNextNode = startNode.next.next
  for (let i = 1; i < limit; i++) {
    nextNode.next = prevNode
    prevNode = nextNode
    nextNode = nextNextNode
    if (nextNode !== null) nextNextNode = nextNode.next
  }
  startNode.next = nextNode
  return prevNode
}

// This is an input class.
class LinkedList {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
