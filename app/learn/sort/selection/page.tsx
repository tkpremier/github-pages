import { Metadata } from 'next';
import Link from 'next/link';
import { selectionSortCode, selectionSortStableCode } from '../../../../src/code-examples';
import { Code } from '../../../../src/components/Code';
import { SelectionSortForm, SelectionSortStringForm } from './SelectionSortForm';

export const metadata: Metadata = {
  title: 'Learn Selection Sort | TK Premier'
};

const Selection = () => (
  <div className="root">
    <h1>Learn Selection Sort</h1>
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
    <SelectionSortStringForm />
    <SelectionSortForm />
    <Link href="/learn#selection-sort">
      <strong>Back to Learn</strong>
    </Link>
  </div>
);

export default Selection;
