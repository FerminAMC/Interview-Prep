/*
Given head which is a reference node to a singly-linked list. The value of each
node in the linked list is either 0 or 1. The linked list holds the binary
representation of a number.

Return the decimal value of the number in the linked list.
*/

// O(n) Time - where n is the number of nodes in the linked list
const getDecimalValue = (head) => {
  let currentNode = head
  let result = 0
  while (currentNode !== null) {
    const currentVal = currentNode.val
    result = result * 2 + currentVal
    currentNode = currentNode.next
  }

  return result
}
