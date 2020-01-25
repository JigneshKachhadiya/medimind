import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';


// ---------------------------------------- MainSlider-Actions ---------------------------------------

export function getMainSlider() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'mainSlider',
                    subtype: 'loading'
                });
                firebase.firestore().collection("features").get().then((snapshot, index) => {
                    let allFeatureData = [];
                    const count = snapshot._docs.length
                    if (snapshot.docs) {
                        snapshot.docs.map((snap, index) => {
                            allFeatureData.push({ ...snap._data })
                            if (index + 1 == count) {
                                dispatch({
                                    type: 'mainSlider',
                                    subtype: 'success',
                                    mainSliderData: allFeatureData
                                });
                                resolve(allFeatureData)
                            }
                        })
                    }
                })

            } catch (e) {
                dispatch({
                    type: 'mainSlider',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}

// ---------------------------------------- MainCategory Actions ---------------------------------------

export function getMainCategory() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'mainCategory',
                    subtype: 'loading'
                });
                firebase.firestore().collection("category").get().then((snapshot, index) => {
                    if (snapshot.docs) {
                        let req = snapshot.docs.map((snap, index) => {
                            return new Promise((resolve, reject) => {
                                resolve({ ...snap.data(), id: snap.id })
                            })
                        })
                        Promise.all(req).then(res => {
                            dispatch({
                                type: 'mainCategory',
                                subtype: 'success',
                                mainCategoryData: res
                            });
                            resolve(res);
                        })
                    }
                })

            } catch (e) {
                dispatch({
                    type: 'mainCategory',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}

// ---------------------------------------- Sub-Category-Actions ---------------------------------------
export function getSubCategory() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'subCategory',
                    subtype: 'loading'
                });

                firebase.firestore().collection("subCategory").get().then((snapshot, index) => {
                    if (snapshot.docs) {
                        let req = snapshot.docs.map((snap, index) => {
                            return new Promise((resolve, reject) => {
                                resolve({ ...snap.data(), id: snap.id })
                            })
                        })
                        Promise.all(req).then(res => {
                            dispatch({
                                type: 'subCategory',
                                subtype: 'success',
                                subCategoryData: res
                            });
                            resolve(res);
                        })
                    }
                })

            } catch (e) {
                dispatch({
                    type: 'subCategory',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}
