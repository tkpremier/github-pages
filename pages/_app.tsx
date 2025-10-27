import 'ckeditor5/ckeditor5.css';
import 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/global.scss';

interface Props {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: Props) => <Component {...pageProps} />;
export default App;
