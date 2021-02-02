/*
Let's call an array arr a mountain if the following properties hold:

    arr.length >= 3
    There exists some i with 0 < i < arr.length - 1 such that:
        arr[0] < arr[1] < ... arr[i-1] < arr[i]
        arr[i] > arr[i+1] > ... > arr[arr.length - 1]

Given an integer array arr that is guaranteed to be a mountain, return any i
such that arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... >
    arr[arr.length - 1].

Example:
    Input: arr = [3,4,5,1]
    Output: 2

Constraints: 
    3 <= arr.length <= 104
    0 <= arr[i] <= 106
    arr is guaranteed to be a mountain array.
*/

const peakIndexInMountainArray = (arr) => {
    let peak = 0;
    let max = 0;
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let midVal = arr[mid];
        let leftMid = arr[mid - 1];
        let rightMid = arr[mid + 1];
        if (midVal > leftMid && midVal > rightMid) {
            return mid;
        } else if (midVal > leftMid) {
            left = mid;
        } else {
            right = mid;
        }
    }
}