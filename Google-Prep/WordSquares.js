/*
Given a set of words (without duplicates), find all word squares you can build
from them.

A sequence of words forms a valid word square if the kth row and column read
the exact same string, where 0 ≤ k < max(numRows, numColumns).

For example, the word sequence ["ball","area","lead","lady"] forms a word
square because each word reads the same both horizontally and vertically.

Input: 
["area","lead","wall","lady","ball"]

Output:
[
  [ "wall",
    "area",
    "lead",
    "lady"
  ],
  [ "ball",
    "area",
    "lead",
    "lady"
  ]
]
*/

const wordSquares = (words) => {
    const trie = new Trie();
    for(let word of words) {
        trie.addWord(word);
    }

    const wordSquares = [];
    for (let word of words) {
        makeSquare(1, word.length, trie, [word], wordSquares);
    }

    return wordSquares;
}

const makeSquare = (step, maxLen, trie, wordSquare, result) => {
    if (step === maxLen) {
        result.push([...wordSquare]);
        return;
    }

    let prefix = '';
    for (let word of wordSquare) {
        prefix += word[step];
    }

    wordsWithPrefix = trie.getWordsWithPrefix(prefix);
    for (let word of wordsWithPrefix) {
        wordSquare.push(word);
        makeSquare(step + 1, maxLen, trie, wordSquare, result);
        wordSquare.pop();
    }

    return;
}


class Trie {
    constructor() {
        this.root = {};
        this.endSymbol = '*';
    }

    addWord(word) {
        let node = this.root;
        for (let char of word) {
            if (!(char in node)) {
                node[char] = {};
            }
            node = node[char];
        }
        node[this.endSymbol] = word;
    }

    getWordsWithPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (char in node) {
                node = node[char];
            } else {
                return [];
            }
        }

        let wordsWithPrefix = [];
        this.recursiveHelper(node, wordsWithPrefix);

        return wordsWithPrefix;
    }

    recursiveHelper(node, wordsWithPrefix) {
        if (this.endSymbol in node) {
            wordsWithPrefix.push(node[this.endSymbol]);
            return;
        }
        for (let key of Object.keys(node)) {
            this.recursiveHelper(node[key], wordsWithPrefix);
        }
        return;
    }
}