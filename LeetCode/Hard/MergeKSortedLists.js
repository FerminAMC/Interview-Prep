/**
 * Link: https://leetcode.com/problems/merge-k-sorted-lists/
 * you are given an array of k lists, each linked-list sorted in ascending
 * order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 */

// Brute Force approach. O(kn) Time | O(1) Space - where k is the number of
// lists and n is the number of nodes
const mergeKLists = function (lists) {
  if (lists.length === 0) return new ListNode().next
  if (lists.lengt === 1)
    return lists[0] === null ? new ListNode().next : lists[0]

  const head = new ListNode()
  let list1 = lists.pop()
  let list2 = lists.pop()
  mergeTwoLists(list1, list2, head)
  while (lists.length) {
    list1 = head.next
    list2 = lists.pop()
    mergeTwoLists(list1, list2, head)
  }
  return head.next
}

const mergeTwoLists = function (l1, l2, head) {
  let current = head

  while (l1 != null && l2 != null) {
    if (l1.val < l2.val) {
      current.next = l1
      l1 = l1.next
    } else {
      current.next = l2
      l2 = l2.next
    }
    current = current.next
  }

  if (l1 != null) {
    current.next = l1
  } else current.next = l2

  return head.next
}
