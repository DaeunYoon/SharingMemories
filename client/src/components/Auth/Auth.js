import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import Input from './Input';
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/auth";

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleCallbackResponse = (response) => {
        var userObject = jwt_decode(response.credential);

        try {
            dispatch({ type: AUTH, data: { result: userObject, token: response.credential } });
            history.push('/');
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "248138222168-pg5fa7ci5agqgbvfsp1c1hdsacn47j7r.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline", size: "large"
            }
        )
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleShowPassword = (e) => {
        setShowPassword(!showPassword);
    }
    const switchMode = (e) => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half type="text" />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half type="text" />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignup && (
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                            )
                        }
                    </Grid>
                    <Button fullWidth variant='contained' type='submit' color="primary" className={classes.submit}>
                        {
                            isSignup ? 'Sign up' : 'Sign In'
                        }
                    </Button>
                    <div id="signInDiv"></div>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode} className={classes.switchButton}>
                                {isSignup ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container >
    );
};

export default Auth;