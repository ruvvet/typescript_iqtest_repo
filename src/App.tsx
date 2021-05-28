import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Main from './components/Main';
import './App.css';
import {
  Box,
  Grid,
  GridItem,
  Spinner,
  IconButton,
  Flex,
  Center,
} from '@chakra-ui/react';

// TODO: pass in params as route
export default function App() {
  return (
    <Flex className="app" bgColor="#292929" h="100vh" w="100vw" justify="center" alignItems="center">
      <Switch>
        <Route path="/:subreddit">
          <Main />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Flex>
  );
}
