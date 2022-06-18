import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NoDataView = props => {
  return (
    <View style={[styles.parent, props.style]}>
      <Text style={styles.message}>{props.message}</Text>
    </View>
  );
};

export default NoDataView;

const styles = StyleSheet.create({
  parent: {
    paddingVertical: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  image: {
    height: 120,
    width: 120,
  },
  message: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
