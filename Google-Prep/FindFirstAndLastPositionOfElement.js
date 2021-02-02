/*
Given an array of integers nums sorted in ascending order, find the starting
and ending position of a given target value.

If target is not found in the array, return [-1, -1].

Follow up: Could you write an algorithm with O(log n) runtime complexity?

Example: 
    Input: nums = [5,7,7,8,8,10], target = 8
    Output: [3,4]
*/

const searchRange = (nums, target) => {
    if (nums.length === 0) return [-1, -1];
    let firstPos = findFirst(nums, target);
    if (firstPos === -1) return [-1, -1];
    let secondPos = findSecond(nums, target, firstPos);
    return [firstPos, secondPos];
}

const findFirst = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    let pos = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let num = nums[mid];
        if (num === target) {
            pos = mid;
            right = mid - 1;
        } else if (num > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return pos;
}

const findSecond = (nums, target, start) => {
    let left = start + 1;
    let right = nums.length - 1;
    let pos = start;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let num = nums[mid];
        if (num === target) {
            pos = mid;
            left = mid + 1;
        } else if (num > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return pos;
}