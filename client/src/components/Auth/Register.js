// src/components/Auth/Register.js, JN, 19.02.2024
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
                        body: JSON.stringify({ email, password, firstName, lastName }),
                });

                if (response.ok) {
                        // Registration successful, redirect to login route
                        window.location.href = "/login";
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
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;

// eof