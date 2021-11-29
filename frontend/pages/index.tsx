import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Connector } from '@impr3siones/data-connector';
import { useEffect, useState } from 'react';
import { UserData } from '@impr3siones/data-connector';

const handleLogin = () => {
  Connector.loginWithGoogle();
};

const handleLogout = () => {
  Connector.logout();
};

const Home: NextPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    Connector.onAuthDataReceived((userData) => {
      setUserData(userData || null);
    });
  }, []);

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
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
      </main>

      <footer className={styles.footer}>Let&apos;s do this!</footer>
    </div>
  );
};

export default Home;
