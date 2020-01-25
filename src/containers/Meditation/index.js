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
  FlatList
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import ImageHeader from '../../components/ImageHeader';
import Category from '../../components/Category';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

import commonStyle from '../../appConfig/commonStyle';
import image from "../../appConfig/image";

const deviceWidth = Dimensions.get("window").width;


class Meditation extends Component {
  static defaultProps = {
    isLoading: false,
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  render() {
    let subCatList = this.props.subCategoryData && this.props.subCategoryData.length > 0 ? this.props.subCategoryData : [];
    return (
      <SafeAreaView style={commonStyle.container}>
        <View animation="fadeInDownBig" duration={1500} direction="normal">
          <Header {...this.props} isTitle={true} title={'Meditation'} isSearchIcon={true} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={[commonStyle.pv10]}>
              <ImageHeader />
            </View>

            <View style={[commonStyle.marginV10]}>
              <View>
                <View style={[commonStyle.pv10, { paddingHorizontal: 5 }]}>
                  <FlatList
                    data={subCatList}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item, index }) => {
                      return (
                        <Category style={{ marginHorizontal: 5 }} mainCatName={''} rowData={item} navigation={this.props.navigation} />
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView >
    )
  }
}

function mapStateToProps(state) {
  return {
    subCategoryData: state.homeData.subCategoryData,
    articleData: state.article.articleData,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Meditation);


