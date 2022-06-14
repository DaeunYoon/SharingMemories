import React from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Input = ({ half, name, label, handleChange, autoFocus, type, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                autoFocus={autoFocus}
                type={type}
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                InputProps={
                    name === 'password' ? {
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowPassword}>
                                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    } : {}}
            />
        </Grid >
    );
};

export default Input;