/*
Given a signed 32-bit integer x, return x with its digits reversed. If
reversing x causes the value to go outside the signed 32-bit integer range
[-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or
unsigned).
*/

const reverse = (x) => {
    let isNegative = x < 0;
    if (isNegative) x *= -1;
    const MAX_INTEGER = Math.pow(2, 31) - 1;
    let ans = 0;
    while (x > 0) {
        let pop = x % 10;
        x = Math.floor(x / 10);
        if (ans >= MAX_INTEGER / 10) {
            return 0;
        }
        ans = ans * 10 + pop;
    } 
    return isNegative ? ans * -1 : ans;
}