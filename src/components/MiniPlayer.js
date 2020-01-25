import React, { Component } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as currentPlayAction from '../actions/currentPlayAction';
import MarqueeText from 'react-native-marquee';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'underscore';
import images from './../appConfig/image';
import color from './../appConfig/color'
import commonStyle from "../appConfig/commonStyle";
import fonts from '../appConfig/font';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('window').width;

class MiniPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playState: '',
      playFile: '',
      activeSlide: 0,
    }
  }

  componentDidMount() {
    const currentArtPlay = this.props.currentArticle
    if (currentArtPlay.playAndPaused == 'playing') {
      this.playMusic(currentArtPlay.playFilepath);
    }
    if (currentArtPlay) {
      this.setState({
        playFile: currentArtPlay.playFilepath,
        playState: currentArtPlay.playAndPaused
      })
    }
  }

  setCurrentPlayTime() {
    Sound.setCurrentTime(0.30)
  }

  closeMiniPlaye = async () => {
    const miniPlayObj = {
      "playFilepath": '',
      "isMiniPlay": false,
      "playAndPaused": ''
    }
    this.props.currentPlayAction.CurrentPlayMusic(miniPlayObj).then(data => {
      if (data) {
        this.stopPlay();
      }
    }).catch(e => {
      this.dropdown.alertWithType('error', '', e);
    });
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
      });
    }
  }

  pauseMusic = () => {
    if (this.sound) {
      this.sound.pause();
    }
    this.setState({ playState: 'paused' });
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

  nextPlay() {
    const { activeSlide } = this.state;
    let allPlayList = this.props.articleData;

    this.setState({
      activeSlide: activeSlide == (allPlayList.length - 1) ? 0 : (activeSlide + 1),
      playState: 'paused',
      playFile: allPlayList[activeSlide == (allPlayList.length - 1) ? 0 : (activeSlide + 1)].mp3Url
    }, () => {
      this.stopPlay();
    })
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

  render() {
    const { playFile, playState, activeSlide } = this.state;
    let allPlayList = this.props.articleData;
    let articleDetails = _.filter(allPlayList, function (item) { return item.mp3Url == playFile });
    let playAvatar = articleDetails[0] && articleDetails[0].imgUrl;
    let songName = articleDetails[0] && articleDetails[0].name;
    let songDescription = articleDetails[0] && articleDetails[0].description;
    let playSoundUrl = articleDetails[0] && articleDetails[0].mp3Url;

    return (
      <Animatable.View
        animation="fadeInDownBig"
        duration={1000}
        direction="normal"
        style={styles.container}>
        <Image source={{ uri: playAvatar }} style={styles.playeImge} resizeMode={'cover'} />
        <View
          style={styles.innerContainer}>
          <View style={{ flex: 1 }}>
            {/* <Text style={styles.titleText}>Relaxation</Text> */}
            <MarqueeText
              style={{ fontSize: 16, fontWeight: 'bold' }}
              duration={10000}
              marqueeOnStart
              loop
              useNativeDriver={true}
              marqueeDelay={500}
              marqueeResetDelay={500}>
              {songName}
            </MarqueeText>
            <Text ellipsizeMode='tail' numberOfLines={1}>{songDescription}</Text>
          </View>
          <View style={[commonStyle.fdRow, { justifyContent: 'space-between' }]}>

            {
              this.state.playState == 'paused' &&
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.playMusic(playSoundUrl)}
                style={styles.playIcon}>
                <FontAwesome5 name='play' size={18} color={color.black} style={[commonStyle.mrL5]} />
              </TouchableOpacity>
            }
            {
              this.state.playState == 'playing' &&
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.pauseMusic()}
                style={styles.playIcon}>
                <Entypo name='controller-paus' size={30} color={color.black}></Entypo>
              </TouchableOpacity>
            }

            {/* <TouchableOpacity style={styles.playIcon}>
              <Ionicons name='md-play' size={30} color={'#000'} style={[commonStyle.mrL5]} />
            </TouchableOpacity> */}
            <TouchableOpacity
              pointerEvents={'box-only'}
              onPress={() => this.closeMiniPlaye()}
              style={styles.closeIcon}>
              <Ionicons name="md-close" size={30} color={'#000'} style={[commonStyle.mrL5]} />
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentArticle: state.currentPlaye.currentPlayData,
    articleData: state.article.articleData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currentPlayAction: bindActionCreators(currentPlayAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);

const styles = StyleSheet.create({
  container: {
    height: 70,
    elevation: 2,
    borderWidth: 1,
    borderColor: color.e4e4,
    backgroundColor: color.white,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  playeImge: {
    height: 70,
    width: 70,
    // resizeMode: 'cover',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1
  },
  titleText: {
    color: color.blackTheme, ...fonts.fs16b,
    letterSpacing: 0.5,
    // paddingBottom: 5
  },
  playIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  closeIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: -10
  }
});


