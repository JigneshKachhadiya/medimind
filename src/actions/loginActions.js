import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

// ---------------------------------------- Login Actions ---------------------------------------------
export function loginUser() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'loginUser',
                    subtype: 'loading'
                });
                const UID = firebase.auth().currentUser && firebase.auth().currentUser.uid
                firebase.firestore().collection("users").where("userID", "==", UID).onSnapshot((snapshot, index) => {
                    if (snapshot.docs) {
                        let req = snapshot.docs.map((snap, index) => {
                            return new Promise((resolve, reject) => {
                                resolve({ ...snap.data(), id: snap.id })
                            })
                        })
                        Promise.all(req).then(res => {
                            console.log('-----------------login_onSnapshot_call---------- ', res);
                            dispatch({
                                type: 'loginUser',
                                subtype: 'success',
                                currentUserData: res
                            });
                            resolve(res);
                        })
                    }
                })

            } catch (e) {
                dispatch({
                    type: 'loginUser',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}

// ---------------------------------------- GoogleLogin Actions ---------------------------------------

export function LoginWithGoogle() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'googleLogin',
                    subtype: 'loading'
                });
                const response = await GoogleSignin.configure({
                    webClientId: "842573706542-ruapmnc0g81mpi0kb8d102nchab8jeop.apps.googleusercontent.com",
                    offlineAccess: false
                });
                const data = await GoogleSignin.signIn()
                // console.log("data : ", data);
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

                if (firebaseUserCredential) {
                    const UID = firebase.auth().currentUser && firebase.auth().currentUser.uid
                    let profileInfo = firebaseUserCredential.additionalUserInfo.profile;
                    if (firebaseUserCredential.additionalUserInfo.isNewUser) {
                        let userData = {
                            userID: UID,
                            // userToken: userToken,
                            email: profileInfo.email,
                            firstName: profileInfo.given_name,
                            lastName: profileInfo.family_name,
                            fullName: profileInfo.name,
                            photoURL: profileInfo.picture,
                            role: 'user',
                            createdAt: +new Date,
                            loginBy: 'Google',
                        }
                        firebase.firestore().collection('users').doc(UID).set(userData).then((user) => {
                            firebase.firestore().collection('users').doc(UID).onSnapshot((user) => {
                                let currentUserData = user.data();
                                if (currentUserData) {
                                    dispatch({
                                        type: 'googleLogin',
                                        subtype: 'success',
                                        currentUserData,
                                    });
                                    resolve(currentUserData);
                                }
                            })
                        }).catch((storeErr) => {
                            dispatch({
                                type: 'googleLogin',
                                error: storeErr,
                            });
                            rejects(storeErr)
                        })
                    } else {
                        firebase.firestore().collection('users').doc(UID).onSnapshot((user) => {
                            let currentUserData = user.data();
                            if (currentUserData) {
                                dispatch({
                                    type: 'googleLogin',
                                    subtype: 'success',
                                    currentUserData,
                                });
                                resolve(currentUserData);
                            } else {
                                dispatch({
                                    type: 'googleLogin',
                                    error: 'This user has been deactivated.',
                                });
                                rejects('This user has been deactivated.')
                            }
                        })
                    }
                }
            } catch (e) {
                dispatch({
                    type: 'googleLogin',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}

// ---------------------------------------- FacebookLogin Actions -------------------------------------

export function LoginWithFB() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'fbLogin',
                    subtype: 'loading'
                });
                const response = await LoginManager.logInWithPermissions(['public_profile', 'email']);
                if (response.isCancelled) {
                    dispatch({
                        type: 'fbLogin',
                        error: 'User cancelled request',
                    });
                    rejects('User cancelled request')
                }
                const data = await AccessToken.getCurrentAccessToken();
                if (!data) {
                    dispatch({
                        type: 'fbLogin',
                        error: 'Something went wrong obtaining the users access token',
                    });
                    rejects('Something went wrong obtaining the users access token')
                }
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
                console.log("firebaseUserCredential : ", firebaseUserCredential);

                if (firebaseUserCredential) {
                    const UID = firebase.auth().currentUser && firebase.auth().currentUser.uid
                    let profileInfo = firebaseUserCredential.additionalUserInfo.profile;

                    if (firebaseUserCredential.additionalUserInfo.isNewUser) {
                        let userData = {
                            userID: UID,
                            // userToken: userToken,
                            email: profileInfo.email,
                            firstName: profileInfo.first_name,
                            lastName: profileInfo.last_name,
                            fullName: profileInfo.name,
                            photoURL: profileInfo.picture.data.url,
                            role: 'user',
                            createdAt: +new Date,
                            loginBy: 'Facebook',
                        }
                        firebase.firestore().collection('users').doc(UID).set(userData).then((user) => {
                            firebase.firestore().collection('users').doc(UID).onSnapshot((user) => {
                                let currentUserData = user.data();
                                if (currentUserData) {
                                    dispatch({
                                        type: 'fbLogin',
                                        subtype: 'success',
                                        currentUserData,
                                    });
                                    resolve(currentUserData);
                                }
                            })
                        }).catch((storeErr) => {
                            dispatch({
                                type: 'fbLogin',
                                error: storeErr,
                            });
                            rejects(storeErr)
                        })
                    } else {
                        // firebase.firestore().collection('Users').doc(UID).set({ d: { userToken, getMatchNotif: true, getMsgNotif: true, getCityNotif: true } }, { merge: true }).then(res => {
                        firebase.firestore().collection('users').doc(UID).onSnapshot((user) => {
                            let currentUserData = user.data();
                            if (currentUserData) {
                                dispatch({
                                    type: 'fbLogin',
                                    subtype: 'success',
                                    currentUserData,
                                });
                                resolve(currentUserData);
                            } else {
                                dispatch({
                                    type: 'fbLogin',
                                    error: 'This user has been deactivated.',
                                });
                                rejects('This user has been deactivated.')
                            }
                        })
                        // })
                    }
                }
            }
            catch (e) {
                dispatch({
                    type: 'fbLogin',
                    error: e,
                });
                rejects(e)
            }
        });
    };
}

// ---------------------------------------- Logout Actions -------------------------------------

export function logout() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                await firebase.auth().signOut().then((response) => {
                    dispatch({
                        type: 'logout',
                        subtype: 'success',
                        currentUserData: null,
                    });
                    resolve(true)
                })
            } catch (e) {
                dispatch({
                    type: 'logout',
                    subtype: 'error',
                });
                rejects(e)
            }
        })
    };
}

