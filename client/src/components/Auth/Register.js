// src/components/Auth/Register.js, JN, 19.02.2024
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, TextField, Button, Select, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [messageType, setMessageType] = useState('error');

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const displayErrorMessage = (errorMessage) => {
        setMessageType('error');
        setErrorMessage(errorMessage);
        setOpen(true);
    };

    const displaySuccessMessage = (successMessage) => {
        setMessageType('success');
        setErrorMessage(successMessage);
        setOpen(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, firstName, lastName, age, gender }),
            });

            if (response.ok) {
                // Registration successful, redirect to login route
                displaySuccessMessage(t('registrationSuccessful'));
                await new Promise((resolve) => setTimeout(resolve, 2000));

                navigate('/login');
            } else {
                const errorData = await response.json();
                displayErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            displayErrorMessage(t('internalServerError'));
        }
        console.log('Registering with email:', email, 'and password:', password);
    };

    return (
        <div style={{ padding: '10px' }}>
            <Typography variant="h5">{t('register')}</Typography>
            <form onSubmit={handleRegister}>
                <div style={{ padding: '10px' }}>
                    <TextField id="email" label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="register-email" />
                </div>
                <div style={{ padding: '10px' }}>
                    <TextField id="password" label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-cy="register-password" />
                </div>
                <div style={{ padding: '10px' }}>
                    <TextField id="firstName" label={t('firstName')} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} data-cy="register-first-name" />
                </div>
                <div style={{ padding: '10px' }}>
                    <TextField id="lastName" label={t('lastName')} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} data-cy="register-last-name" />
                </div>
                <div style={{ padding: '10px' }}>
                    <TextField id="age" label={t('age')} type="number" value={age} onChange={(e) => setAge(e.target.value)} data-cy="register-age" />
                </div>
                <div style={{ padding: '10px' }}>
                    <TextField id="gender" label={t('gender')} select value={gender} onChange={(e) => setGender(e.target.value)} data-cy="register-gender" sx={{ minWidth: '220px' }}>
                        <MenuItem value="">{t('selectGender')}</MenuItem>
                        <MenuItem value="Male">{t("male")}</MenuItem>
                        <MenuItem value="Female">{t("female")}</MenuItem>
                        <MenuItem value="Other">{t("other")}</MenuItem>
                    </TextField>
                </div>
                <div style={{ padding: '10px' }}>
                    <Button type="submit" data-cy="register-submit">{t('register')}</Button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Register;


// eof