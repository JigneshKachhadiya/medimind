import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import fonts from '../appConfig/font';
import color from '../appConfig/color';
import commonStyle from "../appConfig/commonStyle";
const styles = StyleSheet.create({
  dncsTxt: {
    ...fonts.fs16b,
    color: color.white
  },
});

class MainCategoryModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{ backgroundColor: color.themeColor }}>
            <View style={[commonStyle.fdRow, commonStyle.aiCntr, { height: 40 }]}>
              <View>
                <TouchableOpacity onPress={() => this.props.closeModalMainctgry()} style={[commonStyle.padding10, { width: 70, paddingVertical: 10 }]}>
                  <Text style={styles.dncsTxt}> close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

    )
  }
}

export default MainCategoryModal;
