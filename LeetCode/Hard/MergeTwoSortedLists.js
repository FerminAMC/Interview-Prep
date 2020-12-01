/**
 * Link: https://leetcode.com/problems/merge-two-sorted-lists/
 * Merge two sorted linked lists and return a new sorted list. The new list
 * should be made by splicing together the nodes of the first two lists.
 *
 * Input: l1 = [1, 2, 4], l2 = [1, 3, 4]
 * Output: [1, 1, 2, 3, 4, 4]
 */

// O(n + m) Time | O(n + m) Space - where n and m are the number of elements in
// each list, respectively
const mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  } else if (l2 === null) {
    return l1
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}

const mergeTwoListsIterative = function (l1, l2) {
  const head = new ListNode()
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
