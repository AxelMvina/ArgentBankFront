import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "../../Store/UserSlice";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error, user, token } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginEvent = async (e) => {
        e.preventDefault();
        let userCredentials = {
            email,
            password
        };

        try {
            const result = await dispatch(loginUser(userCredentials));
            if (result.payload) {
                await dispatch(fetchUserProfile()); // Récupérer le profil utilisateur après la connexion
                setEmail('');
                setPassword('');
                console.log('Navigating to home page...');
                navigate('/User');
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <form onSubmit={handleLoginEvent}>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="sign-in-button" disabled={loading}>
                Sign In
            </button>
        </form>
    );
}
