import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Pagination from '../Pagination/Pagination';
import { getPostsBySearch } from '../../actions/posts';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTags, setSearchTags] = useState([]);

    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    // const searchQuery = query.get('searchQuery');
    // const searchTagsQuery = query.get('tags');

    // useEffect(() => {
    //     if (searchQuery || searchTagsQuery) {
    //         console.log(searchQuery);
    //         dispatch(getPostsBySearch({ search: searchQuery, tags: searchTagsQuery }));
    //     } else {
    //         dispatch(getPosts());
    //     }
    // }, [currentId, dispatch]);

    const searchPost = () => {
        if (searchTerm.trim().length || searchTags.length) {
            dispatch(getPostsBySearch({ search: searchTerm, tags: searchTags.join(',') }, 1));
            history.push(`/posts/search?searchQuery=${searchTerm || null}&tags=${searchTags.join(',') || null}&page=1`);
        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchPost();
        }
    }

    const handleAdd = (newTag) => {
        setSearchTags([...searchTags, newTag]);
    }
    const handleDelete = (tagToDelete) => {
        setSearchTags(searchTags.filter(tag => tag !== tagToDelete));
    }
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={12} md={8} lg={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="searchTerm"
                                variant='outlined'
                                label="Search Memories"
                                fullWidth
                                value={searchTerm}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => { setSearchTerm(e.target.value) }}
                            />
                            <ChipInput
                                style={{ marginTop: "12.8px" }}
                                name="searchTags"
                                variant='outlined'
                                label="Search Tags"
                                value={searchTags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                            />
                            <Button className={classes.searchButton} variant='contained' color="primary" onClick={searchPost}>Search Memories</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow >
    );
};

export default Home;