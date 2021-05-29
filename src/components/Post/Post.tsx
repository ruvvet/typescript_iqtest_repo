import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SelectedType, TrimPostType } from '../../interfaces';
import './post.css';
import PostDetails from '../PostDetails';

interface Props {
  handleSelect: any;
  post: TrimPostType;
  selected: SelectedType;
  h?: string;
  w?: string;
  thumbnail?: boolean;
}

export default function Post({
  handleSelect,
  post,
  selected,
  h = '200px',
  w = 'auto',
  thumbnail = false,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Box
        className="post"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        h={h}
        w={w}
        m="6"
        objectFit="cover"
        onClick={() => handleSelect(post)}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        style={{
          border: `${
            selected[post.id] ? '5px solid white' : '5px solid black'
          }`,
        }}
        position="relative"
      >
        {thumbnail || <PostDetails post={post} showDetails={showDetails} />}
        <Image
          src={post.thumbnail}
          alt={post.title}
          w="100%"
          h="100%"
          objectFit="cover"
          fallbackSrc="./reddit.png"
        />
      </Box>
    </>
  );
}
