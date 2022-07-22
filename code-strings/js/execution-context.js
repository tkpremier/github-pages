export const recursive = `function recursive(flag) {
 
  // Exit condition.
  if (flag === 2) {
    return;
  }
 
  // Call recursively.
  recursive(++flag);
 }
 
 // Go.
 recursive(0);`;
