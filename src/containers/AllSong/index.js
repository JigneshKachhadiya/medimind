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
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReceipeSlider from '../../components/Category';
import FavoriteSoundList from '../../components/FavoriteSoundList';
import _ from 'underscore';
import * as articleActions from '../../actions/articleActions';
import styles from './styles';

import commonStyle from '../../appConfig/commonStyle';
import image from "../../appConfig/image";

const deviceWidth = Dimensions.get("window").width;

class AllSong extends Component {
    static defaultProps = {
        isLoading: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            favoriteArt: [],
            articleList: [],
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(props) {

    }

    favoriteArticle(articleData) {
        this.props.actions.likeArticle(articleData).then(data => {
        }).catch(e => {
            this.setState({ isLoading: false });
            this.dropdown.alertWithType('error', '', e);
        });
    }

    render() {
        const { soundList } = this.state;
        let allArticleData = this.props.articleData;
        let currentUserArt = this.props.currentUserData && this.props.currentUserData[0].likeArticles
        return (
            <SafeAreaView style={commonStyle.container}>
                <View animation="fadeInDownBig" duration={1500} direction="normal">
                    <Header {...this.props} isTitle={true} isBack={true} title={'Sound'} isSearchIcon={true} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: 10 }}>
                        <View style={[commonStyle.pv10]}>
                            <ImageHeader />
                        </View>
                        {
                            allArticleData.map((item, index) => {
                                let isFavorite = _.filter(currentUserArt, (el) => { return el.articleId == item.id })
                                let favoriteIcon = 'hearto';
                                if (isFavorite && isFavorite[0] && isFavorite[0].articleId == item.id) {
                                    favoriteIcon = 'heart'
                                }
                                return (
                                    <View style={styles.listContainer} key={index}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.props.navigation.navigate('PlayMusic', { mediaObj: item })
                                                }
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
                                                <TouchableOpacity>
                                                    <Image source={image.downloadIcon} style={[styles.imgIconSize, { marginRight: 15 }]} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => this.favoriteArticle(item)}
                                                >
                                                    {/* <Image source={image.likeIcon} style={{ height: 20, width: 20 }} /> */}
                                                    <AntDesign name={favoriteIcon} size={20} color={color.black} />
                                                </TouchableOpacity>
                                            </View>
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
        articleData: state.article.articleData,
        currentUserData: state.loginUser.currentUserData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(articleActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSong);


