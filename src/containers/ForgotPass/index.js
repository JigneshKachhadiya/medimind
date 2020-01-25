import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Image,
  Easing,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TextInputComp
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import commonStyle from './../../appConfig/commonStyle';
import images from "./../../appConfig/image";

import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  _onLogin() {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <SafeAreaView style={[commonStyle.container, { backgroundColor: color.white }]}>
        <ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
            style={{ flex: 1 }}
          >
            <Animatable.View animation="slideInUp" duration={500} direction="normal">
              <View style={{ flex: 1, height: deviceHeight / 5, backgroundColor: color.themeColor, alignItems: 'center' }}>
                <View style={{ height: 50, justifyContent: 'center' }}>
                  <Text style={{ color: color.white, ...fonts.fs20b }}>Forgot Password</Text>
                </View>
              </View>
            </Animatable.View>

            <View style={{ marginHorizontal: 20, marginTop: -45 }}>
              <Animatable.View animation="slideInUp" duration={500} direction="normal">
                <View style={{ paddingBottom: 10 }}>
                  <View style={commonStyle.inputShadowView}>
                    <View style={[commonStyle.inputView, styles.forgotViewH]} />
                  </View>
                  <View style={[commonStyle.inputViewAbs, styles.forgotViewAbsH]}>
                    <View style={{ paddingHorizontal: 20, }}>
                      <TextInputComp
                        icon={'envelope'}
                        iconSize={20}
                        placeholder=''
                        onChangeText={(email) => this.setState({ email })}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                  <TouchableOpacity
                    onPress={() => this._onLogin()}
                    style={{ paddingVertical: 10, width: 200, borderRadius: 50, alignItems: 'center' }}>
                    <Text style={{ color: color.themeColor, ...fonts.fs20b }}>Login</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={commonStyle.inputBtnView}>
          <TouchableOpacity style={commonStyle.inputBtn}>
            <Text style={{ color: color.white, ...fonts.fs20b }}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}


export default ForgotPass;

