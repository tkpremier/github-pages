import { useEffect, useState } from 'react';
// import showdown from "showdown";
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import { getExp } from '../../services/db';

// const converter = new showdown.Converter();

export async function getServerSideProps(context) {
  const props = await getExp();
  return {
    props
  };
}

export default function About({ data }) {
  const [posts, setPosts] = useState(data);
  return (
    <Layout about>
      <h1 className="title">My &#x1F4B0;</h1>
      <p className="description">
        <a href="/resume.pdf" title="Download Resume" target="_blank">
          Resume.
        </a>
      </p>
      <ul className="root" style={{ maxWidth: '100%' }}>
        {posts.slice(1, posts.length - 1).map(post => (
          <Drawer header={post.name} closed key={post.id}>
            <ul>
              {posts[2].description.split('\n').map(d => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Drawer>
        ))}
        <li>
          <Slider carouselTitle={posts[0].name} carouselDesc="June 2014 - June 2022">
            <div key={posts[0].name}>
              {posts[0].description.split('\n').map(desc => (
                <p key={desc}>{desc}</p>
              ))}
            </div>
          </Slider>
        </li>
      </ul>
    </Layout>
  );
}
