/*
To some string S, we will perform some replacement operations that replace
groups of letters with new ones (not necessarily the same size).

Each replacement operation has 3 parameters: a starting index i, a source word
x and a target word y.  The rule is that if x starts at position i in the
original string S, then we will replace that occurrence of x with y.  If not,
we do nothing.

For example, if we have S = "abcd" and we have some replacement operation i = 2,
x = "cd", y = "ffff", then because "cd" starts at position 2 in the original
string S, we will replace it with "ffff".

Using another example on S = "abcd", if we have both the replacement operation
i = 0, x = "ab", y = "eee", as well as another replacement operation i = 2,
x = "ec", y = "ffff", this second operation does nothing because in the original
string S[2] = 'c', which doesn't match x[0] = 'e'.

All these operations occur simultaneously.  It's guaranteed that there won't be
any overlap in replacement: for example, S = "abc", indexes = [0, 1],
sources = ["ab","bc"] is not a valid test case.

Example:
    Input: S = "abcd", indexes = [0, 2], sources = ["a", "cd"], 
        targets = ["eee", "ffff"]
    Output: "eeebffff"
    Explanation:
    "a" starts at index 0 in S, so it's replaced by "eee".
    "cd" starts at index 2 in S, so it's replaced by "ffff".
*/

/**
 * @param {string} s
 * @param {number[]} indexes
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
// O(n²) Time | O(i) Space - where n is s.length and i is indexes.length 
const findReplaceString = (s, indexes, sources, targets)  => {
    let ans = s;
    let delta = 0;
    let allInfo = [];

    for (let i = 0; i < indexes.length; i++) {
        allInfo.push([indexes[i], sources[i], targets[i]]);
    }
    allInfo.sort((a, b) => a[0] - b[0]);
    
    for (let i = 0; i < allInfo.length; i++) {
        let idx = allInfo[i][0] + delta;
        if (foundSubstring(s, allInfo[i][0], allInfo[i][1])) {
            ans = replaceAt(ans, allInfo[i][1], allInfo[i][2], idx);
            delta = ans.length - s.length;
        }
    }
    return ans;
}

const foundSubstring = (s, idx, target) => {
    let ans = true;
    for (let i = idx, j = 0; i < s.length && j < target.length; i++, j++) {
        if (s[i] === target[j]) continue;
        ans = false;
    }
    return ans;
}

/**
 * @param {string} s
 * @param {number} start
 * @param {number} end
 * @param {string} replacement
 * @return {string}
*/
const replaceAt = (s, source, target, idx) => {
    let ans = "";
    let end = idx + source.length;
    ans = s.slice(0, idx) + target + s.slice(end); 
    return ans;
}