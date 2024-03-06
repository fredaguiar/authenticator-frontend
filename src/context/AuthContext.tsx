import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
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
  type: 'auth' | 'google';
} | null;

type AuthProps = {
  user?: TUser;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  loginGoogle: () => void;
  loadingLogin: boolean;
  errorLogin: ApolloError | undefined;
  loadingSignup: boolean;
  errorSignUp: ApolloError | undefined;
  loadingGoogle: boolean;
  errorGoogle: any;
};

const AuthContext = createContext<AuthProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<TUser>(null);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const [errorGoogle, setErrorGoogle] = useState<any>(null);
  const secureStore = useSecureStore();
  GoogleSignin.configure({
    // the webClientId is used to specify the client ID for OAuth 2.0 flows on both Android and iOS platforms (chatGPT)
    webClientId: '479374542478-itb68h17o5tlcf19s8bnt52qd3fqg09b.apps.googleusercontent.com',
  });

  const [loginMutation, { loading: loadingLogin, error: errorLogin }] = useMutation(GQL_LOGIN, {
    onCompleted: (data) => {
      console.log('login COMPLETE. token:', data.login.token);
      secureStore.setItem(JWT_TOKEN, data.login.token);
      setUser({ ...data.login, type: 'auth' });
      // TODO: set authorization header
    },
  });

  const [signupMutation, { loading: loadingSignup, error: errorSignUp }] = useMutation(GQL_SIGNUP, {
    onCompleted: (data) => {
      console.log('signupMutation COMPLETE. token:', data.sigupUser.token);
      secureStore.setItem(JWT_TOKEN, data.sigupUser.token);
      setUser({ ...data.sigupUser, type: 'auth' });
      // TODO: set authorization header
    },
  });

  const loginGoogle = async () => {
    try {
      setErrorGoogle(null);
      setLoadingGoogle(true);
      await GoogleSignin.hasPlayServices();
      console.log('11111111 loginGoogle Before GoogleSignin.signIn');
      const gUser = await GoogleSignin.signIn();
      console.log('GOOGLE YES!!!', gUser?.user?.name);
      const { name, email } = gUser?.user;
      setUser({ name, email, token: gUser?.idToken, type: 'google' });
      setLoadingGoogle(false);
    } catch (exGoogle: any) {
      console.log('ERRRR GOOGLE', JSON.stringify(exGoogle));
      setLoadingGoogle(false);
      setErrorGoogle(exGoogle.message);
    }
  };

  // TODO: automatic login
  // useEffect(() => {
  //   const reloadToken = () => {
  //     const storedToken = secureStore.setItem(JWT_TOKEN);
  //   };
  //   reloadToken();
  // }, []);

  const login = (email: string, password: string) => {
    loginMutation({
      variables: {
        userInput: { email, password },
      },
    });
  };

  const signup = (name: string, email: string, password: string) => {
    signupMutation({
      variables: {
        userInput: { name, email, password },
      },
    });
  };

  const logout = async () => {
    console.log('LOGOUT');
    if (user?.type === 'google') {
      console.log('LOGOUT google');
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      console.log('Logout DONE');
    }
    await secureStore.deleteItem(JWT_TOKEN);
    setUser(null);
    // TODO: set authorization header
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        loginGoogle,
        loadingLogin,
        errorLogin,
        loadingSignup,
        errorSignUp,
        loadingGoogle,
        errorGoogle,
      }}>
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
