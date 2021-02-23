/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var longestPalindrome = function(word1, word2) {
    let substringsOne = makeSubstrings(word1);
    let substringsTwo = makeSubstrings(word2);
    const checked = {};
    
    let max = 0;
    for (let subOne of substringsOne) {
        if (subOne == '') continue;
        for (let subTwo of substringsTwo) {
            if (subTwo == '') continue;
            if (subOne.length + subTwo.length <= max) continue;
            max = Math.max(max, checkPalindrome(subOne, subTwo, checked));
        }    
    }
    
    return max;
};

const makeSubstrings = function(word) {
    let substrings = [''];
    for (let i = 0; i < word.length; i++){
        const subLen = substrings.length
        for (let j = 0; j < subLen; j++) {
            let newSubstring = substrings[j] + word[i];
            substrings.push(newSubstring);
        }
    }
    return substrings;
};

const checkPalindrome = function(subOne, subTwo, checked) {
    let combined = subOne + subTwo;
    if (combined in checked) {
        return checked[combined];
    }
    let left = 0; 
    let right = combined.length - 1;
    while (left < right) {
        if (combined[left] !== combined[right]) {
            checked[combined] = 0;
            return 0;
        }
        left++;
        right--;
    }    
    checked[combined] = combined.length;
    return combined.length;
    
};