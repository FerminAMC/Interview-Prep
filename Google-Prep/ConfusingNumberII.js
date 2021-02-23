/**
 * @param {number} N
 * @return {number}
 */
var confusingNumberII = function(N) {
    let dict = {
        '0': '0',
        '1': '1',
        '6': '9',
        '8': '8',
        '9': '6'
    }
    let nLen = N.toString().length;
    return backtrack('');
    
    function backtrack(str) {
        let parsedNum = parseInt(str);
        if (str[0] === '0' || parsedNum > N || str.length > nLen) {
            return 0;
        }
        let ans = 0;
        if (str !== '' && isValid(str)) {
            ans++;
        }
        
        for (let key of Object.keys(dict)) {
            ans += backtrack(str + key)
        }
        
        return ans;
    }
        
    function isValid(str) {
        let reversed = '';
        for (let digit of str) {
            reversed = dict[digit] + reversed;
        }
        return str !== reversed;
    }
};