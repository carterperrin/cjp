import Head from 'next/head';
import React from 'react';

import MovingGradient from '../components/moving-gradient';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Carter Perrin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>CARTER PERRIN</h1>
      </main>
      <MovingGradient />
    </div>
  );
}
