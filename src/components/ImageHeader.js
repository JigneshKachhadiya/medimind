import React, { Component } from "react";
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, StatusBar, ScrollView, TextInput } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import image from '../appConfig/image';
import fonts from '../appConfig/font';
import color from '../appConfig/color';
import commonStyle from "../appConfig/commonStyle";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class ImageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        }
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {

    }


    render() {
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => { }}>
                    <View style={styles.imageMainContainer}>
                        <Image source={image.m4} style={styles.imageStyle} />
                        <View style={styles.overLapView}>
                            <View style={[commonStyle.flex1, commonStyle.aiCntr]}>
                                <View style={commonStyle.pv20}>
                                    <TouchableOpacity>
                                        <Image source={image.icqueuemusicIcon} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[commonStyle.jcaiCntr, commonStyle.pv10, commonStyle.ph30]}>
                                    <Text style={[{ color: color.white, ...fonts.fs16SB, letterSpacing: 0.6, }]}>Popular Playlists</Text>
                                    <Text style={{ color: color.white, ...fonts.fs14L, marginTop: 10, textAlign: 'center' }}>Learn ipsum dolor sit amet consectetur adipiscing elit</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageMainContainer: {
        backgroundColor: color.white,
        borderRadius: 25,
        height: 170,
        width: deviceWidth - 25,
        marginHorizontal: 5
    },
    imageStyle: {
        height: 170,
        width: deviceWidth - 25,
        marginHorizontal: 5,
        borderRadius: 15
    },
    overLapView: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        height: 170,
        width: deviceWidth - 25,
        marginHorizontal: 5,
        borderRadius: 15
    },
});

export default ImageHeader;