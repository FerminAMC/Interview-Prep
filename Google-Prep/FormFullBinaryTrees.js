/**
 * @param {number} N
 * @return {TreeNode[]}
 */
var allPossibleFBT = function(N) {
    let ans = {};
    dfs(N-3, [0,0,0]);
    console.log(ans);
    return [];
    
    
    function dfs(remaining, list) {
        if (remaining == 0) {
            ans[list] = true;
            return;
        }
        
        let newRight = [...list];
        newRight.push(0, 0);
        if (remaining > 2) newRight.push('null', 'null');
        dfs(remaining - 2, [...newRight]);
        
        let newLeft = [...list];
        newLeft.push(0, 0);
        dfs(remaining - 2, [...newLeft]);
        
        list.push('null', 'null', 0, 0);
        dfs(remaining -2, [...list]);
        
        return;
    }
};