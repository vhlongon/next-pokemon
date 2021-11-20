import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useRouter } from 'next/router';
import Overlay from '../components/Overlay';
import LoadingBall from '../components/LoadingBall';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Overlay>
        <LoadingBall />
      </Overlay>
    );
  }

  return (
    <>
      <NextNProgress
        color="#6366f1"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
