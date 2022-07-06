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
  // useEffect(() => {
  //   getSortedPostsData().then(res => setPosts(res));
  // }, []);
  const handleClick = e => {
    console.log('click');
  };
  return (
    <Layout about>
      <h1 className="title">My &#x1F4B0;</h1>

      <p className="description">
        <a href="/resume.pdf" title="Download Resume" target="_blank">
          Resume.
        </a>
      </p>
      <ul className="faq" style={{ maxWidth: '100%' }}>
        <Drawer header={posts[2].name} closed>
          <ul>
            {posts[2].description.split(';').map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Drawer>

        <li>
          <Slider carouselTitle={posts[1].name} carouselDesc="April 2014 - May 2014">
            {posts[1].description.split(';').map(desc => (
              <p>{desc}</p>
            ))}
          </Slider>
        </li>
        <li>
          <Slider carouselTitle={posts[0].name} carouselDesc="June 2014 - June 2022">
            {posts[0].description.split(';').map(desc => (
              <p>{desc}</p>
            ))}
          </Slider>
        </li>
      </ul>
    </Layout>
  );
}
