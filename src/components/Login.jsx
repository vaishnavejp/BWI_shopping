import React, { useState, useContext, useEffect } from "react";
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthWrapper";

export default function Login() {

    const navigate = useNavigate();

    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [loginbtn, setLoginBtn] = useState(false);

    const { isSignedIn, setIsSignedIn, message, setMessage, link, setLink, token, setToken } = useContext(AuthContext);

    const handleUname = (e) => {
        setUname(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        fetchReq();
        // navigate('/auth', {state: {uname, password, link, message}});
    }

    const fetchReq = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              
              username: uname,
              password: password,
              expiresInMins: 60, // optional
            })
          })
          .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Response Status Code:', res.status);
            setIsSignedIn(true);
            setMessage("You are now logged in!");
            setLink("Logout");
            return res.json();
          })
          .then(data => {
            setToken(data.token);
            localStorage.setItem('token', JSON.stringify(data.token));
          })
          .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        fetchReq();
    }, []);

    useEffect(() => {
        // localStorage.setItem('msg', JSON.stringify(message));
    }, [message]);

    console.log(message)

    return(
        <div className="wrapper" style={{ backgroundImage: "url(/assets/bg.jpg)", backgroundSize: "cover", backgroundRepeat: 'no-repeat'}}>
            <form className="form">
                <h4>Welcome! Login to continue to home</h4>
                <div className="details">
                    <input type="text" placeholder="Username" className="interior" id="uname" value={uname} onChange={handleUname}/>
                    <input type="password" placeholder="Password" className="interior" id="pw" value={password} onChange={handlePassword}/>
                    <button className="login-btn" onClick={handleLogin}>
                        {link}
                    </button>
                </div>
            </form>
        </div>
    )
}