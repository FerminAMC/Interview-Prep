/*
Given an array of non-negative integers nums, you are initially positioned at
the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// O(n²) Time | O(n) Space
const canJump = nums => {
    let dp = new Array(nums.length).fill(Infinity);
    dp[0] = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        if (dp[i] !== Infinity) {
            let availableJumps = nums[i];
            while (availableJumps > 0) {
                if (i + availableJumps < nums.length){
                    dp[i + availableJumps] = Math.min(dp[i + availableJumps], i);
                }
                // You don't care about the rest of the jumps. They will be less
                // efficient anyways.
                if (i + availableJumps === nums.length - 1) return true;
                availableJumps--;
            }
        } else break;
    }
    return dp[dp.length - 1] !== Infinity;
}