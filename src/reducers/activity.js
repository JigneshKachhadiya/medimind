const initialState = {
    activityData: []
};

export default function activity(state = initialState, action = {}) {
    switch (action.type) {
        case 'activity': {
            return {
                ...state,
                // activityError: action.error ? action.error : null,
                // activitySuccess: action.subtype === 'success',
                // activityLoading: action.subtype === 'loading',
                activityData: action.subtype === 'success' ? action.activityData : state.activityData,
            }
        };
        case 'logout': {
            return {
                ...state,
                activityData: []
            }
        };
        default:
            return state;
    }
}