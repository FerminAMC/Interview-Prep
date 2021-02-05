/*
Given an integer array nums, find the contiguous subarray within an array
(containing at least one number) which has the largest product.

Example:
    Input: [2,3,-2,4]
    Output: 6
    Explanation: [2,3] has the largest product 6.

    [2,-5,-2,-4,3]

    curr = 2, -5, -2
    maxSoFar = 2, -5, 20
    minSoFar = 2, -10, -2
*/

/**
 * O(n) Time | O(1) Space
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = (nums) => {
    let max = nums[0];
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    for (let i = 1; i < nums.length; i++) {
        let curr = nums[i];
        // Temp max is just so I don't override maxSoFar before using it below
        let tempMax = Math.max(curr, (maxSoFar * curr), (minSoFar * curr));
        minSoFar = Math.min(curr, (maxSoFar * curr), (minSoFar * curr));
        maxSoFar = tempMax;
        max = Math.max(max, maxSoFar);
    }
    return max;
}