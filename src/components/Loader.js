import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, StatusBar, ScrollView, TextInput } from "react-native";
import color from '../appConfig/color';
import commonStyle from "../appConfig/commonStyle";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={[commonStyle.flex1, commonStyle.jcaiCntr, { backgroundColor: color.blackOpct05 }]}>
                <ActivityIndicator size="large" color={color.e4e4} style={{position:'absolute'}} />
            </View>
        );
    }
}

export default Loader;