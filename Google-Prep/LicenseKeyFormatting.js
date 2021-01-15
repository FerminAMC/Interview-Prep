/*
You are given a license key represented as a string S which consists only of
alphanumeric characters and dashes. The string is separated into N+1 groups by N
dashes.

Given a number K, we would want to reformat the strings such that each group
contains exactly K characters, except for the first group which could be shorter
than K, but still must contain at least one character. Furthermore, there must
be a dash inserted between two groups and all lowercase letters should be
converted to uppercase.

Given a non-empty string S and a number K, format the string according to the
rules described above.
*/

// O(n) Time | O(n) Space - where n is the number of characters in S.
const licenseKeyFormatting = (S, K) => {
    let newLicense = '';
    let currentCount = K;
    for (let i = S.length - 1; i >= 0; i--) {
        if (S[i] === '-') continue;
        currentCount--;
        if (currentCount >= 0) {
            newLicense = S[i].toUpperCase() + newLicense;
        } else {
            newLicense = S[i].toUpperCase() + '-' + newLicense; 
            currentCount = K - 1;
        }
    }
    return newLicense;
}

