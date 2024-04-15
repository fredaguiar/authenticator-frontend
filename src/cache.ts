import { InMemoryCache, gql, makeVar } from '@apollo/client';
import { TUser } from './context/AuthContext';

export const isLoggedInVar = makeVar<boolean>(false);
export const userProfileVar = makeVar<TUser | null>(null);
export const safeIdVar = makeVar<string | null>(null);

export const LOCAL_IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const LOCAL_GET_USER_PROFILE = gql`
  query GetUserProfile {
    userProfile @client
  }
`;

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        userProfile: {
          read() {
            return userProfileVar();
          },
        },
        safeId: {
          read() {
            return safeIdVar();
          },
        },
      },
    },
  },
});
