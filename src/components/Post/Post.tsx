import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SelectedType, TrimPostType } from '../../interfaces';
import './post.css';

interface Props {
  handleSelect: any;
  post: TrimPostType;
  selected: SelectedType;
  h?: string;
  w?: string;
}

export default function Post({
  handleSelect,
  post,
  selected,
  h = '200px',
  w = 'auto',
}: Props) {
  const [showTitle, setShowTitle] = useState(false);

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
        style={{
          border: `${
            selected[post.id] ? '5px solid white' : '5px solid black'
          }`,
        }}
        position="relative"
      >
        <Box
          position="absolute"
          h="100%"
          w="100%"
          objectFit="contain"
          onMouseEnter={() => setShowTitle(true)}
          onMouseLeave={() => setShowTitle(false)}
        >
          {showTitle && (
            <Text
              fontSize="xl"
              color="#FFFFFF"
              bgColor="#00000050"
              h="100%"
              w="100%"
              p="2"
              overflow="auto"
              justify="center"
              align="center"
            >
              {post.title}
            </Text>
          )}
        </Box>
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
