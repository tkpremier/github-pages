import React, { Profiler } from 'react';
import Code from '../../components/Code';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import * as codeString from '../../code-strings/react';

const LearnJavascript = props => (
  <Layout title="Learn Javascript">
    <h1>Learn Javascript</h1>
    <ul className="root">
      <Drawer key="js-object-methods" header="Object Methods">
        <ul>
          <li>Functions that are stored in object properties are called &ldquo;methods&rdquo;.</li>
          <li>
            Methods can reference the object as <pre>this</pre>.
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-this" header="This">
        <ul>
          <li>
            The value of <pre>this</pre> is defined at run-time.
          </li>
          <li>
            When a function is declared, it may use <pre>this</pre>, but <pre>this</pre> has no value{' '}
            <strong>until the function is called</strong>.
            <Code
              text={`function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined OR
//this may be window or another global, which will return that value`}
            />
            The value of <pre>this</pre> insider makeUser() is undefined because it is called as a function, not as a
            method with dot syntax.
            <br />
            The value of <pre>this</pre> is one for the whole function, code blocks and obj literals do not affect it.
            So <pre>ref: this</pre> actually takes current <pre>this</pre> of the function.
            <br />
            <h4 style={{ color: 'green' }}>Correct</h4>
            <Code
              text={`function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
}

let user = makeUser();

alert( user.ref().name ); // John`}
            />
            Now it works, because{' '}
            <strong>
              <pre>user.ref()</pre> is a method
            </strong>
            . And the value of this is set to the object before dot <pre>.</pre>
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-object-methods" header="Object Methods">
        <ul>
          <li>Functions that are stored in object properties are called &ldquo;methods&rdquo;.</li>
          <li>
            Methods can reference the object as <pre>this</pre>.
          </li>
        </ul>
      </Drawer>
    </ul>
  </Layout>
);

// heuristics: (Relating to or using a problem-solving technique in which the most appropriate solution of several found by alternative methods is selected at successive stages of a program for use in the next step of the program.) (try to make the program better by learning what parts of the program progress to what)

export default LearnJavascript;
