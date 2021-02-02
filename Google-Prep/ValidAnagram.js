/*
Given two strings s and t , write a function to determine if t is an anagram of
s.

Example:
    Input: original = "anagram", anagram = "nagaram"
    Output: true

Note:
    You may assume the string contains only lowercase alphabets.

Follow up:
    What if the inputs contain unicode characters? How would you adapt your
    solution to such case?
*/

/**
 * O(n) Time | O(1) Space - where n is the number of characters in the anagram.
 * It is O(1) Space because the number of possible characters to store in the
 * hash map and the set is very small. If we are using only lowercase letters, 
 * we only store, at most, 26 characters. This holds up if we introduce any
 * other possible characters. The number is still very small and can be
 * considered to be O(1) Space.
 * @param {string} original
 * @param {string} anagram
 * @return {boolean}
 */
const isAnagram = (original, anagram) => {
    let requiredChars = new Set();
    let charCount = {};
    for (let char of original) {
        if (!(char in charCount)) {
            charCount[char] = 1;
            requiredChars.add(char);
        } else {
            charCount[char]++;
        } 
    }
    for (let char of anagram) {
        if (char in charCount) {
            charCount[char]--;
            if (charCount[char] === 0) {
                delete charCount[char];
                requiredChars.delete(char);
            }
        } else return false;
    }

    return requiredChars.size === 0;
}