/*
Given an array nums containing n distinct numbers in the range [0, n], return
the only number in the range that is missing from the array.

Follow up: Could you implement a solution using only O(1) extra space complexity
and O(n) runtime complexity?
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = function(nums) {
    let n = nums.length;
    // Gauss' formula
    expectedSum = (n * (n + 1)) / 2
    let actualSum = 0;
    for ( let num of nums ) {
        actualSum += num;
    }
    return expectedSum - actualSum;
}