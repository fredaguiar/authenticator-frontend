import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Home from '../components/home/Home';
import CreateSafe from '../components/safe/CreateSafe';
import { TUser } from '../context/AuthContext';
import Introduction from '../components/setup/Introduction';
import ConfirmMobile from '../components/setup/ConfirmMobile';
import { useQuery } from '@apollo/client';
import { LOCAL_GET_USER_PROFILE } from '../cache';
import AddItemModal from '../components/safe/AddItemModal';
import TakePicture from '../components/safe/photo/TakePicture';
import { TItemType } from '../typing';

export type PublicRootStackParams = {
  Login: undefined;
  Signup: undefined;
};

export type PrivateRootStackParams = {
  Home: undefined;
  CreateSafe: undefined;
  AddItemModal: { itemType: TItemType };
  TakePicture: undefined;
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
    <PrivateNativeStackNav.Screen
      name="Home"
      component={Home}
      options={{
        headerTitleAlign: 'center',
      }}
    />
    <PrivateNativeStackNav.Screen name="CreateSafe" component={CreateSafe} />
    <PrivateNativeStackNav.Screen
      name="AddItemModal"
      component={AddItemModal}
      options={{
        presentation: 'modal',
        headerTitleAlign: 'center',
      }}
    />
  </PrivateNativeStackNav.Navigator>
);

const RootNavigator = () => {
  const { data } = useQuery<{ userProfile: TUser } | undefined>(LOCAL_GET_USER_PROFILE);
  // const user = userProfileVar();
  const user = data?.userProfile;

  console.log('RootNavigator>>>>>>>>>>>>>>>>>> ', user);

  if (!user) {
    return <PublicRootStack />;
  }

  if (!user.mobileVerified)
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

  if (!user.introductionViewed)
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
