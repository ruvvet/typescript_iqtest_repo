import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
  StarIcon,
  ViewIcon,
  ViewOffIcon,
  LinkIcon,
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
  Box,
  Text,
  Link,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getJSDocDeprecatedTag } from 'typescript';
import {
  PostType,
  RouteParams,
  SelectedType,
  TrimPostType,
} from '../../interfaces';
import redditRequest from '../../utils';
import Post from '../Post';
import './postdetails.css';

interface Props {
  post: TrimPostType;
  showDetails: boolean;
}

export default function PostDetails({ post, showDetails }: Props) {
  const convertDate = (date: string) => {
    return new Intl.DateTimeFormat('en', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(parseInt(date) * 1000);
  };

  return (
    <Box
      position="absolute"
      h="100%"
      w="100%"
      objectFit="contain"
      overflow="hidden"
    >
      {showDetails && (
        <Flex direction="column" bgColor="#00000070" p={3}>
          <Flex justifyContent="space-around">
            <Tooltip label="Author">
              <Text fontSize="md" color="#FFFFFF">
                ✒{post.author}
              </Text>
            </Tooltip>
            <Tooltip label="Score">
              <Text fontSize="md" color="#FFFFFF">
                🧡{post.score}
              </Text>
            </Tooltip>
            <Tooltip label="Date Created">
              <Text fontSize="md" color="#FFFFFF">
                📅{convertDate(post.created)}
              </Text>
            </Tooltip>
          </Flex>
          <Flex align="center" h="100px" overflowY="auto">
            <Box>
              <Tooltip label="Open Post">
                <Link href={`https://redd.it/${post.id}`} isExternal>
                  <IconButton icon={<LinkIcon />} aria-label="Reddit" />
                </Link>
              </Tooltip>
            </Box>
            <Box overflowY="auto">
              <Heading fontSize="xl" color="#FFFFFF" p="2">
                {post.title}
              </Heading>
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
