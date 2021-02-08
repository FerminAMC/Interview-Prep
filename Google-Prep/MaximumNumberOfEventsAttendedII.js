/*
You are given an array of events where events[i] = [startDayi, endDayi, valuei].
The ith event starts at startDayi and ends at endDayi, and if you attend this
event, you will receive a value of valuei. You are also given an integer k which
represents the maximum number of events you can attend.

You can only attend one event at a time. If you choose to attend an event, you
must attend the entire event. Note that the end day is inclusive: that is, you
cannot attend two events where one of them starts and the other ends on the same
day.

Return the maximum sum of values that you can receive by attending events.
*/

/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */

const maxValue = (events, k) => {   
    events.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        else {
            return a[0] - b[0];
        }
    });
    let maxStart = events[events.length - 1][0]; 
    let cache = new Map();
    return dfs(0, k, 0);

    function dfs(i, k, prevEnd) {
        if (i === events.length || k === 0 || prevEnd > maxStart) {
            return 0;
        }

        let key = i.toString() + '-' + k.toString() + '-' + prevTime.toString();
        if (cache.has(key)) {
            return cache.get(key);
        }

        let event = events[i];
        let res = 0;
        if (event[0] > prevEnd) {
            res = Math.max(res, event[2] + dfs(i + 1, k - 1, event[1]));
        }
        res = Math.max(res, dfs(i + 1, k, prevEnd));
        cache.set(key, res);
        return res;
    };
};