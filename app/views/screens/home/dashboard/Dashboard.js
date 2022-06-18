import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BaseView from '../../../hoc/BaseView';
import SearchView from '../../../components/SearchView';
import EntryItem from './items/EntryItem';
import {setEntriesList} from '../../../../redux/actions/homeActions';
import EntryDatabase from '../../../../sqliteDb/EntryDatabase';
import {openDatabase} from 'react-native-sqlite-storage';
import NoDataView from '../../../components/NoDataView';

const Dashboard = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const entryDb = new EntryDatabase();

  const entriesList = useSelector(state => state.home.entriesList);

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    entryDb.initDB();
    const unsubscribe = props.navigation.addListener('focus', () => {
      // console.log('[Dashboard.js] Dashboard screen is focused');
      init();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.navigation]);

  const init = () => {
    entryDb.getEntriesList().then(response => {
      const _list = entriesList;
      _list.forEach(entry => {
        response.forEach(it => {
          if (it.id === entry.id) {
            entry.isFavorite = true;
          }
        });
      });
      // console.log('[Favorite.js] Loading entries : ', _list);
      setList(_list);
      dispatch(setEntriesList(_list));
    });
  };

  const _onSearch = value => {
    setSearchText(value);
    let _text = value.toLowerCase();
    let filteredList = entriesList.filter(item => {
      // search from a full list, and not from a previous search results list
      if (item.API.toLowerCase().match(_text)) {
        return item;
      }
    });
    if (!_text || _text === '') {
      setList(entriesList);
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
    const _list = list;
    const index = _list.findIndex(it => it.id === item.id);
    _list[index].isFavorite = !item.isFavorite;
    setList(_list);
    dispatch(setEntriesList(_list));
    setExtraData(prevState => !prevState);
    console.log('[Dashboard.js] on Fav : ', _list[index], item);
    if (_list[index].isFavorite) {
      // alert('Added to Favorite Successfully');
      entryDb
        .addEntry({
          id: item.id,
          API: item.API,
          Description: item.Description,
        })
        .then(response => {
          console.log('[Dashboard.js] Added Successfully : ', response);
        })
        .catch(error => {
          console.log('[Dashboard.js] Added Failed : ', error);
        });
    } else {
      // alert('Removed From Favorite!');
      entryDb
        .deleteEntry(item.id)
        .then(response => {
          console.log('[Dashboard.js] Delete Successfully : ', response);
        })
        .catch(error => {
          console.log('[Dashboard.js] Delete Failed : ', error);
        });
    }
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasMenu
      onMenuPress={() => props.navigation.toggleDrawer()}
      title={'Dashboard'}>
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
          extraData={extraData}
        />

        {list.length < 1 && <NoDataView message={'No Entries found'} />}
      </View>
    </BaseView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
