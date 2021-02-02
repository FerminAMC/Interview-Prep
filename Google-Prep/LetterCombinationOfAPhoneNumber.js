/*
Given a string containing digits from 2-9 inclusive, return all possible letter
combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given
below. Note that 1 does not map to any letters.
*/

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
    if (digits === '') return [];
    const letters = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }
    return dfs(0, digits, letters, [], '');
}

// O(3^N * 4^M) Time | O(3^N * 4^M) Space - where N is the number of digits in
// the input that map to a number with 3 letters and M is the number of digits
// that map to a number with 4 letters.
const dfs = (step, digits, letters, result, word) => {
    if (step === digits.length) {
        result.push(word);
        return result;
    }
    let number = digits[step];
    for (let letter of letters[number]) {
        dfs(step + 1, digits, letters, result, word + letter);
    }
    return result;
}