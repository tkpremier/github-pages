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
        {data.slice(1, data.length - 1).map(post => (
          <Drawer header={post.name} closed key={post.id}>
            <ul>
              {data[2].description.split('\n').map(d => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Drawer>
        ))}
        {data[0] ? (
          <li>
            <Slider carouselTitle={data[0].name} carouselDesc="June 2014 - June 2022">
              <div key={data[0].name}>
                {data[0].description.split('\n').map(desc => (
                  <p key={desc}>{desc}</p>
                ))}
              </div>
            </Slider>
          </li>
        ) : null}
      </ul>
    </Layout>
  );
}
