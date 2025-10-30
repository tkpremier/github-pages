'use client';
import serialize from 'form-serialize';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { insertionSortCode } from '../../../../src/code-examples';
import { insertionSort } from '../../../../src/code-examples/sort';
import { Code } from '../../../../src/components/Code';

type FormValue = {
  selectionSortArray: string;
};

const Insertion = () => {
  const [sortedList, sortList] = useState([] as number[] | string[]);
  const handleSelectionSort = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { selectionSortArray } = serialize(e.currentTarget, { hash: true }) as FormValue;
    const arr = selectionSortArray.split(' ').map(s => parseInt(s, 10)) as number[];
    if (arr.length > 0) {
      sortList(insertionSort(arr));
    }
  }, []);
  return (
    <>
      <Code text={insertionSortCode} />
      <div>
        <ul>
          <li>Algorithm is one of the simplest algo with simple implementation.</li>
          <li>
            Insertion sort is <strong>efficient</strong> for small data values
          </li>
          <li>
            <strong>Adaptive in nature</strong>, ie it is appropriate for data sets which are already partially sorted.
          </li>
        </ul>
        <ol>
          <li>Iterate from arr[1] to arr[N]</li>
          <li>
            Compare the current element (<em>val</em>) to its predecessor.
          </li>
          <li>
            If val is smaller than its predessor, compare it to the elements before. Move the greater elements one
            position up to make space for the swapped element.
          </li>
        </ol>
        <strong>Time Complexity</strong>: O(N<sup>2</sup>) as there are two nested Loops
        <br />
        <strong>Auxillary Space</strong>: O(1)
      </div>
      <br />
      <h3>
        <strong>Try it out</strong> <button onClick={() => sortList([])}>Clear array</button>
      </h3>
      <strong>Results</strong>: {sortedList.length > 0 ? sortedList.join(' ') : null}
      <form onSubmit={handleSelectionSort}>
        <label htmlFor="selection-sort-array">
          Type in numbers in random order separated by spaces
          <input type="text" name="selectionSortArray" id="selection-sort-array" />
        </label>
        <input type="submit" value="Try it out" />
      </form>
      <Link href="/learn">
        <strong>Back to Learn</strong>
      </Link>
    </>
  );
};

export default Insertion;
