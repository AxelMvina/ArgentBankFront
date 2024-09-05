import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "../../Redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState(null); // Gérer les erreurs de validation côté formulaire

    const { loading, error } = useSelector((state) => state.user); // Récupération de l'erreur depuis Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginEvent = async (e) => {
        e.preventDefault();
        setFormError(null); // Réinitialiser l'erreur de formulaire

        // Validation des champs vides
        if (!email || !password) {
            setFormError("L'email et le mot de passe sont requis.");
            return;
        }

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
                    className={formError && !email ? 'input-error' : ''}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={formError && !password ? 'input-error' : ''}
                />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {loading && <p>Chargement...</p>}
            {formError && <p style={{ color: 'red' }}>{formError}</p>}
            {/* Affichage du message d'erreur personnalisé */}
            {error && (
                <p style={{ color: 'red' }}>{error}</p> // L'erreur provient du Redux et est affichée ici
            )}
            <button type="submit" className="sign-in-button" disabled={loading}>
                Connexion
            </button>
        </form>
    );
}
