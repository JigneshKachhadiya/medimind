import React, { Component, } from 'react';
import { StatusBar, View } from 'react-native';
import Index from './src/index';

export default class App extends Component {

  render() {
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#212121" barStyle="light-content" />
        <Index />
      </View>
    );
  }
}