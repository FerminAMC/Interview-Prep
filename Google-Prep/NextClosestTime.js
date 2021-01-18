/*
Given a time represented in the format "HH:MM", form the next closest time by
reusing the current digits. There is no limit on how many times a digit can be
reused.

You may assume the given input string is always valid. For example, "01:34",
"12:09" are all valid. "1:34", "12:9" are all invalid.

Example: 
Input: time = "19:34"
Output: "19:39"
Explanation: The next closest time choosing from digits 1, 9, 3, 4, is 19:39, 
which occurs 5 minutes later.
It is not 19:33, because this occurs 23 hours and 59 minutes later.
*/

/**
 * @param {string} time
 * @return {string} 
 */
// O(1) Time | O(1) Space - it is constant time and space because at most i can
// go from 0 to 59 thrice in the while loop, so O(60 * 3) === O(1) Time.
const nextClosestTime = time => {
    let min = Infinity;
    let max = -Infinity;
    let nums = new Set();
    let hh = 0; // hours
    let mm = 0; // minutes
    for (let i = 0; i < time.length; i++) {
        if (time.charCodeAt(i) >= 48 && time.charCodeAt(i) <= 57) {
            nums.add(parseInt(time.charAt(i)));
            if (i === 0) hh += parseInt(time.charAt(i)) * 10;
            else if (i === 1) hh += parseInt(time.charAt(i));
            else if (i === 3) mm += parseInt(time.charAt(i)) * 10;
            else if (i === 4) mm += parseInt(time.charAt(i));
        }
    }

    let changedHH = mm === 59;
    let changedMM = false;
    let changeDay = hh === 23;
    while (true) {
        if (changedHH && !changeDay) {
            changeDay = true;
            for (let i = hh + 1; i < 24; i++) {
                let num1 = Math.floor(i / 10);
                let num2 = i % 10;
                if (nums.has(num1) && nums.has(num2)) {
                    hh = i;
                    changeDay = false;
                    break;
                }
            }
            for (let i = 0; i <= mm; i++) {
                let num1 = Math.floor(i / 10);
                let num2 = i % 10;
                if (nums.has(num1) && nums.has(num2)) {
                    mm = i;
                    break;
                }
            }
            if (!changeDay) break;
        } else if (changedHH && changeDay) {
            for (let i = 0; i <= hh; i++) {
                let num1 = Math.floor(i / 10);
                let num2 = i % 10;
                if (nums.has(num1) && nums.has(num2)) {
                    hh = i;
                    break;
                }
            }
            for (let i = 0; i <= mm; i++) {
                let num1 = Math.floor(i / 10);
                let num2 = i % 10;
                if (nums.has(num1) && nums.has(num2)) {
                    mm = i;
                    break;
                }
            }
            break;
        } else {
            for (let i = mm + 1; i < 60; i++) {
                let num1 = Math.floor(i / 10);
                let num2 = i % 10;
                if (nums.has(num1) && nums.has(num2)) {
                    mm = i;
                    changedMM = true;
                    break;
                }
            }
            if (changedMM) break;
            changedHH = true;
        }
    }
    hh = hh < 10 ? "0" + hh.toString() : hh.toString();
    mm = mm < 10 ? "0" + mm.toString() : mm.toString();
    return hh + ":" + mm;
}