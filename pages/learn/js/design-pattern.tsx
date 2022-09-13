import React from 'react';
import Code from '../../../components/Code';
import Layout from '../../../components/Layout';
import bar from '../../../code-examples/scope';

const privateMethods = `
var myModule = (function() {
  'use strict';

  var _privateProperty = 'Hello World';

  function _privateMethod() {
    console.log(_privateProperty);
  }

  return {
    publicMethod: function() {
      _privateMethod();
    }
  };
})();

myModule.publicMethod(); // outputs 'Hello World'
console.log(myModule._privateProperty); // is undefined protected by the module closure
myModule._privateMethod(); // is TypeError protected by the module closure
`;

const DesignPattern = () => (
  <Layout title="Design Pattern">
    <ul className="root">
      <li>
        <h3>
          Modular Pattern (
          <a target="_blank" rel="noreferrer" href="https://coryrylan.com/blog/javascript-module-pattern-basics">
            Source
          </a>
          )
        </h3>
        <p>Wrap a set of variables and functions together in a single scope</p>
        <ul>
          <li>
            It is used to define objects and specify the variables and the functions that can be accessed from outside
            the scope of the function.
          </li>
          <li>
            We expose certain properties and function as public and can also restrict the scope of properties and
            functions within the object itself, making them private.
          </li>
          <li>This means that those variables cannot be accessed outside the scope of the function.</li>
          <li>We can achieve data hiding an abstraction using this pattern</li>
        </ul>
        <Code text={privateMethods} />
        <p>
          Because our private properties are not returned they are not available outside of out module. Only our public
          method has given us access to our private methods.{' '}
          <strong>This gives us ability to create private state and encapsulation within our code</strong>
        </p>
        <p>
          You may have noticed the _ before our private methods and properties. Because JavaScript does not have a
          private keyword its common to prefix private properties with an underscore.
        </p>
        <h3>Revealing Module Pattern</h3>
        <Code
          text={`
          var myModule = (function() {
            'use strict';
          
            var _privateProperty = 'Hello World';
            var publicProperty = 'I am a public property';
            var salary = 10000;

            function calculateBonus(amount) {
              salary = salary + amount;
            }

            function _privateMethod() {
              console.log(_privateProperty);
            }
          
            function publicMethod() {
              _privateMethod();
            }
          
            return {
              publicMethod: publicMethod,
              publicProperty: publicProperty
            };
          })();
          
          myModule.publicMethod(); // outputs 'Hello World'
          console.log(myModule.publicProperty); // outputs 'I am a public property'
          console.log(myModule._privateProperty); // is undefined protected by the module closure
          myModule._privateMethod(); // is TypeError protected by the module closure
          The benefit to the Revealing Module Pattern is that we can look at the bottom of our modules and quickly see what is publicly available for use.
          `}
        />
        <p>
          The salary here is a sort of private variable that can be accessed by other functions that are exposed
          publicly from the function. It can be equivalent to a private hidden variable that is accessible by its member
          function. Hence providing the idea of data hiding.
        </p>
        <p>
          The Revealing Module Pattern is one of the most popular ways of creating modules. Using the return statement
          we can return a object literal that &lsquo;reveals&rsquo; only the methods or properties we want to be
          publicly available. Use for following benefits:
        </p>
        <ul>
          <li>
            <strong>Maintainability</strong>: Module Patterns enable better maintainability since all the related code
            can be encapsulated inside a single logical block. These logically independent blocks are relatively easier
            to update.
          </li>
          <li>
            <strong>Reusability</strong>: Single unit of code can be reused across the entire application. Functionality
            enclosed as a module can be reused and we do not need to define the same functions at multiple points.
          </li>
        </ul>
        <p>
          The Module Pattern is not a silver bullet for adding code re-usability to your JavaScript. Using the Module
          Pattern with Prototypal Inheritance or ES6 Classes can give you a wide range of design patterns with varying
          pros and cons.
        </p>
        <Code
          text={`
            var MODULE = (function () {
              var my = {},
                privateVariable = 1;
            
              function privateMethod() {
                // ...
              }
            
              my.moduleProperty = 1;
              my.moduleMethod = function () {
                // ...
              };
            
              return my;
            }());
            `}
        />
        <p>
          Declared a global module named MODULE. Created public properties and methods while maintaining private
          variables using closure of the anonymous function.
        </p>
        <h3>Augmentation</h3>
        <Code
          text={`var MODULE = (function (my) {
	my.anotherMethod = function () {
		// added method...
	};

	return my;
}(MODULE));
`}
        />
        <p>
          We use the var keyword again for consistency, even though it’s not necessary. After this code has run, our
          module will have gained a new public method named MODULE.anotherMethod. This augmentation file will also
          maintain its own private internal state and imports.
        </p>
        <h3>Loose Augmentation</h3>
        <p>
          While our example above requires our initial module creation to be first, and the augmentation to happen
          second, that isn’t always necessary. One of the best things a JavaScript application can do for performance is
          to load scripts asynchronously. We can <strong>create flexible multi-part modules</strong> that can load
          themselves in any order with loose augmentation. Each file should have the following structure:
        </p>
        <Code
          text={`var MODULE = (function (my) {
              // add capabilities...
            
              return my;
            }(MODULE || {}));`}
        />
        <p>
          In this pattern, the var statement is always necessary. Note that the import will create the module if it does
          not already exist. This means you can use a tool like LABjs and load all of your module files in parallel,
          without needing to block.
        </p>
        <h3>Tight Augmentation</h3>
        <p>
          While loose augmentation is great, it does place some limitations on your module. Most importantly, you
          <em>cannot override module properties safely</em>. You also cannot use module properties from other files
          during initialization (but you can at run-time after intialization). <strong>Tight augmentation</strong>{' '}
          implies a set loading order, but allows <strong>overrides</strong>. Here is a simple example (augmenting our
          original MODULE):
        </p>
        <Code
          text={`var MODULE = (function (my) {
	var old_moduleMethod = my.moduleMethod;

	my.moduleMethod = function () {
		// method override, has access to old through old_moduleMethod...
	};

	return my;
}(MODULE));
`}
        />
        <p>Here we’ve overridden MODULE.moduleMethod, but maintain a reference to the original method, if needed.</p>
        <h3>Cloning and Inheritance</h3>
        <Code
          text={`var MODULE_TWO = (function (old) {
              var my = {},
                key;
            
              for (key in old) {
                if (old.hasOwnProperty(key)) {
                  my[key] = old[key];
                }
              }
            
              var super_moduleMethod = old.moduleMethod;
              my.moduleMethod = function () {
                // override method on the clone, access to super through super_moduleMethod
              };
            
              return my;
            }(MODULE));`}
        />
        <p>
          This pattern is perhaps the <strong>least flexible</strong> option. It does allow some neat compositions, but
          that comes at the expense of flexibility. As I’ve written it, properties which are objects or functions will
          not be duplicated, they will exist as one object with two references. Changing one will change the other. This
          could be fixed for objects with a recursive cloning process, but probably cannot be fixed for functions,
          except perhaps with eval. Nevertheless, I’ve included it for completeness.
        </p>
        <h3>Cross-File Private State</h3>
        <p>
          One severe limitation of splitting a module across multiple files is that each file maintains its own private
          state, and does not get access to the private state of the other files. This can be fixed. Here is an example
          of a loosely augmented module that will <strong>maintain private state</strong> across all augmentations:
        </p>
        <Code
          text={`var MODULE = (function (my) {
              var _private = my._private = my._private || {},
                _seal = my._seal = my._seal || function () {
                  delete my._private;
                  delete my._seal;
                  delete my._unseal;
                },
                _unseal = my._unseal = my._unseal || function () {
                  my._private = _private;
                  my._seal = _seal;
                  my._unseal = _unseal;
                };
            
              // permanent access to _private, _seal, and _unseal
            
              return my;
            }(MODULE || {}));`}
        />
        <p>
          Any file can set properties on their local variable _private, and it will be immediately available to the
          others. Once this module has loaded completely, the application should call MODULE._seal(), which will prevent
          external access to the internal _private. If this module were to be augmented again, further in the
          application’s lifetime, one of the internal methods, in any file, can call _unseal() before loading the new
          file, and call _seal() again after it has been executed. This pattern occurred to me today while I was at
          work, I have not seen this elsewhere. I think this is a very useful pattern, and would have been worth writing
          about all on its own.
        </p>
        <h3>Sub-modules</h3>
        <Code
          text={`MODULE.sub = (function () {
              var my = {};
              // ...
            
              return my;
            }());`}
        />
        <p>
          While this may have been obvious, I thought it worth including. Sub-modules have all the advanced capabilities
          of normal modules, including augmentation and private state.
        </p>
      </li>
      <li>
        <h3>Notes</h3>:
        <ul>
          <li>
            The module pattern is good for <strong>performance</strong>. It minifies really well, which makes
            downloading the code faster. Using <strong>loose augmentation</strong> allows{' '}
            <strong>easy non-blocking parallel downloads</strong>, which also speeds up download speeds. Initialization
            time is probably a bit slower than other methods, but worth the trade-off. Run-time performance should
            suffer no penalties so long as globals are imported correctly, and will probably gain speed in sub-modules
            by shortening the reference chain with local variables
          </li>
          <li>
            Here’s an example of a sub-module that loads itself dynamically to its parent (creating it if it does not
            exist). I’ve left out private state for brevity, but including it would be simple. This code pattern allows
            an entire complex heirarchical code-base to be loaded completely in parallel with itself, sub-modules and
            all.
          </li>
          <li>
            <Code
              text={`var UTIL = (function (parent, $) {
                  var my = parent.ajax = parent.ajax || {};
                
                  my.get = function (url, params, callback) {
                    // ok, so I'm cheating a bit :)
                    return $.getJSON(url, params, callback);
                  };
                
                  // etc...
                
                  return parent;
                }(UTIL || {}, jQuery));
                `}
            />
          </li>
        </ul>
      </li>
    </ul>
  </Layout>
);

export default DesignPattern;
