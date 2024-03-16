import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from '@rneui/themed';
import Home from '../components/home/Home';

export type TabStackParams = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<TabStackParams>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarIcon: ({ focused, color, size }) => {
          return <Icon name="box" type="entypo" color={focused ? 'blue' : 'black'} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
