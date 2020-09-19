/**
 * Write a function that takes in the head of a Singly Linked List that contains
 * a loop (in other words, the list's tail node, points to some node in the
 * list instead of None / null). The function should return the node (the
 * actual node--not just its value) from which the loop originates in constant
 * space.
 *
 * Each LinkedList node has an integer value as well as a next node pointing to
 * the next node in the list.
 */

/**
 * Once a loop is found, we can start from the begining of the array, testing
 * with every node to see if at some point it collides with the pointer inside
 * the cycle. If that happens, we return the probePointer. If we finish a cycle
 * and the probePointer never collided with the moving pointer, we move to the
 * next node to see if it collides, repeating the process until it does.
 * O(nl) Time | O(1) Space - were n is the number of nodes in the LinkedList
 * and l is the number of nodes in the loop of the LinkedList
 */
function findLoop(head) {
  let fastPointer = head
  let slowPointer = head
  let probePointer = head
  while (true) {
    fastPointer = fastPointer.next.next
    slowPointer = slowPointer.next
    if (fastPointer === slowPointer) {
      break
    }
  }

  while (true) {
    while (true) {
      if (slowPointer === probePointer) return probePointer
      slowPointer = slowPointer.next
      // Cycled through loop once. Time to move probePointer to next node
      if (slowPointer === fastPointer) {
        break
      }
    }
    probePointer = probePointer.next
  }
}

/**
 * Optimized version with the power of math!
 * The slow pointer, S, moves at X speed
 * The fast pointer, F, moves at 2X speed
 * When they collide, they have moved D + P and 2D + 2P respectively, were
 * D is the distance to the start of the loop and P is the distance from the
 * start of the loop to were the pointers collide.
 * S = D + P
 * F = 2D + 2P
 *
 * R is the remainder of the list from the position of S and F, so the total
 * length of the list is:
 * T = R + D + P
 * F cycled through all the list more than once, so F moved T + P, P being were
 * it collided with S, so:
 * T = 2D + 2P - P
 *
 * Summing up:
 *
 * R = T - D - P
 * R = 2D + 2P - P - D - P
 * R = D
 *
 * That meaans that the remainder of the list is equal to D, meaning that if we
 * move one of the pointers to the start of the list, and start moving them
 * both at the same X speed, they will collide at the begining of the loop!
 *
 * O(n) Time | O(1) Space - were n is the number of nodes in the LinkedList
 */

function findLoop(head) {
  let fastPointer = head
  let slowPointer = head
  while (true) {
    fastPointer = fastPointer.next.next
    slowPointer = slowPointer.next
    if (fastPointer === slowPointer) {
      break
    }
  }
  slowPointer = head
  while (true) {
    if (slowPointer === fastPointer) return slowPointer
    slowPointer = slowPointer.next
    fastPointer = fastPointer.next
  }
}
