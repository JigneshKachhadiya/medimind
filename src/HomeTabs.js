// @flow
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, SafeAreaView, View, Text, Image, Dimensions } from "react-native";
import { connect } from 'react-redux';
import image from "./appConfig/image";
import color from './appConfig/color'
import Home from "./containers/Home";
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationEvents } from 'react-navigation';
import font from "./appConfig/font";
import MiniPlayer from "./components/MiniPlayer"

const { height, width } = Dimensions.get('window');

class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBtn: 'Home',
      miniPlay: false,
    }
  }

  static tabs = [
    {
      Name: "Home",
      label: 'Home',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    }, {
      Name: "Meditation",
      label: 'Meditation',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    }, {
      Name: "Music",
      label: 'Music',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    }, {
      Name: "Favorite",
      label: 'Favorite',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    }, {
      Name: "Profile",
      label: 'Profile',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    }
  ];

  filterClick(navBtn) {
    this.setState({ navBtn });
    this.props.navigation.navigate(navBtn)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    this.setState({
      miniPlay: props.currentArticle && props.currentArticle.isMiniPlay ? props.currentArticle.isMiniPlay : false
    })
  }

  payloadFocus(payload) {
    this.setState({ navBtn: payload.action.routeName || this.state.navBtn })
  }
  render() {
    const { navigation } = this.props;
    const navState = navigation.state;
    const { miniPlay } = this.state;
    const cIdx = navState.index;
    return (
      <SafeAreaView style={styles(this.props).tabs}>
        <NavigationEvents onWillFocus={payload => this.payloadFocus(payload)} />
        {/* <NavigationEvents onWillFocus={payload => { this.setState({ navBtn: payload.action.routeName || this.state.navBtn }) }} /> */}
        {
          miniPlay &&
          <View style={styles.miniPlayerConteainer}>
            <MiniPlayer />
          </View>
        }
        <View style={styles(this.props).container}>

          <View style={{ flexDirection: "row", alignItems: 'flex-end' }}>
            {
              HomeTabs.tabs.map((info, i) => {
                return (
                  <View key={i} style={styles(this.props).tab}>
                    {
                      info.Name == 'Home' &&
                      <TouchableOpacity onPress={() => { this.props.navigation && this.props.navigation.navigate(info.Name) }}
                        style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
                        <View>
                          <View style={styles(this.props).tab}>
                            <Image source={image.feedIcon}
                              style={{ tintColor: cIdx == i ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
                            <Text style={{ ...font.fs10SB, textAlign: 'center', color: cIdx == i ? color.blackTheme : color.bdTheme }}>Feed</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                    {
                      info.Name == 'Meditation' &&
                      <TouchableOpacity onPress={() => { this.props.navigation && this.props.navigation.navigate(info.Name) }}
                        style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
                        <View>
                          <View style={styles(this.props).tab}>
                            <Image source={image.meditationIcon}
                              style={{ tintColor: cIdx == i ? color.blackTheme : color.bdTheme, height: 20, width: 30 }} />
                            <Text style={{ ...font.fs10SB, textAlign: 'center', color: cIdx == i ? color.blackTheme : color.bdTheme }}>Meditation</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                    {
                      info.Name == 'Music' &&
                      <TouchableOpacity onPress={() => { this.props.navigation && this.props.navigation.navigate(info.Name) }}
                        style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
                        <View>
                          <View style={styles(this.props).tab}>
                            <Image source={image.musicIcon}
                              style={{ tintColor: cIdx == i ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
                            <Text style={{ ...font.fs10SB, textAlign: 'center', color: cIdx == i ? color.blackTheme : color.bdTheme }}>Music</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                    {
                      info.Name == 'Favorite' &&
                      <TouchableOpacity onPress={() => { this.props.navigation && this.props.navigation.navigate(info.Name) }}
                        style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
                        <View>
                          <View style={styles(this.props).tab}>
                            <Image source={image.fevoriteIcon}
                              style={{ tintColor: cIdx == i ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
                            <Text style={{ ...font.fs10SB, textAlign: 'center', color: cIdx == i ? color.blackTheme : color.bdTheme }}>Favorites</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                    {
                      info.Name == 'Profile' &&
                      <TouchableOpacity onPress={() => { this.props.navigation && this.props.navigation.navigate(info.Name) }}
                        style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
                        <View>
                          <View style={styles(this.props).tab}>
                            <Image source={image.profileIcon}
                              style={{ tintColor: cIdx == i ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
                            <Text style={{ ...font.fs10SB, textAlign: 'center', color: cIdx == i ? color.blackTheme : color.bdTheme }}>Profile</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                  </View>
                )
              }
              )}
            {/* <TouchableOpacity onPress={() => { this.filterClick('Home') }}
            style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
            <View>
              <View style={styles(this.props).tab}>
                <Image source={image.feedIcon}
                  style={{ tintColor: this.state.navBtn === 'Home' ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
              </View>
              <Text style={{ ...font.fs10SB, textAlign: 'center', color: this.state.navBtn === 'Home' ? color.blackTheme : color.bdTheme }}>Feed</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.filterClick('Meditation') }}
            style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
            <View>
              <View style={styles(this.props).tab}>
                <Image source={image.meditationIcon}
                  style={{ tintColor: this.state.navBtn === 'Meditation' ? color.blackTheme : color.bdTheme, height: 20, width: 30 }} resizeMode={'contain'} />
              </View>
              <Text style={{ ...font.fs10SB, textAlign: 'center', color: this.state.navBtn === 'Meditation' ? color.blackTheme : color.bdTheme }}>Meditation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.filterClick('Music') }}
            style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
            <View>
              <View style={styles(this.props).tab}>
                <Image source={image.musicIcon}
                  style={{ tintColor: this.state.navBtn === 'Music' ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
              </View>
              <Text style={{ ...font.fs10SB, textAlign: 'center', color: this.state.navBtn === 'Music' ? color.blackTheme : color.bdTheme }}>Music</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.filterClick('Favorite') }}
            style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
            <View>
              <View style={styles(this.props).tab}>
                <Image source={image.fevoriteIcon}
                  style={{ tintColor: this.state.navBtn === 'Favorite' ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
              </View>
              <Text style={{ ...font.fs10SB, textAlign: 'center', color: this.state.navBtn === 'Favorite' ? color.blackTheme : color.bdTheme }}>Favorites</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.filterClick('Profile') }}
            style={[styles(this.props).btnFlex, { height: 50, backgroundColor: '#fff', justifyContent: 'center' }]}>
            <View>
              <View style={styles(this.props).tab}>
                <Image source={image.profileIcon}
                  style={{ tintColor: this.state.navBtn === 'Profile' ? color.blackTheme : color.bdTheme, height: 20, width: 20 }} />
              </View>
              <Text style={{ ...font.fs10SB, textAlign: 'center', color: this.state.navBtn === 'Profile' ? color.blackTheme : color.bdTheme }}>Profile</Text>
            </View>
          </TouchableOpacity> */}
          </View>
        </View >
      </SafeAreaView >
    );
  }
}

function mapStateToProps(state) {
  return {
    currentArticle: state.currentPlaye.currentPlayData,
    currentUserData: state.loginUser.currentUserData
  };
}

function mapDispatchToProps(dispatch) { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabs);



const styles = (props) => StyleSheet.create({
  tabs: {
    backgroundColor: '#fff',
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderTopColor: '#e1e1e1',
    borderRadius: 5,
    height: 60
  },
  tab: {
    flexGrow: 1,
    // height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  nameStyle: {
    fontSize: 12,
  },
  btnFlex: {
    flex: 1
  },
  miniPlayerConteainer: {
    height: 80,
    width: width,
    backgroundColor: color.white
  }
});

{/* <View style={styles(this.props).container}>
{
  HomeTabs.tabs.map((info, i) => {
    // const color = i === cIdx
    // ? Theme.palette.primary
    // : Theme.palette.lightGray;
    return (
      <View>
        <TouchableOpacity key={`mainslider_${info.Name}`} onPress={() => { this.props.navigation.navigate(info.Name) }}>
          <View>
            <View style={styles(this.props).tab}>
              {/* <Image source={cIdx == i ? info.activeImg : info.inActiveImg} style={{ height: 32, width: 32, resizeMode: 'contain' }} /> */}
//               <Text style={[styles(this.props).nameStyle, { color: cIdx == i ? '#1B1E21' : 'red' }]}>{info.label}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   })
// }
// </View> */}