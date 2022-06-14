import * as api from '../api';
import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, COMMENT, FETCH_BY_SEARCH, START_LOADING_POST, END_LOADING_POST, FETCH_POST } from '../constants/actionTypes';

// action creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_POST });
        const { data } = await api.fetchPosts(page);
        dispatch({
            type: FETCH_ALL,
            payload: data
        });
        dispatch({ type: END_LOADING_POST });

    } catch (e) {
        console.log(e);
    }
};

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_POST });
        const { data } = await api.fetchPost(id);
        dispatch({
            type: FETCH_POST,
            payload: data
        });
        dispatch({ type: END_LOADING_POST });

    } catch (e) {
        console.log(e);
    }
};


export const getPostsBySearch = (searchQuery, page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_POST });
        const { data } = await api.fetchPostBySearch(searchQuery, page);

        dispatch({
            type: FETCH_BY_SEARCH,
            payload: data
        });
        dispatch({ type: END_LOADING_POST });

    } catch (e) {
        console.log(e);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({
            type: CREATE,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({
            type: UPDATE,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
}

export const deletePost = (id) => async (dispatch) => {
    const deletion = window.confirm('Do you really want to delete this memory?');

    if (!deletion) return;

    try {
        await api.deletePost(id);
        dispatch({
            type: DELETE,
            payload: id
        });
    } catch (e) {
        console.log(e);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({
            type: LIKE,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, id);
        console.log(data)
        dispatch({
            type: COMMENT,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
}
