import firebase from 'react-native-firebase';

// ---------------------------------------- GetIntro-Data-Actions ---------------------------------------

export function getIntroSlid() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'introSlidData',
                    subtype: 'loading'
                });
                firebase.firestore().collection("intro").get().then((snapshot, index) => {
                    let allIntroData = [];
                    const count = snapshot._docs.length
                    if (snapshot && snapshot._docs && snapshot._docs.length > 0) {
                        snapshot._docs.map((snap, index) => {
                            allIntroData.push({ ...snap._data })
                            if (index + 1 == count) {
                                dispatch({
                                    type: 'introSlidData',
                                    subtype: 'success',
                                    introSlid: allIntroData
                                });
                                resolve(allIntroData)
                            }
                        })
                    }
                })

            } catch (e) {
                dispatch({
                    type: 'introSlidData',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}
