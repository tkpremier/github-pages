'use client';
import serialize from 'form-serialize';
import Link from 'next/link';
import { FormEvent, useCallback, useState } from 'react';
import {
  binaryIterative,
  binaryRecursive,
  bubbleSortCode,
  insertionSortCode,
  selectionSortCode
} from '../../src/code-examples';
import { mergeSort } from '../../src/code-examples/sort';
import { Code } from '../../src/components/Code';
import { Drawer } from '../../src/components/Drawer';
import { Form } from '../../src/components/Form';

function Learn() {
  const [sortedList, sortList] = useState<number[]>([]);
  const handleSort = useCallback((e: FormEvent) => {
    e.preventDefault();
    const { selectionSortArray } = serialize(e.target as HTMLFormElement, { hash: true }) as any;
    const arr = selectionSortArray.split(' ').map((s: string) => parseInt(s, 10)) as number[];
    if (arr.length > 0) {
      sortList(mergeSort(arr, 0, arr.length - 1) as number[]);
    }
  }, []);
  return (
    <ul className="root">
      <li>
        <a
          href="https://www.geeksforgeeks.org/analysis-of-algorithms-set-4-analysis-of-loops/"
          target="_blank"
          rel="nofollower noreferrer"
          title="Geeks for Geeks, Analysis of Loops"
        >
          Analysis of Loops
        </a>
        <ol>
          <li>
            <strong>O(1)</strong>: Time complexity of a function with no loops, recursion, and call to any other
            non-constant function. A loop or recursion that runs a constant number of times is also considered as{' '}
            <strong>O(1)</strong>.
          </li>
          <li>
            <strong>O(n)</strong>: Time complexity of a loop is considered as <strong>O(n)</strong> if the loop
            variables are incremented/decremented by a constant amt. Example:
            <Code
              text={`
              // c is inc/dec constant
              for (let i = 0; i < n; i += c) {
                // some O(1) expression
              }
              for (let i = n; i > 0; i -= c) {
                // some O(1) expression
              }
              `}
            />
          </li>
          <li>
            <strong>
              O(n<sup>c</sup>)
            </strong>
            : Time complexity of nested loops is equal to the number of times the innermost statement is executed.
            Example:
            <Code
              text={`
              // c is inc/dec constant
              for (let i = 0; i < n; i += c) {
                for (let j = 0; j < n; j += c) {
                  // some O(1) expression
                }
              }
              for (let i = n; i > 0; i -= c) {
                for (let j = n; j > 0; j -= c) {
                  // some O(1) expression
                }
              }
              `}
            />
            <br />
            <a href="https://www.geeksforgeeks.org/selection-sort/" target="_blank" rel="nofollower noreferrer">
              Selection Sort
            </a>{' '}
            and{' '}
            <a href="https://www.geeksforgeeks.org/insertion-sort/" target="_blank" rel="nofollower noreferrer">
              Insertion Sort
            </a>{' '}
            have O(n<sup>2</sup>) time complexity.
          </li>
          <li>
            <strong>
              O(Log<sub>n</sub>)
            </strong>
            : Time complexity of loop is considered as{' '}
            <strong>
              O(Log<sub>n</sub>)
            </strong>{' '}
            if the loop variables are <strong>divided/multiplied</strong> by a constant amount. And also for a recursive
            call in recursive function:
            <Code
              text={`
              // c is inc/dec constant
              for (let i = 0; i < n; i *= c) {
                // some O(1) expression
              }
              for (let i = n; i > 0; i /= c) {
                // some O(1) expression
              }
              `}
            />
            <Code
              text={`
              // recursive function
              const recursive = (n) => {
                if (n === 0) return;
                // some O(1) expression
                recurseive(n-1);
              }
              `}
            />
            <p>
              <a href="http://geeksquiz.com/binary-search/" target="_blank" rel="nofollower noreferrer">
                Binary Search(iterative implementation)
              </a>{' '}
              has{' '}
              <strong>
                O(Log<sub>n</sub>)
              </strong>{' '}
              time complexity.
            </p>
            <p>
              The series that we get in the first loop is 1, c, c<sup>2</sup>, c<sup>3</sup>, ... c<sup>k</sup>. If we
              put <em>k</em> equals to{' '}
              <em>
                Log<sub>c</sub>n
              </em>
              , we get{' '}
              <em>
                c
                <sup>
                  Log<sub>c</sub>n
                </sup>
              </em>
              , which is <em>n</em>. &#x1F937;&#x200D;&#x2642;
            </p>
          </li>
          <li>
            <strong>
              O(Log
              <sub>
                Log<sub>n</sub>
              </sub>
              )
            </strong>
            : Time complexity of loop is considered as{' '}
            <strong>
              O(Log
              <sub>
                Log<sub>n</sub>
              </sub>
              )
            </strong>{' '}
            if the loop variables are <strong>reduced/increased exponentially</strong> by a constant amount.
            <Code
              text={`
              // c is constant greater than one
              for (let i = 2; i <- n; i = Math.pow(i, c)) {
                // some O(1) expression
              }
              for (let i = n; i > 0; i /= c) {
                // some O(1) expression
              }
              `}
            />
            <br />
            <a
              href="https://www.geeksforgeeks.org/time-complexity-loop-loop-variable-expands-shrinks-exponentially/"
              target="_blank"
              rel="nofollower noreferrer"
            >
              More info
            </a>
          </li>
          <li>
            Time complexities of consecutive loops are calculated as{' '}
            <strong>sum of time complexities in invidual loops</strong>.
          </li>
        </ol>
      </li>
      <li>
        Sorting Algorithms
        <ol>
          <li>
            <Link href="/learn/sort/selection">
              <h3>Selection Sort</h3>
            </Link>
            <br />
            <Code text={selectionSortCode} />
            <br />
            <strong>Complexity Analysis of Selection Sort</strong>:<br />
            <strong>Time Complexity</strong>: O(N<sup>2</sup>) as there are two nested loops:
            <ul>
              <li>One loop to select an element of Array one by one = O(N)</li>
              <li>Another loop to compare that element with every other Array element = O(N)</li>
              <li>
                Therefore overall complexity = O(N)*O(N) = O(N*N) = O(N<sup>2</sup>)
              </li>
            </ul>
            <strong>Auxillary Space</strong>: O(1) as the only extra memory used is for temp variable while swapping two
            values in array. The good thing about selection sort is it{' '}
            <strong>never makes more than O(n) swaps and can be useful when memory write is a costly operation.</strong>
            <br />
            <a href="https://www.geeksforgeeks.org/selection-sort/" target="_blank" rel="nofollower noreferrer">
              <em>Source</em>
            </a>
          </li>
          <li>
            <h3>Bubble Sort</h3>
            <Code text={bubbleSortCode} />
            <a href="https://www.geeksforgeeks.org/bubble-sort/" target="_blank" rel="nofollower noreferrer">
              <em>Source</em>
            </a>
          </li>
          <li>
            <Link href="/learn/sort/insertion">
              <h3>Insertion Sort</h3>
            </Link>
            <Code text={insertionSortCode} />
            <a href="https://www.geeksforgeeks.org/insertion-sort/" target="_blank" rel="nofollower noreferrer">
              <em>Source</em>
            </a>
          </li>
          <li>
            <h3>
              Merge Sort (
              <a href="https://www.geeksforgeeks.org/merge-sort/" target="_blank" rel="nofollower noreferrer">
                <em>Source</em>
              </a>
              )
            </h3>
            <p>
              The array is initially divided into two equal halves and then they are combined in a sorted manner.
              <br />
              We can think of it as a recursive algorithm that continuously splits the array in half until it cannot be
              further divided. This means that if the array becomes empty or has only one element left, the dividing
              will stop, i.e. it is the base case to stop the recursion.
              <br />
              If the array has multiple elements, we split the array into <em>halves</em> and recursively invoke the
              merge sort on each of the halves. Finally, when both the halves are sorted, the merge operation is
              applied.
              <br />
              Merge operation is the process of taking two smaller sorted arrays and combining them to eventually make a
              larger one.
            </p>
            <h4>Pseudocode</h4>
            <ul>
              <li>
                Declare <pre>left</pre> variable to 0 and <pre>right</pre> variable to n-1
              </li>
              <li>
                Find mid by medium formula. <pre>mid = (left + right)/2</pre>
              </li>
              <li>
                Call <pre>merge sort</pre> on <pre>(left,mid)</pre>
              </li>
              <li>
                Call <pre>merge sort</pre> on <pre>(mid+1,right)</pre>
              </li>
              <li>
                Continue until{' '}
                <pre>
                  <strong>left &lt; right</strong>
                </pre>
              </li>
              <li>Then call merge function to perform merge sort.</li>
            </ul>
            <h4>Algorithm</h4>
            <ol>
              <li>start</li>
              <li>declare array and left, right, mid variable</li>
              <li>
                perform merge function
                <br />
                mergesort(array, left, right)
                <br />
                if left &gt; right
                <br />
                return
                <br />
                mid= (left+right)/2
                <br />
                mergesort(array, left, mid)
                <br />
                mergesort(array, mid+1, right)
                <br />
                merge(array, left, mid, right)
              </li>
              <li>Stop</li>
            </ol>
            <strong>Results</strong>: {sortedList.length > 0 ? sortedList.join(' ') : null}
            <Form onSubmit={handleSort}>
              <label htmlFor="selection-sort-array">
                Type in numbers in random order separated by spaces
                <input type="text" name="selectionSortArray" id="selection-sort-array" />
              </label>
              <input type="submit" value="Try it out" />
            </Form>
          </li>
          <li>QuickSort</li>
          <li>HeapSort</li>
        </ol>
      </li>
      <li>
        <p>Searching Algorithms</p>
        <ol>
          <li>
            <strong>Sequential Search</strong>:
            <ul>
              <li>List is traversed sequentially and every element is searched. Example: Linear Search</li>
              <Drawer header="Linear Search">
                <ul>
                  <li>
                    Start from leftmost element of array and compare <em>x</em> one by one with each element
                  </li>
                  <li>
                    If <em>x</em> matches, return index
                  </li>
                  <li>
                    If <em>x</em> doesn&rsquo;t exist, return <strong>-1</strong>
                  </li>
                  <li>
                    <strong>Time Complexity</strong>: O(n)
                  </li>
                  <li>
                    <strong>Auxillary Space</strong>: O(1)
                  </li>
                </ul>
              </Drawer>
            </ul>
          </li>
          <li>
            <strong>Interval Search</strong>:
            <ul>
              <li>Specifically designed for searching in sorted data-structures.</li>
              <li>
                Much more efficient than linear search since they <em>repeatedly</em> target middle of list. Example:
                Binary Search
              </li>
              <Drawer header="Binary Search" closed>
                <ul>
                  <li>
                    <blockquote>
                      <strong>Binary Search</strong> is a searching algorithm used in a sorted array by{' '}
                      <strong>
                        repeatedly dividing the search interval in half, hence <em>binary</em>.
                      </strong>{' '}
                      The idea of binary search is to use the information that the array is sorted and reduce time
                      complexity to O(Log n).
                    </blockquote>
                  </li>
                  <li>
                    Start with the <em>mid</em> element of the whole array as a search key.
                  </li>
                  <li>
                    If <em>value of the search key (x)</em> matches mid, return <strong>index</strong>
                  </li>
                  <li>
                    Else If <em>x</em> is <em>lower</em> than mid-el, narrow the interval to <strong>lower half</strong>{' '}
                    and then <strong>recur</strong> it again.
                  </li>
                  <li>
                    Else narrow the interval to <strong>right half</strong> and then <strong>recur</strong> it again.
                  </li>
                  <li>
                    Binary search can be implemented in two ways
                    <ul>
                      <Drawer header="Iterative Method">
                        <Code text={binaryIterative} />
                      </Drawer>
                      <Drawer header="Recursive Method">
                        <Code text={binaryRecursive} />
                        <Link href="/learn/binary">Binary Search</Link>
                      </Drawer>
                    </ul>
                  </li>
                  <li>
                    <strong>Auxillary Space</strong>: O(1)
                  </li>
                </ul>
              </Drawer>
              <Drawer header="Interpolation Search">
                <ul>
                  <li>
                    Interpolation search may go to different locations according to the value of key being searched.
                  </li>
                  <li>
                    The idea of formula is to return higher value of pos when element is considered closer to arr[hi]
                    and smaller vallue when closer to arr[low];
                  </li>
                  <li>
                    <code>pos = lo + (((x - arr[lo]) * (hi - lo))/(arr[hi] - arr[lo]))</code>
                    <br />
                    arr[] ==&gt; array to be searched
                    <br />
                    x ==&gt; Element to be searched
                    <br />
                    lo ==&gt; Starting index in arr
                    <br />
                    hi ==&gt; Ending index in arr
                  </li>
                  <li>
                    Many different Interpolation methods. For Example: Linear Interplation.
                    <br />
                    Linear interpolation takes two data points which we assume as (x1, y1) and (x2, y2) and the formula
                    is : at point(x, y)
                    <br />
                    General equation of line : <code>y = m*x + c</code>.
                    <br />
                    <em>y</em> is the value in the array and <em>x</em> is its index.
                    <br />
                    <br />
                    Now putting value of <em>lo</em>, <em>hi</em> and <em>x</em> in the equation
                    <br />
                    <code>
                      arr[hi] = m*hi+c ----<strong>(1)</strong>
                    </code>
                    <br />
                    <code>
                      arr[lo] = m*lo+c ----<strong>(2)</strong>
                    </code>
                    <br />
                    <code>
                      x = m*pos+c ----<strong>(3)</strong>
                    </code>
                    <br />
                    <br />
                    <code>m = (arr[hi] - arr[lo] )/ (hi - lo)</code>
                    <br />
                    <br />
                    <code>
                      subtracting eqn <strong>(2)</strong> from <strong>(3)</strong>
                    </code>
                    <br />
                    <code>x - arr[lo] = m * (pos - lo)</code>
                    <br />
                    <code>lo + (x - arr[lo])/m = pos</code>
                    <br />
                    <code>pos = lo + (x - arr[lo]) *(hi - lo)/(arr[hi] - arr\lo)</code>
                  </li>
                  <li>
                    <Link href="/learn/interpolation">Go to page</Link>
                  </li>
                  <li></li>
                  <li>
                    <strong>Auxillary Space</strong>: O(1)
                  </li>
                </ul>
              </Drawer>
            </ul>
          </li>
          <li>Insertion Sort</li>
          <li>Merge Sort</li>
          <li>QuickSort</li>
          <li>HeapSort</li>
        </ol>
      </li>
      <li>Pattern Searching</li>
    </ul>
  );
}

export default Learn;
