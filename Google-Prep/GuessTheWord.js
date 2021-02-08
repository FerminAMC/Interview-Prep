/*
We are given a word list of unique words, each word is 6 letters long, and one
word in this list is chosen as secret.

You may call master.guess(word) to guess a word.  The guessed word should have
type string and must be from the original list with 6 lowercase letters.

This function returns an integer type, representing the number of exact matches
(value and position) of your guess to the secret word.  Also, if your guess is
not in the given wordlist, it will return -1 instead.

For each test case, you have 10 guesses to guess the word. At the end of any
number of calls, if you have made 10 or less calls to master.guess and at least
one of these guesses was the secret, you pass the testcase.

Besides the example test case below, there will be 5 additional test cases,
each with 100 words in the word list.  The letters of each word in those
testcases were chosen independently at random from 'a' to 'z', such that every
word in the given word lists is unique.

Example 1:
Input: secret = "acckzz", wordlist = ["acckzz","ccbazz","eiowzz","abcczz"]

Explanation:

    master.guess("aaaaaa") returns -1, because "aaaaaa" is not in wordlist.
    master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6
        matches.
    master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.
    master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.
    master.guess("abcczz") returns 4, because "abcczz" has 4 matches.

We made 5 calls to master.guess and one of them was the secret, so we pass the
test case.

*/

/**
 * // This is the master's API interface.
 * // You should not implement it, or speculate about its implementation
 * function Master() {
 *
 *     @param {string[]} wordlist
 *     @param {Master} master
 *     @return {integer}
 *     this.guess = function(word) {
 *         ...
 *     };
 * };
 */
/**
 * O(n²log(n)) Time
 * @param {string[]} wordlist
 * @param {Master} master
 * @return {void}
 */
const findSecretWord = (wordlist, master) => {
    let wordWithMatches = {};
    // First we fill the dictionary wordWithMatches
    for (let i = 0; i < wordlist.length; i++) {
        let word1 = wordlist[i];
        if (!(word1 in wordWithMatches)) {
            wordWithMatches[word1] = [];
        }
        for (let j = 0; j < wordlist.length; j++) {
            if (i === j) continue;
            let word2 = wordlist[j];
            if (!(word2 in wordWithMatches)) {
                wordWithMatches[word2] = [];
            }
            matches(word1, word2, wordWithMatches);
        } 
    }
    
    // Now we start guessing, deleting any words with a lower match count than
    // our guess. We are learning from our mistakes.
    let guess = wordlist[0];
    let notGuessed = new Set(wordlist);
    notGuessed.delete(guess);
    for (let i = 0; i < 10; i++) {
        let match = master.guess(guess);
        // console.log(guess, match, notGuessed);
        if (match === 6) return;
        let changedGuess = false;
        if (match > 0) {
            for (let word of wordWithMatches[guess]) {
                if (word[0] >= match && notGuessed.has(word) && !changedGuess) {
                    changedGuess = true;
                    guess = word[1];
                } else if (word[0] < match){
                    delete wordlist[word[1]];
                    notGuessed.delete(word[1]);
                }
            }
        }
        if (!changedGuess) {
            for (let word of notGuessed.values()) {
                guess = word;
                break;
            }
        }
        notGuessed.delete(guess);
    }
    return;
}

// O(1) Time - since the words always have a length of 6.
const matches = (word1, word2, wordList) => {
    let match = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] === word2[i]) match++;
    }
    insertInOrder(wordList[word1], [match, word2]);
    return;
}

// O(log(n)) Time
const insertInOrder = (arr, val) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid][0] > val[0]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    arr.splice(left, 0, val);
    return;
}