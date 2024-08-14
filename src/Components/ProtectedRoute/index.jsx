import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { token } = useSelector((state) => state.user);

    if (!token) {
        // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
        return <Navigate to="/Login" />;
    }

    // Sinon, rendre le composant enfant (la page protégée)
    return children;
}

export default ProtectedRoute;