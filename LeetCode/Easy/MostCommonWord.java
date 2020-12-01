/**
  Link: https://leetcode.com/problems/most-common-word/
  Given a paragraph and a list of banned words, return the most frequent word
  that is not in the list of banned words. It is guaranteed there is at least
  one word that isn't banned, and that the answer is unique.

  Words in the list of banned words are given a lowercase, and free of 
  punctuation. Words in the paragrap are not case sensitive. The answer iss in 
  lowercase.
 */

// O(n) Time | O(n) Space
public String mostCommonWord(String paragraph, String[] banned) {
  int max = 0;
  String result = "";
  HashMap<String, Integer> map = new HashMap();
  paragraph = paragraph.toLowerCase();
  String[] words = paragraph.split("([^A-Za-z])+");
  for(String word : words){
    if(map.containsKey(word)){
      int val = map.get(word);
      map.replace(word, val+1);
    }else{
      map.put(word, 1);
    }
  }
  
  for(String ban : banned){
    map.remove(ban);
  }
  
  for(Map.Entry<String, Integer> entry : map.entrySet()){
    if(entry.getValue() > max){
      max = entry.getValue();
      result = entry.getKey();
    }
  }
  
  return result;
}