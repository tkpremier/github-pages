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

interface Props {
  Component: any,
  pageProps: any
}
export default function App(props: { Component: any, pageProps: any}) {
  const { Component, pageProps} = props;
  // tuple
  const testValue:[string, string, number] = ["Manny", "Tommy", 3];
  // enum 
  enum Codes {first, second}
  // any
  const firstName: any = 4;
  // void
  const warning = (): void => {
    console.log('Warning');
  }
  return <Component {...pageProps} />;
}
