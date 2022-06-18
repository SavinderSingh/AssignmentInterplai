import React, {Fragment, useRef, useState} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {TabNavigator} from './TabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import Dashboard from '../views/screens/home/dashboard/Dashboard';
import Favorite from '../views/screens/home/Favorite/Favorite';
import SideMenu from './SideMenu';
import {setCurrentTab} from '../redux/actions/homeActions';

const Drawer = createDrawerNavigator();

// eslint-disable-next-line no-undef
export default DrawerNavigator = () => {
  const dispatch = useDispatch();

  const tab = useSelector(state => state.home.currentTab);

  const updateBottomTab = tab => {
    dispatch(setCurrentTab(tab));
  };

  return (
    <Drawer.Navigator
      backBehavior="firstRoute"
      drawerType="front"
      // drawerStyle={{backgroundColor:'transparent',width:'100%'}}
      drawerContent={props => SideMenu(props, tab, updateBottomTab)}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        gestureEnabled: true,
      }}>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      {/* <Drawer.Screen name="Favorite" component={Favorite} /> */}
    </Drawer.Navigator>
  );
};
