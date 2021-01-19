/*
Merge two sorted linked lists and return it as a sorted list. The list should be
made by splicing together the nodes of the first two lists.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = (l1, l2) => {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    let node1 = l1;
    let node2 = l2;
    let prev = null;
    while (node1 !== null && node2 !== null) {
        if (node1.val < node2.val) {
            prev = node1;
            node1 = node1.next;
        } else {
            if (prev !== null) prev.next = node2;
            prev = node2;
            node2 = node2.next;
            prev.next = node1;
        }
    }
    if (node1 === null) {
        prev.next = node2;
    }
    return l1.val < l2.val ? l1 : l2;
}