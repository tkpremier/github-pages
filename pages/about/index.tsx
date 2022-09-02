import React from 'react';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import { getExp } from '../../services/db';
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
          <a>Experience</a>
        </Link>
        <Link href="/about/soft-skills">
          <a>Soft Skills</a>
        </Link>
      </nav>
      <style jsx>{`
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
