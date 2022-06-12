import { useEffect, useState } from "react";
import showdown from "showdown";
import Link from "next/link";
import Drawer from "../../components/Drawer";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

const converter = new showdown.Converter();

export default function About({ allPostsData }) {
	const [posts, setPosts] = useState([]);
	// useEffect(() => {
	//   getSortedPostsData().then(res => setPosts(res));
	// }, []);
	const handleClick = (e) => {
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
				<li>
					<Drawer header="Bection Dickinson">
						<ul>
							<li>Develop hybrid applications using Javascript, jQuery, HTML, SCSS</li>
							<li>Build iOS apps with PhoneGap and Xcode</li>
							<li>Improve app performance and prevent memory leaks using browser devtools</li>
						</ul>
					</Drawer>
				</li>
			</ul>
			<div className="grid">
				<Link href="/examples">
					<a className="card">
						<h3>Check out some more standard components.</h3>
					</a>
				</Link>

				<a href="https://nextjs.org/learn" className="card">
					<h3>Learn &rarr;</h3>
					<p>Learn about Next.js in an interactive course with quizzes!</p>
				</a>

				<a href="https://github.com/vercel/next.js/tree/master/examples" className="card">
					<h3>Examples &rarr;</h3>
					<p>Discover and deploy boilerplate example Next.js projects.</p>
				</a>

				<a
					href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					className="card"
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
			<footer>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
				</a>
			</footer>

			<style jsx>{`
				.container {
					min-height: 100vh;
					padding: 0 0.5rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid #eaeaea;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				footer img {
					margin-left: 0.5rem;
				}

				footer a {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				a {
					color: inherit;
					text-decoration: none;
				}

				.title a {
					color: #0070f3;
					text-decoration: none;
				}

				.title a:hover,
				.title a:focus,
				.title a:active {
					text-decoration: underline;
				}

				.title {
					margin: 0;
					line-height: 1.15;
					font-size: 4rem;
				}

				.title,
				.description {
					text-align: center;
				}

				.description {
					line-height: 1.5;
					font-size: 1.5rem;
				}

				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.75rem;
					font-size: 1.1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
						Courier New, monospace;
				}

				.grid {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;

					max-width: 800px;
					margin-top: 3rem;
				}

				.card {
					margin: 1rem;
					flex-basis: 45%;
					padding: 1.5rem;
					text-align: left;
					color: inherit;
					text-decoration: none;
					border: 1px solid #eaeaea;
					border-radius: 10px;
					transition: color 0.15s ease, border-color 0.15s ease;
				}

				.card:hover,
				.card:focus,
				.card:active {
					color: #0070f3;
					border-color: #0070f3;
				}

				.card h3 {
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
				}

				.card p {
					margin: 0;
					font-size: 1.25rem;
					line-height: 1.5;
				}

				.logo {
					height: 1em;
				}

				@media (max-width: 600px) {
					.grid {
						width: 100%;
						flex-direction: column;
					}
				}
			`}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
						Droid Sans, Helvetica Neue, sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</Layout>
	);
}