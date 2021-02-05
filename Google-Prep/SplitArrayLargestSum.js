/*
Given an array nums which consists of non-negative integers and an integer m,
you can split the array into m non-empty continuous subarrays.

Write an algorithm to minimize the largest sum among these m subarrays.

Example:
    Input: nums = [7,2,5,10,8], m = 2
    Output: 18
    Explanation:
    There are four ways to split nums into two subarrays.
    The best way is to split it into [7,2,5] and [10,8],
    where the largest sum among the two subarrays is only 18.
*/

// Brute Force solution
let n;
let m;
let ans;

const splitArray = (nums, M) => {
    n = nums.length;
    m = M;
    ans = Infinity;
    dfs(nums, 0, 0, 0, 0);
    return ans;
}

// O(n^m) Time | O(n) Space
const dfs = (nums, idx, subarrayCnt, currSum, currMax) => {
    if (idx === n && subarrayCnt === m) {
        ans = Math.min(ans, currMax);
    }
    if (idx === n) {
        return;
    }
    if (idx > 0) {
        dfs(nums, idx + 1, subarrayCnt, currSum + nums[idx], Math.max(currMax,
            currSum + nums[idx]));
    }
    if (subarrayCnt < m) {
        dfs(nums, idx + 1, subarrayCnt + 1, nums[idx], Math.max(currMax, 
            nums[idx]));
    }
}

// Binary search version
// It takes a while to understand why binary search works and how it works but,
// basically, we search between a range, that range is between the maximum
// number in the nums array and the total sum of the array (assuming we don't
// have any negative values). We get the mid of those two points, called l and 
// r, respectively, and we see how many subarrays are lesser that that mid. If
// the number of subarrays is greater than m, then we have a mid value that is
// too small. When that happens in binary search, we increase the left value.
// Otherwise, we have a possible answer, so we update the value ans with the
// minimum value between mid and ans. In that case we also update r, in order
// to see if we can meet those conditions with an even smaller mid value. We
// repeat this until left is greater than right.
// O(n * log(sumOfArray)) Time | O(1) Space
const splitArray = (nums, m) => {
    let l = 0;
    let r = 0;
    for (let num of nums) {
        l = Math.max(l, max);
        r += num;
    }
    let ans = Infinity;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        let count = 1;
        let sum = 0;
        for (let num of nums) {
            if (sum + num > mid) {
                count++;
                // Simulating the creation of a new subarray
                sum = num;
            } else {
                sum += num;
            }
        }
        if (count <= m) {
            ans = Math.min(ans, mid);
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}