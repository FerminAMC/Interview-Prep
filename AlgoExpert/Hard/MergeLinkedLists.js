/**
 * Write a function that takes in the heads of two Singly Linked Lists that are
 * in sorted order, respectively. The function should merge the lists in place
 * and return the head of the merged list; the merged list should be in sorted
 * order.
 *
 * Each LinkedList node has an integer value as well as a next node pointing to
 * the next node in the list or to null if it's the tail of the list.
 *
 * You can assume that the input linked lists will always have at least one
 * node; in other words, the heads will never be null.
 */

// O(n + m) Time | O(1) Space - where n and m are the lengths of both lists
// respectively. Since everything is done in place, the space is constant.
function mergeLinkedLists(headOne, headTwo) {
  let currL1 = headOne
  let currL2 = headTwo
  let prev = null
  while (currL1 !== null && currL2 !== null) {
    if (currL1.value < currL2.value) {
      prev = currL1
      currL1 = currL1.next
    } else {
      if (prev !== null) prev.next = currL2
      prev = currL2
      currL2 = currL2.next
      prev.next = currL1
    }
  }
  if (currL1 === null) {
    prev.next = currL2
  }
  return headOne.value < headTwo.value ? headOne : headTwo
}
