export const downwardsFunarg = `let x = 10;
 
function foo() {
  console.log(x);
}
 
function bar(funArg) {
  let x = 20;
  funArg(); // 10, not 20!
}
 
// Pass \`foo\` as an argument to \`bar\`.
bar(foo);
`;

export const upwardsFunarg = `function foo() {
  let x = 10;
   
  // Closure, capturing environment of \`foo\`.
  function bar() {
    return x;
  }
 
  // Upward funarg.
  return bar;
}
 
let x = 20;
 
// Call to \`foo\` returns \`bar\` closure.
let bar = foo();
 
bar(); // 10, not 20!`;

export const sharedEnv = `function createCounter() {
  let count = 0;
 
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
  };
}
 
let counter = createCounter();
 
console.log(
  counter.increment(), // 1
  counter.decrement(), // 0
  counter.increment(), // 1
);`;
