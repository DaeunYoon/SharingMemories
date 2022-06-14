import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';
import { getPosts, getPostsBySearch } from '../../actions/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { totalPages } = useSelector(state => state.posts);
    const query = useQuery();
    const searchQuery = query.get('searchQuery');
    const searchTagsQuery = query.get('tags');

    useEffect(() => {
        if (searchQuery || searchTagsQuery) {
            dispatch(getPostsBySearch({ search: searchQuery, tags: searchTagsQuery }, page));
        } else {
            dispatch(getPosts(page));
        }
    }, [page, dispatch]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={totalPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) =>
                (searchQuery || searchTagsQuery) ? (
                    <PaginationItem {...item} component={Link} to={`/posts/search?searchQuery=${searchQuery || null}&tags=${searchTagsQuery || null}&page=${item.page}`} />
                ) : (
                    <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                )}
            size="large"
        />
    )
};


export default Paginate;