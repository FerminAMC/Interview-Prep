/*
Given a non-empty string s and a dictionary wordDict containing a list of
non-empty words, determine if s can be segmented into a space-separated sequence
of one or more dictionary words.

Note:

    The same word in the dictionary may be reused multiple times in the
        segmentation.
    You may assume the dictionary does not contain duplicate words.
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function(s, wordDict) {
    const words = new Set(wordDict);
    let cache = {};

    return dfs(0, 0);

    function dfs(start, end) {
        if (start === s.length) {
            return true;
        } else if (end > s.length + 1) {
            return false;
        }

        let ans = false;
        let substring = s.slice(start, end);
        if (substring in cache) {
            return cache[substring];
        }
        if (words.has(substring)) {
            ans = ans || dfs(end, end + 1);
        }
        ans = ans || dfs(start, end + 1);

        cache[substring] = ans;
        return ans;
    };
}