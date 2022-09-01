import React from 'react';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import { getExp } from '../../services/db';

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
      </p>
      <ul className="root" style={{ maxWidth: '100%' }}>
        {data.slice(3, data.length - 1).map(post => (
          <Drawer header={post.name} closed key={post.id}>
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          </Drawer>
        ))}
        {data[0] ? (
          <li>
            <Slider carouselTitle={data[0].name} carouselDesc={data[1].name}>
              <div key={data[0].name} dangerouslySetInnerHTML={{ __html: data[0].description }} />
              <div key={data[1].name} dangerouslySetInnerHTML={{ __html: data[1].description }} />
              <div key={data[2].name} dangerouslySetInnerHTML={{ __html: data[2].description }} />
            </Slider>
          </li>
        ) : null}
      </ul>
    </Layout>
  );
}
