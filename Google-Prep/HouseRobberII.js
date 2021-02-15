/*
You are a professional robber planning to rob houses along a street. Each house
has a certain amount of money stashed. All houses at this place are arranged in
a circle. That means the first house is the neighbor of the last one. Meanwhile,
adjacent houses have a security system connected, and it will automatically
contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers nums representing the amount of money of
each house, return the maximum amount of money you can rob tonight without
alerting the police.

Example 1: 
    Input: nums = [2,3,2]
    Output: 3
    Explanation: You cannot rob house 1 (money = 2) and then rob house 3
        (money = 2), because they are adjacent houses.

Example 2:
    Input: nums = [1,2,3,1]
    Output: 4
    Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
    Total amount you can rob = 1 + 3 = 4.
*/

/**
 * O(n) Time | O(1) Space
 * @param {number[]} nums
 * @return {number}
 */
const rob = function(nums) {
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0];
    }
    
    let max1 = robSimple(nums, 0, nums.length - 2);
    let max2 = robSimple(nums, 1, nums.length - 1);
    return Math.max(max1, max2);
};

const robSimple = function(nums, start, end) {
    let ans = 0;
    let n = nums.length;
    let thieve1 = 0;
    let thieve2 = 0;
    for (let i = start; i <= end; i++) {
        let temp = thieve1;
        thieve1 = Math.max(thieve1, thieve2 + nums[i]);
        thieve2 = temp;
    }
    return thieve1;
};