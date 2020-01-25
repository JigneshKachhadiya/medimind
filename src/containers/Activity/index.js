import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal,
  TextInput
} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityActions from '../../actions/activityActions';

import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from "./styles";

import firebase from 'react-native-firebase';

class Activity extends Component {
  static defaultProps = {
    isLoading: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      delereGoalModal: false,
      goalValue: '',
    }
  }

  componentDidMount() {
    this.getAllActivity();
  }

  getAllActivity() {
    const uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
    this.setState({ isLoading: true })
    this.props.actions.getActivity(uid).then(data => {
      if (data) {
        this.setState({ isLoading: false });
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  saveGoal = () => {
    const { goalValue } = this.state;
    const activityId = this.props.activityData && this.props.activityData.length > 0 && this.props.activityData[0].id
    firebase.firestore().collection('activity').doc(activityId).update({ goal: goalValue });
    this.setState({
      modalVisible: false
    })
  }
  deleteGoal = () => {
    const activityId = this.props.activityData && this.props.activityData.length > 0 && this.props.activityData[0].id
    firebase.firestore().collection('activity').doc(activityId).update({ goal: "" });
    this.setState({
      delereGoalModal: false
    })
  }
  render() {
    const { soundList, isLoading } = this.state;
    let activityData = this.props.activityData && this.props.activityData.length > 0 && this.props.activityData[0];
    console.log('--------------activityData-----------', activityData)
    let activityDur = activityData ? activityData.duration : 0;
    let toDayDuration = parseInt(activityDur);
    let totalHrs = parseInt(toDayDuration / (60 * 60));
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => this.dropdown = ref} />
        {
          isLoading &&
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        }
        <View>
          <Header {...this.props} isBack={true} isTitle={true} title={'Activity'} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[commonStyle.flex1, commonStyle.ph15]}>
            <View style={[commonStyle.pv10, commonStyle.ph10, commonStyle.jcaiCntr]}>
              <Ionicons name='md-alarm' size={25} color={color.black} />
              <Text style={styles.dailyActText}>Your Daily Activity</Text>
              <Text style={{ textAlign: 'center', ...fonts.fs12R }}>
                Start your timer session with vibrate, with background music.Timer ends with vibration
              </Text>
            </View>

            {/* --------------------------------------  ToDay ---------------------------------------*/}

            <View style={[commonStyle.flex1, commonStyle.fdRow, commonStyle.pv20]}>
              <View style={[styles.toDayProgressView, commonStyle.mrR10]}>
                <View style={[commonStyle.fdRow, commonStyle.jcaiCntr, commonStyle.pv20]}>
                  <View style={styles.activeDote} />
                  <Text style={styles.dayText}>ToDay</Text>
                </View>
                <View style={[commonStyle.pv10, commonStyle.jcaiCntr]}>
                  <AnimatedCircularProgress
                    size={120}
                    width={15}
                    fill={toDayDuration}
                    tintColor="#1470FE"
                    onAnimationComplete={(val) => console.log('onAnimationComplete', val)}
                    backgroundColor="#eee" >
                    {
                      (fill) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ ...fonts.fs18b }}>{toDayDuration}</Text>
                          <Text style={{ ...fonts.fs12R, color: color.textInput75 }}>/{toDayDuration} min</Text>
                        </View>

                      )
                    }
                  </AnimatedCircularProgress>
                </View>
                <View style={commonStyle.pv10}>
                  <View style={[commonStyle.fdRow, commonStyle.ph10, { justifyContent: 'space-between' }]}>
                    <Text style={{ ...fonts.fs12R, color: color.blackTheme }}>Sessions</Text>
                    <Text style={{ ...fonts.fs12R, color: color.textInput75 }}>2 times</Text>
                  </View>
                  <View style={[commonStyle.fdRow, commonStyle.ph10, commonStyle.pv10, { justifyContent: 'space-between' }]}>
                    <Text style={{ ...fonts.fs12R, color: color.blackTheme }}>Durations</Text>
                    <Text style={{ ...fonts.fs12R, color: color.textInput75 }}>{toDayDuration} min</Text>
                  </View>
                </View>
              </View>

              {/* --------------------------------------  YESTERDAY ---------------------------------------*/}
              <View style={[styles.toDayProgressView, { marginRight: 10 }]}>
                <View style={[commonStyle.fdRow, commonStyle.jcaiCntr, commonStyle.pv20]}>
                  <View style={[styles.activeDote, { backgroundColor: color.pinkColor, }]} />
                  <Text style={styles.dayText}>YESTERDAY</Text>
                </View>
                <View style={[commonStyle.pv10, commonStyle.jcaiCntr]}>
                  <AnimatedCircularProgress
                    size={120}
                    width={15}
                    fill={50}
                    tintColor="#FE1477"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#eee" >
                    {
                      (fill) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ ...fonts.fs18b }}>50</Text>
                          <Text style={{ ...fonts.fs12R, color: color.textInput75 }}>/60 min</Text>
                        </View>

                      )
                    }
                  </AnimatedCircularProgress>
                </View>
                <View style={commonStyle.pv10}>
                  <View style={[commonStyle.fdRow, commonStyle.ph10, { justifyContent: 'space-between' }]}>
                    <Text style={{ ...fonts.fs12R, color: color.blackTheme }}>Sessions</Text>
                    <Text style={{ ...fonts.fs12R, color: color.textInput75 }}>3 times</Text>
                  </View>
                  <View style={[commonStyle.fdRow, commonStyle.ph10, commonStyle.pv10, { justifyContent: 'space-between' }]}>
                    <Text style={{ ...fonts.fs12R, color: color.blackTheme }}>Durations</Text>
                    <Text style={{ ...fonts.fs12R, color: color.textInput75 }}>50 min</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[commonStyle.ph10]}>
              <Text style={styles.LiteTimeText}>Your Lifetime Sessions</Text>
              <View style={[commonStyle.fdRow, commonStyle.jcaiCntr, commonStyle.pv20]}>
                <Image source={image.allsessionsIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                <Text style={[commonStyle.ph20, styles.LiteTimeText, { ...fonts.fs14R }]}>All Sessions</Text>
                <View style={[commonStyle.flex1, { alignItems: 'flex-end' }]}>
                  <Text style={{ ...fonts.fs14R }}>4 times</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('StartTimer')}
                style={[commonStyle.fdRow, commonStyle.jcaiCntr,]}>
                <Image source={image.totledurationIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                <Text style={[commonStyle.ph20, styles.LiteTimeText, { ...fonts.fs14R }]}>Total Duration</Text>
                <View style={[commonStyle.flex1, { alignItems: 'flex-end' }]}>
                  <Text style={{ ...fonts.fs14R }}>{totalHrs} hrs</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[commonStyle.ph10, commonStyle.pv20]}>
              <View style={[commonStyle.fdRow, commonStyle.jcaiCntr, commonStyle.pv20]}>
                <Image source={image.mygoalIcon} style={{ height: 22, width: 22 }} resizeMode={'contain'} />
                <Text style={[commonStyle.ph20, styles.LiteTimeText, { ...fonts.fs14R }]}>My Goal</Text>
                {
                  activityData && activityData.goal == "" ?
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(true);
                      }}
                      style={[commonStyle.flex1, { alignItems: 'flex-end' }]}>
                      <AntDesign name='pluscircleo' size={20} color={color.black} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ delereGoalModal: true })
                      }}
                      style={[commonStyle.flex1, { alignItems: 'flex-end' }]}>
                      <AntDesign name='minuscircleo' size={20} color={color.black} />
                    </TouchableOpacity>
                }

              </View>
              <View style={{ paddingLeft: 40 }}>
                <Text>{activityData.goal}</Text>
              </View>
            </View>

            {/* --------------------- Delete Goal confirm Modal --------------------------- */}
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.delereGoalModal}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View
                  style={styles.modalContainer}>
                  <View style={styles.deleteModalBody}>
                    <View style={[commonStyle.ph15, commonStyle.mrT20]}>
                      <Text style={{ ...fonts.fs14R }}>Are you sure you want to delete this goal?</Text>
                    </View>
                    <View style={styles.closeModalBtnCon}>
                      <TouchableOpacity
                        onPress={() => this.setState({ delereGoalModal: false })}
                        style={styles.btnNo}>
                        <Text style={{ ...fonts.fs14R, color: color.blueColor }}>NO</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.deleteGoal()}
                        style={styles.btnYes}>
                        <Text style={{ ...fonts.fs14R, color: color.pinkColor }}>YES</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </Modal>
            </View>

            {/* --------------------- Goal Modal --------------------------- */}

            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <TouchableOpacity
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                  style={styles.modalContainer}>
                  <View style={styles.modalBody}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                      style={[commonStyle.ph20, styles.closeIcon]}>
                      <Ionicons name='md-close' size={25} color={color.black} />
                    </TouchableOpacity>

                    <View style={[commonStyle.ph25]}>
                      <Text style={styles.setGoalText}>Set Your Goal </Text>
                      <Text style={[commonStyle.aiTextCntr, commonStyle.pv10, { ...fonts.fs14R }]}>Lorem ipsum dolor sit amet consecttur adipicing elit</Text>
                    </View>
                    <View>
                      <TextInput
                        placeholder={'Set your goal'}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(goal) => this.setState({ goalValue: goal })}
                        value={this.state.goalValue}
                        underlineColorAndroid={'transparent'}
                      />
                    </View>
                    <View style={styles.btnMainView}>
                      <TouchableOpacity
                        onPress={() => this.saveGoal()}
                        style={[commonStyle.jcaiCntr, styles.btnContainde]}>
                        <Text style={styles.btnSaveText}>SAVE GOAL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView >
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUserData: state.loginUser.currentUserData,
    activityData: state.activity.activityData,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);


