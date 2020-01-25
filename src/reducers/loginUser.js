const initialState = {
    currentUserData: []
};

export default function loginUser(state = initialState, action = {}) {
    switch (action.type) {
        case 'loginUser': {
            return {
                ...state,
                // loginUserError: action.error ? action.error : null,
                // loginUserSuccess: action.subtype === 'success',
                // loginUserLoading: action.subtype === 'loading',
                currentUserData: action.subtype === 'success' ? action.currentUserData : state.currentUserData,
            }
        };
        case 'fbLogin': {
            return {
                ...state,
                // signupError: action.error ? action.error : null,
                // signupSuccess: action.subtype === 'success',
                // signupLoading: action.subtype === 'loading',
                currentUserData: action.subtype === "success" ? action.currentUserData : state.currentUserData,
            }
        };
        case 'googleLogin': {
            return {
                ...state,
                // signupError: action.error ? action.error : null,
                // signupSuccess: action.subtype === 'success',
                // signupLoading: action.subtype === 'loading',
                currentUserData: action.subtype === "success" ? action.currentUserData : state.currentUserData,
            }
        };
        case 'logout': {
            return {
                ...state,
                currentUserData: []
            }
        };
        default:
            return state;
    }
}