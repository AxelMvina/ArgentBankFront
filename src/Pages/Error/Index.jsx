import React from "react";
import {Link} from "react-router-dom";

function Error() {
    return (
        <div className="ErrorPage">
        <h1>404</h1>
        <p className="ErrorPage_p">Oups! La page que vous demandez n'existe pas.</p>
        <Link to="/" className="ErrorPage_a">Retourner sur la page d’accueil</Link>
        </div>
    )
    
}

export default Error;
