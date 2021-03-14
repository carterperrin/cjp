import Head from 'next/head';
import React from 'react';

import MovingGradient from '../components/moving-gradient';
import styles from '../styles/Home.module.css';
require('typeface-montserrat');

export default function Home() {
  return (
    <div>
      <MovingGradient />
      <Head>
        <title>Carter Perrin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.header}>
        <a href="" target="_blank" className={styles.link}>
          resume
        </a>
        <a
          href="mailto:carterperrin@me.com?subject=Hey there!"
          className={styles.link}
        >
          contact
        </a>
      </nav>
    </div>
  );
}
