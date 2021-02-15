/*
Given an integer array nums, return the length of the longest strictly
increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some
or no elements without changing the order of the remaining elements. For
example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].
*/

/**
 * O(n²) Time | O(n) Space
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = (nums) => {
    let dpAns = new Array(nums.length).fill(1);
    let ans = 1;
    for (let i = 1; i < nums.length; i++) {
        let curr = nums[i];
        for (let j = 0; j < i; j++) {
            let prev = nums[j];
            if (curr > prev) {
                dpAns[i] = Math.max(dpAns[i], dpAns[j] + 1);
            }
        }
        ans = Math.max(ans, dpAns[i]);
    }
    return ans;
};