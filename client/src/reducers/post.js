import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, COMMENT, FETCH_BY_SEARCH, START_LOADING_POST, END_LOADING_POST, FETCH_POST, CLEAR_POST } from '../constants/actionTypes';

const reducer = (state = { posts: [], isLoading: true }, action) => {
    switch (action.type) {
        case START_LOADING_POST:
            return { ...state, isLoading: true };
        case END_LOADING_POST:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload.data
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            };
        case CREATE:
            let newPosts = [...state.posts]
            newPosts.unshift(action.payload);
            return { ...state, posts: newPosts };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case COMMENT:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) };
        case CLEAR_POST:
            return { ...state, post: null }
        default:
            return state;
    }
}

export default reducer;