import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BaseView from '../../../hoc/BaseView';
import SearchView from '../../../components/SearchView';
import EntryDatabase from '../../../../sqliteDb/EntryDatabase';
import EntryItem from '../dashboard/items/EntryItem';
import { setEntriesList } from '../../../../redux/actions/homeActions';
import NoDataView from '../../../components/NoDataView';

const Favorite = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const entriesList = useSelector(state => state.home.entriesList);

  const entryDb = new EntryDatabase();

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [extraData, setExtraData] = useState(false);
  const [searchedList, setSearchedList] = useState([])

  useEffect(() => {
    entryDb.initDB();
    const unsubscribe = props.navigation.addListener('focus', () => {
      // console.log('[Favorite.js] Favorite screen is focused');
      _init();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.navigation]);

  const _init = () => {
    // console.log('[Favorite.js] Loading entries');
    entryDb.getEntriesList().then(response => {
      // console.log('[Favorite.js] Loading entries : ', response);
      response.forEach(entry => (entry.isFavorite = true));
      setList(response.sort((a, b) => a.API.localeCompare(b.API)));
      setSearchedList(response.sort((a, b) => a.API.localeCompare(b.API)));
    });
  };

  const _onSearch = async value => {
    setSearchText(value);
    let _text = value.toLowerCase();
    let filteredList = searchedList.filter(item => {
      // search from a full list, and not from a previous search results list
      if (item.API.toLowerCase().match(_text)) {
        return item;
      }
    });
    if (!_text || _text === '') {
      setList(searchedList);
    } else if (!filteredList.length) {
      setList([]);
    } else if (Array.isArray(filteredList)) {
      setList(filteredList);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <EntryItem
        item={item}
        index={index}
        onFavorite={() => _onFavorite(item)}
      />
    );
  };

  const _onFavorite = item => {
    const _list = list.filter(it => it.id !== item.id);
    setList(_list);

    const _entriesList = entriesList;
    const index = _entriesList.findIndex(it => it.id === item.id);
    _entriesList[index].isFavorite = !item.isFavorite;
    dispatch(setEntriesList(_entriesList));
    setExtraData(prevState => !prevState);
    entryDb
      .deleteEntry(item.id)
      .then(response => {
        console.log('[Dashboard.js] Delete Successfully : ', response);
      })
      .catch(error => {
        console.log('[Dashboard.js] Delete Failed : ', error);
      });
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasMenu
      onMenuPress={() => props.navigation.toggleDrawer()}
      title={'Favorite'}>
      <View style={styles.parent}>
        <SearchView
          placeholder={'search your entry here'}
          value={searchText}
          onChangeText={text => _onSearch(text)}
        />

        <FlatList
          data={list}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item.id}
          contentContainerStyle={{paddingBottom: 32}}
        />

        {list.length < 1 && <NoDataView message={'No Entries Added to Favorite yet!'} />}
      </View>
    </BaseView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
