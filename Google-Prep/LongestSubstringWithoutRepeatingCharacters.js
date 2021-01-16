/*
Given a string s, find the length of the longest substring without repeating
characters.
*/

// O(n) Time | O(k) Space - where n is the number of letters in s and k is the
// size of the letters Set
const lengthOfLongestSubstring = s => {
    let letters = new Set();
    let i = 0;
    let j = 0;
    let ans = 0;
    const len = s.length;
    while (i < len && j < len) {
        if (!letters.has(s[j])) {
            letters.add(s[j]);
            j++;
            ans = Math.max(ans, j - i);
        } else {
            letters.delete(s[i]);
            i++;
        }
    }
    
    return ans;
}