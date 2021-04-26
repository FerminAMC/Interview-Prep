/**
 * @param {number[]} nums
 * @return {number}
 */
 let rob = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        if (i >= 2) {
            nums[i] = Math.max(nums[i - 1], nums[i] + nums[i - 2]);   
        } else {
            nums[i] = Math.max(nums[i], nums[i - 1]);
        }
    } 
    
    return nums[nums.length - 1];
};