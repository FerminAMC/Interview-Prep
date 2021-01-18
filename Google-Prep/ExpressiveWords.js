/*
Sometimes people repeat letters to represent extra feeling, such as
"hello" -> "heeellooo", "hi" -> "hiiii".  In these strings like "heeellooo", we
have groups of adjacent letters that are all the same:  "h", "eee", "ll", "ooo".

For some given string S, a query word is stretchy if it can be made to be equal
to S by any number of applications of the following extension operation: choose
a group consisting of characters c, and add some number of characters c to the
group so that the size of the group is 3 or more.

For example, starting with "hello", we could do an extension on the group "o" to
get "hellooo", but we cannot get "helloo" since the group "oo" has size less
than 3.  Also, we could do another extension like "ll" -> "lllll" to get
"helllllooo".  If S = "helllllooo", then the query word "hello" would be
stretchy because of these two extension operations:
query = "hello" -> "hellooo" -> "helllllooo" = S.

Given a list of query words, return the number of words that are stretchy. 

Example:
    Input: 
    S = "heeellooo"
    words = ["hello", "hi", "helo"]
    Output: 1
    Explanation: 
    We can extend "e" and "o" in the word "hello" to get "heeellooo".
    We can't extend "helo" to get "heeellooo" because the group "ll" is not size
    3 or more.
*/

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
// O(ws) Time | O(s) Space - where w is the number of words in words and s is
// the number of distinct letters in s
const expressiveWords = (s, words) => {
    let ans = 0;
    let reqLetters = getNeededLetters(s);
    for (let word of words) {
        let currentReq = getNeededLetters(word);
        if (currentReq.length !== reqLetters.length) continue;
        let foundWord = true;
        for (let i = 0; i < currentReq.length; i++) {
            if (currentReq[i][0] === reqLetters[i][0] &&
                currentReq[i][1] >= reqLetters[i][1] &&
                currentReq[i][2] <= reqLetters[i][2]) {
                    continue;
            }
            foundWord = false;
        }
        if (foundWord) ans++;
    }
    return ans;
}

const getNeededLetters = s => {
    let reqLetters = [];
    let current = s[0];
    let min = 1;
    let max = 1;
    reqLetters.push([current, min, max]);
    let j = 0;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === current) {
            min++;
            max++;
            if (max >= 3) {
                min = 1;
            }
            reqLetters[j][1] = min;
            reqLetters[j][2] = max;
        } else {
            current = s[i];
            min = 1;
            max = 1;
            reqLetters.push([current, min, max]);
            j++;
        }
    }
    return reqLetters;   
}