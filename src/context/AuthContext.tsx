import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import useSecureStore from '../hooks/useSecureStore';
import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';

const JWT_TOKEN = 'JID';

const GQL_LOGIN = gql`
  mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      firstName
      lastName
      language
      country
      email
      password
    }
  }
`;

const GQL_SIGNUP = gql`
  mutation SigupUser($userInput: UserInput!) {
    sigupUser(userInput: $userInput) {
      firstName
      lastName
      language
      country
      email
      password
    }
  }
`;

type TUser = {
  firstName: string;
  lastName: string;
  language: string;
  country: string;
  email: string;
  password?: string;
  token: string;
  type: 'auth' | 'google';
};

type TSignUp = Omit<TUser, 'type' | 'token'>;
type TCredentials = Pick<TUser, 'email' | 'password'>;

type AuthProps = {
  user: TUser | null;
  login: (credentials: TCredentials) => void;
  signup: (user: TSignUp) => void;
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
  const [user, setUser] = useState<TUser | null>(null);
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
    onError(error) {
      console.log('LOGIN ERROR:', error.message);
    },
  });

  const [signupMutation, { loading: loadingSignup, error: errorSignUp }] = useMutation(GQL_SIGNUP, {
    onCompleted: (data) => {
      console.log('signupMutation COMPLETE. token:', data.sigupUser);
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
      let { name: firstName, email, familyName: lastName } = gUser?.user;
      firstName = firstName ?? '';
      lastName = firstName ?? '';
      setUser({
        firstName,
        lastName,
        email,
        type: 'google',
        language: 'TODO',
        country: 'TODO',
        token: 'TODO',
      });
      setLoadingGoogle(false);
    } catch (exceptionGoogle: any) {
      console.log('ERRRR GOOGLE', JSON.stringify(exceptionGoogle));
      setLoadingGoogle(false);
      setErrorGoogle(exceptionGoogle.message);
    }
  };

  // TODO: automatic login
  // useEffect(() => {
  //   const reloadToken = () => {
  //     const storedToken = secureStore.setItem(JWT_TOKEN);
  //   };
  //   reloadToken();
  // }, []);

  const login = ({ email, password }: TCredentials) => {
    console.log('LOGIN', email, password);
    loginMutation({
      variables: {
        credentials: { email, password },
      },
    });
  };

  const signup = ({ firstName, lastName, language, country, email, password }: TSignUp) => {
    signupMutation({
      variables: {
        userInput: { firstName, lastName, language, country, email, password },
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

export { AuthProvider, useAuthContext, TUser, TSignUp, TCredentials };
