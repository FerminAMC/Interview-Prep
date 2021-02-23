/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalSquare = function(matrix) {
    if(!matrix.length) return 0;
    const R_NUM = matrix.length, C_NUM = matrix[0].length;
    const dp = Array.from({length: R_NUM+1}, () => Array(C_NUM+1).fill(0));
    let maxLen = 0;
    
    for(let r = 1; r <= R_NUM; r++) {
        for(let c = 1; c <= C_NUM; c++) {
            if(matrix[r-1][c-1] == '0') continue;
            dp[r][c] = Math.min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]) + 1;
            maxLen = Math.max(maxLen, dp[r][c]);
        }
    }
    return maxLen**2;    
};