import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as homeActions from '../../actions/homeActions';
import * as loginActions from '../../actions/loginActions';
import * as articleActions from '../../actions/articleActions';
import * as activityActions from '../../actions/activityActions';

import _ from "underscore";
import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import MainSlider from '../../components/MainSlider';
import Category from '../../components/Category';
import Loader from '../../components/Loader';
import firebase from 'react-native-firebase';

class Home extends Component {
  static defaultProps = {
    isLoading: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'now',
      isLoading: false
    }
    this.getArticle = this.getArticle.bind(this);
  }
  componentDidMount() {
    this.getCategory();
    this.getMainSliderData();
    this.getSubCategory();
    this.getArticle();
    this.getAllActivity();
    this.props.loginOnSnapshotActions.loginUser();
  }

  componentWillMount() { }

  getMainSliderData() {
    this.setState({ isLoading: true })
    this.props.actions.getMainSlider().then(data => {
      if (data) {
        this.setState({ isLoading: false });
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  // ----------------------- GetMainCategory --------------

  getCategory() {
    this.setState({ isLoading: true })
    this.props.actions.getMainCategory().then(data => {
      if (data) {
        this.setState({ isLoading: false });
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  // ----------------------- GetSubCategory ------------

  getSubCategory() {
    this.setState({ isLoading: true })
    this.props.actions.getSubCategory().then(data => {
      if (data) {
        this.setState({ isLoading: false });
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  // ----------------------- GetArticle --------------

  getArticle() {
    this.setState({ isLoading: true })
    this.props.articleActions.getAllArticle().then(data => {
      if (data) {
        this.setState({ isLoading: false });
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  // ----------------------- GetActivity --------------
  getAllActivity() {
    const uid = firebase.auth().currentUser && firebase.auth().currentUser.uid
    this.setState({ isLoading: true })
    this.props.activityActions.getActivity(uid).then(data => {
      if (data) {
        this.setState({ isLoading: false });
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }
  // -----------------------------------------------------

  componentWillReceiveProps(props) {
  }

  render() {
    const { isLoading } = this.state;
    let mainSlider = this.props.mainSliderData && this.props.mainSliderData.length > 0 ? this.props.mainSliderData : [];
    let mainCatList = this.props.mainCategoryData && this.props.mainCategoryData.length > 0 ? this.props.mainCategoryData : [];
    let subCatList = this.props.subCategoryData && this.props.subCategoryData.length > 0 ? this.props.subCategoryData : [];
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
          <Header {...this.props} isHamburg={true} isSearch={true} isCart={true} isHeart={false} />
        </View>
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            <View>
              <MainSlider data={mainSlider} {...this.props} />
            </View>
            {
              mainCatList && mainCatList.length > 0 &&
              mainCatList.map((item, index) => {
                let subCatData = subCatList && subCatList.length > 0 && _.filter(subCatList, (value) => { return value.categoryId == item.id });
                let finalSubCatData = subCatData && subCatData.length > 0 && subCatData.slice(0, 4);
                let mainCatName = item.name;
                return (
                  <View key={index}>
                    <View style={[commonStyle.fdRow, commonStyle.ph10]}>
                      <View style={[commonStyle.flex1, { justifyContent: 'center' }]}>
                        <Text style={{ color: color.black, ...fonts.fs14b }}>{item.name.toUpperCase()}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SubCategoryList', { subCatData: subCatData, mainCatName: mainCatName })}
                        style={[commonStyle.homeTopBtn]}>
                        <AntDesign name='arrowright' size={25} color={color.black} />
                      </TouchableOpacity>
                    </View>
                    <View style={[commonStyle.pv10, { paddingHorizontal: 5 }]}>
                      <FlatList
                        data={finalSubCatData}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item, index }) => {
                          return (
                            <Category
                              style={{ marginHorizontal: 5 }}
                              mainCatName={mainCatName}
                              isHomeCard={true}
                              rowData={item}
                              navigation={this.props.navigation}
                              subCatList={subCatData} />
                          )
                        }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        extraData={this.props}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={0.2}
                        initialNumToRender={10}
                        windowSize={5}
                        scrollEventThrottle={10}
                        refreshing={this.state.refreshing}
                      />
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView >
    )
  }
}

function mapStateToProps(state) {
  return {
    mainSliderData: state.homeData.mainSliderData,
    mainCategoryData: state.homeData.mainCategoryData,
    subCategoryData: state.homeData.subCategoryData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(homeActions, dispatch),
    loginOnSnapshotActions: bindActionCreators(loginActions, dispatch),
    articleActions: bindActionCreators(articleActions, dispatch),
    activityActions: bindActionCreators(activityActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


