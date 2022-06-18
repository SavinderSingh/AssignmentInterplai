import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentTab} from '../redux/actions/homeActions';

const CustomBottomTab = props => {
  const tab = useSelector(state => state.home.currentTab);

  const dispatch = useDispatch();

  const moveToTab = tab => {
    dispatch(setCurrentTab(tab));
    props.navigation.jumpTo(tab);
  };

  return (
    <View style={[styles.parent]}>
      <Item
        iconName={'home'}
        iconType={'feather'}
        title={'Dashboard'}
        isFocused={tab === 'Dashboard'}
        onPress={() => {
          moveToTab('Dashboard');
        }}
      />
      <Item
        iconName={'heart'}
        iconType={'feather'}
        title={'Favorite'}
        isFocused={tab === 'Favorite'}
        onPress={() => {
          moveToTab('Favorite');
        }}
      />
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 72,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemView: {
    height: 84,
    // flex:1
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  itemText: {
    fontSize: 10,
    color: '#888',
  },
  image: {
    height: 20,
    width: 20,
  },
});

const Item = props => {
  const isFocused = props.isFocused;

  const tintColor = props.isFocused ? '#CF9B00' : '#BABABA';

  return (
    <TouchableOpacity style={{flex: 1}} onPress={props.onPress}>
      <View style={[styles.itemView]}>
        <Icon
          name={props.iconName}
          type={props.iconType}
          color={tintColor}
          size={props.iconSize ? props.iconSize : 24}
        />
        <Text
          style={[
            styles.itemText,
            {
              color: tintColor,
            },
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
