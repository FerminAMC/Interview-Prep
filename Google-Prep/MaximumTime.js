/*
You are given a string time in the form of hh:mm, where some of the digits in 
the string are hidden (represented by ?).

The valid times are those inclusively between 00:00 and 23:59.

Return the latest valid time you can get from time by replacing the hidden
digits.
*/

/**
 * @param {string} time
 * @return {string}
 */ 
const maximumTime = time => {
    let ans = "";
    let maxDigits = ['2',['3', '9'], '0', '5', '9'];
    for (let i = 0; i < time.length; i++) {
        let char = time[i];
        if (char === '?') {
            if (i === 0 && time.charCodeAt(i + 1) > 51 && time.charCodeAt(i + 1) <= 57) {
                char = '1';
            } else if (i === 1 && (time[i - 1] === '1' || time[i - 1] === '0')) {
                char = maxDigits[i][1];
            } else if (i === 1 && (time[i - 1] === '2' || time[i - 1] === '?')) {
                char = maxDigits[i][0];
            } else {
                char = maxDigits[i];
            }
        }
        ans += char;
    }
    return ans;
}