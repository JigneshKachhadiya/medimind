import React, { Component } from "react";
import {
  View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, TextInput, Alert
} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import { NavigationActions, StackActions } from "react-navigation";
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RadioButton from 'react-native-radio-button';
import commonStyle from './../../appConfig/commonStyle';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import image from "./../../appConfig/image";
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from "./styles";

import * as loginActions from '../../actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { height } = Dimensions.get('window');


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'login',
      isLogin: true,
      isLoading: false,
      // loginEmail: '',
      // loginPass: '',
      loginEmail: 'jkpatel@gmail.com',
      loginPass: '123456789',

      // ----SignUp State
      name: '',
      emailSignup: '',
      passwordSignup: '',
      isMale: false,
      isFemale: true
    }
  }
  _userAuth() {
    const { isLogin } = this.state;
    if (isLogin) {
      this._onLogin();
    } else {
      this._onSignUp();
    }
  }

  _onLogin() {
    let { loginEmail, loginPass } = this.state;
    this.setState({ isLoading: true })
    if (loginEmail !== '' && loginPass !== '') {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginEmail, loginPass)
        .then((userData) => {
          this.setState({
            isLoading: false
          })
          this.props.actions.loginUser();
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          this.setState({ isLoading: false })
          this.dropdown.alertWithType('error', error.message)
        })
    } else {
      this.setState({
        isLoading: false
      })
      this.dropdown.alertWithType('error', 'Please enter username & password')
    }
  }

  _onSignUp() {
    this.setState({ isLoading: true })
    let { name, isFemale, isMale, emailSignup, passwordSignup } = this.state;
    let gender = isFemale ? 'Female' : 'Male';

    if (name !== '', emailSignup !== '' && passwordSignup !== '') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailSignup, passwordSignup)
        .then((data) => {
          if (data.additionalUserInfo.isNewUser) {
            let profileInfo = data.user._user
            let UID = data.user._user.uid;
            let userData = {
              userID: UID,
              email: emailSignup,
              fullName: name,
              gender: gender,
              photoURL: profileInfo.photoURL,
              role: 'user',
              createdAt: +new Date,
              providerId: "firebase"
            }
            firebase.firestore().collection('users').add(userData).then((user) => {
              if (user) {
                this.setState({ isLoading: false, isLogin: true })
              }
            }).catch((error) => {
              this.setState({ isLoading: false })
              this.dropdown.alertWithType('error', error.message)
            })
          }
        })
        .catch(error => {
          this.setState({ isLoading: false })
          this.dropdown.alertWithType('error', error.message)
        })
    } else {
      this.setState({ isLoading: false })
      this.dropdown.alertWithType('error', 'Please enter username & password')
    }
  }

  // ------------------------ Social Authentication -----------------------
  googleLogin() {
    this.setState({ isLoading: true })
    this.props.actions.LoginWithGoogle().then(data => {
      if (data) {
        this.setState({ isLoading: false });
        let routeName = 'Home';
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName })],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  faceBookLogin() {
    this.setState({ isLoading: true })
    this.props.actions.LoginWithFB().then(data => {
      if (data) {
        this.setState({ isLoading: false });
        let routeName = 'Home';
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName })],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  _onForgotPass() {
    this.props.navigation.navigate('ForgotPass')
  }

  doSomething(value) {
    if (value == 'Male') {
      this.setState({
        isMale: true,
        isFemale: false
      })
    } else {
      this.setState({
        isFemale: true,
        isMale: false,
      })
    }
  }
  render() {
    const { isLogin, isFemale, isMale, loginEmail, loginPass, isLoading } = this.state;
    return (
      <SafeAreaView style={[commonStyle.container, { backgroundColor: color.white }]}>
        <DropdownAlert ref={ref => this.dropdown = ref} />
        {
          isLoading &&
          <View style={commonStyle.loaderCon}>
            <Loader />
          </View>
        }
        <View>
          <Header {...this.props} isTitle={true} isBack={false} />
        </View>
        <View style={styles.bottomImageView}>
          <View style={styles.leftImageContainer}>
            <Image source={image.leftBottom} style={{ height: 100, width: 100 }} resizeMode={'contain'} />
          </View>
          <View style={styles.rightImageContainer}>
            <Image source={image.rightBottom} style={{ height: 100, width: 100 }} resizeMode={'contain'} />
          </View>
        </View>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
            style={[commonStyle.flex1]}>
            <View>

              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity
                  onPress={() => this.setState({ isLogin: true })}
                  style={[styles.tabView, { borderBottomColor: isLogin ? color.blackTheme : color.bdTheme }]}>
                  <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ isLogin: false })}
                  style={[styles.tabView, { borderBottomColor: !isLogin ? color.blackTheme : color.bdTheme }]}>
                  <Text style={styles.loginText}>SIGNUP</Text>
                </TouchableOpacity>
              </View>

              {
                isLogin ?
                  // ---------------------------- LOGIN-FORM -------------------------
                  <View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                      <View style={styles.emailInput}>
                        <View style={styles.logoView}>
                          <Image source={image.mailIcon} style={{ height: 18, width: 18 }} resizeMode={'contain'} />
                        </View>
                        <TextInput
                          placeholder={'User name'}
                          style={{ ...font.fs18R, height: 50, padding: 0, color: color.textInput75, flex: 1 }}
                          onChangeText={(loginEmail) => this.setState({ loginEmail })}
                          value={loginEmail}
                          underlineColorAndroid={'transparent'}
                        />
                      </View>
                      <View style={styles.textInputContainer}>
                        <View style={styles.logoView}>
                          <Image source={image.loackIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                        </View>
                        <TextInput
                          placeholder={'Password'}
                          style={{ ...font.fs18R, height: 50, padding: 0, color: color.textInput75, flex: 1 }}
                          onChangeText={(loginPass) => this.setState({ loginPass })}
                          value={loginPass}
                          secureTextEntry={true}
                          underlineColorAndroid={'transparent'}
                        />
                      </View>
                    </View>
                    <View style={styles.genderContainer}>
                      <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
                  // ---------------------------- SIGNUP-FORM -------------------------
                  <View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                      <View style={styles.textInputContainer}>
                        <View style={styles.logoView}>
                          <Image source={image.userIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                        </View>
                        <TextInput
                          placeholder={'Name'}
                          style={{ ...font.fs18R, height: 50, padding: 0, color: color.textInput75, flex: 1 }}
                          onChangeText={(name) => this.setState({ name })}
                          underlineColorAndroid={'transparent'}
                        />
                      </View>
                      <View style={styles.emailInput}>
                        <View style={styles.logoView}>
                          <Image source={image.mailIcon} style={{ height: 18, width: 18 }} resizeMode={'contain'} />
                        </View>
                        <TextInput
                          placeholder={'User name'}
                          style={{ ...font.fs18R, height: 50, padding: 0, color: color.textInput75, flex: 1 }}
                          onChangeText={(emailSignup) => this.setState({ emailSignup })}
                          underlineColorAndroid={'transparent'}
                        />
                      </View>
                      <View style={styles.textInputContainer}>
                        <View style={styles.logoView}>
                          <Image source={image.loackIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                        </View>
                        <TextInput
                          placeholder={'Password'}
                          style={{ ...font.fs18R, height: 50, padding: 0, color: color.textInput75, flex: 1 }}
                          onChangeText={(passwordSignup) => this.setState({ passwordSignup })}
                          secureTextEntry={true}
                          underlineColorAndroid={'transparent'}
                        />
                      </View>
                    </View>
                    <View style={styles.genderContainer}>
                      <View style={styles.maleView}>
                        <RadioButton
                          size={12}
                          animation={'bounceIn'}
                          isSelected={isMale}
                          innerColor={color.blackTheme}
                          outerColor={color.blackTheme}
                          onPress={() => this.doSomething('Male')}
                        />
                        <Text style={styles.genderText}>Male</Text>
                      </View>
                      <View style={styles.FemaleView}>
                        <RadioButton
                          size={12}
                          animation={'bounceIn'}
                          isSelected={isFemale}
                          innerColor={color.blackTheme}
                          outerColor={color.blackTheme}
                          onPress={() => this.doSomething('Female')}
                        />
                        <Text style={styles.genderText}>Female</Text>
                      </View>
                    </View>
                  </View>
              }

              <View>
                <View style={[commonStyle.jcaiCntr]}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._userAuth()}
                    // onPress={() => this.props.navigation.navigate('Home')}
                    style={[styles.signUpButton, { marginBottom: 15 }]}>
                    <Text style={styles.signUpBtnText} >{isLogin ? 'LOGIN' : 'SIGNUP'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.googleLogin()}
                    style={styles.socialButton}>
                    <View style={styles.googleLogoView}>
                      <Image source={image.googleIcon} style={{ height: 25, width: 25 }} resizeMode={'contain'} />
                    </View>
                    <View style={[commonStyle.jcaiCntr, commonStyle.flex1, { backgroundColor: '#4e89f8', height: 45 }]}>
                      <Text style={styles.signUpBtnText} >{isLogin ? 'LOGIN WITH GOOGLE' : 'SIGNUP WITH GOOGLE'}</Text>
                    </View>
                    <View style={styles.googleBlankView} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton}
                    activeOpacity={0.9}
                    onPress={() => this.faceBookLogin()}>
                    <View style={[styles.googleLogoView, { backgroundColor: '#3357a5' }]}>
                      <Image source={image.facebookIcon} style={{ height: 30, width: 30 }} resizeMode={'contain'} />
                    </View>
                    <View
                      style={[commonStyle.jcaiCntr, commonStyle.flex1, { backgroundColor: '#3f5ba1', height: 45 }]}>
                      <Text style={styles.signUpBtnText} >{isLogin ? 'LOGIN WITH FACEBOOK' : 'SIGNUP WITH FACEBOOK'}</Text>
                    </View>
                    <View style={[styles.googleBlankView, { backgroundColor: '#3f5ba1' }]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView >
    )

  }
}

function mapStateToProps(state) {
  console.log('----------LoginState-------------', state)
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
