// src/components/Auth/Login.js, JN, 19.02.2024
import React, { useState } from 'react';
import { Snackbar, Alert, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const displayErrorMessage = (message) => {
        setErrorMessage(message);
        setMessageType('error');
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();

                // Save the token to local storage
                localStorage.setItem("auth_token", token);

                // Redirect to the home page
                window.location.href = "/";
            } else {
                const errorData = await response.json();
                displayErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
            displayErrorMessage("Internal Server Error");
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <Typography variant="h5">{t('login')}</Typography>
            <form onSubmit={handleLogin}>
                <div style={{ margin: '20px' }}>
                    <TextField id="email" label={t('email')} type="email" onChange={(e) => setEmail(e.target.value)} data-cy="login-email" />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField id="password" label={t('password')} type="password" onChange={(e) => setPassword(e.target.value)} data-cy="login-password" />
                </div>
                <Button type="submit" data-cy="login-submit">{t('loginButton')}</Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={messageType} sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;


// eof