import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';
import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';

export const JWT_TOKEN = 'JID';

const GQL_LOGIN = gql`
  mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      firstName
      lastName
      language
      country
      email
      phoneCountry
      phone
      token
      emailVerified
      mobileVerified
      introductionViewed
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
      phoneCountry
      phone
      token
      emailVerified
      mobileVerified
      introductionViewed
    }
  }
`;

const GQL_CONFIRM_MOBILE = gql`
  mutation ConfirmMobile($code: Int!) {
    confirmMobile(code: $code) {
      firstName
      lastName
      language
      country
      email
      phoneCountry
      phone
      token
      emailVerified
      mobileVerified
    }
  }
`;

const GQL_INTRO_VIEWED = gql`
  mutation IntroViewed($viewed: Boolean!) {
    introViewed(viewed: $viewed)
  }
`;

type TUser = {
  firstName: string;
  lastName: string;
  language: string;
  country: string;
  email: string;
  phoneCountry: string;
  phone: string;
  password?: string;
  token: string;
  type: 'auth' | 'google';
  emailVerified: boolean;
  mobileVerified: boolean;
  introductionViewed?: boolean;
};

type TSignUp = Omit<TUser, 'type' | 'token' | 'emailVerified' | 'mobileVerified'>;
type TCredentials = Pick<TUser, 'email' | 'password'>;

type AuthProps = {
  user: TUser | null;
  login: (credentials: TCredentials) => void;
  signup: (user: TSignUp) => void;
  logout: () => void;
  loginGoogle: () => void;
  confirmMobile: (code: number) => void;
  introViewed: (viewed: boolean) => void;
  loadingLogin: boolean;
  errorLogin: ApolloError | undefined;
  loadingSignup: boolean;
  errorSignUp: ApolloError | undefined;
  loadingGoogle: boolean;
  errorGoogle: any;
  loadingConfirmMobile: boolean;
  errorConfirmMobile: any;
  loadingIntroViewed: boolean;
  errorIntroViewed: any;
};

const AuthContext = createContext<AuthProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const [errorGoogle, setErrorGoogle] = useState<any>(null);
  GoogleSignin.configure({
    // the webClientId is used to specify the client ID for OAuth 2.0 flows on both Android and iOS platforms (chatGPT)
    webClientId: '479374542478-itb68h17o5tlcf19s8bnt52qd3fqg09b.apps.googleusercontent.com',
  });

  const [loginMutation, { loading: loadingLogin, error: errorLogin }] = useMutation(GQL_LOGIN, {
    onCompleted: (data) => {
      console.log('login COMPLETE - token', data.login.token);
      SecureStore.setItemAsync(JWT_TOKEN, data.login.token);
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
      SecureStore.setItemAsync(JWT_TOKEN, data.sigupUser.token);
      setUser({ ...data.sigupUser, type: 'auth' });
      // TODO: set authorization header
    },
    onError(error) {
      console.log('signupMutation ERROR:', error.stack);
    },
  });

  const [confirmMobileMutation, { loading: loadingConfirmMobile, error: errorConfirmMobile }] =
    useMutation(GQL_CONFIRM_MOBILE, {
      onCompleted: (data) => {
        console.log('confirmMobileMutation COMPLETE. mobileVerified:', data.confirmMobile);
        setUser({ ...data.confirmMobile, type: 'auth' });
      },
    });

  const [introViewedMutation, { loading: loadingIntroViewed, error: errorIntroViewed }] =
    useMutation(GQL_INTRO_VIEWED, {
      onCompleted: (data) => {
        console.log('introViewedMutation COMPLETE:', data.introViewed);
        setUser({ ...user, introductionViewed: data.introViewed } as TUser);
      },
    });

  const loginGoogle = async () => {
    try {
      setErrorGoogle(null);
      setLoadingGoogle(true);
      await GoogleSignin.hasPlayServices();
      const gUser = await GoogleSignin.signIn();
      let { name: firstName, email, familyName: lastName } = gUser?.user;
      firstName = firstName ?? '';
      lastName = firstName ?? '';
      setUser({
        firstName,
        lastName,
        email,
        phoneCountry: 'TODO',
        phone: 'TODO',
        type: 'google',
        language: 'TODO',
        country: 'TODO',
        token: 'TODO',
        emailVerified: false,
        mobileVerified: false,
        introductionViewed: false,
      });
      setLoadingGoogle(false);
    } catch (exceptionGoogle: any) {
      setLoadingGoogle(false);
      setErrorGoogle(exceptionGoogle.message);
    }
  };

  useEffect(() => {
    const automaticLogin = () => {
      loginMutation({
        variables: {
          credentials: { email: 'a@gmail.com', password: '11111111' },
        },
      });
    };
    automaticLogin();
  }, []);

  const login = ({ email, password }: TCredentials) => {
    console.log('LOGIN', email, password);
    loginMutation({
      variables: {
        credentials: { email, password },
      },
    });
  };

  const signup = ({
    firstName,
    lastName,
    language,
    country,
    email,
    phoneCountry,
    phone,
    password,
  }: TSignUp) => {
    signupMutation({
      variables: {
        userInput: { firstName, lastName, language, country, email, phoneCountry, phone, password },
      },
    });
  };

  const confirmMobile = (code: number) => {
    confirmMobileMutation({ variables: { code } });
  };

  const introViewed = (viewed: boolean) => {
    introViewedMutation({ variables: { viewed } });
  };

  const logout = async () => {
    console.log('LOGOUT');
    if (user?.type === 'google') {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
    await SecureStore.deleteItemAsync(JWT_TOKEN);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        confirmMobile,
        loginGoogle,
        introViewed,
        loadingLogin,
        errorLogin,
        loadingSignup,
        errorSignUp,
        loadingGoogle,
        errorGoogle,
        loadingConfirmMobile,
        errorConfirmMobile,
        loadingIntroViewed,
        errorIntroViewed,
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
