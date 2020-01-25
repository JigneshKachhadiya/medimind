import React, { PureComponent } from "react";
import { View, Text, Platform, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Dimensions, Image, Linking } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import color from '../appConfig/color';
import * as Animatable from 'react-native-animatable';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = (props) => StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  viewStyle: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5
  },
  textStyleLogin: {
    color: 'rgb(142,142,147)',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold'
  },
  closeIconView: {
    // marginHorizontal: 20,
    ...ifIphoneX({
      marginTop: 30
    },
      {
        marginTop: Platform.OS === 'android' ? 10 : 20
      }),
  },
  iconStyle: {
    width: 40,
    height: 40
  },
  roarImg: {
    width: 150,
    height: 24.5
  },
  socialView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  btnView: {
    flexDirection: 'row',
    height: 65,
    alignItems: 'center'
  },
  imgIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  textView: {
    flex: 1,
    paddingHorizontal: 15
  },
  textStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    color: '#1B1E21'
  },
  langView: {
    margin: 30,
    borderWidth: 1,
    borderColor: '#BDC0C3',
    borderRadius: 7,
    paddingHorizontal: 20
  },
  iconColor: {
    color: '#000'
  },
  textStyle: {
    color: color.themeColor,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  btn: {
    height: 50,
    justifyContent: 'center'
  }
});
class Menu extends PureComponent {
  static navigationOptions = {
    tabBarVisible: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      isOnDefaultToggleSwitch: true,
      isSwitch1On: false,
    }
  }



  onToggle(value) {
    this.setState({ isSwitch1On: value });
  }
  _btnClick(scr) {
    console.log('scr', scr);

    this.props.navigation.navigate(scr)
    this.props.closeModal(false);
  }

  // logout() {
  //   countlyLogEvents('Logout');
  //   fbLogEvents('Logout');
  //   AsyncStorage.clear(() => {
  //     const routeName = 'Home';
  //     const resetAction = StackActions.reset({
  //       index: 0,
  //       actions: [NavigationActions.navigate({ routeName })],
  //     });
  //     AsyncStorage.setItem('reduxDumb', JSON.stringify(this.currentStorage()), () => {
  //       this.props.actions.Logout().then((result) => {
  //         this.props.navigation.dispatch(resetAction);
  //       }).catch((error) => {
  //       })
  //     });
  //   });
  // }

  // _onHome() {
  //   this.props.navigation.navigate('Home');
  //   this.props.closeModal(false)
  // }

  render() {
    console.log('this.props', this.props);

    return (
      <Animatable.View animation="fadeInLeft" duration={500} direction="normal" style={{ position: 'absolute', width: width, height: height }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles(this.props).mainView}>
            <ScrollView>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles(this.props).iconStyle]} />
                <View style={[styles(this.props).closeIconView, { flex: 1 }]}>
                  <Animatable.View animation="fadeInDownBig" duration={1500} direction="normal">
                    <Text style={{ color: color.themeColor, textAlign: 'center', fontSize: 36, fontWeight: 'bold' }}>foodso</Text>
                  </Animatable.View>
                </View>
                <View style={[styles(this.props).closeIconView, styles(this.props).iconStyle, { alignItems: 'center' }]}>
                  <TouchableOpacity onPress={() => {
                    this.props.closeModal(false);
                  }}>
                    <Icon name='ios-close' size={40} color={color.themeColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => this._btnClick('Home')}
                  style={styles(this.props).btn}
                >
                  <Text style={[styles(this.props).textStyle]}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._btnClick('Bookmark')}
                  style={styles(this.props).btn}
                >
                  <Text style={[styles(this.props).textStyle]}>BOOKMARK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._btnClick('Plus')}
                  style={styles(this.props).btn}
                >
                  <Text style={[styles(this.props).textStyle]}>ADD RECEIPE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._btnClick('Fav')}
                  style={styles(this.props).btn}
                >
                  <Text style={[styles(this.props).textStyle]}>LIKE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._btnClick('Account')}
                  style={styles(this.props).btn}
                >
                  <Text style={[styles(this.props).textStyle]}>PROFILE</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: 25 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.closeModal(false)} />
          </View>

        </View>
      </Animatable.View>
    )
  }
}

export default Menu;


