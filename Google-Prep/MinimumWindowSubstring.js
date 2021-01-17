/*
Given two strings s and t, return the minimum window in s which will contain all
the characters in t. If there is no such window in s that covers all characters
in t, return the empty string "".

Note that If there is such a window, it is guaranteed that there will always be
only one unique minimum window in s.

Example:
    Input: s = "ADOBECODEBANC", t = "ABC"
    Output: "BANC"
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = (s, t) => {
    if (s.length === 0 || t.length === 0) return "";
    let targetLetters = {};
    let windowLetters = {};
    let left = 0;
    let right = 0;
    let ans = [-1, 0, 0]; // [ans.length, start, end]
    let required = 0;
    let formed = 0;

    for (let char of t) {
        if (!(char in targetLetters)) {
            targetLetters[char] = 1;
            windowLetters[char] = 0;
            required++;
        } else {
            targetLetters[char]++; 
        }
    }

    while (right < s.length) {
        let rChar = s[right];
        if (rChar in targetLetters) {
            windowLetters[rChar]++;
            if (windowLetters[rChar] === targetLetters[rChar]) {
                formed++;
            }
        }

        while (formed === required && left <= right) {
            let lChar = s[left];
            if (ans[0] === -1 || right - left + 1 < ans[0]){
                ans[0] = right - left + 1;
                ans[1] = left;
                ans[2] = right;
            }
            if (lChar in targetLetters) {
                windowLetters[lChar]--;
                if(windowLetters[lChar] < targetLetters[lChar]) {
                    formed--;
                }
            }

            left++;
        }

        right++;
    }

    return ans[0] === -1? "" : s.slice(ans[1], ans[2] + 1);
}