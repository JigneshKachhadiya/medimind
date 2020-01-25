import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import ImagePicker from 'react-native-image-picker';

import commonStyle from '../../appConfig/commonStyle';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import font from "../../appConfig/font";
import RadioButton from 'react-native-radio-button';
import firebase from 'react-native-firebase';
import { createResponder } from 'react-native-gesture-responder';


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

 
  render() {
    const { isLoading, isFemale, isMale, email, name, password, profilePic } = this.state;
    return (
      <SafeAreaView style={[commonStyle.container, { backgroundColor: color.white }]}>
        <DropdownAlert ref={ref => this.dropdown = ref} />
        {
          isLoading &&
          <View style={commonStyle.loaderCon}>
            <Loader />
          </View>
        }
        <Header {...this.props} isTitle={true} isBack={true} title={'Edit Your Profile'} />
        <View>
          <Text>
            This is test pages
          </Text>
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserData: state.loginUser.currentUserData,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);

