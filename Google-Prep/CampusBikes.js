/**
 * This implements BucketSort
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function(workers, bikes) {
    
    const dists = [];
    for (let i = 0; i < workers.length; i++) {
        for (let j = 0; j < bikes.length; j++) {
            let d = manhattanDist(workers[i], bikes[j]);
            if (dists[d] == null) dists[d] = [];
            dists[d].push([i, j]);
        }
    }
    
    let ans = [];
    for (let bucket of dists) {
        if (bucket != null) {
            for (let [i, j] of bucket) {
                if (workers[i] !== null && bikes[j] !== null) {
                    workers[i] = null;
                    bikes[j] = null;
                    ans[i] = j;
                }
            }
        }
    }
    
    return ans;
};

const manhattanDist = function(pos1, pos2) {
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
}