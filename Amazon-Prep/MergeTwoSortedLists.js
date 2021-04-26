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
 var mergeTwoLists = function(l1, l2) {
    if (l1 == null) return l2;
    if (l2 == null) return l1;
    
    let prev = null;
    let currOne = l1;
    let currTwo = l2;
    while (currOne != null && currTwo != null) {
        if (currOne.val < currTwo.val) {
            prev = currOne;
            currOne = currOne.next;
        } else {
            if (prev !== null) prev.next = currTwo;
            prev = currTwo;
            currTwo = currTwo.next;
            prev.next = currOne;
        }
    }
    
    if (currOne == null) {
        prev.next = currTwo;
    }
    
    return l1.val < l2.val ? l1 : l2;
};