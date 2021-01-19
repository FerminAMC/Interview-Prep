/*
You are given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order, and each of their nodes contains a
single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the
number 0 itself.
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
// O(n) Time | O(n) Space - where n is the length of the sum
const addTwoNumbers = (l1, l2) => {
    let curr1 = l1.next;
    let curr2 = l2.next;
    let firstSum = l1.val + l2.val;
    let carryOver = firstSum > 9? 1 : 0;
    let ans = new ListNode(firstSum % 10);
    let temp = ans;
    while (true) {
        console.log('ans:', temp.val);
        let currSum = 0;
        if (curr1 !== null && curr2 !== null) {
            currSum = curr1.val + curr2.val + carryOver;
            curr1 = curr1.next;
            curr2 = curr2.next;
            carryOver = currSum > 9? 1 : 0;
            temp.next = new ListNode(currSum % 10);
            temp = temp.next;
        } else if (curr1 !== null && curr2 === null) {
            currSum = curr1.val + carryOver;
            curr1 = curr1.next;
            carryOver = currSum > 9? 1 : 0;
            temp.next = new ListNode(currSum % 10);
            temp = temp.next;
        } else if (curr1 === null && curr2 !== null) {
            currSum = curr2.val + carryOver;
            curr2 = curr2.next;
            carryOver = currSum > 9? 1 : 0;
            temp.next = new ListNode(currSum % 10);
            temp = temp.next;
        } else if (carryOver > 0) {
            carryOver = 0;
            temp.next = new ListNode(1);
            temp = temp.next;
        } else break;
    }

    return ans;
}