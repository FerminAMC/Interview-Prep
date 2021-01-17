/*
Given an array nums of distinct positive integers, return the number of tuples
(a, b, c, d) such that a * b = c * d where a, b, c, and d are elements of nums,
and a != b != c != d.

Example 1:
Input: nums = [2,3,4,6]
Output: 8
Explanation: There are 8 valid tuples:
(2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
(3,4,2,6) , (3,4,2,6) , (3,4,6,2) , (4,3,6,2)

Example 2:
Input: nums = [1,2,4,5,10]
Output: 16
Explanation: There are 16 valids tuples:
(1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
(2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
(2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,4,5)
(4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
const tupleSameProduct = nums => {
    nums.sort((a, b) => a - b);
    let totalTuples = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (j === i) j++;
            let target = nums[i] * nums[j];
            let tuples = twoSum(nums, target, i, j);
            // console.log([nums[i], nums[j]], tuples);
            totalTuples += tuples * 8;
        }
    }
    return totalTuples;
}

const twoSum = (nums, target, i, j) => {
    let tuples = 0;
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
        if (l === i) l++;
        if (r === j) r--;
        if (l === r) break;
        let lNum = nums[l];
        let rNum = nums[r];
        let multi = lNum * rNum;
        if (multi === target) {
            l++;
            r--;
            tuples++;
        } else if (multi > target) {
            r--;
        } else {
            l++;
        }
    }
    return tuples;
}