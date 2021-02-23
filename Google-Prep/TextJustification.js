/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = function(words, maxWidth) {
    // Words that will go in one line and their length, counting spaces
    let lineWords = [words[0]];
    let lineLen = words[0].length;
    let ans = [];
    // Need to loop through all words
    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        // Case 1: word fits in the line
        if (word.length + lineLen + 1 <= maxWidth) {
            lineWords.push(word);
            lineLen += word.length + 1;
        }
        // Case 2: word doesn't fit, so I start forming the line
        else {
            let line = "";
            let spacesNeeded = lineWords.length - 1;
            // Making calculations without the spaces added in the previous
            // step.
            let missingSpaces = maxWidth - lineLen + spacesNeeded;
            spacesNeeded = spacesNeeded === 0 ? 1 : spacesNeeded;
            let spaceLen = Math.floor(missingSpaces / spacesNeeded);
            // Case 2.1: spaces are not even
            let extraSpaces = missingSpaces % spacesNeeded;
            for (let j = 0; j < lineWords.length; j++) {
                let current = lineWords[j];
                // Last word shouldn't have a space except if there's
                // only one word.
                if (j === lineWords.length - 1 && j != 0) {
                    line += current;
                } else {
                    line += current + ' '.repeat(spaceLen);
                    if (extraSpaces > 0) {
                        line += ' ';
                        extraSpaces--;
                    }
                }
            }
            ans.push(line);
            lineWords = [word];
            lineLen = word.length;
        }
    }
    
    // The last line is an extra case, where we just add space at the end
    // to fill the maxWidth.
    let line = '';
    for (let i = 0; i < lineWords.length; i++) {
        let word = lineWords[i];
        if (i !== lineWords.length - 1) {
            line += word + ' ';
        } else {
            line += word;
        }
    }
    line += ' '.repeat(maxWidth - line.length);
    ans.push(line);
    
    return ans;
};