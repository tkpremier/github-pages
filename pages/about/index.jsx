import { useEffect, useState } from 'react';
import showdown from 'showdown';
import Link from 'next/link';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import { getExp } from '../../services/db';
import layoutStyles from '../../styles/layout.module.scss';
import utilStyles from '../../styles/utils.module.css';

const converter = new showdown.Converter();

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
      <ul className="faq">
        <li>A good friend recommended me to start coding HTML and CSS.</li>
        <li>
          Started following tutorials, had one website, and then yada, yada, yada...eventually landed a role as a{' '}
          <strong>Salaried Specialist</strong> for Robert Half, International.{' '}
        </li>
        <li>
          <ul>
            {posts.map(exp => {
              return (
                <Drawer header={exp.name}>
                  <ul>
                    {exp.description.split(';').map(d => {
                      return <li>{d}</li>;
                    })}
                  </ul>
                </Drawer>
              );
            })}
          </ul>
        </li>
        <li>
          <Slider
            carouselTitle="The Economist"
            carouselDesc="April 2014 - May 2014"
            data={[
              'Developed the EIU Public Policy responsive website, creating intuitive UI and UX functionalities',
              'Collaborated in agile team atmosphere, using SVN for source control, participating in daily scrums, and delivering product via sprint goals in iterative process',
              'Debug project for cross-browser and multi-device compliance'
            ]}
          />
        </li>
        <li>
          <Slider
            carouselTitle="Phillips"
            carouselDesc="June 2014 - June 2022"
            data={[
              'Design, develop, test, and maintain front-end architecture for company site, www.phillips.com',
              'Utilize Modular-Oriented Pattern built on React, Redux, and SCSS to create scalable web  applications composed by modular class and functional components',
              'Create services, classes, and utility functions while leveraging DRY principles to handle various user actions, CRUD operations, and 3rd-party hooks',
              'Configure and transpile build with Babel and Webpack to utilize most recent ES features, while  maintaining browser compliance',
              'Highly experienced with .NET stack, develop and maintain Razor views while using  ReactJS.NET for server side rendering, and controllers using C# for .NET Stack',
              'Initiated and developed responsive design implementation for www.phillips.com , thereby improving the company’s mobile web presence',
              'Lead code reviews with junior developers and QA to maintain code readability and adhere to team standards',
              'Implemented 3rd-party SEO recommendations on HTML architecture and JS data flow',
              'Collaborated with team to create more intuitive mobile UX, and developed improved UI',
              'Created basic build functions on top of NodeJS to improve development workflow',
              'Highly skilled in JIRA, GitFlow, Office 365, and Adobe Suite for open collaboration '
            ]}
          />
        </li>
      </ul>
      <div className={layoutStyles.grid}>
        <a className={layoutStyles.card} href="http://localhost:6006" target="_blank">
          <h3>Check out some more standard components.</h3>
        </a>

        <a href="https://nextjs.org/learn" className={layoutStyles.card}>
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a href="https://github.com/vercel/next.js/tree/master/examples" className={layoutStyles.card}>
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={layoutStyles.card}
        >
          <h3>Deploy &rarr;</h3>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </div>

      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, body, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              <span dangerouslySetInnerHTML={{ __html: converter.makeHtml(body) }} />
            </li>
          ))}
        </ul>
      </section>
      <style jsx>{`
        .faq {
          max-width: 100%;
        }
      `}</style>
    </Layout>
  );
}
