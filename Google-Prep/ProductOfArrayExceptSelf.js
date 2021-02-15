/*
Given an array nums of n integers where n > 1,  return an array output such that
output[i] is equal to the product of all the elements of nums except nums[i].

Example:
    Input:  [1,2,3,4]
    Output: [24,12,8,6]

Constraint: It's guaranteed that the product of the elements of any prefix or
suffix of the array (including the whole array) fits in a 32 bit integer.

Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not
count as extra space for the purpose of space complexity analysis.)
*/

// O(n) Time | O(n) Space
const productExceptSelf = (nums) => {
    let lProduct = new Array(nums.length).fill(0);
    let rProduct = new Array(nums.length).fill(0);
    let ans = new Array(nums.length);
    for (let i = 0, j = nums.length - 1; i < nums.length; i++, j--) {
        if (i === 0) {
            lProduct[i] = nums[i];
            rProduct[j] = nums[j];
        } else {
            let lPrev = lProduct[i - 1];
            lProduct[i] = nums[i] * lPrev;
            let rPrev = rProduct[j + 1];
            rProduct[j] = nums[j] * rPrev; 
        }
    }
    ans[0] = rProduct[1];
    ans[nums.length - 1] = lProduct[nums.length - 2]; 
    for (let i = 1; i < nums.length - 1; i++) {
        ans[i] = lProduct[i - 1] * rProduct[i + 1];
    }
    return ans;
}

// (n) Time | O(1) Space
const productExceptSelf = (nums) => {
    let n = nums.length;
    let ans = new Array(n).fill(0);
    ans[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        ans[i] = nums[i] * ans[i + 1];
    }
    let aux = nums[0];
    ans[0] = ans[1];
    for (let i = 1; i < n; i++) {
        if (i === n - 1) {
            ans[i] = aux;
        } else {
            ans[i] = aux * ans[i + 1];
            aux *= nums[i];
        }
    }
    return ans;
}