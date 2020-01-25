import firebase from 'react-native-firebase';

export function getActivity(uid) {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'activity',
                    subtype: 'loading'
                });

                firebase.firestore().collection("activity").where("userId", "==", uid).onSnapshot((snapshot, index) => {
                    if (snapshot.docs) {
                        let req = snapshot.docs.map((snap, index) => {
                            return new Promise((resolve, reject) => {
                                resolve({ ...snap.data(), id: snap.id })
                            })
                        })
                        Promise.all(req).then(res => {
                            dispatch({
                                type: 'activity',
                                subtype: 'success',
                                activityData: res
                            });
                            resolve(res);
                        })
                    }
                })

            } catch (e) {
                dispatch({
                    type: 'activity',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}
