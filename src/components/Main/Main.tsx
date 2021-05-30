import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
  StarIcon,
  RepeatClockIcon
} from '@chakra-ui/icons';
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  PostType,
  RouteParams,
  SelectedType,
  TrimPostType,
} from '../../interfaces';
import redditRequest from '../../utils';
import Post from '../Post';
import './main.css';

export default function Main() {
  let { subreddit } = useParams<RouteParams>();
  const history = useHistory();
  const [allPosts, setAllPosts] = useState<TrimPostType[]>([]);
  const [posts, setPosts] = useState<TrimPostType[]>([]);
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState<string[]>([]);
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SelectedType>({});

  useEffect(() => {
    // on mount, get the Posts from the subreddit
    const getPosts = async () => {
      const { data: response } = await redditRequest(subreddit, page);

      // if no response/error, push back to main
      if (!response) {
        history.push('/');
      } else {
        // prep the next page for pagination
        setNext(response.after);

        // identify keys in the data that we want to filter by
        const postKeys = [
          'id',
          'author',
          'name',
          'title',
          'score',
          'created',
          'thumbnail',
        ];

        // reduce to clean/trim the data
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

        setPosts(posts);
        setAllPosts(posts);
        setLoading(false);
      }
    };
    // call the function
    getPosts();
  }, [subreddit, page, history]);

  // renders the main grid of posts
  const renderThis = () => {
    return posts.map((p: TrimPostType) => (
      <GridItem key={`post-${p.id}`}>
        <Post handleSelect={handleSelect} post={p} selected={selected} />
      </GridItem>
    ));
  };

  // renders the list of selected posts
  const renderThat = () => {
    return Object.keys(selected).map((s: string) => (
      <ListItem display="inline-block" key={`selected-${s}`}>
        <Post
          handleSelect={handleSelect}
          post={selected[s]}
          selected={selected}
          h="70px"
          w="70px"
          thumbnail={true}
        />
      </ListItem>
    ));
  };

  // on 'enter', the search input field will push the value as params to the url
  // which will trigger a re-render using the new params
  // default params are set to the 'pics' subreddit
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    if (e.key === 'Enter') {
      history.push(`/${target.value}`);
    }
  };

  const handleRemove = () => {
    const unselected = posts.reduce(
      (result: TrimPostType[], post: TrimPostType) => {
        if (!Object.keys(selected).includes(post.id)) {
          result.push(post);
        }

        return result;
      },
      []
    );

    setPosts(unselected);
    setSelected({});
  };

  const handleReset = () =>{
    setPosts(allPosts);
  }

  // Handles the selection of a post
  // The selected object is a hashmap of all selected posts
  // that are identified by their post-id as the key
  // handleSelect checks the selected object for the key to see if its already selected
  const handleSelect = (post: TrimPostType) => {
    if (selected[post.id]) {
      // if the clicked post is in the selected obj, delete it
      const newSelected = { ...selected };
      delete newSelected[post.id];
      setSelected(newSelected);
    } else {
      // otherwise, add the post obj
      setSelected({ ...selected, [post.id]: post });
    }
  };

  // Pagination
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

  return (
    <Flex
      className="main scrollbar"
      direction="row"
      justify="center"
      alignItems="flex-start"
      width="100%"
      height="100%"
    >
      <Flex
        className="main"
        width="85%"
        height="100%"
        direction="column"
        justify="center"
        align="center"
        bgColor="black"
      >
        <Flex justify="space-around" w="80%">
          <Tooltip label="Home">
            <Link to="/">
              <IconButton icon={<StarIcon />} aria-label="Home" />
            </Link>
          </Tooltip>
          <Input
            color="white"
            placeholder="Subreddit Name Goes Here"
            variant="filled"
            isFullWidth
            onKeyDown={(e) => {
              handleSearch(e);
            }}
          />
          <Tooltip label="Previous">
            <IconButton
              onClick={handlePrev}
              icon={<ArrowLeftIcon />}
              aria-label="Previous"
              // isDisabled={prev? true: false}
            />
          </Tooltip>
          <Tooltip label="Next">
            <IconButton
              onClick={handleNext}
              icon={<ArrowRightIcon />}
              aria-label="Next"
            />
          </Tooltip>
        </Flex>

        <Grid h="90%" w="100%" templateColumns="repeat(3, 1fr)" overflow="auto">
          {loading ? <Spinner /> : renderThis()}
        </Grid>
      </Flex>

      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        width="30%"
        h="100%"
      >
        <Flex m={6}>
          <Heading as="h2" color="white" px={6}>
            Selected
          </Heading>
          <Tooltip label="Clear">
            <IconButton
              onClick={handleRemove}
              icon={<DeleteIcon />}
              aria-label="Delete"
            />
          </Tooltip>
          <Tooltip label="Undo">
            <IconButton
              onClick={handleReset}
              icon={<RepeatClockIcon />}
              aria-label="Reset"
            />
          </Tooltip>
        </Flex>
        <Flex align="start" justify="center" overflow="auto">
          <List>{renderThat()}</List>
        </Flex>
      </Flex>
    </Flex>
  );
}
