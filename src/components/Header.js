import React, { PureComponent } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, Modal, Platform, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import image from '../appConfig/image';
import font from '../appConfig/font';
import color from '../appConfig/color';
import Menu from './Menu';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import commonStyle from "../appConfig/commonStyle";

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roarImg: {
    width: 151,
    height: 24.5
  },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 7,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBack: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBtnHome: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  topHead: {
    ...ifIphoneX({
      paddingTop: 30
    },
      {
        paddingTop: Platform.OS === 'android' ? 0 : 20
      }),
  },
});

class Header extends PureComponent {
  static navigationOptions = {
    tabBarVisible: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  navigate() {
    this.props.navigation.goBack()
  }

  _hamburgClick() {
    this.setModalVisible(!this.state.modalVisible);
  }

  _LogoClick() {
    this.props.navigation.navigate("Home")
  }

  _isFontSize() {
    this.props.fontViewShow();
  }

  render() {
    return (
      <SafeAreaView style={[styles.topHead]} >
        {this.props.isHome ?
          <View style={[styles.mainView, { paddingHorizontal: 20 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={1} onPress={() => this._LogoClick()}>
                <Text>header</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => { }} style={styles.iconBtnHome}>
                <Text>
                  <EvilIcons name='search' size={42} style={{ color: '#eee' }} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={styles.mainView}>
            <View style={{ height: 50, marginLeft: 8, justifyContent: 'center' }}>
              {
                this.props.isBack ?
                  <TouchableOpacity onPress={() => this.navigate()} style={styles.iconBack}>
                    <Ionicons name={'md-arrow-back'} size={30} style={{ color: color.black }} />
                  </TouchableOpacity>
                  :
                  <View>
                    {
                      this.props.isHamburg ?
                        <TouchableOpacity onPress={() => {
                          // this._hamburgClick()
                        }}
                          activeOpacity={0.6}
                          style={{
                            height: 40,
                            width: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: color.blackTheme,
                            borderTopRightRadius: 6,
                            borderBottomRightRadius: 6
                          }}>
                          <Ionicons name={'ios-arrow-back'} size={20} style={{ color: color.white }} />
                        </TouchableOpacity>
                        :
                        null
                    }
                  </View>
              }
            </View>
            {
              this.props.isHeart &&
              <View style={commonStyle.ph10}>
                <Image source={image.doubleHeartIcon} style={{ height: 30, width: 30 }} resizeMode={'contain'}></Image>
              </View>
            }

            {
              this.props.isSearch &&
              <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                <EvilIcons name={'search'} size={25} style={{ color: '#000', paddingLeft: 10 }} />
                <TextInput
                  placeholder='Search'
                  style={{ flex: 1, ...font.fs14, paddingHorizontal: 10, height: 35, paddingVertical: 0 }} />
              </View>
            }
            {this.props.isTitle &&
              <View style={{ flex: 1, marginLeft: 20, height: 50, justifyContent: 'center' }}>
                <Text style={{ ...font.fs18b, color: color.blackTheme }}>{this.props.title}</Text>
              </View>
            }
            {this.props.isCart &&
              <TouchableOpacity style={styles.iconBtn}>
                <Image source={image.clockIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                {/* <Feather name={'clock'} size={22} style={{ color: color.black }} /> */}
              </TouchableOpacity>
            }
            {this.props.isSearchIcon &&
              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('SearchItem')}
                style={[styles.iconBtn, { marginRight: 15 }]}>
                <Feather name='search' size={18} color={color.black} />
              </TouchableOpacity>
            }
          </View>
        }

        <Modal
          transparent={true}
          // animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //alert('Modal has been closed.');
          }}>
          <Menu {...this.props} closeModal={this.setModalVisible} />
        </Modal>

      </SafeAreaView>
    )
  }
}

export default Header;


