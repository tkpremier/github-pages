const areAnagram = `/**
* @name areAnagram | Function to check if two strings are equal
* @param {string} s1 | first string
* @param {string} s2 | second string
*/
function areAnagram(s1, s2) {
 let m = new Map();
 for (let i = 0; i < text.length; i++) {
   if (m.has(text[i]) === false) {
     m.set(text[i], 1);
   } else {
     let cnt = m.get(text[i]);
     m.delete(text[i]);
     m.set(text[i], cnt + 1);
   }
 }
 for (let j = 0; j < text.length; j++) {
   if (m.has(word[j]) === false) {
     return false;
   } else {
     let cnt = m.get(word[j]);
     m.delete(word[j]);
     m.set(word[j], cnt - 1);
   }
 }
 for (const it in m.values()) {
   if (it !== 0) return false;
 }
 return true;
}`;

export const countAnagramSubstring = `function countOfAnagramSubstring(s){
     
  // Returns total number of anagram
  // substrings in s
  let n = s.length
  let mp = new Map()
   
  // loop for length of substring
  for(let i=0;i<n;i++){
      let sb = ''
      for(let j=i;j<n;j++){
          sb = (sb + s[j]).split('').sort().join('')
          if(mp.has(sb))
              mp.set(sb ,mp.get(sb)+1)
           
          // increase count corresponding
          // to this dict array
          else mp.set(sb, 1)
      }
  }

  let anas = 0
   
  // loop over all different dictionary
  // items and aggregate substring count
  for(let [k, v] of mp){
      anas += Math.floor((v*(v-1))/2)
  }
  return anas
}`;

export const countAnagrams = `${areAnagram}

/**
* https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps
* countAnagrams
* @param {string} text
* @returns {number} res | amount of times repped
*/
export default function (text, word) {
 let res = 0;
 for (let i = 0; i < text.length - word.length + 1; i++) {
   // Check if the word and substring are
   // anagram of each other.

   if (areAnagram(text.substring(i, i + word.length), word)) res++;
 }
 return res;
}
`;
