/*
You are given an integer array nums where the ith bag contains nums[i] balls.
You are also given an integer maxOperations.

You can perform the following operation at most maxOperations times:

    Take any bag of balls and divide it into two new bags with a positive number
    of balls.
        For example, a bag of 5 balls can become two new bags of 1 and 4 balls,
        or two new bags of 2 and 3 balls.

Your penalty is the maximum number of balls in a bag. You want to minimize your
penalty after the operations.

Return the minimum possible penalty after performing the operations.

Example:
    Input: nums = [9], maxOperations = 2
    Output: 3
    Explanation: 
    - Divide the bag with 9 balls into two bags of sizes 6 and 3. [9] -> [6,3].
    - Divide the bag with 6 balls into two bags of sizes 3 and 3. [6,3] ->
        [3,3,3].
    The bag with the most number of balls has 3 balls, so your penalty is 3 and
    you should return 3.
*/

/**
 * @param {number[]} nums
 * @param {number} maxOperations
 * @return {number}
 */
const minimumSize = function(nums, maxOperations) {
    let right = 0;
    for ( let i = 0; i < nums.length; i++ ) {
        right = Math.max( right, nums[i] );
    }
    let left = 0;
    let mid = 0;
    let ans = Infinity;
    while ( left <= right ) {
        mid = Math.floor( ( left + right ) / 2 );
        if ( tryValue(mid, nums, maxOperations) ) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    } 
    return ans;
};

const tryValue = function(target, nums, maxOperations) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > target) {
            maxOperations -= Math.floor( nums[i] / target );
            if (nums[i] % target == 0) maxOperations++;
        }
    }
    return maxOperations >= 0;
}