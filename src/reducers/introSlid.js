const initialState = {
    introSlid: []
};

export default function introSlid(state = initialState, action = {}) {
    switch (action.type) {
        case 'introSlidData': {
            return {
                ...state,
                // introSlidDataError: action.error ? action.error : null,
                // introSlidDataSuccess: action.subtype === 'success',
                // introSlidDataLoading: action.subtype === 'loading',
                introSlidData: action.subtype === 'success' ? action.introSlid : state.introSlid,
            }
        };
        case 'logout': {
            return {
                ...state,
                introSlid: []
            }
        };
        default:
            return state;
    }
}