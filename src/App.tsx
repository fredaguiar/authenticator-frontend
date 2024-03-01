import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import React from 'react';
import RootNavigator from './nav/RootNavigator';

const httpLink = new HttpLink({
  uri: 'http://209.52.107.249:4000/graphql', // localhost won't work
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('authenticator-frontend', () => App);

/* 
To move App.tsx from ./ to ./src/
  - package.json: "main": "src/App.tsx",
  - Override node_modules\expo\AppEntry.js 
*/
registerRootComponent(App);
