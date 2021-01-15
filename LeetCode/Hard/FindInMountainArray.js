/*
Link: https://leetcode.com/problems/find-in-mountain-array/

You may recall that an array A is a mountain array if and only if:

    * A.length >= 3
    * There exists some i with 0 < i < A.length - 1 such that:
        × A[0] < A[1] < ... A[i-1] < A[i]
        × A[i] > A[i+1] > ... > A[A.length - 1]

Given a mountain array mountainArr, return the minimum index such that
mountainArr.get(index) == target.  If such an index doesn't exist, return -1.

You can't access the mountain array directly.  You may only access the array
using a MountainArray interface:

    * MountainArray.get(k) returns the element of the array at index k 
      (0-indexed).
    * MountainArray.length() returns the length of the array.

Submissions making more than 100 calls to MountainArray.get will be judged Wrong
Answer. Also, any solutions that attempt to circumvent the judge will result in
disqualification.
*/

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = (target, mountainArr) => {
    let left = 0;
    let right = mountainArr.length() - 1;
    let peakIdx = 0;
    let peakVal = 0;
    let answer = -1;

    // Finding peak val / index in the mountainArray
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = mountainArr.get(mid);
        const rightVal = mountainArr.get(mid + 1);
        if (rightVal > midVal) {
            left = mid + 1;
            peakIdx = mid + 1;
            peakVal = rightVal;
        } else {
            right = mid;
        }
    }

    // Once I have the peak value and index, I can start from that point doing
    // binary search on the left and, if needed, right side of the peak.
    if (target > peakVal) return answer;
    answer = ascendingOrder(target, mountainArr, peakIdx);
    if (answer === -1) answer = descendingOrder(target, mountainArr, peakIdx);

    return answer;
}

const ascendingOrder = (target, mountainArr, rightBoundary) => {
    let left = 0;
    let right = rightBoundary;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const currentNumber = mountainArr.get(mid);
        if (currentNumber === target) {
            return mid;
        } else if (currentNumber > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return -1;
}

const descendingOrder = (target, mountainArr, leftBoundary) => {
    let left = leftBoundary;
    let right = mountainArr.length() - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const currentNumber = mountainArr.get(mid);
        if (currentNumber === target) {
            return mid;
        } else if (currentNumber > target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}