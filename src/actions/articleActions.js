import firebase from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';

// ---------------------------------------- Get_Article_Actions ---------------------------------------
export function getAllArticle() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'article',
                    subtype: 'loading'
                });

                firebase.firestore().collection("article").onSnapshot((snapshot, index) => {
                    if (snapshot.docs) {
                        let req = snapshot.docs.map((snap, index) => {
                            return new Promise((resolve, reject) => {
                                resolve({ ...snap.data(), id: snap.id })
                            })
                        })
                        Promise.all(req).then(res => {
                            dispatch({
                                type: 'article',
                                subtype: 'success',
                                articleData: res
                            });
                            resolve(res);
                        })
                    }
                })

            } catch (e) {
                dispatch({
                    type: 'article',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}

// ---------------------------------------- Like_Article_Actions ---------------------------------------

export function likeArticle(articleData) {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'likeArticle',
                    subtype: 'loading'
                });
                const UID = firebase.auth().currentUser && firebase.auth().currentUser.uid;
                const currentUser = getState().loginUser.currentUserData[0];
                if (currentUser) {
                    let userData = currentUser;
                    let likeArticles = userData && userData.likeArticles || [];
                    let chkIndex = likeArticles.findIndex(e => e.articleId === articleData.id)
                    if (chkIndex !== -1) {
                        likeArticles.splice(chkIndex, 1);
                    } else {
                        let obj = {
                            articleId: articleData.id,
                            subCategoryId: articleData.subCategoryId
                        }
                        likeArticles.push(obj);
                    }
                    firebase.firestore().collection("users").doc(UID).update({ likeArticles })
                }
            } catch (e) {
                dispatch({
                    type: 'likeArticle',
                    error: e,
                });
                rejects(e)
            }
        })
    };
}

// ---------------------------------------- Download_Article_Actions ---------------------------------------

export function getArticleDownloas() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, rejects) => {
            try {
                dispatch({
                    type: 'articleDownload',
                    subtype: 'loading'
                });
                const { config, fs } = RNFetchBlob;
                let pathList = fs.dirs.DownloadDir + '_Medimind'
                RNFetchBlob.fs.ls(pathList)
                    .then((files) => {
                        dispatch({
                            type: 'articleDownload',
                            subtype: 'success',
                            downloadArticle: files
                        });
                        resolve(files)
                    })
            } catch (err) {
                dispatch({
                    type: 'articleDownload',
                    error: err,
                });
                rejects(err)
            }
        })
    };
}
