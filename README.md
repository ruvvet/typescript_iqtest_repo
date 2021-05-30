# React Typescript App

Fetches a json payload of a subreddit's posts and systematically renders each post's image + title. Posts can be selected and displayed/hidden in a side panel.

# ⚙ Tech
```
- React App
- Typescript
- Chakra UI
- Reddit API
```

# 🚀 Launch Instructions
```
# Clone repo twin
$ git clone https://github.com/ruvvet/typescript_iqtest_repo.git

# Open project
$ cd typescript_iqtest_repo

# Install dependencies
$ npm install

# Run 🏃‍♂️
$ npm start

```

# Demo
https://www.ruvvet.com/typescript_iqtest_repo

![Main](https://github.com/ruvvet/typescript_iqtest_repo/blob/master/public/main.gif)
# Features/User Stories

* Users can see a gridded list of post images + titles for a subreddit
* Users can navigate to a different subreddit to view posts via routing
* Users can select images and track selected images
* Users can navigate back + forth through multiple pages of posts

# Code
#### Reducing the Reddit Data + Trimming the Fat 🔪
```ts
// Main.tsx
// clean data w/ a reduce to iterate through the array of posts and return only what is needed
const posts = response.children.reduce(
    (result: TrimPostType[], c: PostType) => {
    const postObj: { [key: string]: string } = {};
    // remove any nsfw content
    if (c.data.over_18 !== 'image') {
    // parse out unused data by singling out only key-value pairs that match the postKeys array
        for (const key of postKeys) {
        postObj[key] = c.data[key];
        }
        result.push(postObj);
    }
    return result;
    },
    []
);
```
#### Selection Logic ✔
```ts
// Main.tsx
// The selected object is a hashmap of all selected posts
// each selected post is identified by their post-id as the key
// the handleSelect function takes the post-id of the selected post
// and checks to see if its in the object
// if no, add it to the selected obj => "selecting"
// if yes, remove it => "unselecting"
const handleSelect = (post: TrimPostType) => {
    //...
};

// Post.tsx
// Selected post visual cues are set with a style option on the post
//style={{ border: `${selected[post.id] ? '5px solid white' : '5px solid black'}`}}
```

#### Reusable Post Component To Render the List/Grid of Posts 🌎
```ts
// Main.tsx
// The Post component has multiple parameters + defaults set so that it is reusable, recyclable, and clean
// renders the main grid of posts
  const renderThis = () => {
        //...
        <Post handleSelect={handleSelect} post={p} selected={selected} />
        //...
  };

 // renders the list of selected posts
  const renderThat = () => {
        //...
        <Post
          handleSelect={handleSelect}
          post={selected[s]}
          selected={selected}
          h="70px"
          w="70px"
        />
         //...
  };
```

#### Routing/Search 🔎
```ts
// entering a subreddit name into the url params or typing it into the input search bar
// will fetch new data from the subreddit entered in the params
// and trigger a re-render with the new data
// default is set to 'r/pics'

// App.tsx
   <Route path="/:subreddit">

// Main.tsx
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
 //...
      history.push(`/${target.value}`);
  };
```
#### Pagination 📄
```ts
// Main.tsx
// The next page is set using data passed back from the json data
// (the id of the last element in the current results is passed into the api and it fetches the next 25)
// The current id is saved as the current "page"
// handleNext pushes the current page value to an array
// handlePrev goes the the last element of the array, (the previous page)
// of the one before it if for some reason its already in the array (like going back/forth)

const handleNext = () => {
setPrev([...prev, page]);
setPage(next);
};

const handlePrev = () => {
if (prev.includes(page)) {
    setPage(prev[prev.indexOf(page) - 1]);
} else {
    setPage(prev[prev.length - 1]);
}
};

```
# Future Improvements
 - Better UI design...
 - Design for mobile-first
 - Design for accessibility
 - Unit Testing


