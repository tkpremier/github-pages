import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

// interface UserMessage {
//   name: string;
//   message: string;
// }

export default function Home() {
  return (
    <Layout home title="Welcome to TK Premier">
      <h1 className="title">Thomas Kim</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/ibPkLdbG4VU?start=3319"
        title="This too shall pass"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <blockquote>
        &ldquo;...I wish I had known that this too shall pass...You feel bad right now? You feel pissed off? You feel
        angry?...this too shall pass. You feel GREAT? You feel like you know all the answers? You feel like everyone
        finally gets you?...&rdquo;
      </blockquote>
      <p>
        Oh, hello. Welcome to my website. I haven&apos;nt figured out my content and aesthetics yet, but please bare
        with me. If you are here from my{' '}
        <a href="/resume.pdf" target="_blank">
          resume
        </a>
        , I invite you to definitely check out the <Link href="/about">About</Link> section.
      </p>
      <h3>
        And finally, I would like to give special thanks to the wonderful technology that I built this tech on.
        &#x1F4AA; &#x1F60F;
      </h3>
      <ul style={{ listStyle: 'none' }}>
        <li>Digital Ocean Droplets</li>
        <li>Docker</li>
        <li>PostgresSQL</li>
        <li>Nginx</li>
        <li>Typescript</li>
        <li>NodeJS (API)</li>
        <li>NextJS (Client)</li>
        <li>SCSS</li>
        <li>&#x1F90C;</li>
      </ul>
    </Layout>
  );
}
