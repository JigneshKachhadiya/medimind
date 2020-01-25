const initialState = {
  currentPlayData: null
};

export default function currentPlayUrl(state = initialState, action = {}) {
  switch (action.type) {
    case 'currentPlayMusic': {
      return {
        ...state,
        currentPlayData: action.subtype === 'success' ? action.currentPlayData : state.currentPlayData,
      }
    };
    case 'logout': {
      return {
        ...state,
        currentPlayData: null
      }
    };
    default:
      return state;
  }
}