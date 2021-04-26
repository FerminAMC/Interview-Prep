/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
let strStr = function(haystack, needle) {
    if (needle == '') return 0;
    if (needle.length > haystack.length) return - 1;
    
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] == needle[0]) {
            let endPos = i + needle.length - 1;
            if (endPos >= haystack.length) return -1;
            if (compare(i, haystack, needle)) {
                return i;
            }
        }
    }
    
    return -1;
};

let compare = function(start, haystack, needle) {
    for (let i = 0; i < needle.length; i++) {
        if (needle[i] !== haystack[i + start]) return false;
    }
    return true;
} 