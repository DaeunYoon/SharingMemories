import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/memories.png';

import useStyles from './styles';
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: LOGOUT });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp < Date.now() / 1000) {
                logout();
            }
        }
        // if (token) {
        setUser(JSON.parse(localStorage.getItem('profile')));
        // }
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Container className={classes.brandContainer} component={Link} to="/">
                <Typography className={classes.heading} variant="h2" align="center" >Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </Container>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <img src={user.result.picture} referrerPolicy="no-referrer" alt="" style={{ display: "none" }} />
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture} referrerPolicy="no-referrer">{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                )}
            </Toolbar>
        </AppBar >
    );
};

export default Navbar;