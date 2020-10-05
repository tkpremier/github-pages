import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

const handleResponse = (response) => {
  try {
    if (!response.ok) {
      return response.json().then((error) => {
        console.error('API ERROR: ', error);
        throw new Error(error.message);
      });
    }
    return response.json();
  } catch (e) {
    console.log('error: ', e);
    throw new Error(e);
  }
}


export function getSortedPostsData() {
  // Get file names under / posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  return {
    allPostsData
  };
  // Sort posts by date
  // return fetch('http://localhost:1337/movies', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(handleResponse).then(response => {
  //   console.log('response: ', response);
  //   return response;
  // }).catch(err => console.log('fetch err: ', err));
}
