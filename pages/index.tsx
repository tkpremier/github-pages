import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Slider from '../components/Slider';
import styles from '../components/layout.module.scss';

// interface UserMessage {
//   name: string;
//   message: string;
// }

export default function Home() {
  return (
    <Layout home title="Welcome to TK Premier">
      <div className={styles.iframeWrapper}>
        <iframe
          className={styles.iframe}
          // width="560"
          // height="315"
          src="https://www.youtube-nocookie.com/embed/ibPkLdbG4VU?start=3319"
          title="This too shall pass"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <blockquote>
        &ldquo;...I wish I had known that this too shall pass...You feel bad right now? You feel pissed off? You feel
        angry?...this too shall pass. You feel GREAT? You feel like you know all the answers? You feel like everyone
        finally gets you?...&rdquo;
      </blockquote>
      <p>
        Oh, hello. Welcome to my website. I haven&apos;t figured out my content and aesthetics yet, but please bare with
        me. If you are here from my{' '}
        <a href="/resume.pdf" target="_blank">
          resume
        </a>
        , I invite you to definitely check out the <Link href="/about">About</Link> section.
      </p>
      <h3></h3>
      <Slider sizes={{ md: 2, lg: 2 }}>
        <div key={0} className={styles.card}>
          Digital Ocean Droplets
        </div>
        <div key={1} className={styles.card}>
          Docker
        </div>
        <div key={2} className={styles.card}>
          PostgresSQL
        </div>
        <div key={3} className={styles.card}>
          Nginx
        </div>
        <div className={styles.card} key={4}>
          Typescript
        </div>
        <div className={styles.card} key={5}>
          NodeJS (API)
        </div>
        <div className={styles.card} key={6}>
          NextJS (Client)
        </div>
        <div className={styles.card} key={7}>
          SCSS
        </div>
        <div className={styles.card} key={8}>
          &#x1F90C;
        </div>
      </Slider>
      <ul style={{ listStyle: 'none' }}></ul>
    </Layout>
  );
}
