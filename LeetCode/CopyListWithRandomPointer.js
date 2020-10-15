/**
 * A linked list is given such that each node contains an additional random
 * pointer which could point to any node in the list or null.
 *
 * Return a deep copy of the list.
 *
 * The linked list is represented in the input/output as a list of n nodes.
 * Each node is represented as a pair of [val, random_index] where:
 *    - val: an integer representing Node.val
 *    - random_index: the index of the node (range from 0 to n-1) where pointer
 *      points to, or null if it does not point to any node.
 */

/**
 * This solution consists of 3 steps. The first one is creating a new node and
 * putting right next to the original one, changing the next pointer of the
 * original to point to the copy and the copy to point to the original.next.
 * Now that we have a copy of every node on the list, we can copy the random
 * pointers. The random pointer of the copy node will point to the next of the
 * original random pointer, that way it will point to the copy node right next
 * to the original one. Once we have all random pointers copied, we can unlink
 * the original and the copy lists.
 * The third step consists of pointing the next pointers of every node right
 * to the correct nodes.
 * Once all that is finished, both lists have become unwind and we can return
 * the head of the copy.
 *
 * O(n) Time | O(1) Space - where n is the number of nodes on the original list.
 * It is only constant space if we don't count the extra list that we have to
 * create for the solution.
 */
function copyRandomList(head) {
  if (head === null) return head
  let currentNode = head
  while (currentNode !== null) {
    let newNode = new Node(currentNode.val, null, null)
    newNode.next = currentNode.next
    currentNode.next = newNode
    currentNode = newNode.next
  }
  currentNode = head
  while (currentNode !== null) {
    currentNode.next.random =
      currentNode.random === null ? null : currentNode.random.next
    currentNode = currentNode.next.next
  }
  let newHead = head.next
  currentNode = head
  let currentCopyNode = newHead
  while (currentNode !== null) {
    currentNode.next = currentCopyNode.next
    currentNode = currentNode.next
    currentCopyNode.next = currentNode === null ? null : currentNode.next
    currentCopyNode = currentCopyNode.next
  }
  return newHead
}
