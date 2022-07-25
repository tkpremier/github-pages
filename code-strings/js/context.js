export const freeVariable = `let x = 10;
 
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
