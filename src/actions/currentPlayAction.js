import firebase from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';

// ---------------------------------------- Current_Play_Actions ---------------------------------------
export function CurrentPlayMusic(playeItem) {
  console.log('-----CurrentPlay-Action----------', playeItem)
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'currentPlayMusic',
          subtype: 'success',
          currentPlayData: playeItem
        });
        resolve(true)
      } catch (e) {
        dispatch({
          type: 'currentPlayMusic',
          error: e,
        });
        rejects(e)
      }
    })
  };
}
