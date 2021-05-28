import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
  StarIcon,
  ViewIcon,
  ViewOffIcon,
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

  const [posts, setPosts] = useState<TrimPostType[]>([]);
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState<SelectedType>({});

  useEffect(() => {

    // get the Posts
    const getPosts = async () => {
      const { data: response } = await redditRequest(subreddit, page).catch(
        (err) => {
          console.log(err);
        }
      );

      // set loading/error messages if needed

      if (response) {
        setNext(response.after);

        const postKeys = ['id', 'author', 'title', 'created', 'thumbnail'];
        // reduce the data to be sfw
        const posts = response.children.reduce(
          (result: TrimPostType[], c: PostType) => {
            // parse out unnecessary data
            const postObj: { [key: string]: any } = {};

            if (c.data.over_18 !== 'image') {
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
        setLoading(false);
      }
    };

    // call the function
    getPosts();
  }, [subreddit, page]);

  const renderThis = () => {
    return posts.map((p: TrimPostType) => (
      <GridItem key={`post-${p.id}`}>
        <Post handleSelect={handleSelect} post={p} selected={selected} />
      </GridItem>
    ));
  };

  const renderThat = () => {
    return Object.keys(selected).map((s: string) => (
      <ListItem display="inline-block" key={`selected-${s}`}>
        <Post
          handleSelect={handleSelect}
          post={selected[s]}
          selected={selected}
          h="70px"
          w="70px"
        />
      </ListItem>
    ));
  };

  const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
      history.push(`/${e.target.value}`);
    }
  };

  const handleSelect = (post: TrimPostType) => {
    if (selected[post.id]) {
      const newSelected = { ...selected };
      delete newSelected[post.id];
      setSelected(newSelected);
    } else {
      setSelected({ ...selected, [post.id]: post });
      console.log(selected);
    }
  };

  const handleNext = () => {
    console.log('prev', prev, 'next', next)
    setPrev(page || '');
    setPage(next);
  };

  const handlePrev = () => {
    console.log('prev', prev, 'next', next)
    setPage(prev);
  };

  return (
    <Flex
      className="main"
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
        <Flex justify="space-around">
          <Tooltip label="Home">
            <Link to="/">
              <IconButton icon={<StarIcon />} aria-label="Home" />
            </Link>
          </Tooltip>

          <Input
            color="white"
            placeholder="Enter Subreddit Name"
            variant="filled"
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

      <Flex direction="column" justify="flex-start" align="center" width="30%" h="100%">
        <Flex m={6} >
          <Heading as="h2" color="white" px={6} >
            Selected
          </Heading>
          <Tooltip label={visible ? 'Hide' : 'Unhide'}>
            <IconButton
              onClick={() => {
                setVisible(!visible);
              }}
              icon={visible ? <ViewOffIcon /> : <ViewIcon />}
              aria-label="View"
            />
          </Tooltip>
          <Tooltip label="Clear">
            <IconButton
              onClick={() => {
                setSelected({});
              }}
              icon={<DeleteIcon />}
              aria-label="Delete"
            />
          </Tooltip>
        </Flex>
        {visible && (
          <Flex align="start" justify="center" overflow="auto" >
            <List >{renderThat()}</List>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
