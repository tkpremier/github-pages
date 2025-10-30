const splice = (arr: any[], removeIndex = 0, addIndex = 0) => {
  const temp = arr[removeIndex];
  arr.splice(addIndex, 0, temp);
  // + 1 since temp item was added to existing array
  arr.splice(removeIndex + 1, 1);
};

const swap = (arr: any[], xp: number, yp: number) => {
  const temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
};
export const bubbleSort = (arr: number[] = []) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};

export const insertionSort = (arr: number[] = []): number[] => {
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > val) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = val;
  }
  return arr;
};
const merge = (arr: Array<string | number>, l: number, mid: number, r: number): Array<string | number> => {
  const n1 = mid - 1 + 1;
  const n2 = r - mid;
  const leftArray = arr.slice(l, mid - l);
  const rightArray = arr.slice(r - mid, r);
  // initial index of first subarray
  let i = 0;
  // initial index of second subarray
  let j = 0;
  // initial index of merged subarray
  let k = l;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    k++;
  }
  // copy the remaining elements of leftArray, if there are any
  while (i < n1) {
    arr[k] = leftArray[i];
    i++;
    k++;
  }
  // copy the remaining elements of right array, if any
  while (j < n2) {
    arr[k] = rightArray[j];
    j++;
    k++;
  }
  return arr;
};

export const mergeSort = (arr: Array<string | number>, l: number, r: number) => {
  if (l >= r) {
    return arr;
  }
  const mid = Math.floor(1 + (r - 1) / 2);
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  merge(arr, l, mid, r);
  // for (let i = 0; i < r; i++) {
  //   let val = arr[i];
  //   let j = i - 1;
  //   while (j >= 0 && arr[j] > val) {
  //     arr[j + 1] = arr[j];
  //     j = j - 1;
  //   }
  //   arr[j + 1] = val;
  // }
  return arr;
};

export const selectionSort = (arr: number[] = []) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    // let minString = arr[i];
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        // minString = arr[j];
        minIndex = j;
      }
    }
    // Swapping the minimum element
    // found with the first element.
    if (minIndex !== i) {
      swap(arr, minIndex, i);
    }
  }
  return arr;
};

export const selectionSortStable = <T>(arr: T[] = []) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // My way
    // Swapping the minimum element
    // found with the first element.
    if (minIndex !== i) {
      splice(arr, minIndex, i);
    }
    /**
     * gfg way https://www.geeksforgeeks.org/stable-selection-sort/
     * // Move minimum element at current i.
      let key = a[min];
      while (min > i)
      {
          a[min] = a[min - 1];
          min--;
      }
          
      a[i] = key;
     */
  }
  return arr;
};

export const selectionSortString = (arr: string[] = []) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    let minString = arr[i];
    for (let j = i + 1; j < n; j++) {
      if (arr[j].localeCompare(minString) === -1) {
        minString = arr[j];
        minIndex = j;
      }
    }
    // Swapping the minimum element
    // found with the first element.
    if (minIndex !== i) {
      swap(arr, minIndex, i);
    }
  }
  return arr;
};
