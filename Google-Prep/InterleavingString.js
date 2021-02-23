/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave = function(s1, s2, s3) {
    let foundString = false;
    let expectedLength = s1.length + s2.length;
    if (expectedLength !== s3.length) return false;
    let cache = {};
    return dfs(0, 0, 0);
     
    function dfs(pos1, pos2, pos3) {
        if (pos1 === s1.length) {
            return s2.substring(pos2) === s3.substring(pos3);
        } else if (pos2 === s2.length) {
            return s1.substring(pos1) === s3.substring(pos3);
        }
        
        let key = pos1.toString() + pos2.toString();
        if (key in cache) {
            return cache[key];
        }
        
        let ans = false;
        if ((s3[pos3] === s1[pos1] && dfs(pos1 + 1, pos2, pos3 + 1)) || 
                (s3[pos3] === s2[pos2] && dfs(pos1, pos2 + 1, pos3 + 1))) {
            ans = true;
        } 
        
        cache[key] = ans;
        return ans;
    }
};