/*
Write a function that takes in a big string and an array of small strings, all
of which are smaller in length than the big string. The function should returrn
an array of booleans, where each boolean represents whether the small string at
that index in the array of small strings is contained in the big string.

Note that you can't use language-built-in string-matching methods.
*/
class Trie {
  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  // O(n^2) Time | O(n^2) Space - where n is the number of letters in the string
  buildTrie(string){
    let node = null;
    for(let i = 0; i < string.length; i++) {
      node = this.root;
      for(let j = i; j < string.length; j++) {
        const char = string[j];
        if(char in node) {
          node = node[char];
        }else {
          node[char] = {};
          node = node[char];
        }
      }
      node[this.endSymbol] = string;
    }
  }
  
  checkString(string){
    let node = this.root;
    for(const char of string){
      if(char in node){
        node = node[char];
      } else{
        return false;
      }
    }
    return true;
  }
}

function multiStringSearch(bigString, smallStrings) {
  const trie = new Trie();
  const wordsInBigString = bigString.split(' ');
  const result = [];
  for(const word of wordsInBigString){
    trie.buildTrie(word);
  }
  for(const word of smallStrings){
    result.push(trie.checkString(word));
  }
  return result;
}