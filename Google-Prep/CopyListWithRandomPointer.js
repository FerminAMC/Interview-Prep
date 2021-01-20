/*
A linked list is given such that each node contains an additional random
pointer which could point to any node in the list or null.

Return a deep copy of the list.

The Linked List is represented in the input/output as a list of n nodes. Each
node is represented as a pair of [val, random_index] where:

    val: an integer representing Node.val
    random_index: the index of the node (range from 0 to n-1) where random
    pointer points to, or null if it does not point to any node.

Example: 
    Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
    Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
*/

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
// O(n) Time | O(n) Space - where n is the number of nodes in the original list
var copyRandomList = function(head) {
    let node = head;
    let copy = new Node(head.val, head.next, null);
    node.next = copy;
    node = copy.next;
    while (node !== null) {
        let nextCopy = new Node(node.val, node.next, null);
        node.next = nextCopy;
        node = nextCopy.next;
    }

    node = head;
    while (node !== null) {
        node.next.random = node.random === null ? null : node.random.next;
        node = node.next.next;
    }

    node = head;
    let aux = copy;
    while (node !== null) {
        node.next = aux.next;
        node = node.next;
        aux.next = (node === null) ? null : node.next;
        aux = aux.next;
    }
    return copy;
};
