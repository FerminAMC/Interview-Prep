/*
Given a non-empty array of decimal digits representing a non-negative integer,
increment one to the integer.

The digits are stored such that the most significant digit is at the head of the
list, and each element in the array contains a single digit.

You may assume the integer does not contain any leading zero, except the number
0 itself.
*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = digits => {
    let carryOver = 0;
    let addedOne = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let currentSum = 0;
        if (!addedOne) {
            currentSum = digits[i] + 1 + carryOver;
            addedOne = true;
        } else {
            currentSum = digits[i] + carryOver;
        }
        
        carryOver = 0;
        if (currentSum >= 10) {
            carryOver = Math.floor(currentSum / 10);
            currentSum = currentSum % 10;
        }
        digits[i] = currentSum;
        if (carryOver === 0) break;
    }
    if (carryOver > 0) digits.unshift(carryOver);
    return digits;
}