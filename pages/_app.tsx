import "../styles/global.scss";
/**
 * https://www.linkedin.com/learning/react-using-typescript/basic-types?autoSkip=true&autoplay=true&resume=false
 * React: Using Typescript Ch2Session2
 * function App({ Component, pageProps }) {
    // let testValue: string = 'default';
    // let testValue: number = 34;
    // let testValue: boolean = true;
    // let testValue: number[] = [3, 6, 9];
    let testValue: Array<string> = ['2', '4', 'Manny'];
    return (
      <div className="app">
        Value: {testValue}<br/>
        Type: {typeof testValue}
      </div>
    )
    // return <Component {...pageProps} />;
  }
 */
const Message = (prop: {message: string}): any => {
  return (
    <p>{prop.message}</p>
  );
}
export default function App({ Component, pageProps }) {
  // tuple
  let testValue:[string, string, number] = ["Manny", "Tommy", 3];
  // enum 
  enum Codes {first, second};
  // any
  let firstName: any = 4;
  // void
  const warning = (): void => {
    console.log('Warning');
  }
      return <Component {...pageProps} />;
  // return (
  //   <div className="app">
  //     <Message message="This is a simple message" name="Tommy" /> 
  //   </div>
  // );
};
