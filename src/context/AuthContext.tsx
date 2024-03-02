import { createContext, useContext, useEffect, useState } from 'react';
import useSecureStore from '../hooks/useSecureStore';

type TUser = {
  name: string | null;
  email: string | null;
  token: string | null;
} | null;

type AuthProps = {
  user?: TUser;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const JWT_TOKEN = 'JID';

const AuthContext = createContext<AuthProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<TUser>(null);
  const secureStore = useSecureStore();

  // TODO: automatic login
  // useEffect(() => {
  //   const reloadToken = () => {
  //     const storedToken = secureStore.setItem(JWT_TOKEN);
  //   };
  //   reloadToken();
  // }, []);

  const login = (email: string, password: string) => {
    const userInfo: TUser = { name: 'galatica', email, token: '34234234324' };

    console.log('INNNNNN login userInfo', userInfo);

    if (userInfo.token) {
      secureStore.setItem(JWT_TOKEN, userInfo.token);
      // TODO: set authorization header
      setUser(userInfo);
    }
  };

  const logout = () => {
    // TODO: set authorization header
    secureStore.deleteItem(JWT_TOKEN);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, TUser };
