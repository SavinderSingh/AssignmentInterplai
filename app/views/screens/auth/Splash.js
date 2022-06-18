import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../hoc/BaseView';
import {colors} from '../../../values/colors';
import {images} from '../../../assets/images';
import {
  getEntriesList,
  setEntriesList,
} from '../../../redux/actions/homeActions';
import {useDispatch} from 'react-redux';
import {generateRandomString} from '../../../utils/Validations';

const Splash = props => {
  const baseViewRef = useRef(null);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    _init();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _init = index => {
    setIsRefreshing(true);
    getEntriesList(index)
      .then(response => {
        setIsRefreshing(false);
        const list = response.entries;
        list.forEach((it, index) => {
          it.id = `${index}_entry`;
          it.isFavorite = false;
        });
        console.log('[Splash.js] getEntriesList : ', list);
        dispatch(setEntriesList(list));
        props.navigation.navigate('Dashboard');
      })
      .catch(error => {
        setIsRefreshing(false);
        console.log('[Splash.js] getEntriesList error: ', error);
      });
  };

  return (
    <BaseView ref={baseViewRef}>
      <View style={styles.parent}>
        <Image
          source={images.logo}
          style={styles.logo}
          resizeMode={'contain'}
        />
        {isRefreshing && (
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={styles.loader}
          />
        )}
      </View>
    </BaseView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F7F7F7',
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
  loader: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
  },
});
