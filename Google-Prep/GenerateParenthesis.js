/*
Given n pairs of parentheses, write a function to generate all combinations of
well-formed parentheses.

Example:
    Input: n = 3
    Output: ["((()))","(()())","(())()","()(())","()()()"]
*/

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = (n) => {
    const ans = [];
    backtracking(ans, n, 0, 0, '');
    return ans;
}

const backtracking = (ans, n, open, close, curr) => {
    if (curr.length === n * 2) {
        ans.push(curr);
        return;
    }
    if (open < n) {
        backtracking(ans, n, open + 1, close, curr + '(');
    } 
    if (close < open) {
        backtracking(ans, n, open, close + 1, curr + ')');
    }
    return;
}