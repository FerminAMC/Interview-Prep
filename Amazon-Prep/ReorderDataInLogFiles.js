/**
 * @param {string[]} logs
 * @return {string[]}
 */
 var reorderLogFiles = function(logs) {
    logs.sort((a, b) => {
        let firstPair = a.split(/ (.+)/);
        let secondPair = b.split(/ (.+)/);
        let firstIsNum = isNum(firstPair[1]);
        let secondIsNum = isNum(secondPair[1]);
        if (!firstIsNum && !secondIsNum) {
            let compareResult = firstPair[1].localeCompare(secondPair[1]);
            if (compareResult == 0) {
                return firstPair[0].localeCompare(secondPair[0]);
            } else {
                return compareResult;
            }
        } else if (!firstIsNum && secondIsNum) {
            return -1;
        } else if (firstIsNum && !secondIsNum){
            return 1;
        } else {
            return 0;
        }
    });
    return logs;
};

let isNum = function(s) {
    let charVal = s[0].charCodeAt();
    if (charVal > 47 && charVal < 58) {
        return true;
    } else {
        return false;
    }
}