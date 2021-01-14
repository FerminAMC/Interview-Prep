/*
A Binary Lock has N binary switches. The lock can be opened by flipping all
switches to an "unlock" pattern. However, only some switch patterns are safe
(you can access them in a global variable SAFE). Any other pattern will cause
the lock to immediately lock. Additionally, switches can only be flipped one at
a time.

Your task is to write a function that will accept a lock description: the
current state of switches, a set of safe patterns, and the unlock sequence. Your
function should return "unlock" if it's possible to unlock the Lock and "Cant
open" otherwise.

Example: 
    Initial state: 010
    Unlock pattern: 111
    Safe patterns: [000, 001, 010, 101, 111] 
*/

// O(ns) Time | O(s) Space - where n is the length of the initialState and s is
// the number of safe patterns.
const unlockSequence = (initialState, unlockPattern, safePatterns) => {
    const keyQueue = [];
    const visited = new Set();
    nextPatterns(initialState, keyQueue, safePatterns, visited);
    for (const key of keyQueue) {
        if (key === unlockPattern) return 'Unlocked';
    }

    while (keyQueue.length) {
        console.log(keyQueue);
        const currentKey = keyQueue.shift();
        visited.add(currentKey);
        if (currentKey === unlockPattern) {
            console.log('Unlocked');
            return 'Unlocked';
        }
        nextPatterns(currentKey, keyQueue, safePatterns, visited);
    }

    console.log('Can\'t open');
    return 'Can\'t open';
}

const nextPatterns = (pattern, queue, safePatterns, visited) => {
    const len = pattern.length;
    for (let i = 0; i < len; i++){
        let newPattern;
        if (pattern[i] === '0') {
            newPattern = pattern.slice(0, i) + '1' + pattern.slice(i + 1, len);
        } else {
            newPattern = pattern.slice(0, i) + '0' + pattern.slice(i + 1, len);
        }
        if (!visited.has(newPattern) && safePatterns.has(newPattern)) {
            queue.unshift(newPattern);
        }
    }
}

unlockSequence('010', '111', new Set(['000', '001', '101', '111']));

