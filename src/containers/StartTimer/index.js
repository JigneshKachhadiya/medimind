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
import * as Animatable from 'react-native-animatable';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import commonStyle from './../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import FavoriteSoundList from '../../components/FavoriteSoundList';
import styles from "./styles";
import font from "../../appConfig/font";

class StartTime extends Component {
    static defaultProps = {
        isLoading: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            isPlay: true,
            timer: null,
            hour_Counter: '00',
            minutes_Counter: '00',
            seconds_Counter: '00',
            startDisable: false
        }
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

    onButtonClear = () => {
        this.setState({
            timer: null,
            minutes_Counter: '00',
            seconds_Counter: '00',
        });
    }

    startTimer() {
        const { isPlay } = this.state;
        if (isPlay) {
            // this.onTimerStart()
            this.props.navigation.navigate('Timer')
            this.setState({ isPlay: !isPlay ? true : false })
        } else {
            this.onTimerStop()
            this.setState({ isPlay: !isPlay ? true : false })
        }
    }

    render() {
        const { soundList, isPlay, hour_Counter, minutes_Counter, seconds_Counter } = this.state;
        return (
            <SafeAreaView style={commonStyle.container}>
                <View>
                    <Header {...this.props} isBack={true} isTitle={true} title={'Start Timer'} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 15 }}>

                        <View style={[commonStyle.pv10, commonStyle.ph10, commonStyle.jcaiCntr, commonStyle.flex1]}>
                            <Ionicons name='md-alarm' size={25} color={color.black} />
                            <Text style={styles.dailyActText}>Countdown Timer</Text>
                            <Text style={{ textAlign: 'center', ...fonts.fs14R, textAlign: 'center' }}>
                                Start your timer session with vibrate, with background music. Timer ends with vibration
                            </Text>
                        </View>

                        <View style={{ marginTop: 80 }}>
                            <Text style={{ textAlign: 'center', ...font.fs18SB }}>Start your timer</Text>
                        </View>
                        <View style={[commonStyle.jcaiCntr, { paddingVertical: 100, height: 90, }]}>
                            <View style={styles.circulView}>
                            </View>
                            <View style={{ position: 'absolute', flexDirection: 'row', height: 90, alignItems: 'center' }}>
                                <Text style={{
                                    ...font.fs28b
                                }}>{hour_Counter}:{minutes_Counter}:{seconds_Counter}</Text>
                            </View>
                        </View>
                        <View style={[commonStyle.flex1, commonStyle.jcaiCntr, commonStyle.pdT30, commonStyle.fdRow]}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.bottomIconView}>
                                <AntDesign name='minus' size={25} color={color.black} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => this.startTimer()}
                                style={[styles.bottomIconView, commonStyle.marginH20]}>
                                <FontAwesome name='play' size={25} color={color.black} style={[commonStyle.pdL5]} />
                                {/* {
                                    isPlay ?
                                        <FontAwesome name='play' size={25} color={color.black} style={[commonStyle.pdL5]} />
                                        :
                                        <AntDesign name='pause' size={25} color={color.black} />
                                } */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.bottomIconView}>
                                <AntDesign name='plus' size={25} color={color.black} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView >
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



