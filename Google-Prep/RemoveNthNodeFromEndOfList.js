/*
Given the head of a linked list, remove the nth node from the end of the list
and return its head.

Example:
    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]

Constraints:
    The number of nodes in the list is sz.
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// One pass version with a queue
// O(l) Time | O(n) Space - where l is the number of nodes in the list and n is
// the size of the queue nodeQueue
const removeNthFromEnd = (head, n) => {
    let nodeQueue = [];
    let listSize = 0;
    let node = head;
    while (node !== null) {
        listSize++;
        nodeQueue.push(node);
        node = node.next;
        if (nodeQueue.length > n + 1) nodeQueue.shift();
    }
    if (listSize === 1) return null;
    else if (listSize === n) {
        head = nodeQueue.shift().next;
    } else {
        node = nodeQueue.shift()
        if (node.next !== null) node.next = node.next.next;
    }
    return head;
}

// -----------------------------------------------------------------------
// Two pointers one pass version
// O(n) Time | O(1) Space - where n is the number of nodes in the list
const removeNthFromEnd = (head, n) => {
    let backPointer = head;
    let frontPointer = head;
    let pointerDist = 0;
    let listSize = 1;
    while (frontPointer.next !== null) {
        listSize++;
        if (pointerDist < n) {
            pointerDist++;
            frontPointer = frontPointer.next;
        } else {
            frontPointer = frontPointer.next;
            backPointer = backPointer.next;
        }
    }
    if (listSize === n) return backPointer.next;
    backPointer.next = backPointer.next.next;
    return head;
}