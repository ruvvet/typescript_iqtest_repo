export default async function redditRequest(subreddit = 'pics', page = '') {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}.json?after=${page}`
  );
  return await response.json();
}
