/**
 * @name areAnagram | Function to check if two strings are equal
 * @param {string} s1 | first string
 * @param {string} s2 | second string
 */
function areAnagram(s1, s2) {
  let m = new Map();
  for (let i = 0; i < s1.length; i++) {
    if (m.has(s1[i]) === false) {
      m.set(s1[i], 1);
    } else {
      let cnt = m.get(s1[i]);
      m.delete(s1[i]);
      m.set(s1[i], cnt + 1);
    }
  }
  for (let j = 0; j < s1.length; j++) {
    if (m.has(s2[j]) === false) {
      return false;
    } else {
      let cnt = m.get(s2[j]);
      m.delete(s2[j]);
      m.set(s2[j], cnt - 1);
    }
  }
  for (const it in m.values()) {
    if (it !== 0) return false;
  }
  return true;
}
export function countAnagramSubstring(s) {
  // Returns total number of anagram
  // substrings in s
  let n = s.length;
  let mp = new Map();

  // loop for length of substring
  for (let i = 0; i < n; i++) {
    let sb = '';
    for (let j = i; j < n; j++) {
      sb = (sb + s[j]).split('').sort().join('');
      if (mp.has(sb)) mp.set(sb, mp.get(sb) + 1);
      // increase count corresponding
      // to this dict array
      else mp.set(sb, 1);
    }
  }

  let anas = 0;

  // loop over all different dictionary
  // items and aggregate substring count
  for (let [k, v] of mp) {
    anas += Math.floor((v * (v - 1)) / 2);
  }
  return anas;
}
/**
 * https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps
 * countAnagrams
 * @param {string} s1
 * @returns {number} res | amount of times repped
 */
export function countAnagrams(s1, s2) {
  let res = 0;
  for (let i = 0; i < s1.length - s2.length + 1; i++) {
    // Check if the s2 and substring are
    // anagram of each other.

    if (areAnagram(s1.substring(i, i + s2.length), s2)) res++;
  }
  return res;
  // const multi = Object.keys(letterCounts)
  //   .filter(key => letterCounts1[key].length > 1)
  //   .map(key => {
  //     // check the distance between each dupe and increase
  //     // pairs count recursively
  //     const dupeIds = letterCounts1[key];
  //     for (let i = 0; i < dupeIdlength; i++) {
  //       for (let j = dupeIdlength - 1 - i; j > i; j--) {
  //         console.log('i and j', i, j);
  //         pairs += dupeIds1[j] - dupeIds1[i];
  //         console.log('pairs: ', pairs);
  //       }
  //     }
  //   });
}
