import { LogBox, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import Routes from './navigator/Routes'
import configStore from './redux/configStore'


const App = () => {

    useEffect(() => {
        _init()
        return () => {
          
        }
      }, [])
    
      const _init = () => {
          LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
          LogBox.ignoreAllLogs();//Ignore all log notifications
          LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      }




    return (
      <Provider store={configStore}>
        <Routes />
      </Provider>
    )
}

export default App

const styles = StyleSheet.create({})


// npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

// cd android && ./gradlew assembleDebug

// cd android && ./gradlew bundleRelease