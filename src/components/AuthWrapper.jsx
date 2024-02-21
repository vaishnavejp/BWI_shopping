import React, {useState, createContext} from "react";
import Login from "./Login";
import Logout from "./Logout";
import Nav from "./Nav";
import Home from "./Home";
import '../styles/authwrapper.css';

export const AuthContext = createContext();

export default function AuthWrapper() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [message, setMessage] = useState("Login To Continue");
    const [link, setLink] = useState("Login");
    const [token, setToken] = useState('nil');

    const authContextValue = { isSignedIn, setIsSignedIn, message, setMessage, link, setLink, token, setToken };
    console.log("auth", isSignedIn)

    if(localStorage.getItem("token") === null) {
        return (
            <AuthContext.Provider value={authContextValue}>
                <Nav />
                <div className="message">
                    {message}
                </div>
                {!isSignedIn ? <Login /> : <Logout />}
            </AuthContext.Provider>
        );
    }
    else {
        return (
            <AuthContext.Provider value={authContextValue}>
                <div className="items-authW">
                    <Nav />
                    <div className="message">
                        {message}
                    </div>
                    <Home />
                </div>
            </AuthContext.Provider>
        );
    }
}