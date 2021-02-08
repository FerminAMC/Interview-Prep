/*
A strobogrammatic number is a number that looks the same when rotated 180
degrees (looked at upside down).

Write a function to determine if a number is strobogrammatic. The number is
represented as a string.
*/

/**
 * @param {string} num
 * @return {boolean}
 */
const isStrobogrammatic = (num) => {
    const pairs = {
        '0': '0',
        '1': '1',
        '6': '9',
        '8': '8',
        '9': '6'
    }

    let left = 0;
    let right = num.length - 1;
    while (left < right) {
        let lNum = num[left];
        let rNum = num[right];
        if (!(lNum in pairs) || !(rNum in pairs)) return false;
        lNum = pairs[lNum];
        if (lNum !== rNum) return false; 
        left++;
        right--;
    }
    if (num.length % 2 !== 0) {
        let mid = Math.floor(num.length / 2);
        let midNum = num[mid];
        if (midNum !== '0' && midNum !== '1' && midNum !== '8') return false;
    }
    return true;
}