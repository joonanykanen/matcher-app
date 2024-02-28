// src/components/Auth/Register.js, JN, 19.02.2024
import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="register-email" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-cy="register-password" />
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} data-cy="register-first-name" />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} data-cy="register-last-name" />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} data-cy="register-age" />
                </div>
                <div>
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} data-cy="register-gender">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" data-cy="register-submit">Register</button>
            </form>
        </div>
    );
};

export default Register;

// eof