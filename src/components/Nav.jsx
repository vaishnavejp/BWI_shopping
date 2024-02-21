import React, {useContext} from "react";
import '../styles/nav.css';
import { AuthContext } from "./AuthWrapper";

export default function Nav() {

    const { isSignedIn, setIsSignedIn, message, setMessage, link, setLink } = useContext(AuthContext);

    return(
        <div className="nav">
            <div className="nav-items">
                <h5><a href="/">Home</a></h5>
                <h5><a href="/">{link}</a></h5>
            </div>
        </div>
    )
}