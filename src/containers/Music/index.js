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
import _ from 'underscore';
import { bindActionCreators } from 'redux';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import ImageHeader from '../../components/ImageHeader';
import FavoriteSoundList from '../../components/FavoriteSoundList';

import * as Animatable from 'react-native-animatable';
import styles from './styles';

import commonStyle from '../../appConfig/commonStyle';
import image from "../../appConfig/image";

class Music extends Component {
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

  mostPlayedArt = () => {

  }

  render() {
    const { soundList } = this.state;
    // console.log('----------MostPlayed---------', this.props.articleData)
    let allArticleData = this.props.articleData;
    let recentPlayedArt = allArticleData && allArticleData.length > 0 && _.filter(allArticleData, (item) => {
      return item.recentPlayed > 0 
    })

    let mostPlayedArt = allArticleData && allArticleData.length > 0 && _.filter(allArticleData, (item) => {
      return item.mostPlayed > 0
    })
    return (
      <SafeAreaView style={commonStyle.container}>
        <View animation="fadeInDownBig" duration={1500} direction="normal">
          <Header {...this.props} isTitle={true} title={'Sounds'} isSearchIcon={true} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={[commonStyle.pv10]}>
              <ImageHeader />
            </View>
            {/* -------------------- RECENTLY PLAYED ----------- */}
            <View>
              <View style={[commonStyle.fdRow, commonStyle.ph20, { marginTop: 20 }]}>
                <Text style={styles.recentPlayText}>RECENTLY PLAYED</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AllSong')}
                  style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Image source={image.rightarrowIcon} style={{ height: 18, width: 18 }} />
                </TouchableOpacity>
              </View>
              <View style={[commonStyle.ph10]}>
                <FlatList
                  horizontal
                  data={recentPlayedArt.reverse()}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item, index }) => {
                    return (
                      <FavoriteSoundList rowData={item} {...this.props} isMusic={true} />
                    )
                  }}
                  showsVerticalScrollIndicator={false}
                  extraData={this.props}
                  keyExtractor={item => item.id}
                  onEndReachedThreshold={0.2}
                  initialNumToRender={10}
                  windowSize={5}
                  scrollEventThrottle={10}
                  refreshing={this.state.refreshing}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>

            {/* -------------------- Most PLAYED ----------- */}
            <View>
              <View style={[commonStyle.fdRow, commonStyle.ph20, { marginTop: 20 }]}>
                <Text style={styles.recentPlayText}>MOST PLAYED</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AllSong')}
                  style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Image source={image.rightarrowIcon} style={{ height: 18, width: 18 }} />
                </TouchableOpacity>
              </View>
              <View style={[commonStyle.ph10]}>
                <FlatList
                  horizontal
                  data={mostPlayedArt.reverse()}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item, index }) => {
                    return (
                      <FavoriteSoundList rowData={item} {...this.props} isMusic={true} />
                    )
                  }}
                  showsVerticalScrollIndicator={false}
                  extraData={this.props}
                  keyExtractor={item => item.id}
                  onEndReachedThreshold={0.2}
                  initialNumToRender={10}
                  windowSize={5}
                  scrollEventThrottle={10}
                  refreshing={this.state.refreshing}
                  showsHorizontalScrollIndicator={false}
                />
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
    articleData: state.article.articleData,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);


