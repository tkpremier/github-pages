import * as jsClass from '../../../code-strings/js/class';
import * as jsCon from '../../../code-strings/js/context';
import * as jsEnv from '../../../code-strings/js/environment';
import * as jsExCon from '../../../code-strings/js/execution-context';
import * as jsThis from '../../../code-strings/js/this';
import { Code } from '../../../components/Code';
import { Drawer } from '../../../components/Drawer';
import { Layout } from '../../../components/Layout';

const LearnJavascript = () => (
  <Layout title="Learn Javascript">
    <h1>Learn Javascript</h1>
    <ul className="root">
      <Drawer key="js-object-methods" header="Object Methods" closed>
        <ul>
          <li>Functions that are stored in object properties are called &ldquo;methods&rdquo;.</li>
          <li>
            Methods can reference the object as <code>this</code>.
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-this" header="This" closed>
        <ul>
          <li>
            The value of <code>this</code> is defined at run-time. The <code>this</code> value is a special object which
            is dynamically and implicitly passed to the code of a context. We can consider it as an implicit extra
            parameter, which we can access, but cannot mutate.
          </li>
          <li>
            <strong>The rule is simple</strong>: if obj.f() is called, then <code>this</code> is <code>obj</code> during
            the call of f.
            <br />
            When a function is declared, it may use <code>this</code>, but <code>this</code> has no value{' '}
            <strong>until the function is called</strong>.
            <Code text={jsThis.makeUserWrong} />
            The value of <code>this</code> insider makeUser() is undefined because it is called as a function,{' '}
            <strong>not as a method with dot syntax</strong>.
            <br />
            So <code>ref: this</code> actually takes current <code>this</code> of the function.
            <br />
            <h4 style={{ color: 'green' }}>Correct</h4>
            <Code text={jsThis.makeUserOne} />
            Now it works, because{' '}
            <strong>
              <code>user.ref()</code> is a method
            </strong>
            . And the value of this is set to the object before dot <code>.</code>
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-class" header="Class" closed>
        <ul>
          <li>
            When several objects share the same initial state and behavior, they form a <em>classification</em>.
          </li>
          <li>
            Here&rsquo;s a code sample of <em>multiple objects</em> inheriting from the same prototype, explicitly
            stated:
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
            newly created instances. This prototype is stored in the <code>&lt;ConstructorFunction&gt;.prototype</code>{' '}
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
            (class) <code>Letter</code> has its own prototype, which is <code>Function.prototype</code>. Notice, that{' '}
            <code>Letter.prototype</code> is the prototype of the Letter <em>instances</em>, that is <code>a</code>,{' '}
            <code>b</code>, and <code>z</code>.<strong>Note</strong>: the <em>actual</em> prototype of any object is
            always the <code>__proto__</code> reference. And the explicit <code>prototype</code> property on the
            constructor function is just a reference to the prototype of its <em>instances</em>; from instances
            it&rsquo;s still referred by the <code>__proto__</code>. See details{' '}
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
        maintain control flow and order of execution. Let&rsquo;s consider a recursive function call:
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
            accordingly, is a <em>callee</em>. In our example the <code>recursive</code> function plays both roles: of a
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
            storage table which maps identifiers to values), and a reference to the parent (which can be{' '}
            <code>null</code>
            ).
          </li>
          <li>
            <Code text={jsEnv.sample} />
            The environment structures of the <em>global context</em>, and a context of the <code>foo</code> function
            would look as follows:
            <img src="/images/learn/js/environment-chain.png" width="400" />
            Logically this reminds us of the <em>prototype chain</em> which we&rsquo;ve discussed above. And the rule
            for <em>identifiers resolution</em> is very similar: if a variable is <em>not found</em> in the own
            environment, there is an attempt to lookup it in the <em>parent environment</em>, in the parent of the
            parent, and so on — until the whole <em>environment chain</em> is considered.
            <blockquote>
              <strong>Identifier resolution</strong>: the process of resolving a variable &#40;binding&#41; in an
              environment chain. An unresolved binding results to <code>ReferenceError</code>.
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
            but not the others, and vice-versa. The binding object can also be provided as <code>this</code> value.
            <Code text={jsEnv.objectEnvRecord} />
          </li>
        </ul>
      </Drawer>
      <Drawer key="js-closure" header="Closure">
        <blockquote>
          <strong>First-class function</strong>: a function which can participate as a normal data: be stored in a
          variable, passed as an argument, or returned as a value from another function.
        </blockquote>
        <p>
          With the concept of first-class functions so called <strong>Funarg problem</strong> is related (or &ldquo;
          <em>A problem of a functional argument</em>&rdquo;). The problem arises when a function has to deal with{' '}
          <em>free variables</em>.
        </p>
        <blockquote>
          <strong>Free variable</strong>: a variable which is <em>neither a parameter, nor a local variable</em> of this
          function.
        </blockquote>
        <strong>Downward Funarg problem</strong> example:
        <Code text={jsCon.downwardsFunarg} />
        <ul>
          <li>
            For the function <code>foo</code> the variable <code>x</code> is free.
          </li>
          <li>
            When the <code>foo</code> function is activated (via the <code>funArg</code> parameter) — where should it
            resolve the <code>x</code> binding?
            <ul>
              <li>
                From the <em>outer</em> scope where the function was <em>created</em>?
              </li>
              <li>
                From the <em>caller</em> scope, from where the function is <em>called</em>?
              </li>
              <li>
                As we see, the caller, that is the <code>bar</code> function, also provides the binding for{' '}
                <code>x</code> — with the value <code>20</code>.
              </li>
              <li>
                This use-case described above is known as the{' '}
                <strong>
                  <em>downwards funarg problem</em>
                </strong>
                , i.e. an <em>ambiguity</em> at determining a correct environment of a binding: should it be an
                environment of the <em>creation time</em>, or environment of the <em>call time</em>?
              </li>
            </ul>
          </li>
        </ul>
        <p>
          This is solved by an agreement of using <em>static scope</em>, that is the scope of the{' '}
          <strong>
            <em>creation time</em>
          </strong>
          .
        </p>
        <blockquote>
          <strong>Static scope</strong>: a language implements static scope, if only by looking at the source code one
          can determine in which environment a binding is resolved.
        </blockquote>
        <p>
          The static scope sometimes is also called <em>lexical scope</em>, hence the <em>lexical environments</em>{' '}
          naming.
          <br />
          Technically the static scope is implemented by <em>capturing the environment</em> where a function is{' '}
          <em>created</em>. Read more about <em>static</em> and <em>dynamic</em> scopes in this{' '}
          <a
            href="https://codeburst.io/js-scope-static-dynamic-and-runtime-augmented-5abfee6223fe"
            rel="noreferrer nofollower"
            target="_blank"
          >
            article
          </a>
          .
        </p>
        In our example, the environment captured by the <code>foo</code> function, is the <em>global environment</em>:
        <br />
        <img src="/images/learn/js/closure.png" alt="Closure" width="50%" />
        We can see that an environment references a function, which in turn reference the environment <em>back</em>.
        <blockquote>
          <strong>Closure</strong>: a <em>closure</em> is a function which <em>captures the environment where</em>{' '}
          it&rsquo;s&nbsp;
          <em>defined</em>. Further this environment is used for <em>identifier resolution</em>.
        </blockquote>
        <p>
          <strong>Note</strong>: a function is <em>called</em> in a <em>fresh activation environment</em> which stores{' '}
          <em>local variables</em>, and <em>arguments</em>. The parent environment of the activation environment is set
          to the closured environment of the function, resulting to the lexical scope semantics.
          <br />
          <strong>Upwards funarg problem</strong>: A capturing environment <em>outlives</em> the context which creates
          it.
        </p>
        <Code text={jsCon.upwardsFunarg} />
        <ul>
          <li>
            Again, technically it doesn&rsquo;t differ from the same exact mechanism of capturing the definition
            environment.
          </li>
          <li>
            Just in this case, hadn&rsquo;t we have the closure, the <em>activation environment</em> of <code>foo</code>{' '}
            <em>would be destroyed</em>.
          </li>
          <li>
            <strong>But we captured it</strong>, so it cannot be deallocated, and is preserved — to{' '}
            <em>support static scope semantics</em>.
          </li>
          <li>
            Often there is an incomplete understanding of closures —{' '}
            <span style={{ color: 'red' }}>
              usually developers think about closures only in terms of the <strong>upward funarg problem</strong> (and
              practically it really makes more sense).
            </span>
            &nbsp;However, as we can see, the technical mechanism for the downwards and upwards funarg problem is
            exactly the same — and is the{' '}
            <strong>
              <em>mechanism of the static scope</em>
            </strong>
            .
          </li>
        </ul>
        <p>
          Similarly to prototypes, the same parent environment can be <em>shared</em> across <em>several</em> closures.
          This allows accessing and mutating the shared data:
        </p>
        <Code text={jsCon.sharedEnv} />
        <ul>
          <li>
            Since both closures, <code>increment</code> and <code>decrement</code>, are created within the scope
            containing the count variable, they share this parent scope.{' '}
          </li>
          <li>
            That is, capturing always happens <em>&ldquo;by-reference&rdquo;</em> — meaning the <em>reference</em> to
            the <em>whole parent environment</em> is stored.
          </li>
        </ul>
        <img src="/images/learn/js/shared-environment.png" width="50%" alt="A shared environment" />
        <span style={{ color: 'red' }}>
          Some languages may capture <em>by-value</em>, making a copy of a captured variable, and do not allow changing
          it in the parent scopes.
        </span>{' '}
        However in JS&#x1F64C;, to repeat, it is always the{' '}
        <strong>
          <em>reference</em>
        </strong>{' '}
        to the parent scope.
        <br />
        So all identifiers are <em>statically scoped</em>. There is however one value which is{' '}
        <em>dynamically scoped</em> in ECMAScript. It&rsquo;s the value of <code>this</code>.
      </Drawer>
    </ul>

    <style>{`img { margin: 15px auto; display: block;}; `}</style>
  </Layout>
);

// heuristics: (Relating to or using a problem-solving technique in which the most appropriate solution of several found by alternative methods is selected at successive stages of a program for use in the next step of the program.) (try to make the program better by learning what parts of the program progress to what)

export default LearnJavascript;
