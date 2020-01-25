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
    ImageBackground,
    StatusBar,
    Alert,
    PermissionsAndroid
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import _ from 'underscore';
import DropdownAlert from 'react-native-dropdownalert';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import * as currentPlayAction from '../../actions/currentPlayAction';
import AsyncStorage from '@react-native-community/async-storage';
import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import image from '../../appConfig/image'
import font from "../../appConfig/font";
import styles from "./styles";
import { updateLocale } from "moment";
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'react-native-firebase';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

class PlayMusic extends Component {
    static defaultProps = {
        isLoading: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            topBtn: 'now',
            activeSlide: 0,
            isPlay: false,
            isFevorite: false,
            playSongUrl: null,
            currentPlayObj: null,
            playFilepath: null,
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0
        }
        this._renderItem = this._renderItem.bind(this);
    }

    async componentDidMount() {
        this.timeout = setInterval(() => {
            if (this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({ playSeconds: seconds });
                })
            }
        }, 500);
        await this.request_storage_runtime_permission()
    }

    componentWillMount() {
        const { mediaObj } = this.props.navigation.state.params;
        const allMusicList = this.props.articleData;
        let firstItemIndex = allMusicList.findIndex(e => e.id === mediaObj.id)
        let musicUrl = allMusicList[firstItemIndex].mp3Url;
        if (mediaObj) {
            this.setState({
                currentPlayObj: mediaObj,
                activeSlide: firstItemIndex,
                playSongUrl: musicUrl
            })
        }
        if (this.sound) {
            this.sound.release();
            this.sound = null;
        }
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    request_storage_runtime_permission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': 'ReactNativeCode Storage Permission',
                    'message': 'ReactNativeCode App needs access to your storage to download Photos.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Alert.alert("Storage Permission Granted.");
            }
            else {
                Alert.alert("Storage Permission Not Granted");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    downloadMusic = () => {
        const { activeSlide } = this.state;
        let allPlayList = this.props.articleData;
        let playSoundUrl = allPlayList[activeSlide].mp3Url;
        var date = new Date();
        var music_URL = playSoundUrl;
        var ext = this.getExtention(music_URL);
        ext = "." + ext[0];
        const UID = firebase.auth().currentUser && firebase.auth().currentUser.uid;
        const ArticleID = allPlayList[activeSlide].id;

        const { config, fs } = RNFetchBlob;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: fs.dirs.DownloadDir + '_Medimind' + '/medimind_music' + ArticleID + ext,
                description: 'music.mp3',
            }
        }
        // console.log('----------options-----------', JSON.stringify(options, null, 2))
        config(options).fetch('GET', music_URL).then((res) => {
            console.log('----------Download Copmpleted----------', res)
            this.dropdown.alertWithType('success', 'Music Downloaded Successfully.');
        });
    }

    getExtention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
            undefined;
    }

    componentWillReceiveProps(props) { }

    playMusic = async (playSoundFile) => {
        const { playSongUrl } = this.state;
        if (this.sound && this.sound._filename === playSoundFile) {
            this.sound.play(this.playComplete);
            this.setState({ playState: 'playing' });
        } else {
            const filepath = playSoundFile;
            this.setState({
                playFilepath: filepath
            })
            this.sound = new Sound(filepath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    this.setState({ playState: 'paused' });
                } else {
                    this.setState({ playState: 'playing', duration: this.sound.getDuration() });
                    this.sound.play(this.playComplete);
                }
                this.mostPlayedMusic();
            });
        }
    }


    mostPlayedMusic = () => {
        const { activeSlide } = this.state;
        let allPlayList = this.props.articleData;
        let articleId = allPlayList[activeSlide].id;
        let mostPlayedCount = allPlayList[activeSlide].mostPlayed;
        let recentPlayedCount = allPlayList[activeSlide].recentPlayed;
        firebase.firestore().collection("article").doc(articleId).update({ mostPlayed: (mostPlayedCount + 1), recentPlayed: 1, createdAt: +new Date, });
    }

    playComplete = (success) => {
        if (this.sound) {
            if (success) {
                this.nextPlay();
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({ playState: 'paused', playSeconds: 0 });
            this.sound.setCurrentTime(0);
        }
    }

    pauseMusic = () => {
        if (this.sound) {
            this.sound.pause();
        }
        this.setState({ playState: 'paused' });
    }

    getAudioTimeString(seconds) {
        // const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
        // return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }

    _renderItem({ item, index }) {
        return (
            <View style={{ justifyContent: 'center', flex: 1 }} >
                <View activeOpacity={0.7} onPress={() => { }} style={{ marginTop: 30 }}>
                    <View key={index}
                        style={styles.itemContainer}>
                        <Image source={{ uri: item.imgUrl }}
                            style={styles.itemImage} resizeMode={'cover'} />
                    </View>
                </View>
            </View >
        );
    }

    stopPlay = () => {
        const { activeSlide } = this.state;
        let allPlayList = this.props.articleData;
        let playSoundUrl = allPlayList[activeSlide].mp3Url;
        if (this.sound) {
            this.sound.stop(() => {
                this.playMusic(playSoundUrl)
            });
        }
    }

    goBack() {
        this.pauseMusic();
        // this.props.navigation.goBack();
        this.storeData()
        this.props.navigation.navigate('Favorite');
    }

    storeData = async () => {
        const { playFilepath, playState, playSeconds } = this.state
        if (playFilepath !== null) {
            const miniPlayObj = {
                "playFilepath": playFilepath,
                "isMiniPlay": true,
                "playAndPaused": playState,
                "playTimeSeconds": playSeconds
            }
            this.props.currentPlayAction.CurrentPlayMusic(miniPlayObj).then(data => {
                if (data) { }
            }).catch(e => {
                this.dropdown.alertWithType('error', '', e);
            });
        }
    }

    previusPlay() {
        const { activeSlide } = this.state
        this.setState({
            activeSlide: activeSlide > 0 ? (activeSlide - 1) : 0,
            playState: 'paused'
        }, () => {
            this.stopPlay();
        })
    }

    nextPlay() {
        const { activeSlide } = this.state;
        let allPlayList = this.props.articleData;
        this.setState({
            activeSlide: activeSlide == (allPlayList.length - 1) ? 0 : (activeSlide + 1),
            playState: 'paused'
        }, () => {
            this.stopPlay();
        })
    }

    playSlidChange = (index) => {
        this.setState(
            { activeSlide: (index - 1) }, () => {
                this.nextPlay()
            })
    }

    render() {
        const { activeSlide, isFevorite, playSeconds, duration } = this.state;
        const currentTimeString = this.getAudioTimeString(playSeconds);
        const durationString = this.getAudioTimeString(duration);

        let allPlayList = this.props.articleData;
        let backgroudImage = allPlayList[activeSlide].imgUrl;
        let songName = allPlayList[activeSlide].name;
        let songDescription = allPlayList[activeSlide].description;
        let playSoundUrl = allPlayList[activeSlide].mp3Url;

        let allFevoriArt = this.props.currentUserData && this.props.currentUserData[0] && this.props.currentUserData[0].likeArticles
        let currentPlayId = allPlayList[activeSlide].id;

        let isFevArt = false;
        _.filter(allFevoriArt, (value) => {
            if (value.articleId == currentPlayId) {
                isFevArt = true
            }
        });
        const { mediaObj } = this.props.navigation.state.params;
        let firstItemIndex = allPlayList.findIndex(e => e.id === mediaObj.id)
        return (
            <SafeAreaView style={[commonStyle.container]}>
                <DropdownAlert ref={ref => this.dropdown = ref} />
                <StatusBar backgroundColor={color.blackTheme} barStyle="light-content" />
                <ImageBackground
                    source={{ uri: backgroudImage }}
                    blurRadius={1.5}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}>
                    {/* ------------ Header --------------- */}
                    <View style={[commonStyle.flex1, { backgroundColor: color.blackOpct05 }]}>
                        <View style={[styles.headerContainer]}>
                            <TouchableOpacity>
                                <Ionicons name='md-headset' size={40} color={color.white} />
                            </TouchableOpacity>
                            <View style={[commonStyle.ph10]}>
                                <Text style={styles.headerTitle}>{songName}</Text>
                                <Text style={styles.headerSubTit}>{songDescription}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.goBack()}
                                style={[commonStyle.flex1, { alignItems: 'flex-end' }]}>
                                <Entypo name='chevron-small-down' size={30} color={color.white}></Entypo>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, marginBottom: 5 }}>
                            <Carousel
                                layout={'stack'}
                                layoutCardOffset={`0`}
                                firstItem={activeSlide}
                                autoplay={false}
                                loop={false}
                                ref={(c) => { this._carousel = c; }}
                                data={allPlayList}
                                renderItem={this._renderItem}
                                sliderWidth={deviceWidth - 0}
                                sliderHeight={deviceHeight / 1.8}
                                itemHeight={deviceHeight / 1.8}
                                itemWidth={deviceWidth - 100}
                                onSnapToItem={(index) => this.setState(
                                    { activeSlide: index }
                                )}
                                hasParallaxImages={true}
                            />
                        </View>
                        <View style={{ justifyContent: 'flex-end', bottom: 30 }}>
                            <View style={styles.playToolsContainer}>
                                <TouchableOpacity
                                    onPress={() => this.downloadMusic()}>
                                    <Image source={image.downloadMusicIcon} style={styles.iconSize} resizeMode={'cover'} />
                                </TouchableOpacity>
                                <Image source={image.halfMoonIcon} style={styles.iconSize} resizeMode={'cover'} />
                                <Image source={image.icqueuemusicIcon} style={styles.iconSize} resizeMode={'cover'} />
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                // onPress={() => this.setState({ isFevorite: !isFevorite ? true : false })}
                                >
                                    {
                                        isFevArt ?
                                            <FontAwesome name='heart' size={20} color={color.white} style={[commonStyle.mrR10]} />
                                            :
                                            <FontAwesome name='heart-o' size={20} color={color.white} style={[commonStyle.mrR10]} />
                                    }
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.musicPlayTimeContainer]}>
                                <Text style={styles.playTimeText}>{currentTimeString}</Text>
                                <Text style={{ color: color.white, ...fonts.fs12L, color: color.textInput75 }}>/ {durationString}</Text>
                                <View style={styles.playControllerView}>
                                    <TouchableOpacity
                                        onPress={() => this.previusPlay()}
                                    >
                                        <Image source={image.previousMusicIcon} style={styles.controllSize} resizeMode={'cover'} />
                                    </TouchableOpacity>
                                    <MaterialIcons name='repeat-one' size={25} color={color.white} style={[commonStyle.marginH20]} />
                                    <TouchableOpacity
                                        onPress={() => this.nextPlay()}>
                                        <Image source={image.nextMusicIcon} style={styles.controllSize} resizeMode={'cover'} />
                                    </TouchableOpacity>
                                    {
                                        this.state.playState == 'paused' &&
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => this.playMusic(playSoundUrl)}
                                            style={styles.pausController}>
                                            <FontAwesome5 name='play' size={18} color={color.white} style={[commonStyle.mrL5]} />
                                        </TouchableOpacity>
                                    }
                                    {
                                        this.state.playState == 'playing' &&
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => this.pauseMusic()}
                                            style={styles.pausController}>
                                            <Entypo name='controller-paus' size={20} color={color.white}></Entypo>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
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
        currentPlayAction: bindActionCreators(currentPlayAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayMusic);


