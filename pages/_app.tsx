import React from 'react';
import '../styles/global.scss';
import 'ckeditor5/ckeditor5.css';

interface Props {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: Props) => <Component {...pageProps} />;
export default App;
