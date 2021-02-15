/*
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you
climb to the top?

Input: n = 2
    Output: 2
    Explanation: There are two ways to climb to the top.
    1. 1 step + 1 step
    2. 2 steps
*/

// DFS with Memoization
// O(n) Time | O(n) Space;
const climbStairs = (n) => {
    let cache = {};
    return dfs(0, 0);
    function dfs(level, count) {
        if (count === n) {
            return 1;
        } else if (count > n) {
            return 0;
        }
        let key = level.toString() + count.toString();
        if (key in cache) {
            return cache[key];
        }
        let sum = 0;
        sum += dfs(level + 1, count + 1);
        sum += dfs(level + 1, count + 2);
        cache[key] = sum;
        return sum;
    }
}

// Dynamic programming. Pretty much just calculating Fib(n)...
// O(n) Time | O(n) Space
const climbStairs = (n) => {
    let ans = new Array(n + 1).fill(0);
    for(let i = 1; i <= n; i++) {
        if (i <= 2) {
            ans[i] = i;
        } else {
            ans[i] = ans[i - 1] + ans[i - 2];
        }
    }
    return ans[n];
}
