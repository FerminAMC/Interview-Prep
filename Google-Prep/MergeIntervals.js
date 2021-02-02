/*
Given an array of intervals where intervals[i] = [starti, endi], merge all
overlapping intervals, and return an array of the non-overlapping intervals
that cover all the intervals in the input.

Example:
    Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
    Output: [[1,6],[8,10],[15,18]]
    Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
*/

const merge = (intervals) => {
    if (intervals.length === 1) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);
    let prevStart = intervals[0][0];
    let prevEnd = intervals[0][1];
    let ans = [];
    for (let i = 1; i < intervals.length; i++) {
        let start = intervals[i][0];
        let end = intervals[i][1];
        if (start > prevEnd) {
            ans.push([prevStart, prevEnd]);
            prevStart = start;
        }
        prevEnd = Math.max(prevEnd, end);
        if (i === intervals.length - 1) {
            ans.push([prevStart, prevEnd]);
        }
    }
    return ans;
}