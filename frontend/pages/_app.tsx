import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DialogsProvider } from '../contexts/dialogs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DialogsProvider>
      <Component {...pageProps} />
    </DialogsProvider>
  );
}

export default MyApp;
