'use client';
import serialize from 'form-serialize';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { selectionSortCode, selectionSortStableCode } from '../../../../src/code-examples';
import { selectionSortStable, selectionSortString } from '../../../../src/code-examples/sort';
import { Code } from '../../../../src/components/Code';

const Selection = () => {
  const [sortedList, sortList] = useState<number[] | string[]>([]);
  const handleSelectionSortString = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { selectionSortArray } = serialize(e.currentTarget, { hash: true }) as unknown as {
      selectionSortArray: string;
    };
    const arr = selectionSortArray.split(' ') as string[];
    if (arr.length > 0) {
      sortList(selectionSortString(arr));
    }
  }, []);
  const handleSelectionSort = useCallback(e => {
    e.preventDefault();
    const { selectionSortArray } = serialize(e.target, { hash: true }) as unknown as { selectionSortArray: string };
    const arr = selectionSortArray.split(' ').map(s => parseInt(s, 10));
    if (arr.length > 0) {
      sortList(selectionSortStable<number>(arr));
    }
  }, []);
  return (
    <>
      <Code text={selectionSortCode} />
      <Code text={selectionSortStableCode} />
      <div>
        <strong>Complexity Analysis of Selection Sort</strong>:<br />
        <p>
          <strong>Time Complexity</strong>: O(N<sup>2</sup>) as there are two nested loops:
        </p>
        <ul>
          <li>One loop to select an element of Array one by one = O(N)</li>
          <li>Another loop to compare that element with every other Array element = O(N)</li>
          <li>
            Therefore overall complexity = O(N)*O(N) = O(N*N) = O(N<sup>2</sup>)
          </li>
        </ul>
        <p>
          <strong>Auxillary Space</strong>: O(1) as the only extra memory used is for temp variable while swapping two
          values in array. The good thing about selection sort is it{' '}
          <strong>never makes more than O(n) swaps and can be useful when memory write is a costly operation.</strong>
        </p>
      </div>
      <br />
      <h3>
        <strong>Try it out</strong> <button onClick={() => sortList([])}>Clear array</button>
      </h3>
      {sortedList.length > 0 ? sortedList.join(' ') : null}
      <form onSubmit={handleSelectionSortString}>
        <label htmlFor="selection-sort-array">
          Type in words in random order separated by spaces
          <input type="text" name="selectionSortArray" id="selection-sort-array" />
        </label>
        <input type="submit" value="Try it out" />
      </form>
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

export default Selection;
