import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import ImagePicker from 'react-native-image-picker';

import commonStyle from '../../appConfig/commonStyle';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import font from "../../appConfig/font";
import RadioButton from 'react-native-radio-button';
import firebase from 'react-native-firebase';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topBtn: 'login',
            uid: '',
            email: '',
            password: '',
            name: '',
            phone: '',
            profilePic: '',
            isLogin: true,
            isMale: false,
            isFemale: true
        }
    }

    componentDidMount() {
        this.getProfileData();
    }

    componentWillReceiveProps(props) {
        let profileData = props.currentUserData[0];
        if (profileData) {
            this.setState({
                uid: profileData.userID,
                name: profileData.fullName,
                email: profileData.email,
                profilePic: profileData.photoURL,
                role: profileData.role,
                isMale: profileData.gender == 'Male' ? true : false,
                isFemale: profileData.gender == 'Female' ? true : false,
            });
        }
    }

    getProfileData() {
        let profileData = this.props.currentUserData[0];
        if (profileData) {
            this.setState({
                uid: profileData.userID,
                name: profileData.fullName,
                email: profileData.email,
                profilePic: profileData.photoURL,
                isMale: profileData.gender == 'Male' ? true : false,
                isFemale: profileData.gender == 'Female' ? true : false,
            });
        }
    }

    saveProfileData() {
        this.setState({ isLoading: true });
        const { name, email, isFemale, uid, profilePic } = this.state;
        if (name !== '' && email !== '') {
            var gender = isFemale ? 'Female' : 'Male';
            let userData = {
                email: email,
                fullName: name,
                gender: gender,
                photoURL: profilePic,
                createdAt: +new Date,
            }
            firebase.firestore().collection("users").doc(uid).update(userData).then((user) => {
                if (user == null) {
                    this.setState({
                        isLoading: false,
                    });
                    this.dropdown.alertWithType('success', 'Profile updated successfully')
                }
            })
                .catch(e => {
                    this.setState({ isLoading: false });
                    this.dropdown.alertWithType('error', '', e);
                });
        } else {
            this.dropdown.alertWithType('error', 'Please enter name & email')
        }
    }

    updateProfileImg() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                this.dropdown.alertWithType('error', response.error)
            }
            else {
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    profilePic: source.uri
                })
            }
        })
    }

    doSomething(value) {
        if (value == 'Male') {
            this.setState({
                isMale: true,
                isFemale: false
            })
        } else {
            this.setState({
                isFemale: true,
                isMale: false,
            })
        }
    }


    render() {
        const { isLoading, isFemale, isMale, email, name, password, profilePic } = this.state;
        return (
            <SafeAreaView style={[commonStyle.container, { backgroundColor: color.white }]}>
                <DropdownAlert ref={ref => this.dropdown = ref} />
                {
                    isLoading &&
                    <View style={commonStyle.loaderCon}>
                        <Loader />
                    </View>
                }
                <Header {...this.props} isTitle={true} isBack={true} title={'Edit Your Profile'} />
                <ScrollView>
                    <View style={styles.imageView}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => this.updateProfileImg()}>
                            {
                                profilePic !== null ?
                                    <Image source={{ uri: profilePic }} style={styles.profileImg} />
                                    :
                                    <Image source={image.user} style={styles.profileImg} />
                            }
                        </TouchableOpacity>
                        <View style={[commonStyle.flex1, commonStyle.pv20,]}>
                            <Text style={styles.userNameText}>UPLOAD PICTURE</Text>
                        </View>
                    </View>
                    <View style={[commonStyle.ph20, commonStyle.mrT20]}>
                        <View style={styles.textInputContainer}>
                            <View style={styles.logoView}>
                                <Image source={image.userIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                            </View>
                            <TextInput
                                placeholder={'Name'}
                                style={{ ...font.fs14R, height: 50, padding: 0, flex: 1 }}
                                onChangeText={(name) => this.setState({ name })}
                                value={name}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={styles.emailInput}>
                            <View style={styles.logoView}>
                                <Image source={image.mailIcon} style={{ height: 18, width: 18 }} resizeMode={'contain'} />
                            </View>
                            <TextInput
                                placeholder={'User name'}
                                style={{ ...font.fs14R, height: 50, padding: 0, flex: 1 }}
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                underlineColorAndroid={'transparent'}
                                editable={false}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <View style={styles.logoView}>
                                <Image source={image.loackIcon} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                            </View>
                            <TextInput
                                placeholder={'Password'}
                                style={{ ...font.fs14R, height: 50, padding: 0, flex: 1 }}
                                onChangeText={(password) => this.setState({ password })}
                                value={password}
                                secureTextEntry={true}
                                underlineColorAndroid={'transparent'}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View style={styles.genderContainer}>
                        <View style={styles.maleView}>
                            <RadioButton
                                size={12}
                                animation={'bounceIn'}
                                isSelected={isMale}
                                innerColor={color.blackTheme}
                                outerColor={color.blackTheme}
                                onPress={() => this.doSomething('Male')}
                            />
                            <Text style={styles.genderText}>Male</Text>
                        </View>
                        <View style={styles.FemaleView}>
                            <RadioButton
                                size={12}
                                animation={'bounceIn'}
                                isSelected={isFemale}
                                innerColor={color.blackTheme}
                                outerColor={color.blackTheme}
                                onPress={() => this.doSomething('Female')}
                            />
                            <Text style={styles.genderText}>Female</Text>
                        </View>
                    </View>
                    <View style={[commonStyle.jcaiCntr]}>
                        <TouchableOpacity
                            onPress={() => this.saveProfileData()}
                            activeOpacity={0.7}
                            style={[styles.saveButton, { marginBottom: 15 }]}>
                            <Text style={styles.saveBtnText} >SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUserData: state.loginUser.currentUserData,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

