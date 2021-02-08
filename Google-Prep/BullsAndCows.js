/*
You are playing the Bulls and Cows game with your friend.

You write down a secret number and ask your friend to guess what the number is.
When your friend makes a guess, you provide a hint with the following info:

    The number of "bulls", which are digits in the guess that are in the correct
        position.
    The number of "cows", which are digits in the guess that are in your secret
        number but are located in the wrong position. Specifically, the non-bull
        digits in the guess that could be rearranged such that they become
        bulls.

Given the secret number secret and your friend's guess guess, return the hint
for your friend's guess.

The hint should be formatted as "xAyB", where x is the number of bulls and y is
the number of cows. Note that both secret and guess may contain duplicate
digits.

Example 1:

    Input: secret = "1807", guess = "7810"
    Output: "1A3B"
    Explanation: Bulls are connected with a '|' and cows are underlined:
    1 8 0 7
    - | - -
      |
    7 8 1 0
    -   - -

Example 2:

    Input: secret = "1123", guess = "0111"
    Output: "1A1B"
    Explanation: Bulls are connected with a '|' and cows are underlined:
    1 1 2 3        1 1 2 3
      |       or     |
    0 1 1 1        0 1 1 1
    Note that only one of the two unmatched 1s is counted as a cow since the
    non-bull digits can only be rearranged to allow one 1 to be a bull.


Bulls are the numbers that matched, cows are numbers in the target number, but
in a different position.

Approach:
    For loop with i and j, pointing to the two strings given
        store in a map every non-matching (non-bulls) numbers with the number
        of occurences
        In the same pass check for cows by looking into the map. 
            If you find a cow, make a reduction to that number in the map
    
    Return the number of bulls and cows
*/

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
const getHint = (secret, guess) => {
    let bulls = 0;
    let cows = 0;
    let secretMap = {};
    let guessMap = {};
    for (let i = 0; i < secret.length; i++) {
        let secretChar = secret[i];
        let guessChar = guess[i];
        if (guessChar === secretChar) {
            bulls++;
        } else {
            if (secretChar in secretMap) {
                secretMap[secretChar]++;
            } else {
                secretMap[secretChar] = 1;
            }
            if (guessChar in guessMap) {
                guessMap[guessChar]++;
            } else {
                guessMap[guessChar] = 1;
            }
        }
    }
    for (let key of Object.keys(guessMap)) {
        let numGuess = guessMap[key];
        if (key in secretMap) {
            cows += Math.min(numGuess, secretMap[key]);
        }
    }
    return bulls.toString() + 'A' + cows.toString() + 'B'; 
}
