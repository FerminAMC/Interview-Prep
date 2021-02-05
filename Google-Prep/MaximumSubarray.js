/*
Given an integer array nums, find the contiguous subarray (containing at least
one number) which has the largest sum and return its sum.

Example: 
    Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
    Output: 6
    Explanation: [4,-1,2,1] has the largest sum = 6.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = (nums) => {
    let max = nums[0];
    let localSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        let curr = nums[i];
        localSum += curr;
        if (curr > localSum) {
            localSum = curr;
        }
        max = Math.max(localSum, max);
    }
    return max;
}