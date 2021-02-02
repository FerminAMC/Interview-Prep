/*
Given a set of non-overlapping intervals, insert a new interval into the
intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their
start times.
*/

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = (intervals, newInterval) => {
    if (intervals.length === 0) return [newInterval];
    let insertPos = findPos(intervals, newInterval[0]);
    intervals.splice(insertPos, 0, newInterval);
    return merge(intervals);
}

const merge = (intervals) => {
    const ans = [];
    let prevStart = intervals[0][0];
    let prevEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        let start = intervals[i][0];
        let end = intervals[i][1];
        if (start > prevEnd) {
            ans.push([prevStart, prevEnd]);
            prevStart = start;
        }
        prevEnd = Math.max(end, prevEnd);
        if (i === intervals.length - 1) {
            ans.push([prevStart, prevEnd]);
        }
    }
    return ans;
}

const findPos = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    let mid = 0;
    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        let num = nums[mid][0];
        if (num === target) {
            return mid;
        } else if (num > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return nums[mid][0] > target ? mid : mid + 1;
}