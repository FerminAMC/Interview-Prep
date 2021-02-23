/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function(s, p) {
    if (p.length === 0) {
        return s.length === 0;
    }
    let firstMatch = s.length > 0 && (s[0] === p[0] || p[0] === '.');
    let foundStar = p.length >= 2 && p[1] === '*';
    if (foundStar) {
        return (isMatch(s, p.slice(2)) || (firstMatch && 
                                           isMatch(s.slice(1), p)));
    } else {
        return firstMatch && isMatch(s.slice(1), p.slice(1));
    }
};