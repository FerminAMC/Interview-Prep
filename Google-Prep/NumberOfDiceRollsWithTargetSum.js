/*
You have d dice, and each die has f faces numbered 1, 2, ..., f.

Return the number of possible ways (out of fd total ways) modulo 10^9 + 7 to
roll the dice so the sum of the face up numbers equals target.
*/

const map = {};
/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
const numRollsToTarget = (d, f, target) => {
    if (target < d || target > d * f) return 0;
    if (d === 1) return target <= f ? 1 : 0;
    let key = d.toString() + f.toString() + target.toString();
    if (!(key in map)) {
        let sum = 0;
        for (let num = 1; num <= f; num++) {
            sum += numRollsToTarget(d - 1, f, target - num);
            sum = sum % 1000000007;
        }
        map[key] = sum;
    }

    return map[key];
}