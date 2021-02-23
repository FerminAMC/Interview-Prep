/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
var canConvert = function(str1, str2) {
    if (str1 === str2) return true;
    
    const charMap = new Map();
    const addedVals = new Set();
    for (let i = 0; i < str1.length; i++) {
        let char1 = str1[i];
        let char2 = str2[i];
        if (!charMap.has(char1)) {
            charMap.set(char1, char2);
            addedVals.add(char2);
            char1 = charMap.get(char1);
        } else {
            char1 = charMap.get(char1);
        }
        if (char1 !== char2) {
            return false;
        }
    }
    
    if (charMap.size === 26 && addedVals.size === 26) {
        return false;   
    }
    
    return true;
};