import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Store/UserSlice";
import HeaderImg from "../../assets/img/argentBankLogo.png";

export function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/Login'); // Redirige vers la page de connexion après la déconnexion
    };
    
    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={HeaderImg}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div className="signin-and-out">
                
                {user ? (
                    <>
                        <NavLink className="main-nav-item" to="/User">
                            <i className="fa fa-user-circle"></i>
                            {user.userName} {/* Affiche le pseudo de l'utilisateur */}
                        </NavLink>
                        <button
                            className="main-nav-item logout-button"
                            onClick={handleLogout}
                            aria-label="Log out of your account"
                        >
                            <i className="fa fa-sign-out"></i>
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink className="main-nav-item" to="/Login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
}
