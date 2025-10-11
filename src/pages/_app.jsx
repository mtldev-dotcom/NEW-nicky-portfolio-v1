import 'styles/tailwind.css';
import 'styles/index.css';
import ErrorBoundary from 'components/ErrorBoundary';
import ScrollToTop from 'components/ScrollToTop';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
