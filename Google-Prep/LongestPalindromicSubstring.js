/*
Given a string s, return the longest palindromic substring in s.

Example:
    Input: s = "babad"
    Output: "bab"
    Note: "aba" is also a valid answer.
*/

/**
 * @param {string} palindrome
 * @return {string}
 */
const longestPalindrome = (palindrome) => {
    let max = palindrome[0];
    for (let i = 1; i < palindrome.length; i++) {
        let leftRight = expandLeftRight(palindrome, i-1, i+1, palindrome[i]);
        let sameChars = expandSameChar(palindrome, i);
        if (leftRight.length > sameChars.length) {
            max = leftRight.length > max.length ? leftRight : max;
        } else {
            max = sameChars.length > max.length ? sameChars : max;
        }
    }
    return max;
}

const expandLeftRight = (palindrome, idxL, idxR, sub) => {
    let left = idxL;
    let right = idxR;
    let substring = sub;
    while (left >= 0 && right < palindrome.length) {
        let leftChar = palindrome[left];
        let rightChar = palindrome[right];
        if (leftChar === rightChar) {
            substring = leftChar + substring + rightChar;
        } else {
            break;
        }
        left--;
        right++;
    }
    return substring;
}

const expandSameChar = (palindrome, idx) => {
    let substring = palindrome[idx];
    let left = idx - 1;
    let target = palindrome[idx];
    while (left >= 0) {
        let leftChar = palindrome[left];
        if (leftChar === target) {
            substring += leftChar;
            left--;
        } else break;
    }
    if (substring.length > 1) {
        substring = expandLeftRight(palindrome, left, idx+1, substring);
    }
    return substring;
}