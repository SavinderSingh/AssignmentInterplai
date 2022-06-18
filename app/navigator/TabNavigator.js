import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Dashboard from '../views/screens/home/dashboard/Dashboard';
import Favorite from '../views/screens/home/Favorite/Favorite';
import CustomBottomTab from './CustomBottomTab';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomBottomTab {...props} />}
      swipeEnabled>
      <Tab.Screen name={'Dashboard'} component={Dashboard} />
      <Tab.Screen name={'Favorite'} component={Favorite} />
    </Tab.Navigator>
  );
};
