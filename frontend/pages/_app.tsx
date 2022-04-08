import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DialogsProvider } from '../contexts/dialogs';
import { AuthProvider } from '../contexts/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DialogsProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </DialogsProvider>
  );
}

export default MyApp;
