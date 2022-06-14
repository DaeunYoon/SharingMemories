import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import Post from './Post/Post';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector(state => state.posts);
    const classes = useStyles();
    const query = useQuery();
    const searchQuery = query.get('searchQuery');
    const searchTagsQuery = query.get('tags');

    if (!isLoading && posts.length === 0)
        if (searchQuery || searchTagsQuery)
            return (<h1>There is any matching memory post :(</h1>)
        else
            return (<h1>No Post Yet :(</h1>)


    return (
        isLoading ? <CircularProgress className={classes.loading} /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map(post => (
                    <Grid item xs={12} sm={6} lg={3} key={post._id}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        ));
};

export default Posts;