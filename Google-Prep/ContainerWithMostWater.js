/*
Given n non-negative integers a1, a2, ..., an , where each represents a point at
coordinate (i, ai). n vertical lines are drawn such that the two endpoints of
the line i is at (i, ai) and (i, 0). Find two lines, which, together with the
x-axis forms a container, such that the container contains the most water.

Notice that you may not slant the container.
*/

// Brute force approach
// O(n²) Time | O(1) Space - where n is the length of the height array.
const maxArea = height => {
    let ans = 0;
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const currentArea = Math.min(height[i], height[j]) * (j - i);
            ans = Math.max(ans, currentArea);
        }
    }
    return ans;
}

// Two pointer approach
// O(n) Time | O(1) Space - where n is the length of the height array.
const maxArea = height => {
    let left = 0;
    let right = height.length - 1;
    let ans = 0;
    while (left < right) {
        const currArea = Math.min(height[left], height[right]) * (right - left);
        ans = Math.max(ans, currentArea);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return ans;
}