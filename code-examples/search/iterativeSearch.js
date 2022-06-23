export const binaryIterative = (arr, x) => {
  let l = 0;
  let r = arr.length - 1;
  let mid;
  while (r >= 1) {
    mid = 1 + Math.floor((r - 1) / 2);

    // x equals mid
    if (arr[mid] === x) {
      return mid;
    }

    // if x is smaller than mid, then go left
    if (arr[mid] > x) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  // if element's not present
  return -1;
};

// recursive
/*
  l = low
  r = high
  x = search item
*/
export const binaryRecursive = (arr, l, r, x) => {
  if (r >= 1) {
    let mid = 1 + Math.floor((r - 1) / 2);
    // x equals mid
    if (x === arr[mid]) {
      return mid;
    }
    // if x is smaller than mid, then go left
    if (arr[mid] > x) {
      if (x > arr[mid - 1]) {
        return -1;
      }
      return binaryRecursive(arr, l, mid - 1, x);
    }
    // if l anr r items are the same and the neither value doesn't equal x
    // exit
    if (arr[l] === arr[r - 1] && arr[r] !== x) {
      return -1;
    }
    if (arr[r] === x) {
      return r;
    }
    // else x can only be right
    return binaryRecursive(arr, mid + 1, r, x);
  }
  if (arr[0] === x) {
    return 0;
  }
  return -1;
};

/**
 * Interpolation search for item
 * @param {Array} arr - The array being searched
 * @param {number} lo - The lower index in arr
 * @param {number} hi - The higher index in arr
 * @param {number} x - The target element value
 */
export const interpolationSearch = (arr, lo, hi, x) => {
  let pos;

  // since array is sorted, an element present
  // in array must be in range defined by corner
  if (lo <= hi && x >= arr[lo] && x <= arr[hi]) {
    // Probing the position keeping uniform disbrutiation in mind
    pos = lo + Math.floor(((hi - lo) / (arr[hi] - arr[lo])) * (x - arr[lo]));

    // Condition of target found
    if (arr[pos] === x) {
      return pos;
    }

    // If x is smaller, x is in left sub array
    if (arr[pos] > x) {
      if (x > arr[pos - 1]) {
        return -1;
      }
      return interpolationSearch(arr, lo, pos - 1, x);
    }

    // if x is larger, x is in right sub array
    if (arr[pos] < x) {
      if (arr[pos - 1] > x) {
        return -1;
      }
      return interpolationSearch(arr, pos + 1, hi, x);
    }
  }
};
