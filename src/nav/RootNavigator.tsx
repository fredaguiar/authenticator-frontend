import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Home from '../components/home/Home';
import CreateSafe from '../components/safe/CreateSafe';
import { useAuthContext } from '../context/AuthContext';
import Introduction from '../components/setup/Introduction';
import ConfirmMobile from '../components/setup/ConfirmMobile';

export type PublicRootStackParams = {
  Login: undefined;
  Signup: undefined;
};

export type PrivateRootStackParams = {
  Home: undefined;
  CreateSafe: undefined;
  Tab: undefined;
};

export type SetupRootStackParams = {
  ConfirmEmail: undefined;
  ConfirmMobile: undefined;
  Introduction: undefined;
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
  </PublicNativeStackNav.Navigator>
);

const PrivateRootStack = () => (
  <PrivateNativeStackNav.Navigator>
    <PrivateNativeStackNav.Screen name="Home" component={Home} />
    <PrivateNativeStackNav.Screen name="CreateSafe" component={CreateSafe} />
  </PrivateNativeStackNav.Navigator>
);

const RootNavigator = () => {
  const authContext = useAuthContext();

  console.log('RootNavigator authContext.user', authContext.user);

  if (!authContext.user?.token) {
    return <PublicRootStack />;
  }

  if (!authContext.user?.mobileVerified)
    return (
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
      </SetupNativeStackNavigator.Navigator>
    );

  if (!authContext.user?.introductionViewed)
    return (
      <SetupNativeStackNavigator.Navigator>
        <SetupNativeStackNavigator.Screen
          name="Introduction"
          component={Introduction}
          options={{
            headerTintColor: 'black',
            headerTitle: 'A brief introduction',
            headerTitleAlign: 'center',
          }}
        />
      </SetupNativeStackNavigator.Navigator>
    );

  return <PrivateRootStack />;
};

export default RootNavigator;
