/**
 * Write a function that takes in the head of a Singly Linked List, reverses
 * the list in place (i.e., doesn't create a brand new list), and returns its
 * head.
 *
 * Each LinkedList node has an integer value as well as a next node pointing to
 * the next node in the list or to null is it's the tail of the list.
 *
 * You can assume that the input Linked List will always have at least one node;
 * in other words, the head will never be null.
 *
 * Input 1:
 * head = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 * Output:
 * result = 5 -> 4 -> 3 -> 2 -> 1 -> 0 -> null
 */

// O(n) Time | O(1) Space - where n is the number of nodes in the list
function reverseLinkedList(head) {
  let prev = head
  let next = head.next
  let nextNext = head.next === null ? null : head.next.next
  head.next = null
  while (next !== null) {
    next.next = prev
    prev = next
    next = nextNext
    if (next !== null) nextNext = next.next
  }
  return prev
}
