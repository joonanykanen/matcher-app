// src/components/Auth/Register.js, JN, 19.02.2024
import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { padding } from '@mui/system';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const displayErrorMessage = (errorMessage) => {
        // Display the error message to the user
        console.error(errorMessage);
        toast.error(errorMessage);
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
                return (redirect('/login'));
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
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="register-email" />
                </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
                <FormControl>
                    <InputLabel>Password</InputLabel>
                    <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-cy="register-password" />
                </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
                <FormControl>
                    <InputLabel>First Name</InputLabel>
                    <TextField type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} data-cy="register-first-name" />
                </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
                <FormControl>
                    <InputLabel>Last Name</InputLabel>
                    <TextField type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} data-cy="register-last-name" />
                </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
                <FormControl>
                    <InputLabel>Age</InputLabel>
                    <TextField type="number" value={age} onChange={(e) => setAge(e.target.value)} data-cy="register-age" />
                </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel>Gender</InputLabel>
                    <Select value={gender} onChange={(e) => setGender(e.target.value)} data-cy="register-gender">
                        <MenuItem value="">Select Gender</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
                <Button type="submit" data-cy="register-submit">Register</Button>
            </div>
        </form>
    </div>
    );
};

export default Register;

// eof