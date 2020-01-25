import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    Easing,
} from "react-native";
import commonStyle from '../../appConfig/commonStyle';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import font from "../../appConfig/font";

class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
        }
    }

    render() {
        return (
            <SafeAreaView style={[commonStyle.container, { backgroundColor: color.white }]}>
                <ScrollView>
                    <View>
                        <View style={styles.serachContainer}>
                            <Feather name={'search'} size={25} style={[commonStyle.pdL10, { color: color.black }]} />
                            <TextInput
                                placeholder='Search'
                                placeholderTextColor="#757575"
                                style={styles.searchTextInput}
                            />
                        </View>
                        <Header isBack={true} isTitle={true} title={'Search'} {...this.props} />
                        <View>
                            {/* ---------- First Grid ------------- */}

                            <View style={styles.mainContainer}>
                                <View style={styles.firstGrid}></View>
                                <View style={[styles.firstGrid, commonStyle.marginH10]}></View>
                                <View style={styles.firstGrid}></View>
                            </View>

                            {/* ---------- Second Grid ------------- */}

                            <View style={styles.secondMainCon}>
                                <View style={[commonStyle.flex1]}>
                                    <View style={styles.secondGrigCon}></View>
                                    <View style={styles.secondLeftCon}>
                                        <View style={[styles.firstGrid, commonStyle.mrR10]}></View>
                                        <View style={styles.firstGrid}></View>
                                    </View>
                                </View>
                                <View style={styles.secondRightCon}></View>
                            </View>

                            {/* ---------- Third Grid ------------- */}

                            <View style={styles.mainContainer}>
                                <View style={styles.firstGrid}></View>
                                <View style={[styles.firstGrid, commonStyle.marginH10]}></View>
                                <View style={styles.firstGrid}></View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}


export default SearchItem;

