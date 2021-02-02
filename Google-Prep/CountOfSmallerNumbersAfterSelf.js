/*
You are given an integer array nums and you have to return a new counts array.
The counts array has the property where counts[i] is the number of smaller
elements to the right of nums[i].

Example:
    Input: nums = [5,2,6,1]
    Output: [2,1,1,0]
    Explanation:
    To the right of 5 there are 2 smaller elements (2 and 1).
    To the right of 2 there is only 1 smaller element (1).
    To the right of 6 there is 1 smaller element (1).
    To the right of 1 there is 0 smaller element.
*/

/**
 * O(nlogn) Time | O(n) Space - where n is the length of nums.
 * @param {number[]} nums
 * @return {number[]}
 */
const countSmaller = (nums) => {
    let sorted = [];
    let ans = [];
    for (let i = nums.length - 1; i >= 0; i--) {
        let left = 0;
        let right = sorted.length;
        let target = nums[i];
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            let curr = sorted[mid];
            if (target > curr) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        ans.unshift(left);
        sorted.splice(left, 0, target);
    }
    return ans;
}