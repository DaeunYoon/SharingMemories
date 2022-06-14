import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentsSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentRef = useRef();

    const handleClick = (e) => {
        const finalComment = `${user.result.name}: ${comment}`
        dispatch(commentPost(finalComment, post._id));
        setComment('');

        commentRef.current.scrollIntoView({ behaviour: 'smooth' });
    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments: </Typography>
                {
                    comments.length > 0 ? comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1"><strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}</Typography>
                    )) : (<Typography gutterBottom variant="subtitle1">No comments yet</Typography>)
                }
                <div ref={commentRef} />
            </div>
            {user &&
                <div style={{ width: '70%', marginTop: '10px' }}>
                    <Typography gutterBottom variant="h6">Write a Comment: </Typography>
                    <TextField
                        fullWidth
                        minRows={4}
                        multiline
                        variant='outlined'
                        label="Comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: "10px" }} color='primary' fullWidth disabled={!comment.length} variant="contained" onClick={handleClick}>Comment</Button>
                </div>
            }
        </div >
    );
};

export default CommentsSection;