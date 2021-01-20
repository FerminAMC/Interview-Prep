/*
A transformation sequence from word beginWord to word endWord using a dictionary
wordList is a sequence of words such that:

    * The first word in the sequence is beginWord.
    * The last word in the sequence is endWord.
    * Only one letter is different between each adjacent pair of words in the
      sequence.
    * Every word in the sequence is in wordList.

Given two words, beginWord and endWord, and a dictionary wordList, return the
number of words in the shortest transformation sequence from beginWord to
endWord, or 0 if no such sequence exists.

Example: 
    Input: beginWord = "hit", endWord = "cog", wordList = 
        ["hot","dot","dog","lot","log","cog"]
    Output: 5
    Explanation: One shortest transformation is "hit" -> "hot" -> "dot" -> 
        "dog" -> "cog" with 5 words.
*/

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
const ladderLength = (beginWord, endWord, wordList) => {
    let level = 0;
    let wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    let queue = [];
    nextPatterns(beginWord, wordSet, queue);
    let queueSize = queue.length;
    while (queue.length) {
        queueSize--;
        let currentWord = queue.shift();
        console.log(currentWord);
        // I add +2 because the level starts at 0 + the beginWord
        if (currentWord === endWord) return level + 2;
        nextPatterns(currentWord, wordSet, queue);
        if (queueSize === 0) {
            queueSize = queue.length;
            level++;
        }
    }
    return 0;
}

const nextPatterns = (word, wordSet, queue) => {
    for (let i = 0; i < word.length; i++) {
        for (let j = 97; j <= 122; j++) {
            let char = String.fromCharCode(j);
            if (char === word[i]) continue;
            let pattern = word.slice(0, i) + char + word.slice(i + 1);
            if (wordSet.has(pattern)) {
                queue.push(pattern);
                wordSet.delete(pattern);
            }
        }
    }
    return queue;
}