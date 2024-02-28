// src/components/Auth/Login.js, JN, 19.02.2024
import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const displayErrorMessage = (errorMessage) => {
        // Display the error message to the user
        console.error(errorMessage);
        toast.error(errorMessage);
    };

    const handleLogin = async (e) => {
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
                return(redirect("/"));
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="login-email" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-cy="login-password" />
                </div>
                <button type="submit" data-cy="login-submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

// eof