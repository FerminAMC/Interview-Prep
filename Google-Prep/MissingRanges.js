/*
You are given an inclusive range [lower, upper] and a sorted unique integer
array nums, where all elements are in the inclusive range.

A number x is considered missing if x is in the range [lower, upper] and x is
not in nums.

Return the smallest sorted list of ranges that cover every missing number
exactly. That is, no element of nums is in any of the ranges, and each missing
number is in one of the ranges.

Each range [a,b] in the list should be output as:

    "a->b" if a != b
    "a" if a == b


Example 1:

Input: nums = [0,1,3,50,75], lower = 0, upper = 99
Output: ["2","4->49","51->74","76->99"]
Explanation: The ranges are:
[2,2] --> "2"
[4,49] --> "4->49"
[51,74] --> "51->74"
[76,99] --> "76->99"
*/

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
// O(n) Time | O(n) Space - where n is the ammount of numbers in nums.
const findMissingRanges = (nums, lower, upper) => {
    let missingNumbers = [];

    // Edge case
    if (nums.length === 0) {
        if (upper === lower) {
            return [lower.toString()];
        } else {
            return [lower.toString() + "->" + upper.toString()];
        }
    }

    // First case: missing numbers before nums[0]
    if (nums[0] !== lower) {
        let substraction = Math.abs(nums[0] - lower);
        if (substraction > 1) {
            missingNumbers.push(lower.toString() + "->" + 
                (nums[0] - 1).toString());
        }else {
            missingNumbers.push(lower.toString());
        }
    }
    // Second case: missing numbers in the middle
    for (let i = 0; i < nums.length - 1; i++) {
        let substraction = Math.abs(nums[i + 1] - nums[i]);
        if (substraction > 1) {
            if (substraction === 2) {
                missingNumbers.push((nums[i] + 1).toString());
            } else {
                missingNumbers.push((nums[i] + 1).toString() + "->" + 
                    (nums[i + 1] - 1).toString());
            }
        }
    }
    // Third case: missing numbers after nums[nums.length - 1]
    if (nums[nums.length - 1] !== upper) {
        let substraction = Math.abs(upper - nums[nums.length - 1]);
        if (substraction > 1) {
            missingNumbers.push((nums[nums.length - 1] + 1).toString() + "->" +
                upper.toString());
        } else {
            missingNumbers.push(upper.toString());
        }
    }
    return missingNumbers;
}