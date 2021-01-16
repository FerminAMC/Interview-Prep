/*
Given an array nums of n integers, are there elements a, b, c in nums such that
a + b + c = 0? Find all unique triplets in the array which gives the sum of
zero.

Notice that the solution set must not contain duplicate triplets.
*/

// O(n²) Time | O(t) Space - where n is the number of numbers in nums and t is
// the number of triplets found.  
const threeSum = nums => {
    let ans = [];
    nums = nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (num === nums[i-1]) continue;
        let target = 0 - num;
        let triplets = twoSum(nums, num, target, i);
        if (triplets.length) {
            ans = ans.concat(triplets);
        }
    }
    return ans;
}

const twoSum = (nums, num, target, idx) => {
    let l = idx + 1;
    let r = nums.length - 1;
    let ans = [];
    while (l < r) {
        const currSum = nums[l] + nums[r];
        if (currSum === target) {
            ans.push([num, nums[l], nums[r]]);
            l++;
            r--;
            while (l < r && nums[l] === nums[l - 1]) {
                l++;
            }
        }else if (currSum > target) {
            r--;
        } else l++;
    }
    return ans;
}