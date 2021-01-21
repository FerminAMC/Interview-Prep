/*
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the
square brackets is being repeated exactly k times. Note that k is guaranteed to
be a positive integer.

You may assume that the input string is always valid; No extra white spaces,
square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits
and that digits are only for those repeat numbers, k. For example, there won't
be input like 3a or 2[4].

Input: s = "3[a]abc2[bc]"
Output: aaabc
Notes: 
    I don't have to deal with white spaces
    Substrings to be repeated are always in brackets
    s can only have numbers, brackets and lowercase letters
Approach:
    Two stacks. One stack for numbers and the other one for fulll strings.
    There are 4 scenarios:
        When you find a number
        When you find an opening bracket
        When you find a closing bracket
        When you find a letter
    When you find a number, you append every character until you get to an 
    opening bracket, then you can convert that string of a number into an int.
    It is also the time when you push into the string stack any possible string
    that may have been formed before the number. It may also be that you just
    add an empty string to the stack.
    When you find a letter, just concatenate it to the current string. This will
    later be takes for decoding or if it is already decoded, to keep track of
    what has been done so far. 
    When finding a closing bracket, it is time to start decoding the current
    string and prepend the decoded string already in the stack.
    Finally, return the string.
*/

// O(n) Time | O(n) Space - where n is the length of the given string. I'm
// assuming that the the string.repeat(k) function is of constant time,
// otherwise the complexity jumps to O(nk) where k is the maximum integer in the
// string.
const decodeString = s => {
    let numStack = [];
    let stringStack = [];
    let num = "";
    let currentString = "";
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (char.match(/\d/) !== null) {
            num = num + char;
        } else if (char === '[') {
            num = parseInt(num);
            numStack.push(num);
            num = "";
            stringStack.push(currentString);
            currentString = "";
        } else if (char === ']') {
            let k = numStack.pop();
            let decodedString = stringStack.pop();
            currentString = decodedString + currentString.repeat(k);
        } else {
            currentString = currentString + char;
        }
    }
    return currentString;
}