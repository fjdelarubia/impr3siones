import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { auth, storage } from '@impr3siones/data-connector';
import { useEffect, useRef, useState } from 'react';
import { UserData } from '@impr3siones/data-connector';

const handleLogin = () => {
  auth.loginWithGoogle();
};

const handleLogout = () => {
  auth.logout();
};

const Home: NextPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  useEffect(() => {
    auth.onAuthDataReceived((userData) => {
      setUserData(userData || null);
    });
  }, []);

  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      storage.uploadFile(
        'test',
        file,
        file.name,
        { test: true },
        (status, progress, downloadUrl) => {
          console.log(status, progress, downloadUrl);

          if (status === 'success') {
            setDownloadUrl(downloadUrl || '');
          }
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Impr3siones</title>
        <meta
          name="description"
          content="Te imprimo en 3d todo lo que necesites"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a impr3siones</h1>

        {!userData && (
          <button onClick={handleLogin}>Iniciar sesión con Google</button>
        )}
        {userData && (
          <>
            <h3>Hola {userData.displayName}</h3>

            {!downloadUrl && (
              <button onClick={handleUploadFile}>Subir archivo</button>
            )}
            {!!downloadUrl && (
              <a href={downloadUrl} download>
                Descargar
              </a>
            )}
            <br />
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
      </main>

      <footer className={styles.footer}>Let&apos;s do this!</footer>
      <input
        ref={inputRef}
        type="file"
        id="file-input"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Home;
