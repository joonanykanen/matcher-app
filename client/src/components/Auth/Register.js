// src/components/Auth/Register.js, JN, 19.02.2024
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, TextField, Button, Select, MenuItem, Typography } from '@mui/material';

const Register = () => {
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
                displaySuccessMessage("Registration successful! Redirecting to login page...");
                await new Promise((resolve) => setTimeout(resolve, 2000));

                navigate('/login');
            } else {
                const errorData = await response.json();
                displayErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            displayErrorMessage("Internal Server Error");
        }
        console.log('Registering with email:', email, 'and password:', password);
    };

    return (
    <div style={{ padding: '10px' }}>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleRegister}>
            <div style={{ padding: '10px' }}>
                <TextField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="register-email" />
            </div>
            <div style={{ padding: '10px' }}>
                <TextField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-cy="register-password" />
            </div>
            <div style={{ padding: '10px' }}>
                <TextField id="firstName" label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} data-cy="register-first-name" />
            </div>
            <div style={{ padding: '10px' }}>
                <TextField id="lastName" label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} data-cy="register-last-name" />
            </div>
            <div style={{ padding: '10px' }}>
                <TextField id="age" label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} data-cy="register-age" />
            </div>
            <div style={{ padding: '10px' }}>
                <TextField id="gender" label="Gender" select value={gender} onChange={(e) => setGender(e.target.value)} data-cy="register-gender" sx={{minWidth: '220px'}}>
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
            </div>
            <div style={{ padding: '10px' }}>
                <Button type="submit" data-cy="register-submit">Register</Button>
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