import {Image, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import BaseView from '../../hoc/BaseView';
import {images} from '../../../assets/images';
import {useDispatch} from 'react-redux';
import ButtonView from '../../components/ButtonView';

const Splash = props => {
  const baseViewRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <BaseView ref={baseViewRef}>
      <View style={styles.parent}>
        <Image
          source={images.logo}
          style={styles.logo}
          resizeMode={'contain'}
        />
      </View>
      <ButtonView 
          title={'Start'}
          onPress={() => props.navigation.navigate('Dashboard')}
          // buttonStyle={{width:'100%'}}
          containerStyle={{margin:48}}
        />
    </BaseView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    paddingBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 196,
    width: '80%',
    marginLeft: 16,
  },
});
