/*
You have 4 cards each containing a number from 1 to 9. You need to judge
whether they could operated through *, /, +, -, (, ) to get the value of 24. 

Example:
    Input: [4, 1, 8, 7]
    Output: True
    Explanation: (8-4) * (7-1) = 24
    
When asked this question, just remember that n is very small, it's always 4, so
you can afford to try every possible combination. Maybe sort the array, try with
the two number sum approach. Looking at this approach, you only get to an
answer once you have used all numbers, so maybe ask that to the interviewer.
*/

const judgePoint24 = nums => {
    return solve(nums);
}

const solve = nums => {
    if (nums.length === 0) return false;
    if (nums.length === 1) return Math.abs(nums[0] - 24) < 1e-6;
    console.log(nums);
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                let nums2 = [];
                for (let k = 0; k < nums.length; k++) {
                    if (k !== i && k !== j) {
                        nums2.push(nums[k]);
                    }
                }
                for (let k = 0; k < 4; k++) {
                    if (k < 2 && j > i) continue;
                    if (k === 0) nums2.push(nums[i] + nums[j]);
                    if (k === 1) nums2.push(nums[i] * nums[j]);
                    if (k === 2) nums2.push(nums[i] - nums[j]);
                    if (k === 3) {
                        if (nums[j] !== 0) {
                            nums2.push(nums[i] / nums[j]);
                        } else {
                            continue;
                        }
                    }
                    if (solve(nums2)) return true;
                    nums2.pop();
                }
            }
        }
    }
    return false;
}