import type { NextPage } from 'next';
import Navbar from '../components/common/navbar';
import styles from '../styles/home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a impr3siones</h1>
      </main>
      <footer className={styles.footer}>Let&apos;s do this!</footer>
    </div>
  );
};

export default Home;
