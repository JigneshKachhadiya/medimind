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
    FlatList,
    Modal,
    TextInput
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import FavoriteSoundList from '../../components/FavoriteSoundList';
import styles from "./styles";
import font from "../../appConfig/font";
import image from "../../appConfig/image";

class StartTime extends Component {
    static defaultProps = {
        isLoading: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            isPause: false,
            isEnd: true,
            timer: null,
            hour_Counter: '00',
            minutes_Counter: '00',
            seconds_Counter: '00',
            startDisable: false
        }
    }
    componentDidMount() {
        this.onTimerStart()
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    onTimerStart = () => {
        let timer = setInterval(() => {

            var num = (Number(this.state.seconds_Counter) + 1).toString(),
                count = this.state.minutes_Counter;

            if (Number(this.state.seconds_Counter) == 59) {
                count = (Number(this.state.minutes_Counter) + 1).toString();
                num = '00';
            }

            this.setState({
                minutes_Counter: count.length == 1 ? '0' + count : count,
                seconds_Counter: num.length == 1 ? '0' + num : num
            });
        }, 500);
        this.setState({ timer });

        this.setState({ startDisable: true })
    }

    onTimerStop = () => {
        clearInterval(this.state.timer);
        this.setState({ startDisable: false })
    }

    onPause() {
        this.setState({
            isPause: true,
            isEnd: false
        })
        this.onTimerStop();
    }

    onEnd() {
        this.setState({ isEnd: true, isPause: false })
        this.onTimerStop();
    }

    render() {
        const { isEnd, isPause, hour_Counter, minutes_Counter, seconds_Counter } = this.state;

        return (
            <SafeAreaView style={commonStyle.container}>
                <View>
                    <Header {...this.props} isBack={true} isTitle={true} title={'Timer'} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[commonStyle.ph15]}>
                        <View style={[commonStyle.pv20, commonStyle.jcaiCntr, commonStyle.flex1]}>
                            <Image source={image.timerIcon} style={styles.timerIconSize} />
                        </View>

                        <View style={[commonStyle.mrT30, commonStyle.mrB20]}>
                            <Text style={{ textAlign: 'center', ...font.fs18SB }}>Current running time</Text>
                        </View>
                        <View style={[commonStyle.jcaiCntr, styles.timerCounterMain]}>
                            <Image source={image.topCurveIcon} style={styles.outerImage} resizeMode={'cover'} />
                            <View
                                style={styles.outerCircle}>
                                <View style={[styles.circulView, { backgroundColor: '#EEEEEE' }]}>
                                </View>
                            </View>
                            <Image source={image.bottomCurveIcon} style={styles.outerImage} resizeMode={'cover'} />

                            <View style={styles.counterTextContainer}>
                                <Text style={{
                                    ...font.fs28b
                                }}>{hour_Counter}:{minutes_Counter}:{seconds_Counter}</Text>
                            </View>
                        </View>
                        <View style={[commonStyle.flex1, commonStyle.jcaiCntr, commonStyle.pdT30, commonStyle.fdRow, commonStyle.mrT20]}>
                            <TouchableOpacity
                                onPress={() => this.onEnd()}
                                activeOpacity={0.6}
                                style={[styles.buttomStyle, commonStyle.mrR20, { backgroundColor: isEnd ? color.blackTheme : '#F8F8F8' }]}>
                                <Text style={{ color: isEnd ? color.white : color.blackTheme, ...font.fs14SB }}>END</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => this.onPause()}
                                style={[styles.buttomStyle, { backgroundColor: !isPause ? '#F8F8F8' : color.blackTheme, }]}>
                                <Text style={{ color: !isPause ? color.blackTheme : color.white, ...font.fs14SB }}>PAUSE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTime);


