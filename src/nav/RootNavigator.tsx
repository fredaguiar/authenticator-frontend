import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Home from '../components/auth/Home';
import { AuthProvider, useAuth } from '../context/AuthContext';

export type RootStackParams = {
  Login: undefined;
  Signup: undefined;
  Home: { email: string; name: string };
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const LoginRootStack = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Login"
      component={Login}
      options={{
        headerTintColor: 'black',
        headerTitle: 'Login',
        headerTitleAlign: 'center',
      }}
    />
    <RootStack.Screen
      name="Signup"
      component={Signup}
      options={{
        headerTintColor: 'black',
        headerTitle: 'Sign-up',
        headerTitleAlign: 'center',
      }}
    />
  </RootStack.Navigator>
);

const HomeRootStack = () => (
  <RootStack.Navigator>
    <RootStack.Screen name="Home" component={Home} />
  </RootStack.Navigator>
);

const RootNavigator = () => {
  const authContext = useAuth();

  console.log('INNNNNN RootNavigator authContext.user', authContext.user);

  if (authContext.user?.token) {
    return <HomeRootStack />;
  }

  return <LoginRootStack />;
};

export default RootNavigator;
