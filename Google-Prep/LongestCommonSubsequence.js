/*
Given two strings text1 and text2, return the length of their longest common
subsequence.

A subsequence of a string is a new string generated from the original string
with some characters(can be none) deleted without changing the relative order of
the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is
not). A common subsequence of two strings is a subsequence that is common to
both strings. 

If there is no common subsequence, return 0.
*/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function(text1, text2) {
    let ans = 0;
    let cache = new Set();

    dfs("", 0, 0);
    return ans;

    function dfs(subsequence, pos1, pos2) {
        ans = Math.max(ans, subsequence.length);
        
        let key = pos1.toString() + pos2.toString();
        if (cache.has(key)) return;

        for (let i = pos1; i < text1.length; i++) {
            let curr1 = text1[i];
            for (let j = pos2; j < text2.length; j++) {
                let curr2 = text2[j];
                if (curr1 === curr2) {
                    dfs(subsequence + curr1, i + 1, j + 1);
                }
            }
        }
        cache.add(key);
        return;
    };
}