/*
A strobogrammatic number is a number that looks the same when rotated 180
degrees (looked at upside down).

Find all strobogrammatic numbers that are of length = n.

Example:
    Input:  n = 2
    Output: ["11","69","88","96"]
*/

/**
 * @param {number} n
 * @return {string[]}
 */
const findStrobogrammatic = (n) => {
    const strobogrammicDict = {
        '0': '0',
        '1': '1',
        '6': '9',
        '8': '8',
        '9': '6'
    }

    let left = Math.floor(n / 2) - 1;
    const strobogrammicNums = new Set();
    makeStrobogrammatic(0, n, '', left, strobogrammicNums, strobogrammicDict);
    return Array.from(strobogrammicNums);
}

const makeStrobogrammatic = (step, n, number, left, result, dict) => {
    if (step === n) {
        result.add(number);
        return;
    }
    if (n % 2 !== 0 && step === Math.floor(n / 2)) { // First half - odd n
        keys = ['0', '1', '8'];
        for (let key of keys) {
            makeStrobogrammatic(step + 1, n, number + key, left, result, dict);
        }
    } else if (step < Math.floor(n/2)) { // First half
        for (let key of Object.keys(dict)) {
            if (step === 0 && key === '0') continue;
            makeStrobogrammatic(step + 1, n, number + key, left, result, dict);
        }
    } else { // Second half
        let key = number[left];
        let pair = dict[key];
        makeStrobogrammatic(step + 1, n, number + pair, left - 1, result, dict);
    }
    return;
}
