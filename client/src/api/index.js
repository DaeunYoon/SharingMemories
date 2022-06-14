import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:4000/' });

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})
export const fetchPost = async (id) => {
    return await API.get(`posts/${id}`);
}

export const fetchPosts = async (page) => {
    return await API.get(`posts?page=${page}`);
}

export const fetchPostBySearch = async (searchQuery, page) => {
    return await API.get(`posts/search?searchQuery=${searchQuery.search || null}&tags=${searchQuery.tags || null}&page=${page}`);
}

export const createPost = async (newPost) => {
    return await API.post('posts/', newPost);
}

export const updatePost = async (id, updatedPost) => {
    return await API.patch(`posts/${id}`, updatedPost);
}

export const deletePost = async (id) => {
    return await API.delete(`posts/${id}`);
}

export const likePost = async (id) => {
    return await API.patch(`posts/${id}/likePost`);
}

export const commentPost = async (comment, id) => {
    return await API.post(`posts/${id}/commentPost`, { comment });
};

export const signIn = async (user) => {
    return await API.post(`users/signin`, { email: user.email, password: user.password });
}

export const signUp = async (user) => {
    return await API.post(`users/signup`, user);
}