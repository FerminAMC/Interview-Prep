/*
Given a string s , find the length of the longest substring t  that contains at
most 2 distinct characters.

Example 1:
    Input: "eceba"
    Output: 3
    Explanation: t is "ece" which its length is 3.
*/

/**
 * @param {string} s
 * @return {number}
 */
// O(n) Time | O(1) Space - where n is the number or characters in s. It is
// constant space because both the set and dictionary in the function will store
// three values at most.
const lengthOfLongestSubstringTwoDistinct = s => {
    let l = 0;
    let r = 0;
    let letters = new Set();
    let letterCounter = {};
    let ans = 0;

    while (r < s.length) {
        let char = s[r];
        letters.add(char);
        if(!(char in letterCounter)) {
            letterCounter[char] = 1;
        } else {
            letterCounter[char]++;
        }
        
        if (letters.size <= 2) ans = Math.max(ans, r - l + 1);

        while (letters.size > 2 && l < r) {
            let leftChar = s[l];
            letterCounter[leftChar]--;
            if (letterCounter[leftChar] === 0) {
                delete letterCounter[leftChar];
                letters.delete(leftChar);
            }
            l++;
        }

        r++;
    }

    return ans;
}