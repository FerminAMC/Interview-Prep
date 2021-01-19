/*
Given n non-negative integers representing an elevation map where the width of
each bar is 1, compute how much water it can trap after raining.
*/

/**
 * @param {number[]} height
 * @return {number}
 */
// O(n) Time | O(n) Space - where n is the number of elements in height
const trap = height => {
    let leftMax = new Array(height.length);
    leftMax[0] = height[0];
    let rightMax = new Array(height.length);
    rightMax[height.length - 1] = height[height.length - 1]; 
    for (let i = 1, j = height.length - 2; j >= 0; i++, j--) {
        leftMax[i] = Math.max(height[i], leftMax[i - 1]);
        rightMax[j] = Math.max(height[j], rightMax[j + 1]);
    }
    let trappedWater = 0;
    for (let i = 0; i < height.length; i++) {
        let h = height[i];
        let minH = Math.min(leftMax[i], rightMax[i]);
        trappedWater += minH - h;
    }
    return trappedWater;
}