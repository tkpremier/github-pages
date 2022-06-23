import React from "react";
import Link from "next/link";
import Code from "../../components/Code";
import Drawer from "../../components/Drawer";
import Layout from "../../components/layout";
import { binaryIterative, binaryRecursive, interpolationSearch } from "../../code-examples";

function Learn({ props }) {
  return (
    <Layout>
      <ul>
        <li>
          Sorting Algorithms
          <ol>
            <li>Selection Sort</li>
            <li>Bubble Sort</li>
            <li>Insertion Sort</li>
            <li>Merge Sort</li>
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
                      If <em>x</em> doesn't exist, return <strong>-1</strong>
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
                        <strong>Binary Search</strong> is a searching algorithm used in a sorted array by{" "}
                        <strong>
                          repeatedly dividing the search interval in half, hence <em>binary</em>.
                        </strong>{" "}
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
                      Else If <em>x</em> is <em>lower</em> than mid-el, narrow the interval to{" "}
                      <strong>lower half</strong> and then <strong>recur</strong> it again.
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
                      Linear interpolation takes two data points which we assume as (x1, y1) and (x2, y2) and the
                      formula is : at point(x, y)
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
    </Layout>
  );
}

export default Learn;
