import React, { Component } from "react";
import { View, Platform, Linking } from "react-native";
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import commonStyle from './appConfig/commonStyle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class DefualtScreen extends Component {
  checkProps = (props) => {
    if (props.userID) {
      let routeName = "Home";
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  };

  resetAction(routeName) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount() {
    this.storeData();
    if (this.props.user && this.props.user !== null && this.props.user.length > 0) {
      let userData = this.props.user && this.props.user.length > 0 && this.props.user[0]
      this.checkProps(userData)
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@MiniPlaye', 'normalPlaye')
    } catch (e) {
    }
  }

  componentWillReceiveProps(props) {

    if (!props.app_launch) {
    }
  }

  render() {
    return (
      <View style={[commonStyle.flex1]} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginUser.currentUserData,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefualtScreen);
