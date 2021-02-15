/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const combinationSum4 = function(nums, target) {
    nums.sort((a, b) => a - b);
    const cache = {};
    return dfs();
    
    function dfs(remain = target) {
        if (remain == 0) {
            return 1;
        }
        if (remain in cache) {
            return cache[remain];
        }
        let ans = 0;
        for (let num of nums) {
            if (remain - num >= 0) {
                ans += dfs(remain - num);
            }
        }
        
        cache[remain] = ans;
        return ans;
    }
};