import React, { Component } from "react";
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import commonStyle from "../appConfig/commonStyle";
import fonts from '../appConfig/font';
import color from '../appConfig/color';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class FavoriteSoundList extends Component {
    static defaultProps = {
        isLoading: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { isMusic, rowData, navigation, isFavorite } = this.props
        return (
            <View style={[{ paddingLeft: isMusic ? 15 : 20, marginLeft: isMusic ? 5 : 10, paddingVertical: 15 }]}>
                <TouchableOpacity
                    style={[commonStyle.jcaiCntr]}
                    onPress={() => isFavorite ?
                        navigation.navigate('PlayMusic', { mediaObj: rowData })
                        :
                        navigation.navigate('PlayMusic', { mediaObj: rowData })
                        // navigation.navigate('AllSong')
                    }
                    activeOpacity={1}>
                    <Image source={{ uri: rowData.imgUrl }} style={styles.imageStyle} />
                    <View style={styles.bodyCon}>
                        <View style={[commonStyle.fdRow, commonStyle.mrT15]}>
                            <View style={[commonStyle.flex1]}>
                                <View style={[commonStyle.fdRow, commonStyle.pdL15]}>
                                    <FontAwesome name='play' size={10} color={color.white} style={{ marginTop: 3 }} />
                                    <Text style={styles.viewerText}>2.8 k</Text>
                                </View>
                            </View>
                            <View style={styles.rightIconView}>
                                <View style={[commonStyle.fdRow, commonStyle.pdR20]}>
                                    {
                                        isFavorite ?
                                            <FontAwesome name='heart' size={15} color={color.white} style={{}} />
                                            :
                                            <FontAwesome name='heart-o' size={15} color={color.white} style={{}} />
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomContent}>
                            <Text style={styles.titleText}>{rowData.name}</Text>
                            <Text style={styles.subTitleText}>40 mins</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default (FavoriteSoundList);

const styles = StyleSheet.create({
    imageStyle: {
        width: (deviceWidth / 2.6) - 13,
        height: deviceHeight / 3.80,
        borderRadius: 10
    },
    bodyCon: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        height: deviceHeight / 3.80,
        width: (deviceWidth / 2.6) - 13,
        borderRadius: 10
    },
    rightIconView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    viewerText: {
        color: color.white,
        ...fonts.fs10R,
        marginLeft: 10
    },
    bottomContent: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    titleText: {
        color: color.white, ...fonts.fs12b,
        letterSpacing: 0.5,
        paddingBottom: 5
    },
    subTitleText: {
        color: color.white,
        ...fonts.fs10L,
        letterSpacing: 0.6
    }
});