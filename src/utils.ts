export default async function redditRequest(subreddit = 'pics', page = '') {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}.json?after=${page}`
  ).catch((err)=>console.log(err));

  if (!response){
    return {data:null}
  }
  return await response.json();
}
