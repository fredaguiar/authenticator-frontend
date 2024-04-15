import { ApolloClient, HttpLink, gql } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { setContext } from '@apollo/client/link/context';
import { JWT_TOKEN } from './context/AuthContext';
import { cache } from './cache';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_APOLLO_SERVER_URI, // localhost won't work
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync(JWT_TOKEN);
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  typeDefs,
});
