import React, { Component } from "react";
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image, Scroll } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fonts from '../appConfig/font';
import color from '../appConfig/color';
import commonStyle from "../appConfig/commonStyle";
import _ from 'underscore';
import image from "../appConfig/image";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Category extends Component {
  static defaultProps = {
    isLoading: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    const { rowData, mainCatName } = this.props;
    let article = { "mainCat": mainCatName, "subCatId": rowData.id, }
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Article', { articleData: article })}
          activeOpacity={1}>
          <Image source={{ uri: rowData.imgUrl }}
            style={styles.bgImage} />
          {/* <Image source={image.m5}
            style={styles.bgImage} /> */}
          <View style={styles.bodyCon}>
            <View style={[commonStyle.fdRow, commonStyle.mrT15]}>
              <View style={[commonStyle.flex1]}>
                <View style={styles.leftIconView}>
                  <MaterialIcons name='queue-music' size={22} color={color.white} />
                </View>
              </View>
              <View style={styles.rightIconView}>
                <View style={[commonStyle.pdR20, commonStyle.fdRow, commonStyle.jcaiCntr]}>
                  <FontAwesome name='play' size={15} color={color.white} style={{ marginTop: 3 }} />
                  <Text style={{ color: color.white, ...fonts.fs10R, marginLeft: 5, }}>2.8 k</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomContant}>
              <Text style={styles.titleText}>{rowData.name}</Text>
              <Text style={styles.subTitleText}>{rowData.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Category


const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 7,
    marginBottom: 14
  },
  bgImage: {
    width: (deviceWidth / 2) - 20,
    height: deviceHeight / 3.80,
    borderRadius: 10
  },
  bodyCon: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    height: deviceHeight / 3.80,
    width: (deviceWidth / 2) - 20,
    borderRadius: 10
  },
  leftIconView: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25
  },
  rightIconView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bottomContant: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  titleText: {
    color: color.white,
    ...fonts.fs12SB,
    letterSpacing: 1,
    paddingBottom: 5
  },
  subTitleText: {
    color: color.white,
    ...fonts.fs11UL,
    letterSpacing: 1
  }
});