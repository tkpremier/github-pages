import { useEffect, useState } from "react";
// import showdown from "showdown";
import Drawer from "../../components/Drawer";
import Layout from "../../components/layout";
import Slider from "../../components/Slider";
import { getExp } from "../../services/db";

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
    console.log("click");
  };
  return (
    <Layout about>
      <h1 className="title">My &#x1F4B0;</h1>

      <p className="description">
        <a href="/resume.pdf" title="Download Resume" target="_blank">
          Resume.
        </a>
      </p>
      <ul className="faq">
        <li>A good friend recommended me to start coding HTML and CSS.</li>
        <li>
          Started following tutorials, had one website, and then yada, yada, yada...eventually landed a role as a{" "}
          <strong>Salaried Specialist</strong> for Robert Half, International.{" "}
        </li>
        <Drawer header={posts[2].name}>
          <ul>
            {posts[2].description.split(";").map(d => {
              return <li key={d}>{d}</li>;
            })}
          </ul>
        </Drawer>

        <li>
          <Slider
            carouselTitle={posts[1].name}
            carouselDesc="April 2014 - May 2014"
            data={posts[1].description.split(";")}
          />
        </li>
        <li>
          <Slider
            carouselTitle={posts[0].name}
            carouselDesc="June 2014 - June 2022"
            data={posts[0].description.split(";")}
          />
        </li>
      </ul>
      <style jsx>{`
        .faq {
          max-width: 100%;
        }
      `}</style>
    </Layout>
  );
}
