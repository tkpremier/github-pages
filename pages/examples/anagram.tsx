import serialize from 'form-serialize';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import * as sample from '../../code-examples/search/anagram';
import * as sampleString from '../../code-strings/search/anagram'; // { countAnagrams, sherlockAndAnagram }
import { Code } from '../../components/Code';
import { Drawer } from '../../components/Drawer';
import { Layout } from '../../components/Layout';

enum AnagramFuncNames {
  'countAnagramSubstring',
  'countAnagrams'
}
interface ISample {
  func: keyof typeof AnagramFuncNames;
  header: string;
  closed?: boolean;
}
const Sample = ({ func, header, closed }: ISample) => {
  const [count, setCount] = useState(0);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = serialize(e.target as HTMLFormElement, { hash: true });
    const params = Object.keys(data).map(key => data[key]) as string[];
    setCount(sample[func](params[0], params[1]));
  };
  return (
    <Drawer header={header} closed={closed}>
      <Code text={sampleString[func]} />
      {`Answer:${count > 0 ? ` Count: ${count}` : ''}`}
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" required name="text" />
        <input type="text" name="word" />
        <input type="submit" value="Add Comment" />
      </form>
      <a
        href="https://www.geeksforgeeks.org/count-occurrences-of-anagrams/?ref=gcse"
        target="_blank"
        rel="norefferer nofollower noreferrer"
      >
        Source : GeeksforGeeks
      </a>
    </Drawer>
  );
};

const Anagram = () => (
  <Layout title="Example Questions">
    <ul className="root">
      <li>
        <blockquote>
          <strong>Anagram</strong>: An <em>anagram</em> of a string is another string that contains the same characters,{' '}
          <strong>
            <em>only the order of characters can be different</em>
          </strong>
          . For example, <code>“abcd”</code> and <code>“dabc”</code> are an anagram of each other.
        </blockquote>
      </li>
      <Sample
        key="check-anagram"
        func="countAnagrams"
        header="Check whether two strings are anagrams of each other."
        closed
      />
      <Sample
        key="anagram-substring-total"
        func="countAnagramSubstring"
        header="Count tottal substring of this string which are anagram to each other."
      />
      <li>
        <ul>
          <li>
            The idea is to create a{' '}
            <strong>
              <em>map</em>
            </strong>
            . We use <em>character frequencies</em> as <strong>keys</strong> and corresponding <em>counts</em> as{' '}
            <strong>values</strong>.
          </li>
          <li>
            We can solve this problem by iterating over all substrings and counting frequencies of characters in every
            substring. We can update frequencies of characters while looping over substrings i.e. there won’t be an
            extra loop for counting frequency of characters.
          </li>
          <li>
            In above code, a map of key <code>vector type</code> and value <code>int type</code> is taken for storing
            occurrence of <code>frequency array of length 26</code> of substring characters.
          </li>
          <li>
            Once occurrence <em>o</em> of each frequency array is stored, total anagrams will be the sum of o*(o-1)/2
            for all different frequency arrays because if a particular substring has <em>o</em> anagrams in string total
            o*(o-1)/2 anagram pairs can be formed. Below is the implementation of above idea.
          </li>
        </ul>
      </li>
      <li>
        <Link href="/examples">
          Back to Examples
        </Link>
      </li>
    </ul>
  </Layout>
);

export default Anagram;
