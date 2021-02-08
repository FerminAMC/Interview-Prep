/*
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to
get t.

All occurrences of a character must be replaced with another character while
preserving the order of characters. No two characters may map to the same
character, but a character may map to itself.

Example:
    Input: s = "egg", t = "add"
    Output: true
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */ 
const isIsomorphic = (s, t) => {
    let map = new Map();
    let mappingTo = new Set();
    for (let i = 0; i < s.length; i++) {
        let sChar = s[i];
        let tChar = t[i];
        if (map.has(sChar)) {
            sChar = map.get(sChar);
            if (sChar !== tChar) return false;
        } else {
            if (mappingTo.has(tChar)) return false;
            map.set(sChar, tChar);
            mappingTo.add(tChar);
        }
    }
    return true;
}