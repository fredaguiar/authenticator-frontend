import { AppRegistry } from 'react-native';
import { ApolloClient, ApolloProvider, HttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './styles/theme';
import * as SecureStore from 'expo-secure-store';
import RootNavigator from './nav/RootNavigator';
import { AuthProvider, JWT_TOKEN } from './context/AuthContext';
import { cache } from './cache';

export const typeDefs = gql`
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

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <RootNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('main', () => App);

/* 
To move App.tsx from ./ to ./src/
  - package.json: "main": "src/App.tsx",
  - Override node_modules\expo\AppEntry.js 
*/
registerRootComponent(App);
