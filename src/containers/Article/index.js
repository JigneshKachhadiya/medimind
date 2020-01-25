import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import _ from 'underscore';
import * as articleActions from '../../actions/articleActions';
import styles from './styles';
import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';

const deviceWidth = Dimensions.get("window").width;

class Article extends Component {
  static defaultProps = {
    isLoading: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'now',
      headerTitle: '',
      favoriteArt: [],
      articleList: []
    }
    this.getArticle = this.getArticle.bind(this);
  }

  componentWillMount() {
    this.getArticle();
    this.getArticleList();
    this.setState({
      headerTitle: this.props.navigation.state.params.articleData.mainCat
    })
  }

  componentWillReceiveProps(props) {
    this.getArticleList();
    const { favoriteArt } = this.state;
    let currentUserArt = props.currentUserData && props.currentUserData[0]
    if (currentUserArt && currentUserArt.likeArticles) {
      this.setState({
        favoriteArt: currentUserArt.likeArticles
      })
    }
  }

  // ----------------------- GetArticle --------------
  getArticle() {
    this.setState({ isLoading: true })
    this.props.actions.getAllArticle().then(data => {
      if (data) {
        this.setState({ isLoading: false });
      }
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  getArticleList() {
    let subCatId = this.props.navigation.state.params.articleData.subCatId;
    let article = this.props.articleData && this.props.articleData.length > 0 ? this.props.articleData : [];
    let finalData = _.filter(article, (el) => {
      return el.subCategoryId === subCatId
    })
    this.setState({
      articleList: finalData
    })
  }

  favoriteArticle(articleData) {
    this.props.actions.likeArticle(articleData).then(data => {
    }).catch(e => {
      this.setState({ isLoading: false });
      this.dropdown.alertWithType('error', '', e);
    });
  }

  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    const { headerTitle, favoriteArt, articleList } = this.state;
    // console.log('------------ thisparops ---------------', this.props.articleData)
    let title = this.jsUcfirst(headerTitle);
    return (
      <SafeAreaView style={commonStyle.container}>
        <ScrollView>
          <View style={[commonStyle.mrB20]}>
            <View>
              <View style={{ backgroundColor: color.white }}>
                <View>
                  <Image source={image.m1} style={styles.backGroungIMG} />
                </View>
                <View style={styles.mainContainer}>
                  <View style={styles.headerContainer}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => this.props.navigation.goBack()}                      >
                      <Ionicons name='md-arrow-back' size={30} color={color.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <View style={styles.headerSearchIcon}>
                      <Feather name='search' size={22} color={color.white} />
                    </View>
                  </View>
                  <View style={styles.detaileView}>
                    <MaterialIcons name='queue-music' size={35} color={color.white} />
                    <Text style={styles.musicTitle}>
                      Breathing Meditation
                      </Text>
                    <Text style={styles.musicSubTitle}>
                      Loren ipsum dolor sit amet consectetur adipiscing elit
                      </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.playControllerView}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  // onPress={() => this.props.navigation.navigate('PlayMusic')}
                  style={{ backgroundColor: color.white, borderRadius: 30 }}>
                  <AntDesign name='play' size={35} color={color.black} />
                </TouchableOpacity>
              </View>
              <View style={[commonStyle.pv10, commonStyle.ph20, commonStyle.mrB20]}>
                <Text style={styles.description}>
                  Meditation is a practice where an individual uses a technique such as mindfulness, or focusing the mind on a particular object, thought or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state
                </Text>
              </View>
              {
                articleList && articleList.length > 0 &&
                articleList.map((item, index) => {
                  let isFavorite = _.filter(favoriteArt, (el) => { return el.articleId == item.id })
                  let favoriteIcon = 'hearto';
                  if (isFavorite && isFavorite[0] && isFavorite[0].articleId == item.id) {
                    favoriteIcon = 'heart'
                  }
                  return (
                    <View key={index} style={styles.listContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => this.props.navigation.navigate('PlayMusic', { mediaObj: item })}
                          style={{ flex: 1, flexDirection: 'row' }}>
                          <View>
                            <Image source={{ uri: item.imgUrl }} style={styles.listImage} />
                          </View>
                          <View style={styles.listText}>
                            <Text style={styles.listTitle}>{item.name}</Text>
                            <Text style={{ ...fonts.fs12R, color: color.textInput75, marginTop: 2 }}>{item.description}</Text>
                          </View>
                        </TouchableOpacity>

                        <View style={styles.iconContainer}>
                          <TouchableOpacity
                          >
                            <FontAwesome5 name='cloud-download-alt' size={20} color={color.black} style={{ marginRight: 15 }} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => this.favoriteArticle(item)}
                          >
                            <AntDesign name={favoriteIcon} size={20} color={color.blackTheme} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
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
    currentUserData: state.loginUser.currentUserData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(articleActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);


