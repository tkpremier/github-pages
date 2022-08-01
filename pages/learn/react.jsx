import React, { Profiler } from 'react';
import Code from '../../components/Code';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import * as codeString from '../../code-strings/react/';
import * as codeHooks from '../../code-strings/react/hooks';

const LearnReact = () => (
  <Layout title="Time to Learn React">
    <h1>Learn React Guide</h1>
    <ul className="root">
      <Drawer key="react-hooks" header="Hooks">
        <ul>
          <li>
            <pre>useCallback</pre> is used when callback handlers are created as <pre>var</pre> but you don&rsquo;t want
            to create a new variable every time it renders
          </li>
          <Drawer header="Custom Hooks" closed>
            <Slider
              carouselDesc="Let's walk through creating a custom hook and then using it"
              carouselTitle="useFriendStatus &amp; useReducer"
            >
              <div key="hooks-custom-one">
                <h5>Create hook</h5>
                <Code text={codeHooks.customHook} />
              </div>
              <div key="hooks-custom-two">
                <h5>Use hook in component</h5>
                <Code text={codeHooks.customHookInUse} />
              </div>
              <div key="hooks-custom-three">
                <h5>useReducer example</h5>
                <Code text={codeHooks.useReducer} />
              </div>
            </Slider>
          </Drawer>
          <Drawer header="useTransition">
            <Slider>
              <Code text={codeHooks.useTransitionWrong} key="wrong" />
              <div key="heavy-updates">
                <h3>Heavy UI updates as transitions</h3>
                <p>
                  As already mentioned, you can use useTransition() hook to let know React which UI updates are urgent
                  (like updating the input field value), and which are non-urgent transitions (like updating the names
                  list to highlight the query).
                </p>
              </div>
              <Code text={codeHooks.useTransition} key="right" />
            </Slider>
          </Drawer>
        </ul>
      </Drawer>
      <Drawer closed key="react-profiler" header="Profiler">
        <Profiler id="slider" onRender={param => param}>
          <Slider
            carouselDesc="Shows developer CPU usage, re-rendering activity, such as unnecessary re-renders and memoization (
            <pre>React.memo</pre>, useMemo, shouldComponentUpdate);"
            carouselTitle="Relevant Code"
          >
            <Code text={codeString.profilerJsx} key="profiler-jsx" />
            <Code text={codeString.onRenderCallbackString} key="render-callback" />
          </Slider>
        </Profiler>
      </Drawer>
      <Drawer closed header="Reconciliation" key="react-recon">
        <h4>Keys</h4>
        <p>
          When children have keys, React uses the key to match children in the original tree with children in the
          subsequent tree.
        </p>
        <p>
          Reorders can also cause issues with component state when indexes are used as keys. Component instances are
          updated and reused based on their key. If the key is an index, moving an item changes it. As a result,
          component state for things like uncontrolled inputs can get mixed up and updated in unexpected ways
        </p>
        <h4>Tradeoffs</h4>
        <p>
          We are regularly refining the heuristics in order to make common use cases faster. In the current
          implementation, you can express the fact that a subtree has been moved amongst its siblings, but you cannot
          tell that it has moved somewhere else. The algorithm will rerender that full subtree.
        </p>
        <p>Because React relies on heuristics, if assumptions are not met, performance will suffer.</p>
        <ol>
          <li>
            The algorithm will not try to match subtrees of different component types. If you see yourself alternating
            between two component types with very similar output, you may want to make it the same type. In practice, we
            haven&rsquo;t found this to be an issue.
          </li>
          <li>
            <strong>Keys should be stable, predictable, and unique</strong>. Unstable keys (like those produced by
            Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can
            cause performance degradation and lost state in child components.
          </li>
        </ol>
        <Slider>
          <Code text={codeString.profilerJsx} key="profiler-jsx" />
          <Code text={codeString.onRenderCallbackString} key="render-callback" />
        </Slider>
      </Drawer>
      <Drawer closed header="Refs" key="react-refs">
        <ul>
          <li>Managing focus, text selection, or medial playback.</li>
          <li>Triggering imperative animations.</li>
          <li>Integrating with third-party DOM libraries</li>
        </ul>
        <h4>Dont overuse Refs</h4>
        <p>
          By default, you may{' '}
          <strong>not use the ref attribute on function components because they don’t have instances</strong>.
        </p>
        <div>
          If you want to allow people to take a <pre>ref</pre> to your function component, you can use{' '}
          <pre>forwardRef</pre>
          (possibly in conjunction with useImperativeHandle), or you can convert the component to a class.
        </div>
        <p>
          You can, however, use the ref attribute inside a function component as long as you refer to a DOM element or a
          class component.
        </p>
        <h4>Exposing DOM Refs to Parent Components</h4>
        <p>
          In rare cases, you might want to have access to a child&rsquo;s DOM node from a parent component. This is
          generally not recommended because it breaks component encapsulation, but it can occasionally be useful for
          triggering focus or measuring the size or position of a child DOM node.
          <strong>
            Ref forwarding lets components opt into exposing any child component&rsquo;s ref as their own.
          </strong>
        </p>
        <h4>Callback Refs</h4>
        <div>
          Instead of creating a ref, you pass a function to the ref property. Instead of creating <pre>createRef</pre>,
          you pass a function.
          <br />
          React will call the <pre>ref</pre> callback with the DOM element when component mounts, and call it with null
          when it unMounts.
          <br />
          <Drawer header="Caveat">
            If the ref callback is defined as an inline function, it will get called twice during updates, first with
            null and then again with the DOM element. This is because a new instance of the function is created with
            each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the
            ref callback as a bound method on the class, but note that it shouldn&rsquo;t matter in most cases.
          </Drawer>
          <Code text={codeString.callBackRefs} />
        </div>
      </Drawer>
      <Drawer closed header="Render Props" key="react-render-props">
        <p>
          A component with a render prop takes a func that returns a React element and calls it instead of implementing
          its own render logic.
        </p>
        <Code
          text={`<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>`}
        />
        <h4>Use Render Props for Cross-Cutting Concerns</h4>
        <p>
          How can we reuse common behaviors in multiple components? In other words, if anotehr component needs to know
          about cursor positioning, can we encapsulate that vehavior so we can easily share it w/ that component?
        </p>
        <Code text={codeString.crossCutting} />
        <p>
          More concretely,{' '}
          <strong>a render prop is a function prop that a component uses to know what to render</strong>.
        </p>
        <h4>
          Using Props other than <code>render</code>
        </h4>
        <p>
          It&rsquo;s important to remember that just because the pattern is called “render props” you don’t have to use
          a prop named render to use this pattern. In fact, any prop that is a function that a component uses to know
          what to render is technically a “render prop”.
        </p>
        <h4>Render props with HOC.</h4>
        <Code text={codeString.renderPropsHOC} />
        <ul className="root">
          <Drawer header="Caveats">
            <h4>Be careful when using Render Props with React.PureComponent</h4>
            <h5 style={{ color: 'red' }}>WRONG</h5>
            <Code
              text={`class Mouse extends React.PureComponent {
  // Same implementation as above...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          This is bad! The value of the \`render\` prop will
          be different on each render.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}`}
            />
            <div>
              In this example, each time <pre>&lt;MouseTracker&gt;</pre> renders, it generates a new function as the
              value of the &lt;Mouse&gt; render prop, thus negating the effect of &lt;Mouse&gt; extending
              React.PureComponent in the first place!
            </div>
            <h5 style={{ color: 'green' }}>CORRECT</h5>
            <Code text={codeString.renderPropsPure} />
            <div>
              in cases where you cannot define the prop statically (e.g. because you need to close over the
              component&rsquo;s props and/or state) <pre>&lt;Mouse&gt;</pre> should extend React.Component instead.
            </div>
          </Drawer>
        </ul>
      </Drawer>
    </ul>
  </Layout>
);

// heuristics: (Relating to or using a problem-solving technique in which the most appropriate solution of several found by alternative methods is selected at successive stages of a program for use in the next step of the program.) (try to make the program better by learning what parts of the program progress to what)

export default LearnReact;
