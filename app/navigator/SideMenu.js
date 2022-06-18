import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../values/colors';
import BaseView from '../views/hoc/BaseView';

const SideMenu = (props, tab, updateBottomTab) => {
  _navigateTo = screenName => {
    updateBottomTab(screenName);
    props.navigation.navigate(screenName);
    props.navigation.closeDrawer();
  };

  return (
    <BaseView hasStatusBar>
      <ScrollView style={styles.parent}>
        <Item
          title="Dashboard"
          iconName={'home'}
          iconType={'feather'}
          onPress={() => _navigateTo('Dashboard')}
          isSelected={tab === 'Dashboard'}
        />
        <Item
          title="Favorite"
          iconName={'heart'}
          iconType={'feather'}
          onPress={() => _navigateTo('Favorite')}
          isSelected={tab === 'Favorite'}
        />
      </ScrollView>
      <Text style={styles.powered}>
        Powered By <Text style={{color: colors.primary}}>Interplai</Text>
      </Text>
    </BaseView>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginLeft:16,
    // backgroundColor:'#e5e5e5',
    // paddingHorizontal:12,
    // width:'100%',
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    // borderRadius:4
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  itemTitle: {
    marginLeft: 8,
    color: colors.sideMenuTintColor,
    paddingTop: Platform.OS === 'ios' ? 0 : 4,
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  powered: {
    color: '#888',
    fontSize: 10,
    paddingBottom: 16,
    textAlign: 'center',
  },
});

const Item = props => {
  const {iconName, iconType, title, onPress, iconSize, isSelected} = props;

  const bgColor = isSelected ? colors.primary : '#fff';
  const textColor = isSelected ? '#fff' : colors.sideMenuTintColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={props.parentStyle}>
      <View style={[styles.itemView, {backgroundColor: bgColor}]}>
        <Icon
          name={iconName}
          type={iconType}
          color={textColor}
          size={iconSize ? iconSize : 24}
        />
        <Text style={[styles.itemTitle, {color: textColor}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
