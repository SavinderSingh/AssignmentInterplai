import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ButtonView from '../../../components/ButtonView';
import BaseView from '../../../hoc/BaseView';
import {colors} from '../../../../values/colors';

const Dashboard = props => {
  const arr = [
    {id: '1', isVisible: false, same_id: '16', value: 'G', isRemoved: false},
    {id: '2', isVisible: false, same_id: '6', value: 'F', isRemoved: false},
    {id: '3', isVisible: false, same_id: '15', value: 'B', isRemoved: false},
    {id: '4', isVisible: false, same_id: '11', value: 'H', isRemoved: false},
    {id: '5', isVisible: false, same_id: '12', value: 'E', isRemoved: false},
    {id: '6', isVisible: false, same_id: '2', value: 'F', isRemoved: false},
    {id: '7', isVisible: false, same_id: '10', value: 'C', isRemoved: false},
    {id: '8', isVisible: false, same_id: '13', value: 'D', isRemoved: false},
    {id: '9', isVisible: false, same_id: '14', value: 'A', isRemoved: false},
    {id: '10', isVisible: false, same_id: '7', value: 'C', isRemoved: false},
    {id: '11', isVisible: false, same_id: '4', value: 'H', isRemoved: false},
    {id: '12', isVisible: false, same_id: '5', value: 'E', isRemoved: false},
    {id: '13', isVisible: false, same_id: '8', value: 'D', isRemoved: false},
    {id: '14', isVisible: false, same_id: '9', value: 'A', isRemoved: false},
    {id: '15', isVisible: false, same_id: '3', value: 'B', isRemoved: false},
    {id: '16', isVisible: false, same_id: '1', value: 'G', isRemoved: false},
  ];
  const shuffleArray = arr.sort(() => Math.random() - 0.5);

  const [list, setList] = useState(shuffleArray);
  const [count, setCount] = useState(0);
  const [extraData, setExtraData] = useState(false);

  // console.log('[Dashboard.js] : ', arr, shuffleArray);

  // useEffect(() => {}, []);

  // const _updateList = () => {};

  const _renderItem = ({item, index}) => {
    if (item.isRemoved) {
      return <View style={styles.removedView} />;
    } else {
      return (
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={0.7}
          onPress={() => _onItemPress(item)}>
          <View style={styles.itemView}>
            {item.isVisible ? (
              <Text style={styles.itemTitle}>{item.value}</Text>
            ) : null}
          </View>
        </TouchableOpacity>
      );
    }
  };

  const _onItemPress = item => {
    const _list = list;
    const isTwoItemsVisibleList = _list.filter(it => it.isVisible);

    const index = _list.findIndex(it => it.id === item.id);
    if (isTwoItemsVisibleList.length < 2) {
      _list[index].isVisible = true;
    }

    if (isTwoItemsVisibleList.length === 1) {
      setCount(count => count + 1);
      const previousItem = isTwoItemsVisibleList[0];
      if (previousItem.id === item.same_id) {
        const previousItemIndex = _list.findIndex(
          it => it.id === previousItem.id,
        );
        setTimeout(() => {
          _list[index].isRemoved = true;
          _list[previousItemIndex].isRemoved = true;
          _list.forEach(it => (it.isVisible = false));
        }, 500);
      } else {
        setTimeout(() => {
          _list.forEach(it => (it.isVisible = false));
        }, 1000);
      }
    }
    console.log(
      '[Dashboard.js] onItemPress: ',
      isTwoItemsVisibleList,
      _list,
      item,
    );
    setList(_list);
    setExtraData(prevState => !prevState);
  };

  const _onRestart = () => {
    setList(shuffleArray);
    setCount(0);
  };

  const _onExitApp = () => {
    Alert.alert('Memory Game', 'Are you sure you want to exit?', [
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
      {text: 'Cancel', onPress: () => {}},
    ]);
  };

  return (
    <BaseView hasStatusBar>
      <View style={styles.parent}>
        <View style={styles.row}>
          <Text style={styles.text}>
            Matches {list.filter(it => it.isRemoved).length / 2}
          </Text>
          <Text style={styles.text}>Turn {count}</Text>
        </View>
        <View style={styles.view}>
          <FlatList
            data={list}
            renderItem={_renderItem}
            // keyExtractor={item => item.id}
            numColumns={4}
            scrollEnabled={false}
            extraData={extraData}
            // style={{alignSelf:'center'}}
          />
        </View>
        <View style={styles.row}>
          <ButtonView
            title={'Exit'}
            buttonStyle={{width: 120}}
            onPress={() => _onExitApp()}
          />
          <ButtonView
            title={'Restart'}
            buttonStyle={{width: 120}}
            onPress={() => _onRestart()}
          />
        </View>
      </View>
    </BaseView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 24,
  },
  view: {
    flex: 1,
    // justifyContent:'center',
    // alignItems: 'center',
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  itemView: {
    height: 64,
    width: 64,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  removedView: {
    height: 64,
    width: 64,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 4,
    // flex:1,
    marginRight: 20,
  },
});
