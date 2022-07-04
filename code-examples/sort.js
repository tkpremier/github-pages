export const selectionSort = (arr = []) => {
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
      let temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
  }

  return arr;
};
