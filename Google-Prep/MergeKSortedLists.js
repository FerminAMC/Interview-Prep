/*
You are given an array of k linked-lists lists, each linked-list is sorted in
ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example: 
    Input: lists = [[1,4,5],[1,3,4],[2,6]]
    Output: [1,1,2,3,4,4,5,6]
    Explanation: The linked-lists are:
    [
    1->4->5,
    1->3->4,
    2->6
    ]
    merging them into one sorted list:
    1->1->2->3->4->4->5->6

Constraints:
    k == lists.length
    0 <= k <= 10^4
    0 <= lists[i].length <= 500
    -10^4 <= lists[i][j] <= 10^4
    lists[i] is sorted in ascending order.
    The sum of lists[i].length won't exceed 10^4.

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = lists => {
    if (lists.length === 1) return lists[0];
    else if (lists.length === 0) return null;

    let sortedList = mergeTwoLists(lists[0], lists[1]);
    for (let i = 2; i < lists.length; i++) {
        sortedList = mergeTwoLists(sortedList, lists[i]);
    }
    return sortedList;
}

const mergeTwoLists = (headOne, headTwo) => {
    if (headOne === null) return headTwo;
    else if (headTwo === null) return headOne;

    let currL1 = headOne;
    let currL2 = headTwo;
    let prev = null;
    while (currL1 !== null && currL2 !== null) {
        if (currL1.val < currL2.val) {
            prev = currL1;
            currL1 = currL1.next;
        } else {
            if (prev !== null) prev.next = currL2
            prev = currL2;
            currL2 = currL2.next;
            prev.next = currL1;
        }
    }
    if (currL1 === null) {
        prev.next = currL2;
    }
    return headOne.val < headTwo.val ? headOne : headTwo;
}