import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../values/colors';
import {Icon} from 'react-native-elements';

const SearchView = props => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.parent,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          borderColor: isFocused ? colors.primary : '#e0e0e0',
          borderWidth: isFocused ? 2 : 1,
        },
      ]}>
      <Icon
        name="search"
        type="feather"
        color={isFocused ? colors.primary : '#888'}
      />
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={'#888'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.textInput}
      />
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  parent: {
    height: 48,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom:4
  },
  textInput: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
