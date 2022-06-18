import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../../../values/colors';
import {Icon} from 'react-native-elements';

const EntryItem = props => {
  const {item, index, onFavorite} = props;

  return (
    <View style={styles.parent}>
      <Text style={styles.api}>{item.API}</Text>
      <Text style={styles.description}>{item.Description}</Text>
      <TouchableOpacity style={styles.heart} onPress={onFavorite}>
        <Icon
          name={item.isFavorite ? 'heart' : 'heart-outlined'}
          type="entypo"
          color={item.isFavorite ? '#f33' : '#000'}
          size={item.isFavorite ? 32 : 24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EntryItem;

const styles = StyleSheet.create({
  parent: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
    borderRadius:4
  },
  api: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1b1b1b',
  },
  heart: {
    position: 'absolute',
    right: 0,
    padding: 12,
  },
});
