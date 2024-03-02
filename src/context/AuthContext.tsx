import { createContext, useContext, useEffect, useState } from 'react';
import useSecureStore from '../hooks/useSecureStore';
import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';

const JWT_TOKEN = 'JID';

const GQL_LOGIN = gql`
  mutation Login($userInput: UserLogin!) {
    login(userInput: $userInput) {
      name
      email
      token
    }
  }
`;

const GQL_SIGNUP = gql`
  mutation SigupUser($userInput: UserInput!) {
    sigupUser(userInput: $userInput) {
      name
      email
      token
    }
  }
`;

type TUser = {
  name: string | null;
  email: string | null;
  token: string | null;
} | null;

type AuthProps = {
  user?: TUser;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  loadingLogin: boolean;
  errorLogin: ApolloError | undefined;
  loadingSignup: boolean;
  errorSignUp: ApolloError | undefined;
};

const AuthContext = createContext<AuthProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<TUser>(null);
  const secureStore = useSecureStore();

  const [loginMutation, { loading: loadingLogin, error: errorLogin }] = useMutation(GQL_LOGIN, {
    onCompleted: (data) => {
      console.log('login COMPLETE. token:', data.login.token);
      secureStore.setItem(JWT_TOKEN, data.login.token);
      setUser(data.login);
      // TODO: set authorization header
    },
  });

  const [signupMutation, { loading: loadingSignup, error: errorSignUp }] = useMutation(GQL_SIGNUP, {
    onCompleted: (data) => {
      console.log('signupMutation COMPLETE. token:', data.sigupUser.token);
      secureStore.setItem(JWT_TOKEN, data.sigupUser.token);
      setUser(data.sigupUser);
      // TODO: set authorization header
    },
  });

  // TODO: automatic login
  // useEffect(() => {
  //   const reloadToken = () => {
  //     const storedToken = secureStore.setItem(JWT_TOKEN);
  //   };
  //   reloadToken();
  // }, []);

  const login = (email: string, password: string) => {
    console.log('INNNNNN login. Email:', email);
    loginMutation({
      variables: {
        userInput: { email, password },
      },
    });
  };

  const signup = (name: string, email: string, password: string) => {
    console.log('INNNNNN signupMutation. Email:', email);

    signupMutation({
      variables: {
        userInput: { name, email, password },
      },
    });
  };

  const logout = () => {
    secureStore.deleteItem(JWT_TOKEN);
    setUser(null);
    // TODO: set authorization header
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, loadingLogin, errorLogin, loadingSignup, errorSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext, TUser };
