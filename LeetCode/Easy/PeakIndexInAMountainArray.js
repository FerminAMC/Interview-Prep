/*
Link: https://leetcode.com/problems/peak-index-in-a-mountain-array/
Let's call an array arr a mountain if the following properties hold:

    arr.length >= 3
    There exists some i with 0 < i < arr.length - 1 such that:
        arr[0] < arr[1] < ... arr[i-1] < arr[i]
        arr[i] > arr[i+1] > ... > arr[arr.length - 1]

Given an integer array arr that is guaranteed to be a mountain, return any i
such that arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... >
arr[arr.length - 1].
*/

const peakIndexInMountainArray = arr => {
    let left = 0;
    let right = arr.length;
    let answer = 0;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid + 1] > arr[mid]) {
            left = mid + 1;
            answer = mid + 1;
        } else {
            right = mid;
        }
    } 
    return answer;
}