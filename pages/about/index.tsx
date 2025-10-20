import React from 'react';
import {Layout} from '../../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="About Thomas Kim">
      <h1 className="title">My &#x1F4B0;</h1>
      <nav className="about-nav">
        <a href="/resume.pdf" title="Download Resume" target="_blank">
          Resume
        </a>
        <Link href="/about/experience">
          Experience
        </Link>
        <Link href="/about/soft-skills">
          Soft Skills
        </Link>
      </nav>
      <style>{`
        .about-nav {
          width: 100%;
          max-width: 260px;
          display: flex;
          flex-flow: row no wrap;
          justify-content: space-between;
        }
      `}</style>
    </Layout>
  );
}
