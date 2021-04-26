/*
Input: s = "abcbacdb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
*/
 
/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function(s) {
    let maxLen = 0;
    let left = 0; // left pointer of the sliding window
    let letters = new Set();
    for (let i = 0; i < s.length; i++) {
        if (letters.has(s[i])) {
            // make window shorter
            while (s[left] != s[i]) {
                letters.delete(s[left]);
                left++;
            }
            left++;
        } else {
            // increase window
            letters.add(s[i]);
        }
        maxLen = Math.max(maxLen, letters.size);
    }
    return maxLen;
};