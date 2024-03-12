import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Home from '../components/home/Home';
import { useAuthContext } from '../context/AuthContext';
import Introduction from '../components/setup/Introduction';
import ConfirmEmail from '../components/setup/ConfirmEmail';
import ConfirmMobile from '../components/setup/ConfirmMobile';

export type PublicRootStackParams = {
  Login: undefined;
  Signup: undefined;
  Introduction: undefined;
};

export type PrivateRootStackParams = {
  Home: { email: string; name: string };
};

export type SetupRootStackParams = {
  ConfirmEmail: undefined;
  ConfirmMobile: undefined;
};

const PublicNativeStackNav = createNativeStackNavigator<PublicRootStackParams>();
const PrivateNativeStackNav = createNativeStackNavigator<PrivateRootStackParams>();
const SetupNativeStackNavigator = createNativeStackNavigator<SetupRootStackParams>();

const PublicRootStack = () => (
  <PublicNativeStackNav.Navigator>
    <PublicNativeStackNav.Screen
      name="Login"
      component={Login}
      options={{
        headerTintColor: 'black',
        headerTitle: 'Login',
        headerTitleAlign: 'center',
      }}
    />
    <PublicNativeStackNav.Screen
      name="Signup"
      component={Signup}
      options={{
        headerTintColor: 'black',
        headerTitle: 'Create new profile',
        headerTitleAlign: 'center',
      }}
    />
    <PublicNativeStackNav.Screen name="Introduction" component={Introduction} />
  </PublicNativeStackNav.Navigator>
);

const PrivateRootStack = () => (
  <PrivateNativeStackNav.Navigator>
    <PrivateNativeStackNav.Screen name="Home" component={Home} />
  </PrivateNativeStackNav.Navigator>
);

const SetupRootStack = () => (
  <SetupNativeStackNavigator.Navigator>
    <SetupNativeStackNavigator.Screen
      name="ConfirmMobile"
      component={ConfirmMobile}
      options={{
        headerTintColor: 'black',
        headerTitle: 'Confirm mobile phone number',
        headerTitleAlign: 'center',
      }}
    />
    <SetupNativeStackNavigator.Screen
      name="ConfirmEmail"
      component={ConfirmEmail}
      options={{
        headerTintColor: 'black',
        headerTitle: 'Confirm email',
        headerTitleAlign: 'center',
      }}
    />
  </SetupNativeStackNavigator.Navigator>
);

const RootNavigator = () => {
  const authContext = useAuthContext();

  console.log('RootNavigator authContext.user', authContext.user);

  if (!authContext.user?.token) {
    return <PublicRootStack />;
  }

  if (!authContext.user?.mobileVerified) {
    return <SetupRootStack />;
  }

  return <PrivateRootStack />;
};

export default RootNavigator;
