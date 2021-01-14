/*
You are given two English-language documents. The first one is the original,
unredacted text file, and the second one is a file with a list of prohibited
words, with one word per line.

Implement a program that reads both files and writes a redacted document as the
output.
*/

// O(n) Time | O(m) Space - where n is the size of file one and m is th size of
// both files combined.
// One way to optimize this would be by 
const redactTextFile = (unredactedFile, forbiddenWords) => {
    const fs = require('fs');
    let fileOne = fs.readFileSync('Extra/UnredactedText.txt', 'utf-8');
    let fileTwo = fs.readFileSync('Extra/ForbiddenWords.txt', 'utf-8');

    const badWords = new Set();
    fileOne = fileOne.split(/[,.?!\n ]/);
    fileTwo.split('\n').map(word => badWords.add(word));
    let result = '';
    for (let i = 0; i < fileOne.length; i++) {
        if (fileOne[i] === '') continue;
        if (badWords.has(fileOne[i])) {
            if (i === 0) result += '***';
            else result += '-***';
        } else {
            if (i === 0) result += fileOne[i];
            else result += '-' + fileOne[i];
        }
    }

    fs.writeFile('Extra/OutputFile.txt', result, err => {
        if (err) throw err;
    });
}

// Just in case I want to give the file paths as inputs.
const unredactedFile = process.argv[2];
const forbiddenWords = process.argv[3];

redactTextFile(unredactedFile, forbiddenWords);

