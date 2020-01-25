import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import AppScreen from './router';
import Sugar from 'sugar';
import _ from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import FilesystemStorage from 'redux-persist-filesystem-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import images from './appConfig/image'

let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  whitelist: [
    'introSlid',
    'loginUser',
    'homeData',
    'article',
    'activity',
    'currentPlaye',
  ]
};
const persistedReducer = persistReducer(persistConfig, reducer);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(persistedReducer);
let persistor = persistStore(store);

Sugar.extend();
class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}  >
        <PersistGate loading={null} persistor={persistor}>
          <AppScreen />
        </PersistGate>
      </Provider >
    );
  }
}

export default Index;  