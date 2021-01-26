/*
You are given two strings a and b that consist of lowercase letters. In one
operation, you can change any character in a or b to any lowercase letter.

Your goal is to satisfy one of the following three conditions:

    Every letter in a is strictly less than every letter in b in the alphabet.
    Every letter in b is strictly less than every letter in a in the alphabet.
    Both a and b consist of only one distinct letter.

Return the minimum number of operations needed to achieve your goal.

Example:
    Input: a = "aba", b = "caa"
    Output: 2
    Explanation: Consider the best way to make each condition true:
    1) Change b to "ccc" in 2 operations, then every letter in a is less than
       every letter in b.
    2) Change a to "bbb" and b to "aaa" in 3 operations, then every letter in b
       is less than every letter in a.
    3) Change a to "aaa" and b to "aaa" in 2 operations, then a and b consist of
       one distinct letter.
    The best way was done in 2 operations (either condition 1 or condition 3).
*/

const minCharacters = (a, b) => {
    let minConditionOne = conditionOneAndTwo(a, b);
    let minConditionTwo = conditionOneAndTwo(b, a);
    let minConditionThree = conditionThree(a, b);
    return Math.min(minConditionOne, minConditionTwo, minConditionThree);
}

const conditionOneAndTwo = (a, b) => {
    let minCost = Infinity;
    for (let char = 98; char <= 122; char++) {
        let cost = 0;
        let curr = String.fromCharCode(char);
        for (let i = 0; i < a.length; i++) {
            let charCode = a.charCodeAt(i);
            if (charCode < char) continue;
            cost++;
        }
        for (let i = 0; i < b.length; i++) {
            let charCode = b.charCodeAt(i);
            if (charCode >= char) continue;
            cost++; 
        }
        minCost = Math.min(minCost, cost);
    }
    return minCost;
}

const conditionThree = (a, b) => {
    // String a
    const lettersA = {};
    let maxFreqA = 0;
    let maxFreqCharA = '';
    // String b
    const lettersB = {};
    let maxFreqB = 0;
    let maxFreqCharB = '';

    // String a
    for (let i = 0; i < a.length; i++) {
        let charCode = a.charCodeAt(i);
        let char = a[i];
        let freq = 1;
        if (char in lettersA) {
            lettersA[char]++;
            freq = lettersA[char];
        } else {
            lettersA[char] = 1;
        }
        if (freq > maxFreqA) {
            maxFreqA = freq;
            maxFreqCharA = char;
        }
    }
    // String b
    for (let i = 0; i < b.length; i++) {
        let charCode = b.charCodeAt(i);
        let char = b[i];
        let freq = 1;
        if (char in lettersB) {
            lettersB[char]++;
            freq = lettersB[char];
        } else {
            lettersB[char] = 1;
        }
        if (freq > maxFreqB) {
            maxFreqB = freq;
            maxFreqCharB = char;
        }
    }

    // Using maxFreqA
    let costA = a.length - maxFreqA;
    let freqB = maxFreqCharA in lettersB ? lettersB[maxFreqCharA] : 0;
    costA += b.length - freqB;
    // Using maxFreqB
    let costB = b.length - maxFreqB;
    let freqA = maxFreqCharB in lettersA ? lettersA[maxFreqCharB] : 0;
    costB += a.length - freqA;

    return Math.min(costA, costB);
}