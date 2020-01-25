const initialState = {
    articleData: [],
    downloadArticle: []
};

export default function article(state = initialState, action = {}) {
    switch (action.type) {
        case 'article': {
            return {
                ...state,
                // articleError: action.error ? action.error : null,
                // articleSuccess: action.subtype === 'success',
                // articleLoading: action.subtype === 'loading',
                articleData: action.subtype === 'success' ? action.articleData : state.articleData,
            }
        };
        case 'articleDownload': {
            return {
                ...state,
                // articleDownloadError: action.error ? action.error : null,
                // articleDownloadSuccess: action.subtype === 'success',
                // articleDownloadLoading: action.subtype === 'loading',
                downloadArticle: action.subtype === 'success' ? action.downloadArticle : state.downloadArticle,
            }
        };
        case 'logout': {
            return {
                ...state,
                articleData: [],
                downloadArticle: []
            }
        };
        default:
            return state;
    }
}