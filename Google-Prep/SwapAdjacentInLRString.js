/*
In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move
consists of either replacing one occurrence of "XL" with "LX", or replacing one
occurrence of "RX" with "XR". Given the starting string start and the ending
string end, return True if and only if there exists a sequence of moves to
transform one string to the other.

Example 1:

    Input: start = "XRXLRXRXL", end = "XRLXXRRLX"
    Output: true
    Explanation: We can transform start to end following these steps:
    RXXLRXRXL ->
    XRXLRXRXL ->
    XRLXRXRXL ->
    XRLXXRRXL ->
    XRLXXRRLX

For some reason LeetCode says that replaceAll is not a function, but it is in
Mozilla's official documentation.
The following solution won't use replaceAll.
*/

/**
 * O(n) Time | O(1) Space - where n is the length of both strings combined.
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
const canTransform = (start, end) => {
    let i = 0;
    let j = 0;
    let n = start.length;
    // O(n) Time. Since LeetCode says replaceAll is not a function, I have
    // to use this instead.
    while (true) {
        if (j === n && i === n) break;
        if (start[i] === 'X') {
            while (start[i] == 'X' && i < n) {
                i++;
            }
        }
        if (end[j] === 'X') {
            while (end[j] === 'X' && j < n) {
                j++;
            }
        }
        if (start[i] !== end[j]) return false;
        if (i < n) i++;
        if (j < n) j++;
    }

    let t = 0;
    for (i = 0; i < n; i++) {
        if (start[i] === 'L') {
            while (end[t] !== 'L') {
                t++;
            }
            if (i < t++) return false;
        }
    }

    t = 0;
    for (i = 0; i < n; i++) {
        if (start[i] === 'R') {
            while (end[t] !== 'R') {
                t++;
            }
            if (i > t++) return false;
        }
    }
    return true;
}