import React, { Component } from "react";
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, StatusBar, ScrollView, TextInput } from "react-native";
// import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import image from '../appConfig/image';
import fonts from '../appConfig/font';
import color from '../appConfig/color';
import commonStyle from "../appConfig/commonStyle";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const entries = [
  {
    title: 'Mindfulness Meditation',
    subtitle: 'Learn ipsum dolor sit amet consectetur',
    illustration: image.m1,
  },
  {
    title: 'Mindfulness Meditation',
    subtitle: 'Learn ipsum dolor sit amet consectetur',
    illustration: image.m2,
  },
  {
    title: 'Mindfulness Meditation',
    subtitle: 'Learn ipsum dolor sit amet consectetur',
    illustration: image.m3,
  },
  {
    title: 'Mindfulness Meditation',
    subtitle: 'Learn ipsum dolor sit amet consectetur',
    illustration: image.m4,
  }]
class MainSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    }
    this._onClick = this._onClick.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  _onClick() {
  }

  get pagination() {
    const { activeSlide } = this.state;
    const { data } = this.props;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: color.white, paddingTop: 20, paddingBottom: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: -10,
          backgroundColor: '#000',
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  _renderItem({ item, index }) {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => { }}>
          <View key={index} style={styles.sliderMainContainer}>
            <Image source={{ uri: item.imgUrl }} style={styles.imageSize} />
            {/* <Image source={item.illustration} style={styles.imageSize} /> */}
            <View style={styles.bodyCon}>
              <View style={[commonStyle.flex1, commonStyle.jcaiCntr]}>

                <View style={commonStyle.pv10}>
                  <TouchableOpacity style={{ marginTop: 60 }}>
                    <AntDesign name='playcircleo' size={35} color={color.white} />
                  </TouchableOpacity>
                </View>

              </View>
              <View style={[commonStyle.ph10, commonStyle.mrB15]}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.subTitle}>{item.description}</Text>
              </View>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <View>
        <Carousel
          autoplay={true}
          loop={true}
          autoplayDelay={1000}
          ref={(c) => { this._carousel = c; }}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={deviceWidth - 0}
          itemWidth={deviceWidth - 20}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderMainContainer: {
    backgroundColor: color.white,
    borderRadius: 25,
    height: 200,
    width: deviceWidth - 20
  },
  imageSize: {
    height: 200,
    width: deviceWidth - 20,
    borderRadius: 5,
    borderRadius: 8
  },
  bodyCon: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    height: 200,
    width: deviceWidth - 20,
    borderRadius: 8
  },
  titleText: {
    color: color.white,
    ...fonts.fs14b,
    letterSpacing: 0.6,
    // paddingBottom: 2
  },
  subTitle: {
    color: color.white,
    ...fonts.fs14UL
  }

});

export default MainSlider;