import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import placeholder from '../../images/placeholder-image.png';
import CommentsSection from './CommentSection';
import useStyles from './styles';
import { CLEAR_POST } from '../../constants/actionTypes';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
        return () => {
            dispatch({ type: CLEAR_POST });
        }
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }, 1));
    }, [post, dispatch])

    if (!post || isLoading) {
        return (
            <Paper className={classes.loadingPaper} elevation={6}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
    const openPost = (id) => {
        history.push(`/posts/${id}`);
    }

    return (
        <div>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h4" component="h2">{post.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map(tag => `#${tag} `)}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                        <Typography variant="body1" component="p">Created by: {post.name}</Typography>
                        <Typography variant="body2" component="">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1" component="h2"><strong>Realtime Chat - coming soon!</strong></Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1" component="h2"><strong><CommentsSection post={post} /></strong></Typography>
                        <Divider style={{ margin: '20px 0' }} />
                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={post.selectedFile || placeholder} alt={post.title} />
                    </div>
                </div>
                {recommendedPosts.length > 0 && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">You might also like: </Typography>
                        <Divider />
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts.map(({ name, message, likes, title, selectedFile, tags, _id }) => (
                                <div key={_id} style={{ margin: '20px', cursor: "pointer", minWidth: "30%" }} onClick={() => openPost(_id)}>
                                    <Typography gutterBottom variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                    <img width="200" src={selectedFile || placeholder} alt={title} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
                }
            </Paper >
        </div >
    );
};

export default PostDetails;