/**
 * @name areAnagram | Function to check if two strings are equal
 * @param {string} s1 | first string
 * @param {string} s2 | second string
 */

function areAnagram(s1: string, s2: string): boolean {
  const m: Map<string, number> = new Map([]);
  for (let i = 0; i < s1.length; i++) {
    if (m.has(s1[i]) === false) {
      m.set(s1[i], 1);
    } else {
      const cnt = m.get(s1[i]);
      m.delete(s1[i]);
      m.set(s1[i], cnt + 1);
    }
  }
  for (let j = 0; j < s1.length; j++) {
    if (m.has(s2[j]) === false) {
      return false;
    } else {
      const cnt = m.get(s2[j]);
      m.delete(s2[j]);
      m.set(s2[j], cnt - 1);
    }
  }
  for (const it of m.values()) {
    if (it !== 0) return false;
  }
  return true;
}
export function countAnagramSubstring(s: string): number {
  // Returns total number of anagram
  // substrings in s
  const n = s.length;
  const mp: Map<string, number> = new Map();

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
  for (const [k, v] of mp) {
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
export function countAnagrams(s1: string, s2: string): number {
  let res = 0;
  for (let i = 0; i < s1.length - s2.length + 1; i++) {
    // Check if the s2 and substring are
    // anagram of each other.

    if (areAnagram(s1.substring(i, i + s2.length), s2)) res++;
  }
  return res;
}
