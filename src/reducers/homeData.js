const initialState = {
    mainSliderData: [],
    mainCategoryData: [],
    subCategoryData: []

};

export default function homeData(state = initialState, action = {}) {
    switch (action.type) {
        case 'mainSlider': {
            return {
                ...state,
                // mainSliderError: action.error ? action.error : null,
                // mainSliderSuccess: action.subtype === 'success',
                // mainSliderLoading: action.subtype === 'loading',
                mainSliderData: action.subtype === 'success' ? action.mainSliderData : state.mainSliderData,
            }
        };
        case 'mainCategory': {
            return {
                ...state,
                // mainCategoryError: action.error ? action.error : null,
                // mainCategorySuccess: action.subtype === 'success',
                // mainCategoryLoading: action.subtype === 'loading',
                mainCategoryData: action.subtype === 'success' ? action.mainCategoryData : state.mainCategoryData,
            }
        };
        case 'subCategory': {
            return {
                ...state,
                // subCategoryError: action.error ? action.error : null,
                // subCategorySuccess: action.subtype === 'success',
                // subCategoryLoading: action.subtype === 'loading',
                subCategoryData: action.subtype === 'success' ? action.subCategoryData : state.subCategoryData,
            }
        };
        case 'logout': {
            return {
                ...state,
                mainSliderData: [],
                mainCategoryData: [],
                subCategoryData: []
            }
        };
        default:
            return state;
    }
}