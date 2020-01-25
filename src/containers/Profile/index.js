import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Easing,
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import commonStyle from '../../appConfig/commonStyle';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import styles from './styles';
import font from "../../appConfig/font";

import * as loginActions from '../../actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      isReminderChk: true,
      isNotiChk: true,
      isSyncChk: true,
    }
  }

  componentDidMount() {

  }

  logout() {
    let routeName = 'Login'
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.actions.logout();
  }

  render() {
    const { isReminderChk, isNotiChk, isSyncChk } = this.state;
    let profileData = this.props.currentUserData && this.props.currentUserData[0]

    return (
      <SafeAreaView style={[commonStyle.container, { backgroundColor: color.white }]}>
        <ScrollView>
          <View>
            <View style={styles.imageView}>
              {
                profileData.photoURL !== null ?
                  <Image source={{ uri: profileData.photoURL }} style={styles.profileImg} />
                  :
                  <Image source={image.user} style={styles.profileImg} />

              }

              <View style={[commonStyle.flex1, commonStyle.ph20, { paddingTop: 5 }]}>
                <Text style={styles.userNameText}>{profileData.fullName}</Text>
                <Text style={styles.emailText}>{profileData.email}</Text>
              </View>
            </View>
            <View style={styles.dividerView} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <Text style={styles.smallTitleText}>ACCOUNT</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfile')}
                style={styles.myProfileView}>
                <Image source={image.userIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>My Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.smallDivider} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Activity')}
                style={styles.myProfileView}>
                <Image source={image.progressIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>My Progress</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dividerView} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <Text style={styles.smallTitleText}>ALERT</Text>
              <View style={styles.myProfileView}>
                <Image source={image.reminderIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>Reminder</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ isReminderChk: isReminderChk ? false : true })}
                  style={{ flex: 1, alignItems: 'flex-end' }}>
                  {
                    isReminderChk ?
                      <Image source={image.checkIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                      :
                      <Image source={image.uncheckIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                  }
                </TouchableOpacity>
              </View>

            </View>
            <View style={styles.smallDivider} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <View style={styles.myProfileView}>
                <Image source={image.notificationIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>Notification</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ isNotiChk: isNotiChk ? false : true })}
                  style={{ flex: 1, alignItems: 'flex-end' }}>
                  {
                    isNotiChk ?
                      <Image source={image.checkIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                      :
                      <Image source={image.uncheckIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                  }
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.dividerView} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <Text style={styles.smallTitleText}>SETTINGS</Text>
              <View style={styles.myProfileView}>
                <Image source={image.syncmyprogressIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>Sync my progress</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ isSyncChk: isSyncChk ? false : true })}
                  style={{ flex: 1, alignItems: 'flex-end' }}>
                  {
                    isSyncChk ?
                      <Image source={image.checkIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                      :
                      <Image source={image.uncheckIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                  }
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.smallDivider} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <View style={styles.myProfileView}>
                <Image source={image.deleteaccountIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>Delete account</Text>
              </View>
            </View>
            <View style={styles.dividerView} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Test')}
              style={[commonStyle.ph20, commonStyle.pv10]}>
              <Text style={styles.smallTitleText}>HELP & LEGAL</Text>
              <View style={styles.myProfileView}>
                <Image source={image.helpIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>Help</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.smallDivider} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <View style={styles.myProfileView}>
                <Image source={image.policiesIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>Policies</Text>
              </View>
            </View>
            <View style={styles.dividerView} />
            <View style={[commonStyle.ph20, commonStyle.pv10]}>
              <TouchableOpacity
                onPress={() => this.logout()}
                style={styles.myProfileView}>
                <Image source={image.logoutIcon} style={styles.imgIconSize} resizeMode={'contain'} />
                <Text style={styles.myPorofileText}>Logout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.versionView}>
              <Text style={{ ...font.fs14R }}>VERSION 1.1.0</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserData: state.loginUser.currentUserData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);





