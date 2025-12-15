import { Metadata } from 'next';
import Link from 'next/link';
import { insertionSortCode } from '../../../../src/code-examples';
import { Code } from '../../../../src/components/Code';
import { InsertionSortForm } from './InsertionSortForm';

export const metadata: Metadata = {
  title: 'Learn Insertion Sort | TK Premier'
};

const Insertion = () => (
  <div className="root">
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
    <InsertionSortForm />
    <Link href="/learn#insertion-sort">
      <strong>Back to Learn</strong>
    </Link>
  </div>
);

export default Insertion;
