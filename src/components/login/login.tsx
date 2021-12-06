import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Input } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAuthQuery } from '../../features/auth/auth-api-slice';
import './login.css'
import { authSending } from '../../features/auth/auth-requested-slice';
import Auth from './auth';
import { Router } from '@material-ui/icons';

function Login() {
    const theme = useAppSelector(state => state.theme.value);
    const authState = useAppSelector(state => state.authState.value);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credentials, setCredentials] = useState({ email: '', password: ''});
    

    function handleSubmit(e: any) { 
        e.preventDefault();
        setCredentials({ email, password });
        dispatch(authSending(true));
    }

    return (
        <div id='login_auth' className={`Form Form-${theme}`}>
            <Typography component="h1" variant="h5">
                    Sign in
            </Typography>
            <Box component="form">
                <TextField
                className={`text-field-${theme}`}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
                />
                <TextField
                className={`text-field-${theme}`}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                />
                <Button className={`button-${theme}`} onClick={handleSubmit}>Sign In</Button>
            </Box>
            {authState ? <Auth credentials={credentials} /> : ''}
        </div>
    )
}

export default Login;