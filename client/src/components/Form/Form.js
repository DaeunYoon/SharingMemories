import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.posts);
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let newPost = { ...postData, tags: postData.tags.filter(tag => tag.length), name: user?.result?.name };

        if (currentId) {
            dispatch(updatePost(currentId, newPost));
        } else {
            dispatch(createPost(newPost));
        }

        clear();
    }

    const clear = (e) => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });
    }

    useEffect(() => {
        if (currentId) {
            const post = posts.find(post => post._id === currentId);
            setPostData(post);
        }
    }, [currentId, posts]);

    if (!user) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h5'>Login in to share your memory with others and like other's memory! :) </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                {currentId ? <Typography variant='h5'>Update a Memory</Typography> : <Typography variant='h5'>Create a Memory</Typography>}
                {/* <Typography variant='h6'>Creating a Memory</Typography> */}
                {/* <TextField name="creator" variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => { setPostData({ ...postData, creator: e.target.value }) }}></TextField> */}
                <TextField name="title" variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }}></TextField>
                <TextField name="message" variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => { setPostData({ ...postData, message: e.target.value }) }}></TextField>
                <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(/[,\s]+/) }) }}></TextField>

                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )

};

export default Form;