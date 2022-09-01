import React from 'react';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import { getExp } from '../../services/db';
import Link from 'next/link';

interface Exp {
  id: number;
  name: string;
  description: string;
}

// const converter = new showdown.Converter();
type AboutProps = {
  data: Array<Exp>;
};
export async function getServerSideProps(): Promise<{ props: any }> {
  const props = await getExp();
  return {
    props
  };
}

export default function About({ data }: AboutProps) {
  return (
    <Layout title="About Thomas Kim">
      <h1 className="title">My &#x1F4B0;</h1>
      <p className="description">
        <a href="/resume.pdf" title="Download Resume" target="_blank">
          Resume.
        </a>
        <br />
        <Link href="/about/soft-skills">
          <a>Soft Skills</a>
        </Link>
      </p>
      <blockquote>
        <figure>Tell me about your journey into tech. How did you get interested in coding, and why was web development (or
        replace with other job-specific skills) a good fit for you?
        </figure> How is that applicable to our role or company
        goals?" It is probably not a good idea to spend valuable time talking about things which aren't relevant to the
        job!
      </blockquote>
    </Layout>
  );
}
