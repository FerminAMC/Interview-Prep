/*
You are a professional robber planning to rob houses along a street. Each house
has a certain amount of money stashed, the only constraint stopping you from
robbing each of them is that adjacent houses have security system connected and
it will automatically contact the police if two adjacent houses were broken into 
on the same night.

Given a list of non-negative integers representing the amount of money of each
house, determine the maximum amount of money you can rob tonight without
alerting the police.

Example 1:
    Input: nums = [1,2,3,1]
    Output: 4
    Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
                Total amount you can rob = 1 + 3 = 4.

Example 2:
    Input: nums = [2,7, 9, 3, 1]
                  [2,7,11,10,12]
    Output: 12
    Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house
        5 (money = 1).
                Total amount you can rob = 2 + 9 + 1 = 12.
*/

/**
 * O(n) Time | O(1) Space
 * @param {number[]} nums
 * @return {number}
 */
const rob = function(nums) {
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i < 2) {
            ans = Math.max(ans, nums[i]);
        } else {
            let sum = 0;
            if (i >= 3) {
                sum = nums[i] + nums[i - 3];
            }
            sum = Math.max(sum, nums[i] + nums[i - 2]);
            nums[i] = sum;
            ans = Math.max(ans, sum);
        }
    }
    return ans;
};