let foo = 1;
const bar = () => {
  console.log('foo: ', foo);
	if (!foo) {
		var foo = 10;
	}
	console.log('new foo', foo);
}
export default bar;