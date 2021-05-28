import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';

// TODO: pass in params as route
export default function App() {
  return (
    <Flex
      className="app"
      bgColor="#292929"
      h="100vh"
      w="100vw"
      justify="center"
      alignItems="center"
    >
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
