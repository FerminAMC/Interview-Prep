/*
Given two strings S and T, return if they are equal when both are typed into
empty text editors. # means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

Example:
    Input: S = "ab#c", T = "ad#c"
    Output: true
    Explanation: Both S and T become "ac".

Note:
    1 <= S.length <= 200
    1 <= T.length <= 200
    S and T only contain lowercase letters and '#' characters.
*/

/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
// O(n) Time | O(1) Space - where n is the length of the longest string
const backspaceCompare = (S, T) => {
    let idxS = 0;
    let idxT = 0;
    while (idxS < S.length || idxT < T.length) {
        if (S[idxS] === '#' && idxS < S.length) {
            [S, idxS] = removeLetter(S, idxS);
        }
        if (T[idxT] === '#' && idxT < T.length) {
            [T, idxT] = removeLetter(T, idxT);
        }
        idxS++;
        idxT++;
    }
    return S === T;
}

const removeLetter = (s, idx) => {
    let ans = "";
    let removed = 2;
    if (idx === 0) {
        ans = s.slice(1);
        removed = 1;
    }
    else ans = s.slice(0, idx - 1) + s.slice(idx + 1);

    return [ans, idx - removed];
}