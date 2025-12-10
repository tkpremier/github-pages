export const sample = `let x = 10;
let y = 20;
 
function foo(z) {
  let x = 100;
  return x + y + z;
}
 
foo(30); // 150`;

export const objectEnvRecord = `// Legacy variables using \`var\`.
var x = 10;
 
// Modern variables using \`let\`.
let y = 20;
 
// Both are added to the environment record:
console.log(
  x, // 10
  y, // 20
);
 
// But only \`x\` is added to the "binding object".
// The binding object of the global environment
// is the global object, and equals to \`this\`:
 
console.log(
  this.x, // 10
  this.y, // undefined!
);
 
// Binding object can store a name which is not
// added to the environment record, since it's
// not a valid identifier:
 
this['not valid ID'] = 30;
 
console.log(
  this['not valid ID'], // 30
);`;
