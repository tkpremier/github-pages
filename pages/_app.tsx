import 'react';
import '../styles/global.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'ckeditor5/ckeditor5.css';

interface Props {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: Props) => <Component {...pageProps} />;
export default App;
