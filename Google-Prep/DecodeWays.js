/*
A message containing letters from A-Z can be encoded into numbers using the
following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back
into letters using the reverse of the mapping above (there may be multiple
ways). For example, "11106" can be mapped into:

    "AAJF" with the grouping (1 1 10 6)
    "KJF" with the grouping (11 10 6)

Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into
'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The answer is guaranteed to fit in a 32-bit integer.

Example:
    Input: s = "12"
    Output: 2
    Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
*/

/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = function(s) {
    if (s[0] === '0') return 0;
    let dictionary = new Set();
    let memo = {};
    for (let i = 1; i < 27; i++) dictionary.add(i.toString());
    return dfs(0, 1);

    function dfs(start, end) {
        if (start === s.length) {
            return 1;
        } else if (end > s.length || end - start > 2) {
            return 0;
        }
        let substring = s.slice(start, end);
        let key = start.toString() + end.toString();
        if (key in memo) {
            return memo[key];
        }
        let ans = 0; 
        ans += dfs(start, end + 1);
        if (dictionary.has(substring)) {
            ans += dfs(end, end + 1);
        }
        memo[key] = ans;
        return ans;
    }
};