import '../styles/tailwind.css';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import ErrorBoundary from 'components/ErrorBoundary';
import ScrollToTop from 'components/ScrollToTop';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
