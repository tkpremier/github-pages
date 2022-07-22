import React from 'react';
import Code from '../../../components/Code';
import Drawer from '../../../components/Drawer';
import Layout from '../../../components/layout';
import * as jsThis from '../../../code-strings/js/this';
import * as jsClass from '../../../code-strings/js/class';
import * as jsExCon from '../../../code-strings/js/execution-context';
import * as jsEnv from '../../../code-strings/js/environment';

const LearnJavascript = () => (
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
      <Drawer key="js-this" header="This" closed>
        <ul>
          <li>
            The value of <pre>this</pre> is defined at run-time.
          </li>
          <li>
            <strong>The rule is simple</strong>: if obj.f() is called, then <pre>this</pre> is <pre>obj</pre> during the
            call of f.
            <br />
            When a function is declared, it may use <pre>this</pre>, but <pre>this</pre> has no value{' '}
            <strong>until the function is called</strong>.
            <Code text={jsThis.makeUserWrong} />
            The value of <pre>this</pre> insider makeUser() is undefined because it is called as a function,{' '}
            <strong>not as a method with dot syntax</strong>.
            <br />
            So <pre>ref: this</pre> actually takes current <pre>this</pre> of the function.
            <br />
            <h4 style={{ color: 'green' }}>Correct</h4>
            <Code text={jsThis.makeUserOne} />
            Now it works, because{' '}
            <strong>
              <pre>user.ref()</pre> is a method
            </strong>
            . And the value of this is set to the object before dot <pre>.</pre>
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-class" header="Class" closed>
        <ul>
          <li>
            When several objects share the same initial state and behavior, they form a <em>classification</em>.
          </li>
          <li>
            Here's a code sample of <em>multiple objects</em> inheriting from the same prototype, explicitly stated:
            <Code text={jsClass.explicitlyStated} />
          </li>
          <li>
            Considering how <em>cumbersome</em> that all is, class abstraction serves exactly this purpose — being a
            syntactic sugar (i.e. a construct which semantically does the same, but in a much nicer syntactic form), it
            allows creating such multiple objects with the convenient pattern:
            <Code text={jsClass.constructor} />
            <strong>Note</strong>: <em>class-based inheritance</em> in ECMAScript is implemented on top of the{' '}
            <em>prototype-based delegation</em>.
          </li>
          <li>
            Technically a “class” is represented as a <em>“constructor function + prototype”</em> pair. Thus, a
            constructor function <em>creates objects</em>, and also <em>automatically</em> sets the prototype for its
            newly created instances. This prototype is stored in the <pre>&lt;ConstructorFunction&gt;.prototype</pre>{' '}
            property.
            <br />
            <strong>Constructor</strong>: A constructor is a function which is used to create instances, and
            automatically set their prototype.Before the class abstraction was introduced, this was the norm:
            <Code text={jsClass.constructorOld} />
            <strong>Note</strong>: constructor functions are just implementation details of the class-based inheritance.
          </li>
          <li>
            <img src="/images/learn/js/js-constructor.png" />
            The figure above shows that <em>every object</em> has an associated prototype. Even the constructor function
            (class) <pre>Letter</pre> has its own prototype, which is <pre>Function.prototype</pre>. Notice, that{' '}
            <pre>Letter.prototype</pre> is the prototype of the Letter <em>instances</em>, that is <pre>a</pre>,{' '}
            <pre>b</pre>, and <pre>z</pre>.<strong>Note</strong>: the <em>actual</em> prototype of any object is always
            the <pre>__proto__</pre> reference. And the explicit <pre>prototype</pre> property on the constructor
            function is just a reference to the prototype of its <em>instances</em>; from instances it&rsquo;s still
            referred by the <pre>__proto__</pre>. See details{' '}
            <a
              href="http://dmitrysoshnikov.com/ecmascript/chapter-7-2-oop-ecmascript-implementation/#explicit-codeprototypecode-and-implicit-codeprototypecode-properties"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-execution" header="Execution Context" closed>
        <strong>Execution context stack</strong>: An <em>execution context stack</em> is a LIFO structure used to
        maintain control flow and order of execution. Let's consider a recursive function call:
        <Code text={jsExCon.recursive} />
        <ul>
          <li>
            When a function is called, a <em>new execution context</em> is created, and <em>pushed</em> onto the stack.
          </li>
          <li>
            At this point the function becomes an <em>active execution context</em>.
          </li>
          <li>
            When a function returns, its context is <em>popped</em> from the stack.
          </li>
          <li>
            A context which calls another context is called a <em>caller</em>. And a context which is being called,
            accordingly, is a <em>callee</em>. In our example the <pre>recursive</pre> function plays both roles: of a
            callee and a caller — when calls itself recursively.
          </li>
          <li>
            <img src="/images/learn/js/execution-stack.png" />
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-environment" header="Environment" closed>
        Every execution context has an associated <em>lexical environment</em>.<br />
        <blockquote>
          <strong>Lexical environment</strong>: A <em>lexical environment</em> is a structure used to define association
          between <em>identifiers</em> appearing in the context with their values. Each environment can have a reference
          to an <em>optional parent environment</em>.
        </blockquote>
        So an environment is a <em>storage</em> of variables, functions, and classes defined in a scope.
        <ul>
          <li>
            Technically, an environment is a <em>pair</em>, consisting of an <em>environment record</em> (an actual
            storage table which maps identifiers to values), and a reference to the parent (which can be <pre>null</pre>
            ).
          </li>
          <li>
            <Code text={jsEnv.sample} />
            The environment structures of the <em>global context</em>, and a context of the <pre>foo</pre> function
            would look as follows:
            <img src="/images/learn/js/environment-chain.png" width="400" />
            Logically this reminds us of the <em>prototype chain</em> which we&rsquo;ve discussed above. And the rule
            for <em>identifiers resolution</em> is very similar: if a variable is <em>not found</em> in the own
            environment, there is an attempt to lookup it in the <em>parent environment</em>, in the parent of the
            parent, and so on — until the whole <em>environment chain</em> is considered.
            <blockquote>
              <strong>Identifier resolution</strong>: the process of resolving a variable &#40;binding&#41; in an
              environment chain. An unresolved binding results to <pre>ReferenceError</pre>.
            </blockquote>
          </li>
          <li>
            Environment records differ by <em>type</em>. There are{' '}
            <em>
              <strong>object</strong>
            </em>{' '}
            environment records and{' '}
            <em>
              <strong>declarative</strong>
            </em>{' '}
            environment records. On top of the declarative record there are also{' '}
            <em>
              <strong>function</strong>
            </em>{' '}
            environment records, and{' '}
            <em>
              <strong>module</strong>
            </em>{' '}
            environment records. Each type of the record has specific only to it properties. However, the generic
            mechanism of the identifier resolution is common across all the environments, and doesn&rsquo;t depend on
            the type of a record.
          </li>
          <li>
            An example of an <em>object environment record</em> can be the record of the <em>global environment</em>.
            Such record has also associated <em>binding object</em>, which may store some properties from the record,
            but not the others, and vice-versa. The binding object can also be provided as <pre>this</pre> value.
            <Code text={jsEnv.objectEnvRecord} />
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-closure" header="Closure">
        <blockquote>
          <strong>First-class function</strong>: a function which can participate as a normal data: be stored in a
          variable, passed as an argument, or returned as a value from another function.
        </blockquote>
      </Drawer>
    </ul>
    <style>{`img { margin: 0 auto; display: block;}`}</style>
  </Layout>
);

// heuristics: (Relating to or using a problem-solving technique in which the most appropriate solution of several found by alternative methods is selected at successive stages of a program for use in the next step of the program.) (try to make the program better by learning what parts of the program progress to what)

export default LearnJavascript;
