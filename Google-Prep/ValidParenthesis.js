/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
    Open brackets must be closed by the same type of brackets.
    Open brackets must be closed in the correct order.

Example:
    Input: s = "()"
    Output: true
*/

// O(n) Time | O(n) Space - where n is s.length
const isValid = s => {
    const keys = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    let stack = [];
    for (let char of s) {
        if (!(char in keys)) stack.push(char);
        else {
            let pop = stack.pop();
            if (pop !== keys[char]) return false;
        }
    }
    return stack.length === 0;
}