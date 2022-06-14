import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
const LIMIT = 8;

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const startIdx = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments();

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIdx);
        res.status(200).json({ data: posts, currentPage: Number(page), totalPages: Math.ceil(total / LIMIT) });
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.message });
    }
};

export const getPost = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const post = await PostMessage.findById(_id);
        res.status(200).json({ data: post });
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    try {
        const { searchQuery, tags, page } = req.query;

        let title = new RegExp(searchQuery, "i");
        let tagsArray = tags.split(",").map(tag => new RegExp(tag, "i"));

        const startIdx = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.find({ $or: [{ title }, { tags: { $in: tagsArray } }] }).countDocuments();
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tagsArray } }] }).sort({ _id: -1 }).limit(LIMIT).skip(startIdx);

        res.status(200).json({ data: posts, currentPage: Number(page), totalPages: Math.ceil(total / LIMIT) });
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    if (!req.userId)
        return res.status(401).json({ message: "You need to login to create post." });

    try {
        const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date() });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (e) {
        console.log(e);
        res.status(409).json({ message: e.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: "A post with ID not exits" });

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        updatePost.comment.push(comment);
        await updatedPost.save();

        res.status(200).json(updatedPost);
    } catch (e) {
        console.log(e);
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: "A post with ID not exits" });

    try {
        await PostMessage.findByIdAndDelete(_id);
        res.status(200).json({ message: "Post deleted" });
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.message });
    }
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId)
        return res.status(401).json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: "A post with ID not exits" });

    try {
        const post = await PostMessage.findById(_id);
        const index = post.likes.findIndex(id => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes.splice(index, 1);
        }
        await post.save();

        res.status(200).json(post);

    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.message });
    }
}

export const commentPost = async (req, res) => {
    const { id: _id } = req.params;
    const { comment } = req.body;


    if (!req.userId)
        return res.status(401).json({ message: "You need to login to create post." });

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: "A post with ID not exits" });

    try {
        const post = await PostMessage.findById(_id);
        post.comments.push(comment);
        await post.save();
        res.status(201).json(post);
    } catch (e) {
        console.log(e);
        res.status(409).json({ message: e.message });
    }
}