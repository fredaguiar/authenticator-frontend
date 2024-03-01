import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Home from '../components/auth/Home';

export type RootStackParams = {
  Login: undefined;
  Signup: undefined;
  Home: { email: string; name: string };
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  return (
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
      <RootStack.Screen name="Home" component={Home} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
